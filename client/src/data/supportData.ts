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
  targetAudience: string;
  applicationDeadline: string;
  flow: string[];
  requiredDocuments: string[];
  contactInfo: {
    name: string;
    phone: string;
    hours: string;
  };
  officialLink: string;
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
    targetAudience: '石川県内の被災した中小企業・小規模事業者（中堅企業も一部対象）。工場、店舗、機械設備などが被害を受けた方。',
    applicationDeadline: '202X年X月X日（※随時受付中・要確認）',
    flow: [
      '県へ申請書を提出',
      '県から「交付決定通知」を受領',
      '復旧事業の実施（発注・工事・納品・支払い）',
      '県に「実績報告書」を提出',
      '完了検査・補助金額の確定',
      '補助金の請求・受け取り'
    ],
    requiredDocuments: [
      '交付申請書（様式第1号）',
      '事業計画書',
      '罹災証明書（写し）',
      '直近の決算書（2期分）',
      '復旧費用の見積書（2社以上）'
    ],
    contactInfo: {
      name: '石川県 商工労働部 経営支援課（または最寄りの商工会）',
      phone: '076-xxx-xxxx',
      hours: '平日 9:00 - 17:00'
    },
    officialLink: 'https://www.pref.ishikawa.lg.jp/'
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
    targetAudience: '能登町内で「なりわい再建支援補助金」の交付決定を受けた事業者。',
    applicationDeadline: '随時受付',
    flow: [
      '県の補助金交付決定を受ける',
      '町へ申請書を提出',
      '町から交付決定通知を受領',
      '事業完了後、実績報告',
      '補助金の請求'
    ],
    requiredDocuments: [
      '交付申請書',
      '県の交付決定通知書の写し',
      '事業計画書の写し'
    ],
    contactInfo: {
      name: '能登町 ふるさと振興課',
      phone: '0768-62-8526',
      hours: '平日 8:30 - 17:15'
    },
    officialLink: 'https://www.town.noto.lg.jp/'
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
    targetAudience: '能登町内で被災し、早期に営業を再開する小規模事業者。',
    applicationDeadline: '202X年X月X日',
    flow: [
      '申請書の提出',
      '交付決定',
      '修繕・購入の実施',
      '実績報告',
      '補助金の請求'
    ],
    requiredDocuments: [
      '交付申請書',
      '被害状況がわかる写真',
      '見積書または領収書'
    ],
    contactInfo: {
      name: '能登町 ふるさと振興課',
      phone: '0768-62-8526',
      hours: '平日 8:30 - 17:15'
    },
    officialLink: 'https://www.town.noto.lg.jp/'
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
    targetAudience: '被災により事業継続が困難となっている県内の小規模事業者。',
    applicationDeadline: '公募要領を確認',
    flow: [
      '申請書の提出',
      '審査・採択',
      '事業実施',
      '実績報告',
      '補助金受領'
    ],
    requiredDocuments: [
      '申請書',
      '事業計画書',
      '経費見積書'
    ],
    contactInfo: {
      name: '石川県 商工労働部',
      phone: '076-xxx-xxxx',
      hours: '平日 9:00 - 17:00'
    },
    officialLink: 'https://www.pref.ishikawa.lg.jp/'
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
    targetAudience: '令和6年能登半島地震により被害を受けた中小企業・小規模事業者。',
    applicationDeadline: '随時相談',
    flow: [
      '公庫支店へ相談',
      '借入申込書の提出',
      '面談・審査',
      '融資実行'
    ],
    requiredDocuments: [
      '借入申込書',
      '罹災証明書（ある場合）',
      '最近の決算書'
    ],
    contactInfo: {
      name: '日本政策金融公庫 金沢支店',
      phone: '076-xxx-xxxx',
      hours: '平日 9:00 - 17:00'
    },
    officialLink: 'https://www.jfc.go.jp/'
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
    targetAudience: '被災により既往債務の返済が困難となっている事業者。',
    applicationDeadline: '随時相談',
    flow: [
      '相談窓口へ連絡',
      '債務状況の確認',
      '再生計画の策定支援',
      '債権買取等の実施'
    ],
    requiredDocuments: [
      '財務資料',
      '借入金一覧表'
    ],
    contactInfo: {
      name: '産業復興相談センター',
      phone: '076-xxx-xxxx',
      hours: '平日 9:00 - 17:00'
    },
    officialLink: 'https://www.example.com/'
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
    targetAudience: '国の小規模事業者持続化補助金の採択を受けた町内事業者。',
    applicationDeadline: '随時',
    flow: [
      '国の補助事業完了',
      '町へ申請',
      '交付決定',
      '請求・受領'
    ],
    requiredDocuments: [
      '申請書',
      '国の確定通知書の写し'
    ],
    contactInfo: {
      name: '能登町 ふるさと振興課',
      phone: '0768-62-8526',
      hours: '平日 8:30 - 17:15'
    },
    officialLink: 'https://www.town.noto.lg.jp/'
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
    targetAudience: '事業承継を検討している中小企業経営者・後継者。',
    applicationDeadline: '随時',
    flow: [
      '窓口へ相談',
      '専門家によるヒアリング',
      '支援内容の提案',
      '支援実施'
    ],
    requiredDocuments: [
      '特になし（初回相談時）'
    ],
    contactInfo: {
      name: '中小企業基盤整備機構 北陸支本部 地域・連携支援課',
      phone: '076-223-6100',
      hours: '平日 9:00 - 17:45'
    },
    officialLink: 'https://www.smrj.go.jp/'
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
    targetAudience: '事業承継や廃業について悩んでいる事業者。',
    applicationDeadline: '随時（予約制）',
    flow: [
      '商工会へ予約連絡',
      '相談実施'
    ],
    requiredDocuments: [
      '決算書など（あれば）'
    ],
    contactInfo: {
      name: '能登町商工会',
      phone: '0768-62-0181',
      hours: '平日 8:30 - 17:15'
    },
    officialLink: 'https://www.shokokai.or.jp/'
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
    targetAudience: '後継者が不在で、第三者への承継を希望する事業者。',
    applicationDeadline: '随時',
    flow: [
      'センターへ登録',
      'マッチング候補の探索',
      '面談・交渉',
      '成約'
    ],
    requiredDocuments: [
      '会社概要書',
      '財務資料'
    ],
    contactInfo: {
      name: '石川県事業承継・引継ぎ支援センター',
      phone: '076-xxx-xxxx',
      hours: '平日 9:00 - 17:00'
    },
    officialLink: 'https://www.example.com/'
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
    targetAudience: '親族内での事業承継を進めたい事業者。',
    applicationDeadline: '随時',
    flow: [
      '相談申込',
      '現状分析',
      '承継計画策定',
      '実行支援'
    ],
    requiredDocuments: [
      '定款',
      '株主名簿'
    ],
    contactInfo: {
      name: '石川県事業承継・引継ぎ支援センター',
      phone: '076-xxx-xxxx',
      hours: '平日 9:00 - 17:00'
    },
    officialLink: 'https://www.example.com/'
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
    targetAudience: '創業希望者、または後継者を探している事業者。',
    applicationDeadline: '随時',
    flow: [
      'バンク登録',
      'マッチング',
      '引き合わせ',
      '承継手続き'
    ],
    requiredDocuments: [
      '履歴書（創業希望者）',
      '事業概要書（事業者）'
    ],
    contactInfo: {
      name: '石川県事業承継・引継ぎ支援センター',
      phone: '076-xxx-xxxx',
      hours: '平日 9:00 - 17:00'
    },
    officialLink: 'https://www.example.com/'
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
    targetAudience: '短期的な人手不足を解消したい事業者。',
    applicationDeadline: '随時',
    flow: [
      'アプリ登録',
      '求人掲載',
      'マッチング',
      '勤務・支払い'
    ],
    requiredDocuments: [
      'スマートフォン',
      '店舗情報'
    ],
    contactInfo: {
      name: '株式会社タイミー カスタマーサポート',
      phone: '-',
      hours: 'アプリ内問い合わせ'
    },
    officialLink: 'https://timee.co.jp/'
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
    targetAudience: '専門的なスキルを必要とする課題を持つ事業者。',
    applicationDeadline: '随時',
    flow: [
      '課題の相談',
      '支援者とのマッチング',
      'プロジェクト開始',
      '支援完了'
    ],
    requiredDocuments: [
      '相談シート'
    ],
    contactInfo: {
      name: 'プロボ能登 事務局',
      phone: '076-xxx-xxxx',
      hours: '平日 9:00 - 17:00'
    },
    officialLink: 'https://www.example.com/'
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
    targetAudience: 'オンラインで副業人材を活用したい事業者。',
    applicationDeadline: '随時',
    flow: [
      'サービス登録',
      '求人作成',
      '応募者選考',
      '業務開始'
    ],
    requiredDocuments: [
      '会社情報'
    ],
    contactInfo: {
      name: '複業クラウド サポート',
      phone: '-',
      hours: 'オンライン対応'
    },
    officialLink: 'https://www.example.com/'
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
    targetAudience: '県外からの移住者を雇用したい事業者。',
    applicationDeadline: '随時',
    flow: [
      '企業登録申請',
      '求人情報入力',
      '掲載開始',
      '応募対応'
    ],
    requiredDocuments: [
      '企業パンフレット',
      '求人票'
    ],
    contactInfo: {
      name: 'いしかわ就職・定住総合サポートセンター (ILAC)',
      phone: '076-235-4540',
      hours: '平日 9:00 - 18:00'
    },
    officialLink: 'https://ishikawa-note.jp/'
  },
  {
    id: 10,
    badge: 'ISICO',
    badgeColor: 'bg-[#1D3A52]',
    mainTitle: '求人票の書き方や、\n採用活動の助言',
    subTitle: '人材アドバイザーによる相談',
    description: '採用ターゲットの明確化や、面接ノウハウの提供',
    specAmount: '相談無料',
    specCondition: '専門家派遣',
    category: 'hr',
    providerType: 'ishikawa',
    targetAudience: '採用活動に課題を感じている事業者。',
    applicationDeadline: '随時',
    flow: [
      '相談申込',
      'アドバイザー派遣',
      '助言・指導'
    ],
    requiredDocuments: [
      '過去の求人票など'
    ],
    contactInfo: {
      name: 'ISICO 人材支援課',
      phone: '076-267-1145',
      hours: '平日 8:30 - 17:15'
    },
    officialLink: 'https://www.isico.or.jp/'
  },

  // --- カテゴリ：販路開拓 (sales) ---
  {
    id: 13,
    badge: '国',
    badgeColor: 'bg-[#2B2B2B]',
    mainTitle: '販路開拓や、\n業務効率化の取り組みに',
    subTitle: '小規模事業者持続化補助金（災害支援枠）',
    description: '機械装置等費、広報費、ウェブサイト関連費など',
    specAmount: '上限 200万円',
    specCondition: '売上減少の間接被害は100万円',
    category: 'sales',
    providerType: 'national',
    targetAudience: '販路開拓等に取り組む小規模事業者。',
    applicationDeadline: '公募回ごとに設定',
    flow: [
      '経営計画書の作成',
      '商工会の確認',
      '申請書提出',
      '採択・交付決定',
      '事業実施・報告'
    ],
    requiredDocuments: [
      '経営計画書',
      '補助事業計画書',
      '決算書'
    ],
    contactInfo: {
      name: '商工会・商工会議所',
      phone: '最寄りの各商工会へ',
      hours: '平日 9:00 - 17:00'
    },
    officialLink: 'https://r6.jizokukahojokin.info/'
  },
  {
    id: 19,
    badge: 'ISICO',
    badgeColor: 'bg-[#1D3A52]',
    mainTitle: '新しい取引先や、\n業務提携先の紹介',
    subTitle: '受発注取引のあっせん',
    description: '県内外の企業とのマッチング、商談機会の提供',
    specAmount: '利用無料',
    specCondition: '取引希望情報の登録が必要',
    category: 'sales',
    providerType: 'ishikawa',
    targetAudience: '新規取引先を開拓したい製造業等の事業者。',
    applicationDeadline: '随時',
    flow: [
      '企業登録',
      '案件紹介',
      '見積・商談',
      '取引開始'
    ],
    requiredDocuments: [
      '設備一覧',
      '会社案内'
    ],
    contactInfo: {
      name: 'ISICO 取引支援課',
      phone: '076-267-1001',
      hours: '平日 8:30 - 17:15'
    },
    officialLink: 'https://www.isico.or.jp/'
  },
  {
    id: 20,
    badge: '中小機構',
    badgeColor: 'bg-[#2B2B2B]',
    mainTitle: '新製品の売り出しや、\n市場開拓の支援',
    subTitle: '新商品等の販路開拓支援',
    description: 'マーケティング調査や、テスト販売のサポート',
    specAmount: '一部補助',
    specCondition: '審査あり',
    category: 'sales',
    providerType: 'national',
    targetAudience: '新商品・新サービスの販路開拓を目指す中小企業。',
    applicationDeadline: '公募要領による',
    flow: [
      '申請',
      '審査',
      '支援決定',
      '支援実施'
    ],
    requiredDocuments: [
      '事業計画書',
      '商品概要'
    ],
    contactInfo: {
      name: '中小機構 北陸本部',
      phone: '076-223-5700',
      hours: '平日 9:00 - 17:00'
    },
    officialLink: 'https://www.smrj.go.jp/'
  },
  {
    id: 21,
    badge: '中小機構',
    badgeColor: 'bg-[#2B2B2B]',
    mainTitle: '首都圏などの\n展示会への出展支援',
    subTitle: '展示会への出展支援',
    description: '大規模展示会への共同出展ブースの提供',
    specAmount: '出展料補助',
    specCondition: '旅費等は自己負担',
    category: 'sales',
    providerType: 'national',
    targetAudience: '展示会を通じて販路拡大を図る事業者。',
    applicationDeadline: '展示会ごとに設定',
    flow: [
      '出展申込',
      '審査',
      '出展準備',
      '展示会当日'
    ],
    requiredDocuments: [
      '出展申込書',
      '商品カタログ'
    ],
    contactInfo: {
      name: '中小機構 北陸本部',
      phone: '076-223-5700',
      hours: '平日 9:00 - 17:00'
    },
    officialLink: 'https://www.smrj.go.jp/'
  },
  {
    id: 22,
    badge: '中小機構',
    badgeColor: 'bg-[#2B2B2B]',
    mainTitle: 'オンラインショップの\n活用・運営相談',
    subTitle: 'EC活用支援',
    description: 'ECサイトの売上向上に向けた専門家アドバイス',
    specAmount: '相談無料',
    specCondition: 'オンライン対応可',
    category: 'sales',
    providerType: 'national',
    targetAudience: 'ECサイトの運営に課題を持つ事業者。',
    applicationDeadline: '随時',
    flow: [
      '相談申込',
      'アドバイザーとの面談',
      '改善提案'
    ],
    requiredDocuments: [
      'サイトURL',
      'アクセス解析データ'
    ],
    contactInfo: {
      name: '中小機構 EC支援窓口',
      phone: '-',
      hours: 'オンライン'
    },
    officialLink: 'https://ebiz.smrj.go.jp/'
  },
  {
    id: 23,
    badge: '商工会',
    badgeColor: 'bg-[#555555]',
    mainTitle: 'ネット通販の\n立ち上げセミナー',
    subTitle: 'EC化支援',
    description: '初めてECに取り組む事業者向けの講座・指導',
    specAmount: '受講無料',
    specCondition: '会員事業者向け',
    category: 'sales',
    providerType: 'other',
    targetAudience: 'これからネット通販を始めたい事業者。',
    applicationDeadline: 'セミナーごとに設定',
    flow: [
      '受講申込',
      'セミナー参加',
      '個別相談'
    ],
    requiredDocuments: [
      '申込書'
    ],
    contactInfo: {
      name: '能登町商工会',
      phone: '0768-62-0181',
      hours: '平日 8:30 - 17:15'
    },
    officialLink: 'https://www.shokokai.or.jp/'
  },
  {
    id: 24,
    badge: '商工会',
    badgeColor: 'bg-[#555555]',
    mainTitle: '物産展やバイヤー\n商談会への参加支援',
    subTitle: '物産展・商談会への出展支援',
    description: 'デパート催事や商談会への出展枠を斡旋',
    specAmount: '出展料補助',
    specCondition: '商品審査あり',
    category: 'sales',
    providerType: 'other',
    targetAudience: '県外への販路を広げたい食品・工芸事業者。',
    applicationDeadline: 'イベントごとに設定',
    flow: [
      '出展申込',
      '商品審査',
      '出展決定',
      '出展'
    ],
    requiredDocuments: [
      '商品サンプル',
      'FCPシート'
    ],
    contactInfo: {
      name: '能登町商工会',
      phone: '0768-62-0181',
      hours: '平日 8:30 - 17:15'
    },
    officialLink: 'https://www.shokokai.or.jp/'
  },
];
