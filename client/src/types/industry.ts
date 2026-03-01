export interface Industry {
  id: number;
  title: string;
  category: string;
  operator?: string;
  role?: string;
  location: string;
  locationCoords?: { lat: number; lng: number };
  tags: string[];
  summary: string;
  description?: string;
  necessity?: string;
  connections?: string;
  relatedIndustries?: number[];
  timeline: {
    past?: string;
    present?: string;
    future?: string;
    phase1?: string;
    phase2?: string;
    phase3?: string;
    phase4?: string;
  };
  deepDive?: {
    past?: string;
    present?: string;
    future?: string;
  };
  actions?: { type: string; label: string; link: string }[];
  image: string;
  seasonalMonths?: number[];
  isCaseStudy?: boolean;
  challengeCard?: {
    label: string;
    description: string;
    solutions: { title: string; detail: string }[];
    structuredBlock?: { label: string; items: string[] }[];
  };
  regrets?: {
    title: string;
    content: string;
  };
  decisionMatrix?: {
    title: string;
    optionA: {
      title: string;
      pros: string[];
    };
    optionB: {
      title: string;
      subsidy: string;
      cost: string;
    };
    reason: string;
  };
  decisionProcess?: {
    worry: string;
    decider: string;
    selectedSupport: string;
    action: string;
    outcome: string;
    rejectedOption: {
      title: string;
      reasons: string[];
    };
    adoptedOption: {
      title: string;
      reasons: string[];
      decidingFactor: string;
    };
  };
  barriers?: {
    title: string;
    content: string;
    checklist: {
      title: string;
      description: string;
    }[];
  };
  editorComment?: string;
  supportSystem?: {
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
  }[];
  details?: {
    owner?: string;
    founded?: string;
    employees?: string;
    writer?: string;
    interviewDate?: string;
  };
  heroSummary?: string;
  story?: {
    title: string;
    text: string[];
  };
  recommendedSupports?: {
    category: string;
    name: string;
    description: string;
    link: string;
  }[];
}
