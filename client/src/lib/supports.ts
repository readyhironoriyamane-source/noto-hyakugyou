import { LucideIcon, Construction, TrendingUp, Users, Wallet, Handshake, Building2, Store, Truck, GraduationCap, Laptop, Phone, Presentation } from "lucide-react";

export type SupportCategory = "reconstruction" | "sales" | "hr" | "finance" | "consultation";

export interface SupportSystem {
  id: string;
  title: string; // メリット主導のメインタイトル (20px Bold)
  officialName: string; // 正式名称 (14px Regular)
  category: SupportCategory;
  tags: string[];
  badge: string;
  badgeColor?: string; // バッジの背景色コード
  description?: string;
  deadline?: string; // YYYY-MM-DD format or specific text
  link?: string;
  icon?: LucideIcon;
  specs?: { // TOPページ表示用のスペック情報
    limit?: string; // 上限額
    rate?: string; // 補助率
    note?: string; // 備考
  };
}

export const supportSystems: SupportSystem[] = [
  // A. 設備の復旧・再建・営業再開
  {
    id: "nariwai-reconstruction",
    title: "工場・店舗の再建、機械設備の復旧に",
    officialName: "なりわい再建支援補助金",
    category: "reconstruction",
    tags: ["🏗 設備投資"],
    badge: "【石川県】",
    badgeColor: "#1D3A52", // 深藍
    description: "工場・店舗などの施設、生産機械などの設備の復旧費用を補助します。",
    deadline: "2026-03-31",
    icon: Construction,
    specs: {
      limit: "上限 15億円",
      rate: "補助率 3/4（中堅は1/2）"
    }
  },
  {
    id: "noto-nariwai-addon",
    title: "県の補助金に対する「自己負担」を軽減",
    officialName: "能登町なりわい再建支援補助金",
    category: "reconstruction",
    tags: ["💰 上乗せ支援"],
    badge: "【能登町】",
    badgeColor: "#B33E28", // 弁柄色
    description: "県のなりわい再建支援補助金の自己負担分をさらに軽減するための町独自の上乗せ補助です。",
    icon: Building2,
    specs: {
      rate: "補助率 3/5（自己負担分を圧縮）",
      note: "町への申請が必要"
    }
  },
  {
    id: "ishikawa-small-business-continuation",
    title: "営業再開に必要な仮設施設の整備に",
    officialName: "石川県小規模事業者事業継続支援補助金",
    category: "reconstruction",
    tags: ["⛺️ 仮設・再開"],
    badge: "【石川県】",
    badgeColor: "#1D3A52",
    description: "事業継続に必要な仮設施設の整備や、機械設備の修繕・購入などを支援します。",
    icon: Construction
  },
  {
    id: "business-reopening",
    title: "店舗の修繕や、営業再開の準備費用に",
    officialName: "営業再開支援補助金",
    category: "reconstruction",
    tags: ["⛺️ 仮設・再開"],
    badge: "【能登町】",
    badgeColor: "#B33E28",
    description: "店舗の改装や備品の購入、広告宣伝など、営業再開に必要な幅広い経費を補助します。",
    icon: Store
  },

  // B. 資金繰り・債務相談
  {
    id: "special-loan",
    title: "災害復旧のための特別な融資制度",
    officialName: "令和６年能登半島地震特別貸付",
    category: "finance",
    tags: ["💴 公庫融資"],
    badge: "【公庫】",
    badgeColor: "#2B2B2B", // 濃グレー
    description: "震災により被害を受けた事業者を対象とした、日本政策金融公庫による低利・長期の特別融資です。",
    icon: Wallet
  },
  {
    id: "reconstruction-fund",
    title: "二重ローンの解消、債権買取の相談",
    officialName: "復興支援ファンドによる二重債務の債権買取",
    category: "finance",
    tags: ["🏦 債務整理"],
    badge: "【再生機構】",
    badgeColor: "#2B2B2B",
    description: "被災した建物等の再建に新たな借入が必要な場合に、既往借入債権を買取り、追加融資を受けやすくします。",
    icon: Building2
  },

  // C. 人材確保・事業承継
  {
    id: "succession-consultation",
    title: "事業承継の診断や、計画策定のサポート",
    officialName: "中小企業事業承継円滑支援",
    category: "hr",
    tags: ["🤝 承継相談"],
    badge: "【中小機構】",
    badgeColor: "#2B2B2B",
    description: "事業承継診断の実施や、課題解決のための専門家派遣を無料で行います。",
    icon: Handshake
  },
  {
    id: "succession-window",
    title: "税理士による事業承継の無料相談",
    officialName: "事業承継相談窓口",
    category: "hr",
    tags: ["🗣 無料相談"],
    badge: "【商工会】",
    badgeColor: "#2B2B2B",
    description: "石川県商工会連合会が委嘱した税理士による、事業承継に関する無料相談を受けられます。",
    icon: Users
  },
  {
    id: "third-party-succession",
    title: "M&Aや、第三者への引き継ぎマッチング",
    officialName: "第三者承継支援",
    category: "hr",
    tags: ["🤝 M&A"],
    badge: "【承継センター】",
    badgeColor: "#2B2B2B",
    description: "後継者不在の事業者に対し、M&Aや第三者への事業譲渡に向けたマッチングや支援を行います。",
    icon: Handshake
  },
  {
    id: "family-succession",
    title: "家族・親族へのスムーズな承継支援",
    officialName: "親族内承継支援",
    category: "hr",
    tags: ["👨‍👩‍👧‍👦 親族承継"],
    badge: "【承継センター】",
    badgeColor: "#2B2B2B",
    description: "事業承継診断や承継計画の策定支援、専門家派遣など、親族内承継に伴走支援を行います。",
    icon: Users
  },
  {
    id: "successor-bank",
    title: "創業希望者（後継者候補）とのマッチング",
    officialName: "後継者人材バンク",
    category: "hr",
    tags: ["🤝 マッチング"],
    badge: "【承継センター】",
    badgeColor: "#2B2B2B",
    description: "創業希望者（後継者候補）と後継者不在の事業者を引き合わせるマッチング支援です。",
    icon: Users
  },
  {
    id: "timee-hiring",
    title: "「今すぐ人手が欲しい」スポット採用に",
    officialName: "タイミーによる人材確保",
    category: "hr",
    tags: ["👥 人手不足"],
    badge: "【民間】",
    badgeColor: "#2B2B2B",
    description: "スキマバイトアプリ「タイミー」を活用し、繁忙期や急な欠員時の人材確保を支援します。",
    icon: Phone
  },
  {
    id: "probono-noto",
    title: "専門家ボランティアによる技術・実務支援",
    officialName: "プロボノ能登",
    category: "hr",
    tags: ["💻 技術支援"],
    badge: "【復興センター】",
    badgeColor: "#2B2B2B",
    description: "LINEヤフーやNECなどの加盟企業社員による、ボランティアでの技術支援を受けられます。",
    icon: Laptop
  },
  {
    id: "fukugyo-cloud",
    title: "副業人材を活用した課題解決サポート",
    officialName: "複業クラウド",
    category: "hr",
    tags: ["👥 複業人材"],
    badge: "【復興センター】",
    badgeColor: "#2B2B2B",
    description: "事業課題を聞き取り、解決できるスキルを持った複業人材につなぎます。",
    icon: Users
  },
  {
    id: "ishikawa-note",
    title: "UIターン希望者の採用・求人掲載",
    officialName: "イシカワノオト",
    category: "hr",
    tags: ["🏠 移住採用"],
    badge: "【ILAC】",
    badgeColor: "#2B2B2B",
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
    badgeColor: "#2B2B2B",
    description: "ISICOの人材アドバイザーが、専門的見地から採用に関する個別アドバイスを行います。",
    icon: Phone
  },

  // D. 販路開拓・売上向上
  {
    id: "small-business-sustainability-disaster",
    title: "チラシ作成やHP制作、機械購入に",
    officialName: "小規模事業者持続化補助金（災害支援枠）",
    category: "sales",
    tags: ["🏗 設備・販路"],
    badge: "【国】",
    badgeColor: "#2B2B2B",
    description: "被災した設備の復旧や、販路開拓のためのチラシ作成・HP制作などを支援します。",
    icon: TrendingUp,
    specs: {
      limit: "上限 200万円",
      note: "売上減少の間接被害は100万円"
    }
  },
  {
    id: "noto-small-business-addon",
    title: "国の持続化補助金への上乗せ支援",
    officialName: "能登町小規模事業者持続化補助金",
    category: "sales",
    tags: ["💰 上乗せ支援"],
    badge: "【能登町】",
    badgeColor: "#B33E28",
    description: "国の小規模事業者持続化補助金（災害支援枠）の自己負担分を軽減します。",
    icon: Wallet
  },
  {
    id: "business-matching",
    title: "新しい取引先や、業務提携先の紹介",
    officialName: "受発注取引のあっせん",
    category: "sales",
    tags: ["🤝 マッチング"],
    badge: "【ISICO】",
    badgeColor: "#2B2B2B",
    description: "販路拡大を目指す企業に、アドバイザーが新たな取引先やパートナー企業を紹介・あっせんします。",
    icon: Handshake
  },
  {
    id: "new-product-sales",
    title: "新製品の売り出しや、市場開拓の支援",
    officialName: "新商品等の販路開拓",
    category: "sales",
    tags: ["📦 新商品"],
    badge: "【中小機構】",
    badgeColor: "#2B2B2B",
    description: "新商品開発や販路開拓に関するアドバイス、ビジネスマッチングなどの支援を行います。",
    icon: TrendingUp
  },
  {
    id: "exhibition-support-smrj",
    title: "首都圏などの展示会への出展サポート",
    officialName: "展示会への出展支援",
    category: "sales",
    tags: ["📢 展示会"],
    badge: "【中小機構】",
    badgeColor: "#2B2B2B",
    description: "新製品や新技術を展示紹介する場の提供や、マッチング機会の創出を支援します。",
    icon: Presentation
  },
  {
    id: "ec-support-smrj",
    title: "オンラインショップの活用・運営相談",
    officialName: "EC活用支援",
    category: "sales",
    tags: ["📦 ネット販売"],
    badge: "【中小機構】",
    badgeColor: "#2B2B2B",
    description: "オンライン講座による情報提供や、ワークショップによる実践講座、民間EC支援事業者とのマッチングを行います。",
    icon: Laptop
  },
  {
    id: "ec-support-noto",
    title: "ネット通販の立ち上げセミナー・指導",
    officialName: "EC化支援",
    category: "sales",
    tags: ["📦 ネット販売"],
    badge: "【商工会】",
    badgeColor: "#2B2B2B",
    description: "セミナーやワークショップを開催し、ネットショップの開設や運営をサポートします。",
    icon: Truck
  },
  {
    id: "exhibition-support-noto",
    title: "物産展やバイヤー商談会への参加支援",
    officialName: "物産展・商談会への出展支援",
    category: "sales",
    tags: ["📢 展示会"],
    badge: "【商工会】",
    badgeColor: "#2B2B2B",
    description: "物産展や商談会への出展にかかる経費の一部を支援します。",
    icon: Store
  }
];
