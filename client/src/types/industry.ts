export interface StructuredBlock {
  label: string;
  items: string[];
}

export interface ChallengeCard {
  title?: string; // title をオプショナルに変更
  label?: string; // label を追加
  description?: string; // description を追加
  solutions?: any[]; // solutions を柔軟に変更
  structuredBlock: StructuredBlock[];
}

export interface Phase {
  title: string;
  period: string;
  description: string;
  image?: string;
  structuredBlock?: StructuredBlock[];
}

export interface Column {
  title: string;
  content: string;
  image?: string;
}

// EditorComment は文字列として扱われている
export type EditorComment = string;

export interface SupportSystem {
  name: string; // title -> name に変更
  content: string;
}

export interface RecommendedSupport {
  title: string;
  content: string;
}

export interface Story {
  title: string;
  text: string[]; // string -> string[] に変更
  image?: string;
}

export interface Timeline {
  past?: string; // past を追加
  phase1?: string; // phase1 を追加
  phase2?: string; // phase2 を追加
  phase3?: string; // phase3 を追加
  phase4?: string; // phase4 を追加
  present?: string; // present を追加
  future: string;
}

export interface ChecklistItem {
  title: string;
  detail: string;
}

// Barriers 型を柔軟にする（industries.ts のデータ構造不整合を吸収）
export type Barriers = any;

export interface DecisionOptionA {
  title: string;
  pros: string[];
  cons?: string[]; // cons を追加
}

export interface DecisionOptionB {
  title: string;
  subsidy?: string; // subsidy をオプショナルに変更
  cost?: string; // cost をオプショナルに変更
  pros?: string[]; // pros を追加（industries.ts で使用されているため）
  cons?: string[]; // cons を追加（industries.ts で使用されているため）
}

export interface DecisionMatrix {
  title: string; // title を追加
  optionA: DecisionOptionA;
  optionB: DecisionOptionB;
  decision?: string; // decision を追加（industries.ts で使用されているため）
  reason?: string; // reason をオプショナルに変更
}

export interface Details {
  interviewDate: string;
  writer: string;
  owner?: string; // owner を追加
  founded?: string; // founded を追加
  employees?: string; // employees を追加
}

export interface Regrets {
  title?: string;
  content?: string; // content をオプショナルに変更
  points?: string[]; // points を追加（industries.ts で使用されているため）
}

export interface Industry {
  id: number;
  title: string;
  operator: string;
  category: string;
  region?: string; // region をオプショナルに変更
  summary: string;
  heroImage?: string; // heroImage をオプショナルに変更
  image?: string; // image を追加（heroImage との互換性のため）
  isCaseStudy: boolean;
  
  // ヒーローサマリー
  heroSummary?: string;

  // 役割（industries.ts で使用）
  role?: string;

  // タグ
  tags?: string[];

  // 所在地（トップレベル）
  location?: string;

  // 座標（industries.ts で使用）
  locationCoords?: {
    lat: number;
    lng: number;
  };

  // 説明（industries.ts で使用）
  description?: string;

  // 必要性（industries.ts で使用）
  necessity?: string;

  // つながり（industries.ts で使用）
  connections?: string | string[];

  // 関連産業（industries.ts で使用）
  relatedIndustries?: (string | number)[];

  // 深掘り（industries.ts で使用）
  deepDive?: any;

  // アクション（industries.ts で使用）
  actions?: any[];

  // 季節性（industries.ts で使用）
  seasonalMonths?: number[];

  // 会社概要
  companyProfile?: { // companyProfile をオプショナルに変更
    name: string;
    representative: string;
    location: string;
    foundingYear: string;
    capital?: string;
    employeeCount: string;
    businessContent: string;
    website?: string;
  };

  // 課題カード
  challengeCard: ChallengeCard;

  // フェーズ
  phases?: Phase[]; // phases をオプショナルに変更

  // コラム
  column?: Column;

  // 編集後記
  editorComment?: EditorComment;

  // 支援制度（配列として定義）
  supportSystem?: SupportSystem[];

  // おすすめの支援
  recommendedSupports?: RecommendedSupport[];

  // ストーリー
  story?: Story;

  // タイムライン
  timeline?: Timeline;

  // 意思決定マトリクス
  decisionMatrix?: DecisionMatrix;

  // 課題リスト
  barriers?: Barriers;

  // 取材詳細
  details?: Details;

  // 先人の教訓
  regrets?: Regrets;
}
