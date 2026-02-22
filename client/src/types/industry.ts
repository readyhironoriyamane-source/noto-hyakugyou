export interface ChecklistItem {
  title: string;
  detail: string;
}

export interface Barriers {
  title: string;
  content: string;
  checklist: ChecklistItem[];
}

export interface DecisionOptionA {
  title: string;
  pros: string[];
  cons: string[];
}

export interface DecisionOptionB {
  title: string;
  subsidy?: string;
  cost?: string;
  pros: string[];
  cons?: string[];
}

export interface DecisionMatrix {
  title: string;
  optionA: DecisionOptionA;
  optionB: DecisionOptionB;
  reason?: string;
  decision?: string;
}

export interface Regrets {
  title: string;
  content?: string;
  points?: {
    label: string;
    term: string;
    detail: string;
  };
}

export interface ChallengeCard {
  label: string;
  description: string;
  solutions: any[];
  structuredBlock?: { label: string; items: string[] }[];
  title?: string;
}

export interface SupportSystem {
  name: string;
  description: string;
  link: string;
  points?: {
    label: string;
    term: string;
    detail: string;
  };
  specAmount?: string;
  specCondition?: string;
}

export interface Details {
  owner: string;
  founded: string;
  employees: string;
  writer: string;
  interviewDate: string;
}

export interface Story {
  title: string;
  text: string[];
}

export interface Timeline {
  past: string;
  present: string;
  future: string;
  phase1?: string;
  phase2?: string;
  phase3?: string;
  phase4?: string;
}

export interface Industry {
  id: number;
  title: string;
  category: string;
  operator: string;
  role: string;
  location: string;
  locationCoords?: { lat: number; lng: number };
  tags: string[];
  summary: string;
  description: string;
  necessity: string;
  connections: string;
  relatedIndustries?: number[];
  timeline: Timeline;
  deepDive?: {
    past: string;
    present: string;
    future: string;
  };
  actions?: { type: string; label: string; link: string }[];
  image?: string;
  seasonalMonths?: string[];
  isCaseStudy?: boolean;
  challengeCard?: ChallengeCard;
  regrets?: Regrets;
  decisionMatrix?: DecisionMatrix;
  decisionProcess?: any;
  barriers?: Barriers;
  editorComment?: string;
  supportSystem?: SupportSystem[];
  recommendedSupports?: any[];
  details?: Details;
  heroSummary?: string;
  story?: Story;
}
