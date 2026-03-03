// ----------------------------------------------------------------------
// データ定義 (全24件：タイトル修正・タグ追加・詳細情報更新版)
// ----------------------------------------------------------------------
export type SupportItem = {
  id: number;
  badge: string;
  badgeColor: string;
  tag: string;       // ★新規: 困りごとタグ (例: 再建, 資金)
  mainTitle: string; // ★修正: メリット (大見出し)
  subTitle: string;  // ★修正: 制度名 (小見出し)
  description: string;
  specAmount: string;
  specCondition: string;
  category: 'reconstruction' | 'finance' | 'hr' | 'sales';
  providerType: 'ishikawa' | 'noto' | 'national' | 'other';
  // Optional fields for detail page compatibility
  targetAudience?: string;
  applicationPeriod?: string;
  contactInfo?: {
    name: string;
    phone: string;
    hours: string;
  };
  flow?: {
    step: string;
    title: string;
    description: string;
  }[];
  relatedLinks?: {
    title: string;
    url: string;
  }[];
};

export const SUPPORT_ITEMS: SupportItem[] = [
  // --- カテゴリ：設備の復旧・再建 ---
  {
    id: 11,
    badge: '石川県',
    badgeColor: 'bg-[#1D3A52]',
    tag: '再建',
    mainTitle: '工場・店舗の再建、\n機械設備の復旧に',
    subTitle: 'なりわい再建支援補助金',
    description: '被災した施設・設備の復旧費用を補助（中堅企業等も対象）',
    specAmount: '上限 15億円',
    specCondition: '補助率 3/4（中堅は1/2）',
    category: 'reconstruction',
    providerType: 'ishikawa',
    contactInfo: {
      name: '能登町商工会',
      phone: '076-204-6856',
      hours: '要確認',
    },
  },
  {
    id: 12,
    badge: '能登町',
    badgeColor: 'bg-[#B33E28]',
    tag: '自己負担軽減',
    mainTitle: '県の補助金に対する\n「自己負担」を軽減',
    subTitle: '能登町なりわい再建支援補助金',
    description: '「なりわい再建支援補助金」の対象経費から交付決定額を引いた額を補助',
    specAmount: '補助率 3/5',
    specCondition: '町への申請が必要',
    category: 'reconstruction',
    providerType: 'noto',
    contactInfo: {
      name: '能登町ふるさと振興課',
      phone: '0768-62-8526',
      hours: '要確認',
    },
  },
  {
    id: 16,
    badge: '能登町',
    badgeColor: 'bg-[#B33E28]',
    tag: '早期再開',
    mainTitle: '早期の営業再開に向けた\n店舗修繕・備品購入',
    subTitle: '営業再開支援補助金',
    description: '店舗等の修繕、機械設備・備品の購入費用を支援',
    specAmount: '上限 20万円',
    specCondition: '補助率 10/10（定額）',
    category: 'reconstruction',
    providerType: 'noto',
    contactInfo: {
      name: '能登町商工会',
      phone: '076-204-6856',
      hours: '要確認',
    },
  },
  {
    id: 14,
    badge: '石川県',
    badgeColor: 'bg-[#1D3A52]',
    tag: '仮設・継続',
    mainTitle: '仮設施設での\n事業再開・継続に',
    subTitle: '小規模事業者事業継続支援補助金',
    description: '仮設店舗の設置や、事業継続に必要な経費を支援',
    specAmount: '上限 100万円',
    specCondition: '補助率 2/3',
    category: 'reconstruction',
    providerType: 'ishikawa',
    contactInfo: {
      name: '小規模事業者事業継続支援補助金事務局',
      phone: '076-204-6856',
      hours: '要確認',
    },
  },

  // --- カテゴリ：資金繰り ---
  {
    id: 17,
    badge: '公庫',
    badgeColor: 'bg-[#2B2B2B]',
    tag: '融資',
    mainTitle: '災害復旧のための\n特別な融資制度',
    subTitle: '令和６年能登半島地震特別貸付',
    description: '当面の運転資金や、復旧に必要な設備資金の融資',
    specAmount: '上限 3億円',
    specCondition: '金利引き下げ措置あり',
    category: 'finance',
    providerType: 'national',
    contactInfo: {
      name: '日本政策金融公庫',
      phone: '0120-154-505',
      hours: '9:00-17:00',
    },
    relatedLinks: [
      {
        title: '公式サイト',
        url: 'https://www.jfc.go.jp/',
      },
    ],
  },
  {
    id: 18,
    badge: '再生機構',
    badgeColor: 'bg-[#2B2B2B]',
    tag: '債権買取',
    mainTitle: '二重ローンの解消、\n債権買取の相談',
    subTitle: '復興支援ファンドによる債権買取',
    description: '既往債務の買取や、返済条件の変更をサポート',
    specAmount: '個別相談',
    specCondition: '再生計画の策定が必要',
    category: 'finance',
    providerType: 'national',
    contactInfo: {
      name: '能登産業復興相談センター 奥能登サテライトオフィス',
      phone: '0768-23-4707',
      hours: '要確認',
    },
  },
  {
    id: 15,
    badge: '能登町',
    badgeColor: 'bg-[#B33E28]',
    tag: '上乗せ',
    mainTitle: '国の持続化補助金への\n「上乗せ」支援',
    subTitle: '能登町小規模事業者持続化補助金',
    description: '国の採択決定額に対して、町が独自に上乗せ補助',
    specAmount: '上限 10万円',
    specCondition: '国の補助額の 1/10',
    category: 'finance',
    providerType: 'noto',
    contactInfo: {
      name: '能登町ふるさと振興課',
      phone: '0768-62-8526',
      hours: '要確認',
    },
  },

  // --- カテゴリ：人材・承継 ---
  {
    id: 1,
    badge: '中小機構',
    badgeColor: 'bg-[#2B2B2B]',
    tag: '承継診断',
    mainTitle: '事業承継の診断や、\n計画策定のサポート',
    subTitle: '中小企業事業承継円滑支援',
    description: '事業承継診断、承継計画の策定支援、M&Aマッチング',
    specAmount: '相談無料',
    specCondition: '専門家派遣は一部負担あり',
    category: 'hr',
    providerType: 'national',
    contactInfo: {
      name: '中小企業基盤整備機構 北陸支本部 地域・連携支援課',
      phone: '076-223-6100',
      hours: '9:00-18:00',
    },
    relatedLinks: [
      {
        title: '公式サイト',
        url: 'https://www.smrj.go.jp/supporter/training/succession/index.html#contact',
      },
    ],
  },
  {
    id: 2,
    badge: '商工会',
    badgeColor: 'bg-[#555555]',
    tag: '無料相談',
    mainTitle: '税理士等による\n事業承継の無料相談',
    subTitle: '事業承継相談窓口',
    description: '親族内承継や廃業に関する手続き等の個別相談',
    specAmount: '相談無料',
    specCondition: '要予約',
    category: 'hr',
    providerType: 'other',
    contactInfo: {
      name: '能登町商工会',
      phone: '076-204-6856',
      hours: '13:00-17:00',
    },
    relatedLinks: [
      {
        title: '公式サイト',
        url: 'https://noto.shoko.or.jp/contents/common/151',
      },
    ],
  },
  {
    id: 3,
    badge: '承継センター',
    badgeColor: 'bg-[#1D3A52]',
    tag: 'M&A',
    mainTitle: 'M&Aや、第三者への\n引き継ぎマッチング',
    subTitle: '第三者承継支援',
    description: '後継者不在の企業と、創業希望者等をマッチング',
    specAmount: '登録無料',
    specCondition: '成約時は手数料の場合あり',
    category: 'hr',
    providerType: 'other',
    contactInfo: {
      name: '石川県事業承継・引継ぎ支援センター（引継ぎ隊！）',
      phone: '076-256-1031',
      hours: '8:30～17:15',
    },
    relatedLinks: [
      {
        title: '公式サイト',
        url: 'https://ishikawa-hikitsugi.go.jp/contact/',
      },
    ],
  },
  {
    id: 4,
    badge: '承継センター',
    badgeColor: 'bg-[#1D3A52]',
    tag: '親族承継',
    mainTitle: '家族・親族への\nスムーズな承継支援',
    subTitle: '親族内承継支援',
    description: '株式の移転や、後継者教育に関するアドバイス',
    specAmount: '相談無料',
    specCondition: '専門家派遣対応',
    category: 'hr',
    providerType: 'other',
    contactInfo: {
      name: '石川県事業承継・引継ぎ支援センター（引継ぎ隊！）',
      phone: '076-256-1031',
      hours: '8:30～17:15',
    },
    relatedLinks: [
      {
        title: '公式サイト',
        url: 'https://ishikawa-hikitsugi.go.jp/contact/',
      },
    ],
  },
  {
    id: 5,
    badge: '承継センター',
    badgeColor: 'bg-[#1D3A52]',
    tag: '後継者バンク',
    mainTitle: '創業希望者との\nマッチング',
    subTitle: '後継者人材バンク',
    description: '起業家志望の人材を「後継者」として紹介',
    specAmount: '登録無料',
    specCondition: '面談審査あり',
    category: 'hr',
    providerType: 'other',
    contactInfo: {
      name: '石川県事業承継・引継ぎ支援センター（引継ぎ隊！）',
      phone: '076-256-1031',
      hours: '8:30～17:15',
    },
    relatedLinks: [
      {
        title: '公式サイト',
        url: 'https://ishikawa-hikitsugi.go.jp/contact/',
      },
    ],
  },
  {
    id: 6,
    badge: '民間',
    badgeColor: 'bg-[#555555]',
    tag: 'スポット採用',
    mainTitle: '「今すぐ人手が欲しい」\nスポット採用に',
    subTitle: 'タイミーによる人材確保',
    description: 'スキマバイトアプリを活用した短期人材の確保',
    specAmount: '手数料無料',
    specCondition: '※被災地支援キャンペーン中',
    category: 'hr',
    providerType: 'other',
    contactInfo: {
      name: '能登官民連携復興センター',
      phone: '0768-23-4681',
      hours: '要確認',
    },
    relatedLinks: [
      {
        title: '公式サイト',
        url: 'https://www.notorenpuku.jp/contact/',
      },
    ],
  },
  {
    id: 7,
    badge: '復興センター',
    badgeColor: 'bg-[#555555]',
    tag: '専門家',
    mainTitle: '専門家ボランティアによる\n技術・実務支援',
    subTitle: 'プロボ能登',
    description: 'IT、デザイン、法務など専門スキルを持つ人材が支援',
    specAmount: '利用無料',
    specCondition: 'プロジェクト単位での支援',
    category: 'hr',
    providerType: 'other',
    contactInfo: {
      name: '能登官民連携復興センター',
      phone: '0768-23-4681',
      hours: '要確認',
    },
    relatedLinks: [
      {
        title: '公式サイト',
        url: 'https://www.notorenpuku.jp/contact/',
      },
    ],
  },
  {
    id: 8,
    badge: '復興センター',
    badgeColor: 'bg-[#555555]',
    tag: '副業人材',
    mainTitle: '副業人材を活用した\n課題解決サポート',
    subTitle: '複業クラウド',
    description: '都市部の副業人材をオンラインで登用し課題解決',
    specAmount: '利用無料',
    specCondition: '※特別プラン適用',
    category: 'hr',
    providerType: 'other',
    contactInfo: {
      name: '能登官民連携復興センター',
      phone: '0768-23-4681',
      hours: '要確認',
    },
    relatedLinks: [
      {
        title: '公式サイト',
        url: 'https://www.notorenpuku.jp/contact/',
      },
    ],
  },
  {
    id: 9,
    badge: 'ILAC',
    badgeColor: 'bg-[#1D3A52]',
    tag: '求人掲載',
    mainTitle: 'UIターン希望者の\n採用・求人掲載',
    subTitle: 'イシカワノオト',
    description: '石川県への移住希望者に向けた求人情報の掲載',
    specAmount: '掲載無料',
    specCondition: '企業登録が必要',
    category: 'hr',
    providerType: 'other',
    contactInfo: {
      name: 'ILACいしかわ就職・定住サポートセンター',
      phone: '076ｰ235ｰ4540',
      hours: '要確認',
    },
    relatedLinks: [
      {
        title: '公式サイト',
        url: 'https://ishikawa-ilac.jp/resident/index.html',
      },
    ],
  },
  {
    id: 10,
    badge: 'ISICO',
    badgeColor: 'bg-[#1D3A52]',
    tag: '採用相談',
    mainTitle: '求人票の書き方や、\n採用活動の助言',
    subTitle: '人材アドバイザーによる相談',
    description: '採用ターゲットの明確化や、面接ノウハウの提供',
    specAmount: '相談無料',
    specCondition: '専門家派遣',
    category: 'hr',
    providerType: 'ishikawa',
    contactInfo: {
      name: 'ISICO',
      phone: '076-267-1001',
      hours: '8:30～17:15',
    },
    relatedLinks: [
      {
        title: '公式サイト',
        url: 'https://www.isico.or.jp/ques/questionnaire.php?openid=146&check',
      },
    ],
  },

  // --- カテゴリ：販路開拓 ---
  {
    id: 13,
    badge: '国',
    badgeColor: 'bg-[#2B2B2B]',
    tag: '販路開拓',
    mainTitle: '販路開拓や、\n業務効率化の取り組みに',
    subTitle: '小規模事業者持続化補助金（災害支援枠）',
    description: '機械装置等費、広報費、ウェブサイト関連費など',
    specAmount: '上限 200万円',
    specCondition: '売上減少の間接被害は100万円',
    category: 'sales',
    providerType: 'national',
    contactInfo: {
      name: '能登町商工会',
      phone: '076-204-6856',
      hours: '要確認',
    },
  },
  {
    id: 19,
    badge: 'ISICO',
    badgeColor: 'bg-[#1D3A52]',
    tag: 'マッチング',
    mainTitle: '新しい取引先や、\n業務提携先の紹介',
    subTitle: '受発注取引のあっせん',
    description: '県内外の企業とのマッチング、商談機会の提供',
    specAmount: '利用無料',
    specCondition: '取引希望情報の登録が必要',
    category: 'sales',
    providerType: 'ishikawa',
    contactInfo: {
      name: 'ISICO 販路開拓支援課',
      phone: '076-267-1001',
      hours: '要確認',
    },
  },
  {
    id: 20,
    badge: '中小機構',
    badgeColor: 'bg-[#2B2B2B]',
    tag: '新商品',
    mainTitle: '新製品の売り出しや、\n市場開拓の支援',
    subTitle: '新商品等の販路開拓支援',
    description: 'マーケティング調査や、テスト販売のサポート',
    specAmount: '一部補助',
    specCondition: '審査あり',
    category: 'sales',
    providerType: 'national',
    contactInfo: {
      name: 'ISICO 販路開拓支援課',
      phone: '076-267-1001',
      hours: '要確認',
    },
  },
  {
    id: 21,
    badge: '中小機構',
    badgeColor: 'bg-[#2B2B2B]',
    tag: '展示会',
    mainTitle: '首都圏などの\n展示会への出展支援',
    subTitle: '展示会への出展支援',
    description: '大規模展示会への共同出展ブースの提供',
    specAmount: '出展料補助',
    specCondition: '旅費等は自己負担',
    category: 'sales',
    providerType: 'national',
    contactInfo: {
      name: '中小企業基盤整備機構 北陸本部 中小企業復興機動チーム',
      phone: '076-204-6310',
      hours: '要確認',
    },
  },
  {
    id: 22,
    badge: '中小機構',
    badgeColor: 'bg-[#2B2B2B]',
    tag: 'EC活用',
    mainTitle: 'オンラインショップの\n活用・運営相談',
    subTitle: 'EC活用支援',
    description: 'ECサイトの売上向上に向けた専門家アドバイス',
    specAmount: '相談無料',
    specCondition: 'オンライン対応可',
    category: 'sales',
    providerType: 'national',
    contactInfo: {
      name: '中小企業基盤整備機構 販路支援部 販路支援企画課（中小機構 EC 活用支援事務局）',
      phone: '03-5470-1619',
      hours: '要確認',
    },
  },
  {
    id: 23,
    badge: '商工会',
    badgeColor: 'bg-[#555555]',
    tag: 'ネット通販',
    mainTitle: 'ネット通販の\n立ち上げセミナー',
    subTitle: 'EC化支援',
    description: '初めてECに取り組む事業者向けの講座・指導',
    specAmount: '受講無料',
    specCondition: '会員事業者向け',
    category: 'sales',
    providerType: 'other',
    contactInfo: {
      name: '能登町商工会',
      phone: '076-204-6856',
      hours: '要確認',
    },
  },
  {
    id: 24,
    badge: '商工会',
    badgeColor: 'bg-[#555555]',
    tag: '物産展',
    mainTitle: '物産展やバイヤー\n商談会への参加支援',
    subTitle: '物産展・商談会への出展支援',
    description: 'デパート催事や商談会への出展枠を斡旋',
    specAmount: '出展料補助',
    specCondition: '商品審査あり',
    category: 'sales',
    providerType: 'other',
    contactInfo: {
      name: '能登町商工会',
      phone: '076-204-6856',
      hours: '要確認',
    },
  },
];
