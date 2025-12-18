import { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    q: "關於「乾瞻科技 (InPsytech)」的命名由來，以下何者正確？",
    options: [
      "取自 Psychology，強調心理素質",
      "取自 Insight (前瞻) 與 Psyche (靈神星)",
      "取自 Internet 與 System Tech",
      "取自 Inside Tech，強調核心技術"
    ],
    answer: "取自 Insight (前瞻) 與 Psyche (靈神星)",
    explanation: "根據公司簡介，InPsy 取自 Insight (洞察力/前瞻力) 的諧音，同時 Psyche 是第16號小行星「靈神星」，象徵富含高價值的金屬核心，寓意公司具備極高的商業價值與技術含金量。"
  },
  {
    q: "乾瞻科技 (InPsytech) 的核心技術專注於哪個領域？",
    options: [
      "傳統消費性電子代工",
      "太陽能面板製造",
      "先進製程高速互連 IP (UCIe, DDR, SerDes)",
      "生物科技醫療器材"
    ],
    answer: "先進製程高速互連 IP (UCIe, DDR, SerDes)",
    explanation: "乾瞻專注於先進製程（5nm, 3nm）的高速互連與記憶體 IP 設計，產品涵蓋 UCIe、ONFI、DDR 與 SerDes，是次世代晶片互聯的主流技術。"
  },
  {
    q: "根據 2024-2025 成長關鍵報告，乾瞻科技在 2024 年發生了什麼重大策略事件？",
    options: [
      "宣布解散公司",
      "被神盾 (Egis) 集團收購，強強聯手",
      "決定放棄 IPO 計畫",
      "將總部搬遷至美國"
    ],
    answer: "被神盾 (Egis) 集團收購，強強聯手",
    explanation: "2024 年 1 月宣布被神盾收購，並於同年 7 月完成股份轉換。這項策略結合是為了推動上市準備與加速人才成長，並整合集團資源。"
  },
  {
    q: "乾瞻科技內部推動「成長型組織文化」，使用什麼工具來管理 KPI 與目標協作？",
    options: [
      "Excel 表格",
      "Perdoo (OKR/KPI 管理平台)",
      "Line 群組回報",
      "手寫日報表"
    ],
    answer: "Perdoo (OKR/KPI 管理平台)",
    explanation: "報告中提到，公司以 Perdoo 為核心進行 KPI/OKR 管理，顯示部門協作與執行高度一致，並透過透明化的績效制度來驅動成長。"
  },
  {
    q: "展望未來，乾瞻科技設定的中長期策略目標（2026年）為何？",
    options: [
      "縮減研發預算",
      "轉型為餐飲服務業",
      "邁向國際舞台，計畫申請 IPO (公開發行)",
      "僅專注於台灣內需市場"
    ],
    answer: "邁向國際舞台，計畫申請 IPO (公開發行)",
    explanation: "根據發展藍圖，2026 年的目標是「邁向國際舞台」，預計完成上櫃/上市 (IPO)，並設立美國 Office，擴展全球市場佈局。"
  }
];