export interface SupportSystem {
  id: number;
  benefit: string; // メリット（一番大きく表示）
  name: string;    // 正式名称
  category: 'reconstruction' | 'finance' | 'hr' | 'sales' | 'other';
  provider: 'noto' | 'ishikawa' | 'national';
  status: 'recruiting' | 'ongoing' | 'closing_soon' | 'closed';
  deadline?: string;
  amount: string;
  target: string;
  link: string;
  description?: string;
}

export const supports: SupportSystem[] = [
  {
    id: 1,
    benefit: "店舗・工場の再建費用を補助",
    name: "なりわい再建支援補助金",
    category: "reconstruction",
    provider: "ishikawa",
    status: "ongoing",
    amount: "上限15億円（補助率3/4〜定額）",
    target: "中小企業・中堅企業",
    link: "#",
    description: "被災した工場・店舗等の施設、生産機械等の設備の復旧費用を支援します。"
  },
  {
    id: 2,
    benefit: "事業再開に向けた運転資金を融資",
    name: "能登半島地震復興支援ファンド",
    category: "finance",
    provider: "ishikawa",
    status: "ongoing",
    amount: "上限3,000万円",
    target: "中小企業・小規模事業者",
    link: "#",
    description: "被災した中小企業の事業再開・継続に必要な運転資金等を支援します。"
  },
  {
    id: 3,
    benefit: "後継者不在の事業を引き継ぐ",
    name: "事業承継・引継ぎ補助金",
    category: "hr",
    provider: "national",
    status: "recruiting",
    deadline: "2026-03-31",
    amount: "上限600万円",
    target: "事業承継を行う中小企業",
    link: "#",
    description: "事業承継を契機とした新しい取り組みや、M&A時の専門家活用費用等を補助します。"
  },
  {
    id: 4,
    benefit: "新しい販路を開拓する",
    name: "小規模事業者持続化補助金",
    category: "sales",
    provider: "national",
    status: "closing_soon",
    deadline: "2026-02-15",
    amount: "上限200万円",
    target: "小規模事業者",
    link: "#",
    description: "地道な販路開拓等の取り組みや、業務効率化の取り組みを支援します。"
  },
  {
    id: 5,
    benefit: "能登町での事業再建を上乗せ支援",
    name: "能登町なりわい再建支援補助金",
    category: "reconstruction",
    provider: "noto",
    status: "ongoing",
    amount: "県補助金に上乗せ（上限あり）",
    target: "町内の中小企業",
    link: "#",
    description: "県のなりわい再建支援補助金の自己負担分の一部を町が独自に助成します。"
  },
  {
    id: 6,
    benefit: "短期アルバイトで人手不足解消",
    name: "タイミー活用支援",
    category: "hr",
    provider: "national",
    status: "ongoing",
    amount: "手数料一部補助",
    target: "人手不足の事業者",
    link: "#",
    description: "スキマバイトアプリ「タイミー」を活用した際の手数料等を支援します。"
  },
  {
    id: 7,
    benefit: "無担保・無保証人で低利融資",
    name: "マル経融資",
    category: "finance",
    provider: "national",
    status: "ongoing",
    amount: "上限2,000万円",
    target: "小規模事業者",
    link: "#",
    description: "商工会議所・商工会の推薦により、無担保・無保証人で融資を受けられます。"
  },
  {
    id: 8,
    benefit: "ECサイト構築で全国へ販売",
    name: "IT導入補助金",
    category: "sales",
    provider: "national",
    status: "recruiting",
    amount: "上限350万円",
    target: "中小企業・小規模事業者",
    link: "#",
    description: "ECサイト構築や業務効率化ツールの導入費用を補助します。"
  }
];

export const CATEGORIES = [
  { id: 'all', label: '全て表示', icon: '' },
  { id: 'reconstruction', label: '設備の復旧', icon: '🏗' },
  { id: 'finance', label: '資金繰り', icon: '💰' },
  { id: 'hr', label: '人材・承継', icon: '👥' },
  { id: 'sales', label: '販路開拓', icon: '📈' }
] as const;

export const PROVIDERS = [
  { id: 'all', label: '全て', color: 'bg-gray-100 text-gray-600' },
  { id: 'noto', label: '能登町の制度', color: 'bg-[#B33E28] text-white' }, // 弁柄色
  { id: 'ishikawa', label: '石川県の制度', color: 'bg-[#1D3A52] text-white' }, // 深藍
  { id: 'national', label: '国の制度', color: 'bg-gray-700 text-white' }
] as const;
