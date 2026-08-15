import React, { useState, useEffect, useMemo } from 'react';
import { 
  Home, Calendar, Train, MapPin, Info, CheckCircle, Circle, 
  Map, ExternalLink, Clock, AlertTriangle, ArrowRight, 
  Navigation, TrainTrack, Bike, Ship, Utensils, ShoppingBag, 
  Hotel, Plane, Ticket, ChevronDown, ChevronUp, Sparkles, Sun, Compass
} from 'lucide-react';

// 嚴格依照要求建立的結構化行程資料 (完全不變)
const tripData = [
  {
    date: "2026-08-29",
    displayDate: "8/29",
    title: "和歌山・加太・淡嶋神社",
    highlights: ["⛩️ 淡嶋神社", "🐟 吻仔魚丼飯", "🚆 加太線", "🏨 和歌山"],
    events: [
      {
        id: "d1-e1",
        type: "transport",
        transportMode: "train",
        startTime: "12:02",
        endTime: "12:51",
        title: "行程 1｜關西機場 → 和歌山站",
        totalDuration: "49分鐘",
        transferCount: 1,
        segments: [
          {
            type: "ride",
            startTime: "12:02",
            endTime: "12:13",
            from: "關西空港站",
            to: "日根野站",
            line: "JR關西空港線",
            train: "関空快速・京橋行",
            platformFrom: "3・4番線",
            duration: "11分鐘"
          },
          {
            type: "transfer",
            station: "日根野站",
            arriveTime: "12:13",
            nextTime: "12:21",
            waitTime: "5分鐘",
            transferTime: "3分鐘",
            platformNext: "1・2番線發"
          },
          {
            type: "ride",
            startTime: "12:21",
            endTime: "12:51",
            from: "日根野站",
            to: "和歌山站",
            line: "JR阪和線",
            train: "和歌山行",
            duration: "30分鐘",
            platformFrom: "1・2番線"
          }
        ]
      },
      {
        id: "d1-e2",
        type: "hotel",
        startTime: "12:51",
        endTime: "13:10",
        title: "🏨 東橫 INN 寄放行李",
        description: "抵達和歌山站後，先去飯店寄放行李。"
      },
      {
        id: "d1-e3",
        type: "food",
        startTime: "13:10",
        endTime: "13:40",
        title: "🍴 和歌山在地美食 (午餐)",
        links: [
          { url: "https://wakateku.jp/zh-hant/tabeteku-zh-hant/?area=wakayama", label: "🍴 和歌山美食推薦" }
        ]
      },
      {
        id: "d1-e4",
        type: "transport",
        transportMode: "train",
        startTime: "13:45",
        endTime: "14:21",
        title: "行程 2｜和歌山站 → 加太站",
        totalDuration: "36分鐘",
        transferCount: 1,
        segments: [
          {
            type: "ride",
            startTime: "13:45",
            endTime: "13:51",
            from: "和歌山站",
            to: "和歌山市站",
            line: "JR紀勢本線",
            train: "和歌山市行",
            duration: "6分鐘"
          },
          {
            type: "transfer",
            station: "和歌山市站",
            arriveTime: "13:51",
            nextTime: "13:57",
            waitTime: "3分鐘",
            transferTime: "3分鐘",
            platformNext: "3番線"
          },
          {
            type: "ride",
            startTime: "13:57",
            endTime: "14:21",
            from: "和歌山市站",
            to: "加太站",
            line: "南海加太線",
            train: "加太行",
            duration: "24分鐘",
            platformFrom: "3番線"
          }
        ],
        links: [
          { url: "https://kaikk.tw/nankai-tai/", label: "🚃 加太線觀光資訊" },
          { url: "https://www.nankai.co.jp/lib/kada/medetai/pdf/medetaitime.pdf", label: "🐟 鯛魚列車時刻表" }
        ]
      },
      {
        id: "d1-e5",
        type: "shrine",
        startTime: "14:30",
        endTime: "15:30",
        title: "⛩️ 行程 3｜淡嶋神社",
        description: "拿御朱印，稍微參觀。",
        mapUrl: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x6000b2de3e549575:0xe02530ea16595c12?entry=gemini&utm_source=gemini&utm_campaign=gem-default"
      },
      {
        id: "d1-e6",
        type: "food",
        startTime: "15:30",
        endTime: "16:30",
        title: "🍴 行程 4｜漁港漁市商店",
        description: "看有沒有機會吃到吻仔魚丼飯。",
        mapUrl: "https://www.google.com/maps/place//data=!4m2!3m1!1s0x6000b32739be56c1:0x22f8ffc0552f3e43?entry=gemini&utm_source=gemini&utm_campaign=gem-default"
      },
      {
        id: "d1-e7",
        type: "transport",
        transportMode: "train",
        startTime: "17:46",
        endTime: "18:36",
        title: "行程 5｜加太站 → 和歌山站",
        totalDuration: "50分鐘",
        transferCount: 1,
        segments: [
          {
            type: "ride",
            startTime: "17:46",
            endTime: "18:12",
            from: "加太站",
            to: "和歌山市站",
            line: "南海加太線",
            train: "和歌山市行",
            duration: "26分鐘",
            platformFrom: "1・2番線"
          },
          {
            type: "transfer",
            station: "和歌山市站",
            arriveTime: "18:12",
            nextTime: "18:29",
            waitTime: "14分鐘",
            transferTime: "約3分鐘"
          },
          {
            type: "ride",
            startTime: "18:29",
            endTime: "18:36",
            from: "和歌山市站",
            to: "和歌山站",
            line: "JR紀勢本線",
            train: "和歌山行",
            duration: "7分鐘"
          }
        ]
      },
      {
        id: "d1-e8",
        type: "food",
        startTime: "18:40",
        endTime: "20:00",
        title: "🍴 和歌山站周邊吃晚餐",
        description: "抵達和歌山後於車站周邊用餐。"
      }
    ]
  },
  {
    date: "2026-08-30",
    displayDate: "8/30",
    title: "貴志川線・奈良・南草津",
    highlights: ["⛩️ 奈良神社", "🦌 東大寺", "🚆 貴志川線", "🚲 奈良自行車"],
    events: [
      {
        id: "d2-e1",
        type: "transport",
        transportMode: "train",
        startTime: "08:24",
        endTime: "09:00",
        title: "行程 1｜和歌山站 → 貴志站",
        totalDuration: "36分鐘",
        transferCount: 0,
        segments: [
          {
            type: "ride",
            startTime: "08:24",
            endTime: "09:00",
            from: "和歌山站",
            to: "貴志站",
            line: "和歌山電鐵",
            train: "梅星電車",
            platformFrom: "9番線"
          }
        ],
        description: "購買：🎫 和歌山電鐵貴志川線一日乘車券\n營業時間：候車室 09:00～17:30 / 小玉咖啡館 09:00～17:00"
      },
      {
        id: "d2-e2",
        type: "transport",
        transportMode: "train",
        startTime: "09:38",
        endTime: "09:50",
        title: "行程 2｜貴志站 → 伊太祈曽站",
        totalDuration: "12分鐘",
        transferCount: 0,
        segments: [
          {
            type: "ride",
            startTime: "09:38",
            endTime: "09:50",
            from: "貴志站",
            to: "伊太祈曽站",
            line: "和歌山電鐵",
            train: "博故館號",
            duration: "12分鐘"
          }
        ]
      },
      {
        id: "d2-e3",
        type: "transport",
        transportMode: "train",
        startTime: "10:20",
        endTime: "10:40",
        title: "行程 3｜伊太祈曽站 → 和歌山站",
        totalDuration: "20分鐘",
        transferCount: 0,
        segments: [
          {
            type: "ride",
            startTime: "10:20",
            endTime: "10:40",
            from: "伊太祈曽站",
            to: "和歌山站",
            line: "和歌山電鐵",
            train: "查根頓路面電車",
            platformFrom: "1・2番線",
            platformTo: "9番線著",
            duration: "20分鐘"
          }
        ]
      },
      {
        id: "d2-e4",
        type: "transport",
        transportMode: "train",
        startTime: "11:00",
        endTime: "12:48",
        title: "行程 4｜和歌山站 → JR奈良站",
        totalDuration: "1小時48分鐘",
        transferCount: 1,
        segments: [
          {
            type: "ride",
            startTime: "11:00",
            endTime: "12:10",
            from: "和歌山站",
            to: "天王寺站",
            line: "JR阪和線",
            train: "紀州路快速・京橋行",
            duration: "70分鐘"
          },
          {
            type: "transfer",
            station: "天王寺站",
            arriveTime: "12:10",
            nextTime: "12:15",
            platformArrive: "18番線",
            platformNext: "16番線",
            waitTime: "約1分鐘",
            transferTime: "約4分鐘",
            isFastTransfer: true
          },
          {
            type: "ride",
            startTime: "12:15",
            endTime: "12:48",
            from: "天王寺站",
            to: "JR奈良站",
            line: "JR大和路線",
            train: "大和路快速・奈良行",
            duration: "33分鐘"
          }
        ]
      },
      {
        id: "d2-e5",
        type: "bike",
        startTime: "13:00",
        endTime: "17:00",
        title: "🚲 行程 5｜奈良自行車",
        description: "約 13:00 租借電動腳踏車。\n路線：⛩️ 興福寺、⛩️ 冰室神社、🦌 東大寺、⛩️ 春日大社。\n中間依時間彈性安排午餐/點心。\n⚠️ 17:00前還車。"
      },
      {
        id: "d2-e6",
        type: "transport",
        transportMode: "train",
        startTime: "17:37",
        endTime: "18:48",
        title: "行程 6｜JR奈良站 → 南草津站",
        totalDuration: "1小時11分鐘",
        transferCount: 1,
        segments: [
          {
            type: "ride",
            startTime: "17:37",
            endTime: "18:26",
            from: "JR奈良站",
            to: "京都站",
            line: "JR奈良線",
            train: "みやこ路快速644号・京都行",
            duration: "49分鐘"
          },
          {
            type: "transfer",
            station: "京都站",
            arriveTime: "18:26",
            nextTime: "18:31",
            platformArrive: "10番線",
            platformNext: "2番線",
            transferTime: "約5分鐘",
            isFastTransfer: true
          },
          {
            type: "ride",
            startTime: "18:31",
            endTime: "18:48",
            from: "京都站",
            to: "南草津站",
            line: "JR琵琶湖線",
            train: "新快速・長浜行",
            platformTo: "3・4番線著",
            duration: "17分鐘"
          }
        ]
      },
      {
        id: "d2-e7",
        type: "hotel",
        startTime: "19:00",
        endTime: "20:00",
        title: "🏨 旅館 Check-in & 晚餐",
        description: "抵達南草津後辦理入住並尋找晚餐。"
      }
    ]
  },
  {
    date: "2026-08-31",
    displayDate: "8/31",
    title: "近江八幡・八幡堀・La Collina",
    highlights: ["⛩️ 日牟禮八幡宮", "🚡 八幡山纜車", "🚢 近江八幡遊船", "🍰 La Collina"],
    events: [
      {
        id: "d3-e1",
        type: "transport",
        transportMode: "train",
        startTime: "08:11",
        endTime: "08:28",
        title: "行程 1｜南草津站 → 近江八幡站",
        totalDuration: "17分鐘",
        transferCount: 0,
        segments: [
          {
            type: "ride",
            startTime: "08:11",
            endTime: "08:28",
            from: "南草津站",
            to: "近江八幡站",
            line: "JR琵琶湖線",
            train: "新快速・米原経由近江塩津行",
            platformFrom: "3・4番線",
            platformTo: "1番線",
            duration: "17分鐘"
          }
        ]
      },
      {
        id: "d3-e2",
        type: "transport",
        transportMode: "bus",
        startTime: "08:44",
        endTime: "09:00",
        title: "行程 2｜近江八幡站 → 八幡堀",
        description: "從 JR近江八幡站北口 6號乘車處搭乘「近江鐵道巴士（長命寺線）」往長命寺方向。\n在「八幡堀（大杉町）八幡山纜車口」或「大衫町」下車。\n步行約2～5分鐘前往纜車山麓站。",
        mapUrl: "https://maps.app.goo.gl/6pGim3h6H3QsZYWL7"
      },
      {
        id: "d3-e3",
        type: "shrine",
        startTime: "09:10",
        endTime: "09:30",
        title: "⛩️ 行程 3｜日牟禮八幡宮",
        description: "拿御朱印"
      },
      {
        id: "d3-e4",
        type: "activity",
        startTime: "09:30",
        endTime: "11:00",
        title: "🚡 行程 4｜八幡山纜車",
        description: "營運時間：09:00～17:00 (每15分鐘一班 00, 15, 30, 45)\n上山末班：16:30"
      },
      {
        id: "d3-e5",
        type: "shrine",
        startTime: "10:00",
        endTime: "10:30",
        title: "⛩️ 行程 5｜瑞隆寺",
        description: "搭纜車上山後前往瑞隆寺拿御朱印。"
      },
      {
        id: "d3-e6",
        type: "ship",
        startTime: "11:00",
        endTime: "12:00",
        title: "🚢 行程 6｜近江八幡遊船",
        description: "大約 11:00 下山後前往遊船。",
        mapUrl: "https://maps.app.goo.gl/YzG55Xyf5XD5d7xj6",
        links: [
          { url: "https://tenjo.tw/omihachiman/", label: "🌐 介紹網站" }
        ]
      },
      {
        id: "d3-e7",
        type: "shopping",
        startTime: "11:00",
        endTime: "15:00",
        title: "🛍️ 行程 7｜仲屋町通",
        description: "約 11:00～15:00 安排逛街與午餐。",
        links: [
          { url: "https://tenjo.tw/nishikawa/", label: "🍴 午餐參考" }
        ]
      },
      {
        id: "d3-e8",
        type: "transport",
        transportMode: "bus",
        startTime: "15:17",
        endTime: "15:25",
        title: "行程 8｜八幡堀 → La Collina",
        description: "公車 15:17 於「八幡堀八幡山ロープウェー口」發車，15:25 抵達「北之庄ラコリーナ前」。下車後步行約1分鐘。",
        mapUrl: "https://maps.app.goo.gl/hGcCtVsHkj12BXfM9",
        links: [
          { url: "https://maps.app.goo.gl/hGcCtVsHkj12BXfM9", label: "📍 La Collina Google Maps" }
        ]
      },
      {
        id: "d3-e9",
        type: "transport",
        transportMode: "train",
        startTime: "18:36",
        endTime: "18:54",
        title: "行程 9｜近江八幡站 → 南草津站",
        totalDuration: "18分鐘",
        transferCount: 0,
        segments: [
          {
            type: "ride",
            startTime: "18:36",
            endTime: "18:54",
            from: "近江八幡站",
            to: "南草津站",
            line: "JR琵琶湖線",
            train: "新快速・播州赤穂行",
            platformFrom: "2・3番線",
            platformTo: "1・2番線著",
            duration: "18分鐘"
          }
        ]
      }
    ]
  },
  {
    date: "2026-09-01",
    displayDate: "9/1",
    title: "近江高島・臨空城",
    highlights: ["🚲 近江高島自行車", "🛍️ 臨空城 Outlet", "🏨 臨空城飯店"],
    events: [
      {
        id: "d4-e1",
        type: "transport",
        transportMode: "train",
        startTime: "08:05",
        endTime: "08:58",
        title: "行程 1｜南草津站 → 近江高島站",
        totalDuration: "53分鐘",
        transferCount: 1,
        segments: [
          {
            type: "ride",
            startTime: "08:05",
            endTime: "08:22",
            from: "南草津站",
            to: "山科站",
            line: "JR琵琶湖線",
            train: "京都行",
            platformFrom: "1・2番線",
            duration: "17分鐘"
          },
          {
            type: "transfer",
            station: "山科站",
            arriveTime: "08:22",
            nextTime: "08:28",
            platformArrive: "1・2番線",
            transferTime: "約3分鐘",
            waitTime: "約3分鐘",
            isFastTransfer: true
          },
          {
            type: "ride",
            startTime: "08:28",
            endTime: "08:58",
            from: "山科站",
            to: "近江高島站",
            line: "JR湖西線",
            train: "新快速・敦賀行",
            platformTo: "1番線著",
            duration: "30分鐘"
          }
        ]
      },
      {
        id: "d4-e2",
        type: "bike",
        startTime: "09:00",
        endTime: "14:00",
        title: "🚲 行程 2｜近江高島自行車",
        description: "約 09:00 於觀光案內所租自行車 (一天1,000日圓，2026/4/1起漲價)。\n約 14:00 還車。",
        links: [
          { url: "https://osaka.letsgojp.com/archives/580572/", label: "🚲 路線參考" }
        ]
      },
      {
        id: "d4-e3",
        type: "transport",
        transportMode: "train",
        startTime: "14:21",
        endTime: "16:38",
        title: "行程 3｜近江高島 → 臨空城",
        totalDuration: "2小時17分鐘",
        transferCount: 1,
        segments: [
          {
            type: "ride",
            startTime: "14:21",
            endTime: "14:58",
            from: "近江高島",
            to: "京都",
            line: "JR湖西線",
            train: "新快速・姫路行",
            duration: "37分鐘"
          },
          {
            type: "transfer",
            station: "京都站",
            isStayOnBoard: true,
            note: "中途停車約2分鐘，不用下車"
          },
          {
            type: "ride",
            startTime: "15:00",
            endTime: "15:28",
            from: "京都",
            to: "大阪",
            line: "JR京都線",
            train: "新快速・湖西線経由姫路行",
            duration: "28分鐘"
          },
          {
            type: "transfer",
            station: "大阪站",
            arriveTime: "15:28",
            nextTime: "15:38",
            platformArrive: "5番線",
            platformNext: "1番線",
            isFastTransfer: true
          },
          {
            type: "ride",
            startTime: "15:38",
            endTime: "15:54",
            from: "大阪",
            to: "天王寺方向",
            line: "大阪環狀線",
            train: "西九条方面関空快速・関西空港行",
            duration: "16分鐘"
          },
          {
            type: "transfer",
            station: "天王寺站",
            isStayOnBoard: true,
            note: "不用下車"
          },
          {
            type: "ride",
            startTime: "15:55",
            endTime: "16:31",
            from: "天王寺 (過站)",
            to: "日根野方向",
            line: "阪和線",
            train: "関空快速・関西空港行",
            duration: "36分鐘"
          },
          {
            type: "transfer",
            station: "日根野站",
            isStayOnBoard: true,
            note: "不用下車"
          },
          {
            type: "ride",
            startTime: "16:34",
            endTime: "16:38",
            from: "日根野",
            to: "臨空城站",
            line: "JR関西空港線",
            train: "関西空港行",
            platformTo: "2番線著",
            duration: "4分鐘"
          }
        ]
      },
      {
        id: "d4-e4",
        type: "hotel",
        startTime: "16:45",
        endTime: "17:00",
        title: "🏨 行程 4｜臨空城飯店",
        description: "從臨空城站五號出口出站，步行至飯店。",
        mapUrl: "https://maps.app.goo.gl/vCfKsaPaqQWHT5Wg9"
      },
      {
        id: "d4-e5",
        type: "shopping",
        startTime: "17:00",
        endTime: "21:00",
        title: "🛍️ 行程 5｜臨空城 Outlet",
        description: "約 17:00 前往臨空城 Outlet 逛街與晚餐。",
        mapUrl: "https://maps.app.goo.gl/F4ktv5Hs8ujvqJks9"
      }
    ]
  },
  {
    date: "2026-09-02",
    displayDate: "9/2",
    title: "關西機場・回台灣",
    highlights: ["✈️ 飛機返台", "🚆 南海空港線"],
    events: [
      {
        id: "d5-e1",
        type: "activity",
        startTime: "09:00",
        endTime: "09:10",
        title: "🏨 飯店出發",
        description: "從飯店出門前往機場。"
      },
      {
        id: "d5-e2",
        type: "transport",
        transportMode: "train",
        startTime: "09:14",
        endTime: "09:20",
        title: "行程｜臨空城 → 關西機場",
        totalDuration: "6分鐘",
        transferCount: 0,
        segments: [
          {
            type: "ride",
            startTime: "09:14",
            endTime: "09:20",
            from: "臨空城站",
            to: "關西機場站",
            line: "南海空港線",
            train: "空港急行・関西空港行",
            platformFrom: "1番線",
            duration: "6分鐘"
          }
        ]
      },
      {
        id: "d5-e3",
        type: "flight",
        startTime: "09:30",
        endTime: "14:00",
        title: "✈️ 航班返台",
        description: "09:30 Check-in\n12:00 飛機起飛\n14:00 抵達台灣"
      }
    ]
  }
];

const getIconForType = (type, mode) => {
  if (type === 'transport') {
    if (mode === 'train') return <Train size={20} />;
    if (mode === 'bus') return <Navigation size={20} />;
    if (mode === 'bike') return <Bike size={20} />;
    if (mode === 'flight') return <Plane size={20} />;
    if (mode === 'ship') return <Ship size={20} />;
  }
  switch (type) {
    case 'shrine': return <img src="https://api.iconify.design/noto:shinto-shrine.svg" alt="shrine" className="w-5 h-5" />;
    case 'food': return <Utensils size={20} />;
    case 'shopping': return <ShoppingBag size={20} />;
    case 'hotel': return <Hotel size={20} />;
    case 'bike': return <Bike size={20} />;
    case 'ship': return <Ship size={20} />;
    case 'flight': return <Plane size={20} />;
    default: return <MapPin size={20} />;
  }
};

const parseTimeToMinutes = (timeStr) => {
  if (!timeStr || !timeStr.includes(':')) return 0;
  const [hours, mins] = timeStr.split(':').map(Number);
  return hours * 60 + mins;
};

export default function KansaiTripApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedDate, setSelectedDate] = useState(tripData[0].date);
  const [completedItems, setCompletedItems] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    try {
      const stored = localStorage.getItem('kansaiTripCompleted');
      if (stored) {
        setCompletedItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load completed items", e);
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const toggleItemCompletion = (id) => {
    setCompletedItems(prev => {
      const newState = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem('kansaiTripCompleted', JSON.stringify(newState));
      } catch (e) {
        console.error("Failed to save", e);
      }
      return newState;
    });
  };

  const handleNavClick = (tab, date = null) => {
    setActiveTab(tab);
    if (date) setSelectedDate(date);
    window.scrollTo(0, 0);
  };

  const todayString = useMemo(() => {
    const nowStr = currentTime.toISOString().split('T')[0];
    const tripDates = tripData.map(d => d.date);
    return tripDates.includes(nowStr) ? nowStr : tripDates[0];
  }, [currentTime]);

  const currentDayData = tripData.find(d => d.date === (activeTab === 'home' ? todayString : selectedDate));

  const nextEventData = useMemo(() => {
    if (!currentDayData) return null;
    const currentMins = currentTime.getHours() * 60 + currentTime.getMinutes();
    const isActuallyToday = currentTime.toISOString().split('T')[0] === currentDayData.date;

    for (let event of currentDayData.events) {
      if (isActuallyToday) {
         if (parseTimeToMinutes(event.startTime) > currentMins && !completedItems[event.id]) {
            return event;
         }
      } else {
         if (!completedItems[event.id]) {
            return event;
         }
      }
    }
    return null;
  }, [currentDayData, currentTime, completedItems]);

  const TransportCard = ({ event }) => {
    const [expanded, setExpanded] = useState(false);
    const isCompleted = completedItems[event.id];

    return (
      <div className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-md border transition-all duration-300 ${isCompleted ? 'border-emerald-300 opacity-70 bg-emerald-50/40' : 'border-sky-100 hover:shadow-lg'} overflow-hidden mb-4`}>
        <div 
          className="p-4 cursor-pointer hover:bg-sky-50/40 flex items-start gap-3 transition-colors"
          onClick={() => setExpanded(!expanded)}
        >
          <div className={`p-2.5 rounded-2xl shadow-sm ${isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-gradient-to-tr from-cyan-500 to-blue-500 text-white'} shrink-0 mt-1`}>
            {getIconForType(event.type, event.transportMode)}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <h3 className={`font-bold text-lg tracking-tight ${isCompleted ? 'text-gray-400 line-through' : 'text-slate-800'}`}>{event.title}</h3>
              <span className="text-sky-500 bg-sky-50 p-1.5 rounded-full shadow-inner">{expanded ? <ChevronUp size={18}/> : <ChevronDown size={18}/>}</span>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
              <Clock size={16} className="shrink-0 text-amber-500" />
              <span className="font-semibold text-slate-700">{event.startTime} &rarr; {event.endTime}</span>
            </div>

            {!expanded && (
               <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 mt-2 bg-gradient-to-r from-sky-50 to-amber-50/40 p-2 rounded-xl border border-sky-100/60">
                  <span className="font-medium">⏱ {event.totalDuration}</span>
                  {event.transferCount > 0 && <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-semibold">• 轉乘 {event.transferCount} 次</span>}
                  {event.segments && event.segments[0].line && <span className="text-sky-700 font-semibold">• {event.segments[0].line}</span>}
               </div>
            )}
          </div>
        </div>

        {expanded && event.segments && (
          <div className="px-4 pb-4 bg-sky-50/30 border-t border-sky-100/60">
            <div className="relative pl-6 border-l-2 border-sky-300 ml-4 py-4 space-y-6">
              {event.segments.map((seg, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 bg-white border-2 border-sky-500 rounded-full shadow-sm z-10"></div>
                  
                  {seg.type === 'ride' ? (
                    <div className="bg-white p-3.5 rounded-xl shadow-sm border border-sky-100 relative">
                       <div className="absolute top-0 right-0 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-[10px] font-black px-2.5 py-1 rounded-bl-xl rounded-tr-xl shadow-sm">
                         第 {Math.ceil((idx + 1) / 2)} 段
                       </div>
                       <div className="flex flex-col gap-1.5 mt-1">
                          <div className="flex justify-between items-baseline">
                             <span className="text-sm font-black text-cyan-700 w-12">{seg.startTime}</span>
                             <span className="text-sm font-bold flex-1 ml-2 text-slate-800">{seg.from}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 ml-12 pl-2 border-l-2 border-dashed border-sky-200 py-1">
                            <TrainTrack size={12} className="text-sky-500" /> <span className="font-semibold text-slate-700">{seg.line}</span> {seg.train && `(${seg.train})`} <br/>
                            <span className="text-amber-600 font-medium">⏱ {seg.duration}</span>
                          </div>
                          <div className="flex justify-between items-baseline">
                             <span className="text-sm font-black text-cyan-700 w-12">{seg.endTime}</span>
                             <span className="text-sm font-bold flex-1 ml-2 text-slate-800">{seg.to}</span>
                          </div>
                          {seg.platformFrom && (
                            <div className="mt-2 text-xs bg-sky-50 text-sky-800 font-medium px-2.5 py-1 rounded-lg w-max border border-sky-100">
                              📍 乘車月台：<span className="font-bold">{seg.platformFrom}</span>
                            </div>
                          )}
                          {seg.platformTo && (
                            <div className="mt-1 text-xs bg-sky-50 text-sky-800 font-medium px-2.5 py-1 rounded-lg w-max border border-sky-100">
                              📍 抵達月台：<span className="font-bold">{seg.platformTo}</span>
                            </div>
                          )}
                       </div>
                    </div>
                  ) : (
                    <div className={`p-3.5 rounded-xl shadow-sm border ${seg.isFastTransfer ? 'bg-rose-50 border-rose-200' : (seg.isStayOnBoard ? 'bg-emerald-50 border-emerald-200' : 'bg-amber-50 border-amber-200')}`}>
                      {seg.isStayOnBoard ? (
                        <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                           <CheckCircle size={16} className="text-emerald-600" />
                           {seg.station}：{seg.note}
                        </div>
                      ) : (
                        <div className="flex flex-col gap-1.5">
                          <div className={`flex items-center gap-2 font-black text-sm ${seg.isFastTransfer ? 'text-rose-700' : 'text-amber-800'}`}>
                            <AlertTriangle size={16} /> 
                            {seg.station}轉乘 {seg.isFastTransfer && '(⚠️ 快速轉乘)'}
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs mt-1 bg-white/60 p-2 rounded-lg">
                             <div>
                                <span className="text-slate-500 font-medium">抵達</span>
                                <div className="font-bold text-slate-800">{seg.arriveTime} {seg.platformArrive && `(${seg.platformArrive})`}</div>
                             </div>
                             <div>
                                <span className="text-slate-500 font-medium">下一班</span>
                                <div className="font-bold text-slate-800">{seg.nextTime} {seg.platformNext && `(${seg.platformNext})`}</div>
                             </div>
                          </div>
                          <div className="flex justify-between text-xs mt-1 font-semibold pt-1 text-slate-700">
                             {seg.waitTime && <span>等待：{seg.waitTime}</span>}
                             {seg.transferTime && <span>轉車：{seg.transferTime}</span>}
                          </div>
                          {seg.isFastTransfer && (
                             <div className="bg-rose-500 text-white p-2 rounded-xl mt-2 text-xs font-bold text-center shadow-sm animate-pulse">
                               ⚠️ 只有約 {seg.transferTime || seg.waitTime} 轉車，請快速前往下一個月台！
                             </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="px-4 py-3 bg-gradient-to-r from-sky-50/50 to-amber-50/30 border-t border-sky-100/60 flex justify-between items-center">
           <button 
             onClick={(e) => { e.stopPropagation(); toggleItemCompletion(event.id); }}
             className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${isCompleted ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-white border border-sky-200 text-slate-700 hover:bg-sky-50'}`}
           >
             {isCompleted ? <CheckCircle size={15} /> : <Circle size={15} className="text-sky-400" />}
             {isCompleted ? '已完成 ✓' : '標記完成'}
           </button>
           
           <div className="flex gap-2">
             {event.mapUrl && (
                <a href={event.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-semibold text-sky-700 bg-sky-100/80 px-2.5 py-1.5 rounded-xl border border-sky-200 hover:bg-sky-200 transition-colors">
                  <Map size={13} /> Google Maps
                </a>
             )}
             {event.links && event.links.map((link, idx) => (
                <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                  <ExternalLink size={13} /> {link.label}
                </a>
             ))}
           </div>
        </div>
      </div>
    );
  };

  const ActivityCard = ({ event }) => {
    const isCompleted = completedItems[event.id];

    return (
      <div className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-md border transition-all duration-300 ${isCompleted ? 'border-emerald-300 opacity-70 bg-emerald-50/40' : 'border-sky-100 hover:shadow-lg'} mb-4 overflow-hidden`}>
        <div className="p-4">
          <div className="flex items-start gap-3">
             <div className={`p-2.5 rounded-2xl shadow-sm ${isCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-gradient-to-tr from-amber-400 to-orange-500 text-white'} shrink-0`}>
                {getIconForType(event.type)}
             </div>
             <div className="flex-1">
                <h3 className={`font-bold text-lg mb-1 tracking-tight ${isCompleted ? 'text-gray-400 line-through' : 'text-slate-800'}`}>{event.title}</h3>
                {event.startTime && (
                  <div className="flex items-center gap-2 text-sm text-slate-500 mb-2">
                    <Clock size={14} className="text-amber-500" />
                    <span className="font-semibold text-slate-700">{event.startTime} {event.endTime && `~ ${event.endTime}`}</span>
                  </div>
                )}
                {event.description && (
                  <p className="text-sm text-slate-600 whitespace-pre-line bg-sky-50/40 p-3 rounded-xl border border-sky-100/60">{event.description}</p>
                )}
             </div>
          </div>
        </div>
        
        <div className="px-4 py-3 bg-gradient-to-r from-sky-50/50 to-amber-50/30 border-t border-sky-100/60 flex justify-between items-center flex-wrap gap-2">
           <button 
             onClick={() => toggleItemCompletion(event.id)}
             className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm ${isCompleted ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-white border border-sky-200 text-slate-700 hover:bg-sky-50'}`}
           >
             {isCompleted ? <CheckCircle size={15} /> : <Circle size={15} className="text-sky-400" />}
             {isCompleted ? '已完成 ✓' : '標記完成'}
           </button>
           
           <div className="flex gap-2 flex-wrap justify-end">
             {event.mapUrl && (
                <a href={event.mapUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-semibold text-sky-700 bg-sky-100/80 px-2.5 py-1.5 rounded-xl border border-sky-200 hover:bg-sky-200 transition-colors">
                  <Map size={13} /> 開啟地圖
                </a>
             )}
             {event.links && event.links.map((link, idx) => (
                <a key={idx} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs font-semibold text-slate-700 bg-white px-2.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                  <ExternalLink size={13} /> {link.label}
                </a>
             ))}
           </div>
        </div>
      </div>
    );
  };

  const renderHome = () => (
    <div className="p-4 pb-28">
      {/* Summer Header Banner */}
      <div className="relative bg-gradient-to-r from-sky-400 via-cyan-500 to-blue-600 rounded-3xl p-6 text-white mb-6 shadow-xl overflow-hidden">
        <div className="absolute -right-8 -top-8 w-36 h-36 bg-amber-300/30 rounded-full blur-2xl"></div>
        <div className="absolute right-10 bottom-2 opacity-20 pointer-events-none">
          <Sun size={96} className="animate-spin" style={{ animationDuration: '30s' }} />
        </div>
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold mb-3 shadow-inner text-amber-100 border border-white/30">
            <Sparkles size={14} className="text-amber-300" /> 夏日晴空・關西之旅
          </div>
          <h1 className="text-2xl font-black tracking-tight mb-1">🇯🇵 2026 關西 5天4夜</h1>
          <p className="text-sky-100 font-medium text-sm">2026/8/29 ～ 2026/9/2 湛藍夏日冒險</p>
        </div>
      </div>

      {nextEventData && (
        <div className="bg-gradient-to-br from-amber-400 via-orange-500 to-rose-500 rounded-3xl p-5 text-white mb-6 shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-10 -mt-10 blur-xl"></div>
           <div className="flex items-center gap-2 text-amber-100 text-xs font-bold uppercase tracking-wider mb-2 relative z-10">
             <Navigation size={15} />
             <span>即將到來 ( {todayString} )</span>
           </div>
           <h2 className="text-xl font-black mb-1 relative z-10 leading-snug">{nextEventData.title}</h2>
           {nextEventData.startTime && (
             <div className="text-3xl font-black mb-3 relative z-10 flex items-baseline gap-2">
               {nextEventData.startTime} <span className="text-xs font-bold px-2 py-0.5 bg-white/25 rounded-full backdrop-blur-md">出發</span>
             </div>
           )}
           <button 
             onClick={() => handleNavClick('schedule', todayString)}
             className="w-full bg-white/25 hover:bg-white/35 backdrop-blur-md transition-all py-2.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 relative z-10 shadow-sm border border-white/30 active:scale-95"
           >
             查看今日完整行程 <ArrowRight size={16} />
           </button>
        </div>
      )}

      <h2 className="font-bold text-lg text-slate-800 mb-3 flex items-center gap-2 px-1">
        <Calendar size={20} className="text-sky-500"/> 
        行程總覽
      </h2>
      <div className="grid gap-3.5">
        {tripData.map((day, idx) => (
          <div 
            key={idx} 
            onClick={() => handleNavClick('schedule', day.date)}
            className="bg-white/95 backdrop-blur-sm p-4.5 rounded-2xl shadow-sm border border-sky-100 flex items-center gap-4 cursor-pointer hover:shadow-md transition-all active:scale-[0.98] group"
          >
            <div className="bg-gradient-to-br from-sky-400 to-blue-600 text-white font-black text-lg rounded-2xl w-16 h-16 flex flex-col items-center justify-center shrink-0 shadow-md shadow-sky-200">
               <span className="text-[10px] font-bold opacity-90">{day.date.split('-')[1]}月</span>
               {day.displayDate.split('/')[1]}
            </div>
            <div className="flex-1 min-w-0">
               <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-600 transition-colors truncate">{day.title}</h3>
               <div className="text-xs text-slate-500 mt-1.5 truncate flex flex-wrap gap-1">
                 {day.highlights.join(' • ')}
               </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-all shrink-0">
              <ArrowRight size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSchedule = () => {
    if (!currentDayData) return null;

    return (
      <div className="pb-28">
        <div className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-sky-100 px-4 py-3 flex items-center gap-3 shadow-sm">
           <select 
             value={selectedDate} 
             onChange={(e) => setSelectedDate(e.target.value)}
             className="w-full bg-sky-50/80 border border-sky-200 rounded-2xl py-2.5 pl-4 pr-10 font-bold text-slate-800 text-base appearance-none cursor-pointer focus:ring-2 focus:ring-sky-400 shadow-inner"
             style={{ backgroundImage: 'url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%230284C7%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem top 50%', backgroundSize: '.65em auto' }}
           >
             {tripData.map(d => (
               <option key={d.date} value={d.date}>{d.displayDate} {d.title.split('・')[0]}</option>
             ))}
           </select>
        </div>

        <div className="px-4 py-4 bg-gradient-to-b from-sky-50/60 to-transparent border-b border-sky-100/60">
           <h4 className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-2 flex items-center gap-1">
             <Sun size={14} className="text-amber-500" /> 今日亮點
           </h4>
           <div className="flex flex-wrap gap-2">
             {currentDayData.highlights.map((h, i) => (
               <span key={i} className="bg-white border border-sky-200/70 text-slate-700 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm">
                 {h}
               </span>
             ))}
           </div>
        </div>

        <div className="p-4">
           <div className="relative border-l-2 border-sky-200 ml-4 pl-6 space-y-6">
              {currentDayData.events.map((event, idx) => (
                 <div key={event.id} className="relative">
                    <div className={`absolute -left-[33px] top-4 w-6 h-6 rounded-full border-4 border-white shadow-md flex items-center justify-center ${completedItems[event.id] ? 'bg-emerald-500' : 'bg-gradient-to-tr from-cyan-500 to-blue-500'}`}>
                      {completedItems[event.id] && <CheckCircle size={12} className="text-white" />}
                    </div>
                    
                    {event.type === 'transport' ? (
                       <TransportCard event={event} />
                    ) : (
                       <ActivityCard event={event} />
                    )}
                 </div>
              ))}
           </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-gradient-to-b from-sky-100 via-sky-50 to-amber-50/40 min-h-screen flex justify-center font-sans selection:bg-sky-200">
      <div className="w-full max-w-md bg-gradient-to-b from-white via-sky-50/20 to-white min-h-screen relative shadow-2xl flex flex-col overflow-hidden">
        
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'home' ? renderHome() : renderSchedule()}
        </div>

        {/* Summer Navigation Bar */}
        <div className="bg-white/90 backdrop-blur-md border-t border-sky-100 flex items-center justify-around pb-safe pt-2 px-3 shrink-0 z-50 shadow-lg">
          <button 
            onClick={() => handleNavClick('home')}
            className={`flex flex-col items-center py-2 px-4 rounded-2xl transition-all ${activeTab === 'home' ? 'text-sky-600 bg-sky-100/70 font-bold scale-105' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Home size={22} className={activeTab === 'home' ? 'fill-sky-500 text-white' : ''}/>
            <span className="text-[11px] font-bold mt-1">首頁</span>
          </button>
          
          <button 
            onClick={() => handleNavClick('schedule', selectedDate)}
            className={`flex flex-col items-center py-2 px-4 rounded-2xl transition-all ${activeTab === 'schedule' ? 'text-sky-600 bg-sky-100/70 font-bold scale-105' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <Calendar size={22} className={activeTab === 'schedule' ? 'fill-sky-500 text-white' : ''}/>
            <span className="text-[11px] font-bold mt-1">行程</span>
          </button>
        </div>

      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 16px); }
      `}} />
    </div>
  );
}