import { LucideIcon, Construction, TrendingUp, Users, Wallet, Handshake, Building2, Store, Truck, GraduationCap, Laptop, Phone } from "lucide-react";

export type SupportCategory = "reconstruction" | "sales" | "hr" | "finance" | "consultation";

export interface SupportSystem {
  id: string;
  title: string; // メリット主導のメインタイトル (20px Bold)
  officialName: string; // 正式名称 (14px Regular)
  category: SupportCategory;
  tags: string[];
  badge: string;
  description?: string;
  deadline?: string; // YYYY-MM-DD format or specific text
  link?: string;
  icon?: LucideIcon;
}

export const supportSystems: SupportSystem[] = [
  // A. 設備の復旧・再建 (Category: 設備)
  {
    id: "nariwai-reconstruction",
    title: "工場・店舗の再建、機械設備の復旧に",
    officialName: "なりわい再建支援補助金",
    category: "reconstruction",
    tags: ["🏗 設備投資"],
    badge: "【県】",
    description: "工場・店舗などの施設、生産機械などの設備の復旧費用を補助します。",
    deadline: "2026-03-31", // 仮の日付、随時更新
    icon: Construction
  },
  {
    id: "noto-nariwai-addon",
    title: "県の補助金に対する「自己負担」を軽減",
    officialName: "能登町なりわい再建支援補助金",
    category: "reconstruction",
    tags: ["💰 上乗せ支援"],
    badge: "【能登町】",
    description: "県のなりわい再建支援補助金の自己負担分をさらに軽減するための町独自の上乗せ補助です。",
    icon: Building2
  },
  {
    id: "small-business-continuation",
    title: "営業再開に必要な仮設施設の整備に",
    officialName: "小規模事業者事業継続支援補助金",
    category: "reconstruction",
    tags: ["⛺️ 仮設・再開"],
    badge: "【県】",
    description: "事業再開に向けた機械設備の購入や修繕、仮設店舗の整備費用などを支援します。",
    icon: Store
  },
  {
    id: "noto-small-business-addon",
    title: "国の補助金（持続化）への上乗せ支援",
    officialName: "能登町小規模事業者持続化補助金",
    category: "reconstruction",
    tags: ["💰 上乗せ支援"],
    badge: "【能登町】",
    description: "国の小規模事業者持続化補助金（災害支援枠）の上乗せとして、自己負担を軽減します。",
    icon: Wallet
  },
  {
    id: "business-reopening",
    title: "仮設店舗や、営業再開の準備費用に",
    officialName: "営業再開支援補助金",
    category: "reconstruction",
    tags: ["⛺️ 仮設・再開"],
    badge: "【県/商工会】",
    description: "店舗の改装や備品の購入、広告宣伝など、営業再開に必要な幅広い経費を補助します。",
    icon: Store
  },

  // B. 販路開拓・売上向上 (Category: 販路)
  {
    id: "small-business-sustainability",
    title: "チラシ作成やHP制作、機械購入に",
    officialName: "小規模事業者持続化補助金",
    category: "sales",
    tags: ["📈 販路開拓"],
    badge: "【国】",
    description: "販路開拓や業務効率化の取り組みを支援。チラシ、ウェブサイト、店舗改装などが対象です。",
    icon: TrendingUp
  },
  {
    id: "traditional-crafts",
    title: "原材料の確保や、道具の製作・購入に",
    officialName: "伝統的工芸品産業支援補助金",
    category: "sales",
    tags: ["🎨 伝統工芸"],
    badge: "【国】",
    description: "伝統的工芸品の製造に必要な原材料の確保や、道具の整備などを支援します。",
    icon: Construction
  },
  {
    id: "ec-support",
    title: "ネット通販の開始や、展示会への出展に",
    officialName: "EC活用支援 / 物産展",
    category: "sales",
    tags: ["📦 ネット販売"],
    badge: "【支援機構】",
    description: "ECサイトの構築やモールへの出店、物産展への参加にかかる費用やノウハウを提供します。",
    icon: Truck
  },
  {
    id: "business-matching",
    title: "新しい取引先や、業務提携先の紹介",
    officialName: "受発注取引のあっせん",
    category: "sales",
    tags: ["🤝 マッチング"],
    badge: "【ISICO】",
    description: "販路拡大を目指す企業に、新たな取引先やパートナー企業を紹介・あっせんします。",
    icon: Handshake
  },
  {
    id: "exhibition-support",
    title: "首都圏などの展示会・商談会への参加",
    officialName: "展示会への出展支援",
    category: "sales",
    tags: ["📢 展示会"],
    badge: "【中小機構】",
    description: "県外で開催される展示会や商談会への出展費用の一部を助成し、販路開拓を後押しします。",
    icon: Users
  },

  // C. 人材・事業承継 (Category: 人材)
  {
    id: "business-succession",
    title: "事業の引き継ぎ、M&Aの専門家活用に",
    officialName: "事業承継・引継ぎ補助金",
    category: "hr",
    tags: ["🤝 事業承継"],
    badge: "【国】",
    description: "事業承継やM&A時の専門家活用費用、廃業費用などを補助します。",
    icon: Handshake
  },
  {
    id: "timee-hiring",
    title: "「今すぐ人手が欲しい」スポット採用に",
    officialName: "タイミーによる人材確保",
    category: "hr",
    tags: ["👥 人手不足"],
    badge: "【民間】",
    description: "スキマバイトアプリ「タイミー」を活用し、繁忙期や急な欠員時の人材確保を支援します。",
    icon: Users
  },
  {
    id: "ishikawa-note",
    title: "県外からの移住者・正社員の採用に",
    officialName: "イシカワノオト (UIターン)",
    category: "hr",
    tags: ["🏠 移住採用"],
    badge: "【県】",
    description: "移住就職希望者向けの求人サイト「イシカワノオト」への掲載やマッチングを支援します。",
    icon: GraduationCap
  },
  {
    id: "probono-noto",
    title: "ITや広報など、プロ人材による技術支援",
    officialName: "プロボノ能登 / 複業クラウド",
    category: "hr",
    tags: ["💻 技術支援"],
    badge: "【復興センター】",
    description: "IT、デザイン、広報などのスキルを持つプロボノ人材や複業人材とのマッチングを支援します。",
    icon: Laptop
  },
  {
    id: "hr-advisor",
    title: "求人票の書き方や、採用の個別相談",
    officialName: "人材アドバイザーによる相談",
    category: "hr",
    tags: ["🗣 採用相談"],
    badge: "【ISICO】",
    description: "採用活動のノウハウ不足にお悩みの事業者に、専門のアドバイザーが個別相談に応じます。",
    icon: Phone
  },
  {
    id: "succession-consultation",
    title: "事業承継の「診断」や専門家派遣",
    officialName: "中小企業事業承継円滑支援",
    category: "hr",
    tags: ["🤝 承継相談"],
    badge: "【中小機構】",
    description: "事業承継診断の実施や、課題解決のための専門家派遣を無料で行います。",
    icon: Handshake
  },

  // D. 資金繰り・相談 (Category: 資金)
  {
    id: "reconstruction-fund",
    title: "二重ローンの解消、債権買取の相談",
    officialName: "復興支援ファンド",
    category: "finance",
    tags: ["🏦 債務整理"],
    badge: "【再生機構】",
    description: "被災前の借入金（二重ローン）の負担軽減のため、債権買取や返済条件の変更を支援します。",
    icon: Wallet
  },
  {
    id: "safety-net",
    title: "無担保・無保証人などの運転資金借入",
    officialName: "セーフティネット保証 / マル経",
    category: "finance",
    tags: ["💴 融資"],
    badge: "【公庫】",
    description: "経営の安定に支障が生じている事業者に対し、保証協会の保証枠拡大や無担保融資を行います。",
    icon: Building2
  },
  {
    id: "special-loan",
    title: "災害復旧のための特別な融資制度",
    officialName: "令和6年能登半島地震特別貸付",
    category: "finance",
    tags: ["💴 公庫融資"],
    badge: "【公庫】",
    description: "震災により被害を受けた事業者を対象とした、日本政策金融公庫による低利・長期の特別融資です。",
    icon: Wallet
  }
];
