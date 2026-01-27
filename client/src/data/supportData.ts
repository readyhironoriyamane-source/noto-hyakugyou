export type SupportItem = {
  id: number;
  badge: string;
  badgeColor: string;
  mainTitle: string;
  subTitle: string;
  description: string;
  specAmount: string;
  specCondition: string;
  category: 'reconstruction' | 'finance' | 'hr' | 'sales';
  providerType: 'ishikawa' | 'noto' | 'national' | 'other';
  // Extended fields for detail page
  targetAudience?: string;
  applicationDeadline?: string;
  flow?: string[];
  requiredDocuments?: string[];
  contactInfo?: {
    name: string;
    phone: string;
    hours: string;
  };
  officialLink?: string;
};

export const SUPPORT_ITEMS: SupportItem[] = [
  // --- カテゴリ：設備の復旧・再建 (reconstruction) ---
  {
    id: 11,
    badge: '石川県',
    badgeColor: 'bg-[#1D3A52]',
    mainTitle: '工場・店舗の再建、\n機械設備の復旧に',
    subTitle: 'なりわい再建支援補助金',
    description: '被災した施設・設備の復旧費用を補助（中堅企業等も対象）',
    specAmount: '上限 15億円',
    specCondition: '補助率 3/4（中堅は1/2）',
    category: 'reconstruction',
    providerType: 'ishikawa',
  },
  {
    id: 12,
    badge: '能登町',
    badgeColor: 'bg-[#B33E28]',
    mainTitle: '県の補助金に対する\n「自己負担」を軽減',
    subTitle: '能登町なりわい再建支援補助金',
    description: '「なりわい再建支援補助金」の対象経費から交付決定額を引いた額を補助',
    specAmount: '補助率 3/5',
    specCondition: '町への申請が必要',
    category: 'reconstruction',
    providerType: 'noto',
  },
  {
    id: 16,
    badge: '能登町',
    badgeColor: 'bg-[#B33E28]',
    mainTitle: '早期の営業再開に向けた\n店舗修繕・備品購入',
    subTitle: '営業再開支援補助金',
    description: '店舗等の修繕、機械設備・備品の購入費用を支援',
    specAmount: '上限 20万円',
    specCondition: '補助率 10/10（定額）',
    category: 'reconstruction',
    providerType: 'noto',
  },
  {
    id: 14,
    badge: '石川県',
    badgeColor: 'bg-[#1D3A52]',
    mainTitle: '仮設施設での\n事業再開・継続に',
    subTitle: '小規模事業者事業継続支援補助金',
    description: '仮設店舗の設置や、事業継続に必要な経費を支援',
    specAmount: '上限 100万円',
    specCondition: '補助率 2/3',
    category: 'reconstruction',
    providerType: 'ishikawa',
  },

  // --- カテゴリ：資金繰り (finance) ---
  {
    id: 17,
    badge: '公庫',
    badgeColor: 'bg-[#2B2B2B]',
    mainTitle: '災害復旧のための\n特別な融資制度',
    subTitle: '令和６年能登半島地震特別貸付',
    description: '当面の運転資金や、復旧に必要な設備資金の融資',
    specAmount: '上限 3億円',
    specCondition: '金利引き下げ措置あり',
    category: 'finance',
    providerType: 'national',
  },
  {
    id: 18,
    badge: '再生機構',
    badgeColor: 'bg-[#2B2B2B]',
    mainTitle: '二重ローンの解消、\n債権買取の相談',
    subTitle: '復興支援ファンドによる債権買取',
    description: '既往債務の買取や、返済条件の変更をサポート',
    specAmount: '個別相談',
    specCondition: '再生計画の策定が必要',
    category: 'finance',
    providerType: 'national',
  },
  {
    id: 15,
    badge: '能登町',
    badgeColor: 'bg-[#B33E28]',
    mainTitle: '国の持続化補助金への\n「上乗せ」支援',
    subTitle: '能登町小規模事業者持続化補助金',
    description: '国の採択決定額に対して、町が独自に上乗せ補助',
    specAmount: '上限 10万円',
    specCondition: '国の補助額の 1/10',
    category: 'finance',
    providerType: 'noto',
  },

  // --- カテゴリ：人材・承継 (hr) ---
  {
    id: 1,
    badge: '中小機構',
    badgeColor: 'bg-[#2B2B2B]',
    mainTitle: '事業承継の診断や、\n計画策定のサポート',
    subTitle: '中小企業事業承継円滑支援',
    description: '事業承継診断、承継計画の策定支援、M&Aマッチング',
    specAmount: '相談無料',
    specCondition: '専門家派遣は一部負担あり',
    category: 'hr',
    providerType: 'national',
  },
  {
    id: 2,
    badge: '商工会',
    badgeColor: 'bg-[#555555]',
    mainTitle: '税理士等による\n事業承継の無料相談',
    subTitle: '事業承継相談窓口',
    description: '親族内承継や廃業に関する手続き等の個別相談',
    specAmount: '相談無料',
    specCondition: '要予約',
    category: 'hr',
    providerType: 'other',
  },
  {
    id: 3,
    badge: '承継センター',
    badgeColor: 'bg-[#1D3A52]',
    mainTitle: 'M&Aや、第三者への\n引き継ぎマッチング',
    subTitle: '第三者承継支援',
    description: '後継者不在の企業と、創業希望者等をマッチング',
    specAmount: '登録無料',
    specCondition: '成約時は手数料の場合あり',
    category: 'hr',
    providerType: 'other',
  },
  {
    id: 4,
    badge: '承継センター',
    badgeColor: 'bg-[#1D3A52]',
    mainTitle: '家族・親族への\nスムーズな承継支援',
    subTitle: '親族内承継支援',
    description: '株式の移転や、後継者教育に関するアドバイス',
    specAmount: '相談無料',
    specCondition: '専門家派遣対応',
    category: 'hr',
    providerType: 'other',
  },
  {
    id: 5,
    badge: '承継センター',
    badgeColor: 'bg-[#1D3A52]',
    mainTitle: '創業希望者との\nマッチング',
    subTitle: '後継者人材バンク',
    description: '起業家志望の人材を「後継者」として紹介',
    specAmount: '登録無料',
    specCondition: '面談審査あり',
    category: 'hr',
    providerType: 'other',
  },
  {
    id: 6,
    badge: '民間',
    badgeColor: 'bg-[#555555]',
    mainTitle: '「今すぐ人手が欲しい」\nスポット採用に',
    subTitle: 'タイミーによる人材確保',
    description: 'スキマバイトアプリを活用した短期人材の確保',
    specAmount: '手数料無料',
    specCondition: '※被災地支援キャンペーン中',
    category: 'hr',
    providerType: 'other',
  },
  {
    id: 7,
    badge: '復興センター',
    badgeColor: 'bg-[#555555]',
    mainTitle: '専門家ボランティアによる\n技術・実務支援',
    subTitle: 'プロボ能登',
    description: 'IT、デザイン、法務など専門スキルを持つ人材が支援',
    specAmount: '利用無料',
    specCondition: 'プロジェクト単位での支援',
    category: 'hr',
    providerType: 'other',
  },
  {
    id: 8,
    badge: '復興センター',
    badgeColor: 'bg-[#555555]',
    mainTitle: '副業人材を活用した\n課題解決サポート',
    subTitle: '複業クラウド',
    description: '都市部の副業人材をオンラインで登用し課題解決',
    specAmount: '利用無料',
    specCondition: '※特別プラン適用',
    category: 'hr',
    providerType: 'other',
  },
  {
    id: 9,
    badge: 'ILAC',
    badgeColor: 'bg-[#1D3A52]',
    mainTitle: 'UIターン希望者の\n採用・求人掲載',
    subTitle: 'イシカワノオト',
    description: '石川県への移住希望者に向けた求人情報の掲載',
    specAmount: '掲載無料',
    specCondition: '企業登録が必要',
    category: 'hr',
    providerType: 'other',
  },

  // --- カテゴリ：販路開拓 (sales) ---
  {
    id: 13,
    badge: '石川県',
    badgeColor: 'bg-[#1D3A52]',
    mainTitle: '新商品開発や\n販路開拓のチャレンジに',
    subTitle: '地域産業資源活用支援事業',
    description: '地域資源を活用した新商品開発や販路開拓を支援',
    specAmount: '上限 500万円',
    specCondition: '補助率 2/3',
    category: 'sales',
    providerType: 'ishikawa',
  },
  {
    id: 10,
    badge: '中小機構',
    badgeColor: 'bg-[#2B2B2B]',
    mainTitle: 'ECサイト構築や\nITツールの導入支援',
    subTitle: 'IT導入補助金',
    description: '業務効率化や販路拡大のためのITツール導入を補助',
    specAmount: '上限 450万円',
    specCondition: '補助率 1/2〜3/4',
    category: 'sales',
    providerType: 'national',
  },
  {
    id: 19,
    badge: '商工会',
    badgeColor: 'bg-[#555555]',
    mainTitle: '販路開拓や\n業務効率化の取り組みに',
    subTitle: '小規模事業者持続化補助金',
    description: '小規模事業者が経営計画に基づいて行う販路開拓等を支援',
    specAmount: '上限 200万円',
    specCondition: '補助率 2/3（災害支援枠）',
    category: 'sales',
    providerType: 'national',
  },
  {
    id: 20,
    badge: '石川県',
    badgeColor: 'bg-[#1D3A52]',
    mainTitle: '伝統的工芸品の\n振興・継承活動に',
    subTitle: '伝統的工芸品産業振興補助金',
    description: '後継者育成、原材料確保、需要開拓などの取り組みを支援',
    specAmount: '要確認',
    specCondition: '事業内容による',
    category: 'sales',
    providerType: 'ishikawa',
  }
];
