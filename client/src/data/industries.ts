
export interface Industry {
  id: number;
  title: string;
  category: string;
  operator: string;
  role: string;
  location: string;
  locationCoords: { lat: number; lng: number };
  tags: string[];
  summary: string;
  description?: string; // 追加: 通常記事の本文用
  necessity: string;
  connections: string;
  relatedIndustries: number[];
  visitInfo?: {
    hours?: string;
    access?: string;
    contact?: string;
    website?: string;
  };
  timeline: {
    past: string;
    present: string;
    future: string;
  };
  deepDive: {
    past: string;
    present: string;
    future: string;
  };
  history?: string; // 追加: 通常記事の歩み用
  future?: string;  // 追加: 通常記事の展望用
  actions: {
    type: 'buy' | 'visit' | 'join' | 'support';
    label: string;
    link: string;
  }[];
  image: string;
  gallery?: string[];
  seasonalMonths: number[];
  highlightPhrases?: string[];
  
  // 活用事例用の拡張フィールド
  isCaseStudy?: boolean;
  challengeCard?: {
    label: string;
    description: string; // 追加: 課題の詳細説明
    solutions: { title: string; detail: string }[]; // 追加: 解決策のリスト
    color?: string;
    // 新設: 構造化データブロック（カード表示用）
    structuredBlock?: {
      label: string;
      items: string[];
    }[];
  };
  keyPoints?: string[];
  // 教訓（Regrets）
  regrets?: {
    title: string;
    content: string;
  };
  // 決断ロジック（Decision Logic）
    decisionProcess?: {
    worry: string; // 悩んだ選択肢
    decider: string; // 選んだ決め手
    selectedSupport: string;
    action: string;
    outcome: string;
    reason?: string; // 後方互換性のため追加
    options?: string[]; // 後方互換性のため追加
    // 新UI用フィールド
    rejectedOption?: {
      title: string;
      reasons: string[];
    };
    adoptedOption?: {
      title: string;
      reasons: string[];
      decidingFactor: string;
    };
  };
  // 実務の壁（Barriers）
    barriers?: {
    title: string;
    content: string;
    // 新UI用フィールド
    checklist?: {
      title: string;
      detail: string;
    }[];
  };
  supportSystem?: { // 名前変更: supportMenu -> supportSystem
    name: string;
    description: string;
    link: string;
  }[];
  supportMenu?: { // 後方互換性のため追加
    name: string;
    description: string;
    link: string;
  }[];
  jobDescription?: string;
  challengeDetail?: string;
  editorComment?: string;
  recommendedSupports?: {
    category: string; // 追加
    name: string;
    description: string;
    link: string;
  }[];
  details?: { // 追加: 事業者詳細情報
    owner: string;
    founded: string;
    employees?: string;
  };
}

export const industries: Industry[] = [
  {
    id: 1,
    title: "小木のイカ釣り漁師",
    category: "漁業",
    operator: "山下 健一",
    role: "船団長",
    location: "能登町 小木港",
    locationCoords: { lat: 37.30, lng: 137.23 },
    tags: ["日本三大イカ釣り港", "船凍イカ", "遠洋漁業"],
    summary: "日本海屈指のイカ釣り基地・小木。鮮度抜群の「船凍イカ」を全国へ届けるため、荒波を越えて漁場へ向かう。",
    description: "昭和の中頃、小木港はイカ釣り船で埋め尽くされ、夜になると集魚灯で海が昼間のように明るかったと言われる。男たちは一攫千金を夢見て海へ出て、港は活気に溢れていた。\n\n現在は船の数こそ減ったが、船内で急速冷凍する「船凍イカ」の技術は進化し続けている。釣り上げた直後の鮮度を閉じ込めたイカは、刺身でも焼いても絶品として評価が高い。",
    history: "かつては北海道沖まで遠征し、大漁旗を掲げて帰港するのが誇りだった。",
    future: "若手漁師の育成と、持続可能な漁業モデルの確立を目指す。",
    necessity: "小木のイカ釣りは地域の経済を支える大黒柱。船凍技術による高品質なイカは、国産水産物の価値を高めるために不可欠。",
    connections: "小木港漁協、加工業者、全国の鮮魚市場、地元の民宿",
    relatedIndustries: [6, 12],
    visitInfo: {
      hours: "6月〜1月が漁期（見学は要問合せ）",
      access: "のと里山空港から車で40分",
      contact: "小木漁業協同組合"
    },
    timeline: {
      past: "かつては北海道沖まで遠征し、大漁旗を掲げて帰港するのが誇りだった。",
      present: "燃料高騰や不漁と戦いながら、ブランド化と直販に力を入れている。",
      future: "若手漁師の育成と、持続可能な漁業モデルの確立を目指す。"
    },
    deepDive: {
      past: "昭和の中頃、小木港はイカ釣り船で埋め尽くされ、夜になると集魚灯で海が昼間のように明るかったと言われる。男たちは一攫千金を夢見て海へ出て、港は活気に溢れていた。",
      present: "現在は船の数こそ減ったが、船内で急速冷凍する「船凍イカ」の技術は進化し続けている。釣り上げた直後の鮮度を閉じ込めたイカは、刺身でも焼いても絶品として評価が高い。",
      future: "「小木のイカ」ブランドを世界へ。加工品開発や観光漁業への展開も視野に入れ、次世代が誇りを持てる漁業の形を模索している。"
    },
    actions: [
      { type: "buy", label: "船凍イカを購入", link: "#" },
      { type: "visit", label: "イカす会に参加", link: "#" }
    ],
    image: "/squid-fishing.jpg",
    seasonalMonths: [6, 7, 8, 9, 10, 11, 12, 1]
  },
  {
    id: 101,
    title: "老舗醤油蔵の事業承継",
    category: "醸造・食品",
    operator: "谷川 醸造",
    role: "代表取締役",
    location: "輪島市",
    locationCoords: { lat: 37.39, lng: 136.90 },
    tags: ["事業承継", "新商品開発", "販路開拓"],
    summary: "創業100年を超える老舗醤油蔵。先代の急逝により、若き後継者が経営を引き継ぐことに。伝統の味を守りながら、現代の食卓に合う新商品を開発し、V字回復を果たす。",
    description: "「このままでは、蔵が潰れるかもしれない」\n\n先代が急逝し、30代で経営を引き継いだ時、待っていたのは厳しい現実でした。\n売上は右肩下がり。従業員の不安そうな顔。\n\n「伝統を守るだけではダメだ。変えるべきところは変えなければ」\n\nそう決意し、まずは自社の強みを見つめ直すことから始めました。\n昔ながらの木桶仕込みの醤油は、確かに美味しい。\nしかし、現代の家庭では、醤油の消費量が減っている。\n\nそこで目をつけたのが「糀（こうじ）」でした。\n醤油造りに欠かせない糀を使った、手軽で健康的な調味料。\n\n試行錯誤の末に完成した「糀ディップ」は、若い女性を中心に大ヒット。\nさらに、パッケージデザインを一新し、ギフト需要も取り込みました。\n\n「伝統は、革新の連続である」\n\nその言葉を胸に、今日も新しい挑戦を続けています。",
    necessity: "地域雇用の維持、伝統文化の継承",
    connections: "地元農家、デザイナー、百貨店バイヤー",
    relatedIndustries: [3, 5],
    timeline: {
      past: "1905年創業。地元密着の醤油屋として親しまれる。",
      present: "2015年、事業承継。新ブランド立ち上げ。",
      future: "海外輸出への挑戦と、発酵文化の発信拠点作り。"
    },
    deepDive: {
      past: "1905年創業。地元密着の醤油屋として親しまれる。",
      present: "2015年、事業承継。新ブランド立ち上げ。",
      future: "海外輸出への挑戦と、発酵文化の発信拠点作り。"
    },
    actions: [
      { type: "buy", label: "商品を購入", link: "#" },
      { type: "visit", label: "蔵見学", link: "#" }
    ],
    image: "/images/soy-sauce-brewery-real.jpg",
    seasonalMonths: [],
    isCaseStudy: true,
    challengeCard: {
      label: "後継者がいない・事業承継",
      description: "先代の急逝による突然の承継。売上減少と従業員の不安、新商品開発のノウハウ不足。",
      solutions: [
        { title: "自社の強みの再定義", detail: "「醤油」ではなく「糀（こうじ）」の技術に注目し、市場ニーズとの接点を探った。" },
        { title: "外部専門家の活用", detail: "中小企業診断士やデザイナーと連携し、客観的な視点を取り入れた。" },
        { title: "新ブランドの立ち上げ", detail: "伝統を感じさせつつ、現代のライフスタイルに馴染むデザインと商品設計を行った。" }
      ],
      structuredBlock: [
        { label: "活用した支援", items: ["事業承継・引継ぎ補助金", "よろず支援拠点"] },
        { label: "成果", items: ["新商品「糀ディップ」が大ヒット", "売上がV字回復"] }
      ]
    },
    regrets: {
      title: "もっと早く、従業員と腹を割って話すべきだった",
      content: "経営を引き継いだ当初、一人で抱え込んでしまい、従業員との溝が深まってしまいました。「自分たちがどうなるのか」という不安に、もっと早く寄り添うべきでした。"
    },
    decisionProcess: {
      worry: "廃業するか、借金をしてでも続けるか",
      decider: "「糀」という独自の強みと、従業員の技術力",
      selectedSupport: "事業承継・引継ぎ補助金",
      action: "新商品開発とパッケージ刷新",
      outcome: "V字回復"
    },
    barriers: {
      title: "補助金の申請書類作成は、想像以上に大変",
      content: "事業計画書の作成には、膨大な時間と労力がかかりました。専門家のサポートがなければ、途中で挫折していたかもしれません。早めの相談をおすすめします。"
    },
    editorComment: "伝統を守るためにこそ、変わる勇気を持つ。その姿勢が、従業員や顧客の心を動かした好例です。",
    supportSystem: [
      {
        name: "事業承継・引継ぎ補助金",
        description: "事業承継を契機とした新しい取り組み（設備投資や販路開拓など）にかかる費用の一部を補助する制度。",
        link: "#"
      },
      {
        name: "よろず支援拠点",
        description: "国が設置する無料の経営相談所。中小企業診断士などの専門家が、経営上のあらゆる悩みに対応する。",
        link: "#"
      }
    ],
    details: {
      owner: "谷川 醸造",
      founded: "明治38年",
      employees: "15名"
    }
  },
  {
    id: 102,
    title: "廃業寸前の旅館を再生",
    category: "観光・宿泊",
    operator: "能登の宿",
    role: "女将",
    location: "七尾市 和倉温泉",
    locationCoords: { lat: 37.09, lng: 136.91 },
    tags: ["資金調達", "リノベーション", "インバウンド"],
    summary: "バブル崩壊後、客足が遠のき廃業寸前だった温泉旅館。補助金を活用して館内をリノベーションし、インバウンド客をターゲットに転換。稼働率90%を超える人気宿へ。",
    description: "「もう、畳むしかないね」\n\n家族会議で何度も出た言葉です。\n建物は老朽化し、団体客は激減。\n借金の返済もままならない日々。\n\nしかし、窓から見える七尾湾の景色だけは、変わらず美しかった。\n「この景色を、もっと多くの人に見てもらいたい」\n\nその一心で、最後の賭けに出ました。\nターゲットを団体客から、個人客、特に海外からの旅行者に変更。\n\n和室の良さを残しつつ、ベッドやWi-Fiを完備。\n食事は、部屋食ではなく、地元の食材を活かしたビュッフェスタイルに。\n\n補助金を活用して、露天風呂付き客室も増設しました。\n\n結果、海外からの予約が殺到。\n「日本の伝統と、快適さが共存している」と高い評価をいただきました。\n\nピンチはチャンス。\n諦めなければ、道は開けることを学びました。",
    necessity: "観光拠点の維持、地域経済への波及効果",
    connections: "金融機関、旅行代理店、地元食材の生産者",
    relatedIndustries: [1, 6],
    timeline: {
      past: "1980年代、団体旅行ブームで賑わう。",
      present: "2010年代、個人客・インバウンドへシフト。",
      future: "地域全体を一つの宿と見立てた「分散型ホテル」構想。"
    },
    deepDive: {
      past: "1980年代、団体旅行ブームで賑わう。",
      present: "2010年代、個人客・インバウンドへシフト。",
      future: "地域全体を一つの宿と見立てた「分散型ホテル」構想。"
    },
    actions: [
      { type: "visit", label: "宿泊予約", link: "#" }
    ],
    image: "/images/ryokan-lamp-real.jpg",
    seasonalMonths: [],
    isCaseStudy: true,
    challengeCard: {
      label: "資金繰りが厳しい・設備投資",
      description: "老朽化した施設の改修資金不足。団体客減少による売上低迷。インバウンド対応の遅れ。",
      solutions: [
        { title: "事業再構築補助金の活用", detail: "大規模なリノベーション費用の一部を補助金で賄い、財務負担を軽減した。" },
        { title: "ターゲットの明確化", detail: "「団体」から「個人・インバウンド」へ大胆にシフトし、高単価化を実現した。" },
        { title: "Webマーケティングの強化", detail: "多言語対応の予約サイトを開設し、海外への情報発信を強化した。" }
      ],
      structuredBlock: [
        { label: "活用した支援", items: ["事業再構築補助金", "マル経融資"] },
        { label: "成果", items: ["稼働率90%超え", "インバウンド客の増加"] }
      ]
    },
    regrets: {
      title: "資金繰りの相談は、もっと早く銀行に行くべきだった",
      content: "「断られたらどうしよう」という不安から、ギリギリまで相談を先延ばしにしてしまいました。早めに相談していれば、もっと有利な条件で融資を受けられたかもしれません。"
    },
    decisionProcess: {
      worry: "廃業するか、借金をしてでも続けるか",
      decider: "窓から見える七尾湾の景色と、補助金の存在",
      selectedSupport: "事業再構築補助金",
      action: "全館リノベーションとインバウンド対応",
      outcome: "稼働率90%超え",
      rejectedOption: {
        title: "現状維持（修繕のみ）",
        reasons: ["借入は増えないが、売上も戻らない", "ジリ貧が見えていたため却下"]
      },
      adoptedOption: {
        title: "補助金でフルリノベーション",
        reasons: ["インバウンド需要という勝機があった", "「事業再構築補助金」で2/3が出ると分かった"],
        decidingFactor: "補助率が高く、持ち出しが最小限で済むこと"
      }
    },
    barriers: {
      title: "工事期間中の休業補償は出ない",
      content: "リノベーション工事中は休業せざるを得ず、その間の売上はゼロになります。運転資金の確保は、工事費とは別に考えておく必要があります。",
      checklist: [
        {
          title: "工事期間中の休業補償は出ない",
          detail: "リノベーション工事中は休業せざるを得ず、売上がゼロになります。運転資金の確保は、工事費とは別に考えておく必要がありました。"
        },
        {
          title: "書類集めは2ヶ月かかると見込むべし",
          detail: "罹災証明書だけでなく、過去3期分の決算書や見積もり（3社分）が必要です。"
        }
      ]
    },
    editorComment: "ピンチをチャンスに変える発想の転換。補助金を単なる「お金」としてではなく、「変わるためのきっかけ」として活用した点が素晴らしいです。",
    supportSystem: [
      {
        name: "事業再構築補助金",
        description: "ポストコロナ・ウィズコロナ時代の経済社会の変化に対応するため、新分野展開や業態転換などを支援する制度。",
        link: "#"
      },
      {
        name: "マル経融資（小規模事業者経営改善資金融資）",
        description: "商工会議所や商工会の推薦により、無担保・無保証人で低利の融資を受けられる制度。",
        link: "#"
      }
    ],
    details: {
      owner: "能登の宿",
      founded: "昭和40年",
      employees: "25名"
    }
  },
  {
    id: 103,
    title: "伝統工芸の技を世界へ",
    category: "伝統工芸",
    operator: "輪島塗工房",
    role: "塗師",
    location: "輪島市",
    locationCoords: { lat: 37.39, lng: 136.90 },
    tags: ["海外展開", "商品開発", "コラボレーション"],
    summary: "高級品として知られる輪島塗。国内需要が縮小する中、海外のデザイナーとコラボレーションし、モダンなテーブルウェアを開発。欧州の見本市で高評価を得る。",
    description: "「輪島塗は、飾っておくものではない。使ってこそ価値がある」\n\nそれが、私の信念です。\nしかし、生活様式の変化とともに、漆器は食卓から遠ざかっていました。\n\n「どうすれば、現代の暮らしに取り入れてもらえるか」\n\n悩んでいた時、海外のデザイナーと出会いました。\n彼らは、漆の美しさに感動しつつも、こう言いました。\n「形が、今のライフスタイルに合っていない」\n\n衝撃でした。\n伝統を守ることに必死で、使い手のことを忘れていたのです。\n\nそこから、二人三脚での商品開発が始まりました。\nパスタ皿、ワイングラス、コーヒーカップ。\n伝統の技法を使いながら、形はモダンに。\n\n完成した商品は、パリの見本市で大きな話題となりました。\n「クールだ」「美しい」\n\n伝統は、守るものではなく、進化させるもの。\n世界が、それを教えてくれました。",
    necessity: "伝統技術の継承、職人の育成",
    connections: "海外デザイナー、商社、県工業試験場",
    relatedIndustries: [4, 7],
    timeline: {
      past: "江戸時代、堅牢優美な漆器として名声を博す。",
      present: "2020年、海外ブランドとのコラボ商品発表。",
      future: "漆の植林から製品化まで、一貫したサステナブルな生産体制。"
    },
    deepDive: {
      past: "江戸時代、堅牢優美な漆器として名声を博す。",
      present: "2020年、海外ブランドとのコラボ商品発表。",
      future: "漆の植林から製品化まで、一貫したサステナブルな生産体制。"
    },
    actions: [
      { type: "buy", label: "オンラインショップ", link: "#" },
      { type: "visit", label: "工房見学", link: "#" }
    ],
    image: "/wajima-nuri.jpg",
    seasonalMonths: [],
    isCaseStudy: true,
    challengeCard: {
      label: "売上を伸ばしたい・販路開拓",
      description: "国内市場の縮小。高級品ゆえの敷居の高さ。現代のライフスタイルとの乖離。",
      solutions: [
        { title: "JAPANブランド育成支援等事業の活用", detail: "海外展開に向けた商品開発や展示会出展の費用を補助する制度を活用した。" },
        { title: "外部デザイナーとの協業", detail: "プロダクトデザイナーと組み、現代の食卓に合うデザインを取り入れた。" },
        { title: "ストーリーの言語化", detail: "職人の技や想いを英語で発信し、製品の背景にある物語を伝えた。" }
      ],
      structuredBlock: [
        { label: "活用した支援", items: ["JAPANブランド育成支援等事業", "ISICO専門家派遣"] },
        { label: "成果", items: ["欧州見本市で高評価", "新規取引先獲得"] }
      ]
    },
    regrets: {
      title: "英語の勉強を、もっと早く始めておけばよかった",
      content: "海外のバイヤーと直接交渉する際、通訳を介すると微妙なニュアンスが伝わらないことがありました。自分の言葉で伝えることの重要性を痛感しました。"
    },
    decisionProcess: {
      worry: "伝統を守るか、海外のニーズに合わせるか",
      decider: "「使ってもらってこその伝統」という原点回帰",
      selectedSupport: "JAPANブランド育成支援等事業",
      action: "海外デザイナーとのコラボ商品開発",
      outcome: "欧州市場での成功"
    },
    barriers: {
      title: "海外発送の手続きと梱包は、国内とは別物",
      content: "関税の手続きや、破損を防ぐための厳重な梱包など、国内取引にはない手間とコストがかかります。物流パートナー選びは慎重に行う必要があります。"
    },
    editorComment: "伝統工芸のポテンシャルを世界に示した好事例。外部の視点を取り入れることで、自社の価値を再発見できることを教えてくれます。",
    supportSystem: [
      {
        name: "JAPANブランド育成支援等事業",
        description: "中小企業が海外展開や全国展開を目指す際、新商品開発やブランディング、販路開拓などを支援する制度。",
        link: "#"
      },
      {
        name: "石川県産業創出支援機構（ISICO）",
        description: "県内の中小企業に対し、経営相談、助成金、販路開拓など、総合的な支援を行う機関。",
        link: "#"
      }
    ],
    details: {
      owner: "輪島塗工房",
      founded: "大正5年",
      employees: "8名"
    }
  }
];
