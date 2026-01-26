import { LucideIcon, Construction, TrendingUp, Users, Wallet, Handshake, Building2, Store, Truck, GraduationCap, Laptop, Phone, Globe, Presentation } from "lucide-react";

export type SupportCategory = "reconstruction" | "sales" | "hr" | "finance" | "consultation";

export interface SupportSystem {
  id: string;
  title: string; // メリット主導のメインタイトル (20px Bold)
  officialName: string; // 正式名称 (14px Regular)
  category: SupportCategory;
  tags: string[];
  badge: string;
  badgeColor?: string; // バッジの背景色（Tailwindクラスではなくカラーコード推奨）
  description?: string;
  deadline?: string; // YYYY-MM-DD format or specific text
  link?: string;
  icon?: LucideIcon;
}

// バッジカラー定義
const BADGE_COLORS = {
  PREF: "#1D3A52", // 石川県 (深藍)
  TOWN: "#B33E28", // 能登町 (弁柄色)
  GOV: "#2B2B2B",  // 国 (濃グレー)
  OTHER: "#555555" // 民間/その他 (グレー)
};

export const supportSystems: SupportSystem[] = [
  // A. 設備の復旧・再建 (Category: 設備)
  {
    id: "nariwai-reconstruction",
    title: "工場・店舗の再建、機械設備の復旧に",
    officialName: "なりわい再建支援補助金",
    category: "reconstruction",
    tags: ["🏗 設備投資"],
    badge: "【県】",
    badgeColor: BADGE_COLORS.PREF,
    description: "工場・店舗などの施設、生産機械などの設備の復旧費用を補助します。（上限15億円、補助率3/4〜定額）",
    deadline: "2026-03-31",
    icon: Construction
  },
  {
    id: "noto-nariwai-addon",
    title: "県の補助金に対する「自己負担」を軽減",
    officialName: "能登町なりわい再建支援補助金",
    category: "reconstruction",
    tags: ["💰 上乗せ支援"],
    badge: "【能登町】",
    badgeColor: BADGE_COLORS.TOWN,
    description: "県のなりわい再建支援補助金の自己負担分をさらに軽減するための町独自の上乗せ補助です。",
    icon: Building2
  },
  {
    id: "small-business-sustainability-disaster",
    title: "設備の復旧・改修、販路開拓の費用に",
    officialName: "小規模事業者持続化補助金（災害支援枠）",
    category: "reconstruction",
    tags: ["🏗 設備・販路"],
    badge: "【国】",
    badgeColor: BADGE_COLORS.GOV,
    description: "被災した設備の復旧や、販路開拓のためのチラシ作成・HP制作などを支援します。（上限200万円）",
    icon: TrendingUp
  },
  {
    id: "ishikawa-small-business-continuation",
    title: "国の補助金受給後の「上乗せ」支援",
    officialName: "石川県小規模事業者事業継続支援補助金",
    category: "reconstruction",
    tags: ["💰 上乗せ支援"],
    badge: "【県】",
    badgeColor: BADGE_COLORS.PREF,
    description: "国の小規模事業者持続化補助金（災害支援枠）の上乗せとして、最大100万円を補助します。",
    icon: Wallet
  },
  {
    id: "noto-small-business-addon",
    title: "国の補助金（持続化）への上乗せ支援",
    officialName: "能登町小規模事業者持続化補助金",
    category: "reconstruction",
    tags: ["💰 上乗せ支援"],
    badge: "【能登町】",
    badgeColor: BADGE_COLORS.TOWN,
    description: "国の小規模事業者持続化補助金（災害支援枠）の自己負担分を軽減します。（上限100万円）",
    icon: Wallet
  },
  {
    id: "business-reopening",
    title: "仮設店舗や、営業再開の準備費用に",
    officialName: "営業再開支援補助金",
    category: "reconstruction",
    tags: ["⛺️ 仮設・再開"],
    badge: "【能登町商工会】",
    badgeColor: BADGE_COLORS.TOWN,
    description: "店舗の改装や備品の購入、広告宣伝など、営業再開に必要な幅広い経費を補助します。（上限300万円）",
    icon: Store
  },

  // B. 販路開拓・売上向上 (Category: 販路)
  {
    id: "business-matching",
    title: "新しい取引先や、業務提携先の紹介",
    officialName: "受発注取引のあっせん",
    category: "sales",
    tags: ["🤝 マッチング"],
    badge: "【ISICO】",
    badgeColor: BADGE_COLORS.PREF,
    description: "販路拡大を目指す企業に、アドバイザーが新たな取引先やパートナー企業を紹介・あっせんします。",
    icon: Handshake
  },
  {
    id: "new-product-sales",
    title: "新商品の開発や販路開拓の支援",
    officialName: "新商品等の販路開拓",
    category: "sales",
    tags: ["📦 新商品"],
    badge: "【中小機構】",
    badgeColor: BADGE_COLORS.GOV,
    description: "新商品開発や販路開拓に関するアドバイス、ビジネスマッチングなどの支援を行います。",
    icon: TrendingUp
  },
  {
    id: "exhibition-support-smrj",
    title: "首都圏などの展示会・商談会への参加",
    officialName: "展示会への出展支援",
    category: "sales",
    tags: ["📢 展示会"],
    badge: "【中小機構】",
    badgeColor: BADGE_COLORS.GOV,
    description: "新製品や新技術を展示紹介する場の提供や、マッチング機会の創出を支援します。",
    icon: Presentation
  },
  {
    id: "ec-support-smrj",
    title: "ネット通販のノウハウ習得・講座受講",
    officialName: "EC活用支援",
    category: "sales",
    tags: ["📦 ネット販売"],
    badge: "【中小機構】",
    badgeColor: BADGE_COLORS.GOV,
    description: "オンライン講座による情報提供や、ワークショップによる実践講座、民間EC支援事業者とのマッチングを行います。",
    icon: Laptop
  },
  {
    id: "ec-support-noto",
    title: "ネットショップの開設・運営サポート",
    officialName: "EC化支援",
    category: "sales",
    tags: ["📦 ネット販売"],
    badge: "【能登町商工会】",
    badgeColor: BADGE_COLORS.TOWN,
    description: "セミナーやワークショップを開催し、ネットショップの開設や運営をサポートします。",
    icon: Truck
  },
  {
    id: "exhibition-support-noto",
    title: "物産展や商談会への出展費用を補助",
    officialName: "物産展・商談会への出展支援",
    category: "sales",
    tags: ["📢 展示会"],
    badge: "【能登町商工会】",
    badgeColor: BADGE_COLORS.TOWN,
    description: "物産展や商談会への出展にかかる経費の一部を支援します。",
    icon: Store
  },

  // C. 人材・事業承継 (Category: 人材)
  {
    id: "succession-consultation",
    title: "事業承継の「診断」や専門家派遣",
    officialName: "中小企業事業承継円滑支援",
    category: "hr",
    tags: ["🤝 承継相談"],
    badge: "【中小機構】",
    badgeColor: BADGE_COLORS.GOV,
    description: "事業承継診断の実施や、課題解決のための専門家派遣を無料で行います。",
    icon: Handshake
  },
  {
    id: "succession-window",
    title: "税理士による事業承継の無料相談",
    officialName: "事業承継相談窓口",
    category: "hr",
    tags: ["🗣 無料相談"],
    badge: "【能登町商工会】",
    badgeColor: BADGE_COLORS.TOWN,
    description: "石川県商工会連合会が委嘱した税理士による、事業承継に関する無料相談を受けられます。",
    icon: Users
  },
  {
    id: "family-succession",
    title: "親族への事業引き継ぎ・計画策定支援",
    officialName: "親族内承継支援",
    category: "hr",
    tags: ["👨‍👩‍👧‍👦 親族承継"],
    badge: "【承継センター】",
    badgeColor: BADGE_COLORS.PREF,
    description: "事業承継診断や承継計画の策定支援、専門家派遣など、親族内承継に伴走支援を行います。",
    icon: Users
  },
  {
    id: "third-party-succession",
    title: "M&Aや第三者への事業譲渡の支援",
    officialName: "第三者承継支援",
    category: "hr",
    tags: ["🤝 M&A"],
    badge: "【承継センター】",
    badgeColor: BADGE_COLORS.PREF,
    description: "後継者不在の事業者に対し、M&Aや第三者への事業譲渡に向けたマッチングや支援を行います。",
    icon: Handshake
  },
  {
    id: "successor-bank",
    title: "起業家候補とのマッチング支援",
    officialName: "後継者人材バンク",
    category: "hr",
    tags: ["🤝 マッチング"],
    badge: "【承継センター】",
    badgeColor: BADGE_COLORS.PREF,
    description: "創業希望者（後継者候補）と後継者不在の事業者を引き合わせるマッチング支援です。",
    icon: Users
  },
  {
    id: "timee-hiring",
    title: "「今すぐ人手が欲しい」スポット採用に",
    officialName: "タイミーによる人材確保",
    category: "hr",
    tags: ["👥 人手不足"],
    badge: "【復興センター】",
    badgeColor: BADGE_COLORS.OTHER,
    description: "スキマバイトアプリ「タイミー」を活用し、繁忙期や急な欠員時の人材確保を支援します。",
    icon: Phone
  },
  {
    id: "probono-noto",
    title: "大手企業社員によるプロボノ技術支援",
    officialName: "プロボ能登",
    category: "hr",
    tags: ["💻 技術支援"],
    badge: "【復興センター】",
    badgeColor: BADGE_COLORS.OTHER,
    description: "LINEヤフーやNECなどの加盟企業社員による、ボランティアでの技術支援を受けられます。",
    icon: Laptop
  },
  {
    id: "fukugyo-cloud",
    title: "複業人材による経営課題の解決支援",
    officialName: "複業クラウド",
    category: "hr",
    tags: ["👥 複業人材"],
    badge: "【復興センター】",
    badgeColor: BADGE_COLORS.OTHER,
    description: "事業課題を聞き取り、解決できるスキルを持った複業人材につなぎます。",
    icon: Users
  },
  {
    id: "ishikawa-note",
    title: "県外からの移住者・正社員の採用に",
    officialName: "イシカワノオト",
    category: "hr",
    tags: ["🏠 移住採用"],
    badge: "【ILAC】",
    badgeColor: BADGE_COLORS.PREF,
    description: "UIターン就職希望者向けの求人サイト「イシカワノオト」への掲載やマッチングを支援します。",
    icon: GraduationCap
  },
  {
    id: "hr-advisor",
    title: "求人票の書き方や、採用の個別相談",
    officialName: "人材アドバイザーによる相談",
    category: "hr",
    tags: ["🗣 採用相談"],
    badge: "【ISICO】",
    badgeColor: BADGE_COLORS.PREF,
    description: "ISICOの人材アドバイザーが、専門的見地から採用に関する個別アドバイスを行います。",
    icon: Phone
  },

  // D. 資金繰り・相談 (Category: 資金)
  {
    id: "special-loan",
    title: "災害復旧のための特別な融資制度",
    officialName: "令和６年能登半島地震特別貸付",
    category: "finance",
    tags: ["💴 公庫融資"],
    badge: "【公庫】",
    badgeColor: BADGE_COLORS.GOV,
    description: "震災により被害を受けた事業者を対象とした、日本政策金融公庫による低利・長期の特別融資です。",
    icon: Wallet
  },
  {
    id: "reconstruction-fund",
    title: "二重ローンの解消、債権買取の相談",
    officialName: "復興支援ファンドによる二重債務の債権買取",
    category: "finance",
    tags: ["🏦 債務整理"],
    badge: "【復興相談センター】",
    badgeColor: BADGE_COLORS.PREF,
    description: "被災した建物等の再建に新たな借入が必要な場合に、既往借入債権を買取り、追加融資を受けやすくします。",
    icon: Building2
  }
];
