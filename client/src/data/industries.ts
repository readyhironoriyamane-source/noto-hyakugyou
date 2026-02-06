
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
    // 5フェーズ構成用の拡張フィールド
    phase1?: string; // 現状と課題
    phase2?: string; // 選択と決断
    phase3?: string; // 行動と変化
    phase4?: string; // 未来（futureと重複するが、明示的に分ける場合に使用）
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
    points?: { // 追加: ここがポイント
      label: string;
      term: string; // GlossaryTerm用
      detail: string;
    };
    specAmount?: string;
    specCondition?: string;
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
  story?: { // 追加: 再起の裏側ストーリー
    title: string;
    text: string[]; // 段落ごとの配列
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
    title: "本合クリーニング",
    category: "設備投資・修繕",
    operator: "本合 浩明",
    role: "3代目店主",
    location: "能登町",
    locationCoords: { lat: 37.30, lng: 137.23 },
    tags: ["#設備投資", "#地域貢献", "#小規模事業者持続化補助金"],
    summary: "昭和初期創業のクリーニング店。震災による設備故障と廃業の危機を乗り越え、地域のために再開を決断した3代目の記録。",
    description: "「いつ辞めてもいい」\n\n父が倒れてからワンオペで店を回し、設備の老朽化や市場縮小の中で、そう考えていました。\nしかし、震災でメインのドライ機が故障。\n入れ替えには450万円が必要となり、廃業の危機に直面しました。\n\n「450万円もかけて、再開する意味はあるのか？」\n\n自問自答の日々。\nしかし、避難所から「クリーニング店がないと困る」という声が届きました。\n民宿や旅館のシーツ、学生服、喪服。\n地域には、クリーニング店が必要だったのです。\n\n「自己負担50万円なら、借金せずに済む」\n\n補助金を活用し、再開を決断。\n専門用語の壁や書類作成の苦労を乗り越え、新しい機械を導入しました。\n\n「5年後も、父がいる間、自分が元気な間は続けていく」\n\n無理な拡大はせず、地域に必要とされる限り、細く長く続けていく。\nそれが、私の選んだ道です。",
    necessity: "地域の生活インフラ（民宿、学生服、喪服など）の維持",
    connections: "商工会、機械メーカー、地元住民",
    relatedIndustries: [2, 6],
    timeline: {
      past: "昭和初期創業。地域密着のクリーニング店として親しまれる。",
      present: "震災で被災するも、補助金を活用して営業再開。",
      future: "無理な拡大はせず、地域需要に応えながら「軟着陸」を目指す。",
      phase1: "震災でメインのドライ機が故障。450万円の入れ替え費用が必要となり、廃業の危機に直面。父が倒れてからワンオペで、いつ辞めてもいいと考えていた中での被災だった。",
      phase2: "「450万円もかけて再開する意味はあるのか？」と自問自答。しかし、避難所での「クリーニング店がないと困る」という声に背中を押される。補助金を活用すれば自己負担50万円で済むことが分かり、再開を決断。",
      phase3: "専門用語の壁や複雑な申請手続きに苦戦しながらも、商工会の伴走支援を受けて乗り越える。3ヶ月というタイトなスケジュールで機械の入れ替えと冷却機の導入を完了。"
    },
    deepDive: {
      past: "昭和初期創業。地域密着のクリーニング店として親しまれる。",
      present: "震災で被災するも、補助金を活用して営業再開。",
      future: "無理な拡大はせず、地域需要に応えながら「軟着陸」を目指す。"
    },
    actions: [
      { type: "visit", label: "店舗情報", link: "#" }
    ],
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/92549119/cNMOpSHOPZMCZkRP.png",
    seasonalMonths: [],
    isCaseStudy: true,
    challengeCard: {
      label: "設備が壊れた・廃業危機",
      description: "震災によるメイン設備の故障。450万円の投資が必要となり、廃業か再開かの決断を迫られた。",
      solutions: [
        { title: "小規模事業者持続化補助金の活用", detail: "災害支援枠を活用し、自己負担を約50万円に抑えることで、借金なしでの再開を可能にした。" },
        { title: "設備のダウンサイジング", detail: "将来の事業縮小も見据え、必要十分なスペックの機械を選定し、コストを抑制した。" },
        { title: "商工会の伴走支援", detail: "複雑な申請手続きや専門用語の壁を、商工会のサポートを受けながら乗り越えた。" }
      ],
      structuredBlock: [
        { label: "活用した支援", items: ["小規模事業者持続化補助金（災害支援枠）"] },
        { label: "成果", items: ["営業再開", "夏場の品質向上（冷却機導入）"] }
      ]
    },
    regrets: {
      title: "震災前に戻れるなら、これだけはやる。",
      content: "「設備の更新は、だましだましではなく、計画的に行うべきだった」"
    },
    decisionMatrix: {
      title: "450万円かけて再開するか、廃業するか",
      optionA: {
        title: "廃業する",
        pros: ["借金を背負わなくて済む", "老朽化した設備の問題から解放される"]
      },
      optionB: {
        title: "持続化補助金＋上乗せ",
        subsidy: "小規模事業者持続化補助金",
        cost: "自己負担を50万円程度に抑えられる"
      },
      reason: "「自己負担50万円なら借金せずに済む」という計算と、地域からの「なくなったら困る」という声"
    },
    decisionProcess: {
      worry: "450万円かけて再開するか、廃業するか",
      decider: "「自己負担50万円なら借金せずに済む」という計算と、地域の声",
      selectedSupport: "小規模事業者持続化補助金",
      action: "機械の入れ替えと冷却機の導入",
      outcome: "営業再開と品質向上",
      rejectedOption: {
        title: "廃業する",
        reasons: ["借金を背負わなくて済む", "老朽化した設備の問題から解放される"]
      },
      adoptedOption: {
        title: "持続化補助金＋上乗せ",
        reasons: ["自己負担を50万円程度に抑えられる", "借金（融資）をせずに手持ち資金で対応可能"],
        decidingFactor: "「自己負担50万円なら借金せずに済む」という計算と、地域からの「なくなったら困る」という声"
      }
    },
    barriers: {
      title: "専門用語の壁と、タイトなスケジュール",
      content: "「石油系洗濯機＝ドライ機」など、専門用語が伝わらず苦労しました。また、3ヶ月で設置・支払というスケジュールも厳しかったです。",
      checklist: [
        {
          title: "専門用語の壁（担当者に伝わらない）",
          detail: "「石油系洗濯機」と言われてもピンとこない担当者も。用語のすり合わせに時間がかかりました。"
        },
        {
          title: "タイトなスケジュール（3ヶ月で設置・支払）",
          detail: "採択から設置、支払いまでが短期間。業者の手配や資金準備を急ぐ必要がありました。"
        }
      ]
    },
    editorComment: "「借金をしてまで再開すべきか」という葛藤の中で、補助金を活用して自己負担を最小限に抑える「賢い縮小（ダウンサイジング）」を選択した点が非常に参考になります。",
    supportSystem: [
      {
        name: "小規模事業者持続化補助金（災害支援枠等）",
        description: "小規模事業者が経営計画を作成して取り組む販路開拓や生産性向上の取組を支援する制度。",
        link: "#",
        points: {
          label: "ここがポイント",
          term: "補助率",
          detail: ": 2/3（国）＋県上乗せ"
        },
        specAmount: "自己負担約50万円",
        specCondition: "商工会等の支援を受けながら経営計画を作成"
      }
    ],
    details: {
      owner: "本合 浩明",
      founded: "昭和初期",
      employees: "家族経営"
    },
    story: {
      title: "再起の裏側：店主の独白",
      text: [
        "「もう、潮時かもしれないな」",
        "震災の翌日、散乱した店内を片付けながら、ふとそんな言葉が口をついて出ました。父が倒れてから一人で守ってきた店。設備の老朽化も進み、いつかは閉めなければならないと考えていた矢先の出来事でした。",
        "450万円。新しいドライ機を入れるのに必要な金額です。これから人口が減っていくこの町で、それだけの投資を回収できるのか。計算機を叩く手が震えました。",
        "そんなある日、避難所にいる常連さんから電話がありました。「お父さんの喪服、クリーニングに出したいんだけど、いつ再開する？」。",
        "ハッとしました。私は「経営」のことばかり考えていましたが、この店は「地域の暮らし」の一部だったのです。喪服も、学生服も、民宿のシーツも。誰かが洗わなければならない。",
        "「儲かるかどうかじゃない。必要とされているかどうかだ」",
        "そう腹を括った時、商工会の担当者が教えてくれたのが「持続化補助金」でした。自己負担が50万円で済むなら、借金をしなくても、手元の資金でなんとかなる。",
        "再開の日、真新しい機械が回る音を聞きながら、涙が止まりませんでした。これからは、無理に大きくする必要はない。地域の人たちの「困った」に寄り添いながら、一日一日、丁寧に仕事をしていこう。そう心に誓いました。"
      ]
    }
  },
  {
    id: 102,
    title: "セミナーハウス山びこ",
    category: "人材確保・業務効率化",
    operator: "金屋 氏",
    role: "代表",
    location: "能登町",
    locationCoords: { lat: 37.30, lng: 137.15 },
    tags: ["#人手不足解消", "#タイミー活用", "#震災復興"],
    summary: "震災後の需要急増と深刻な人手不足。スキマバイトアプリ「タイミー」の導入で、若者や県外からの支援者を巻き込み、満室の宿を回す。",
    description: "「掃除ですけど、大丈夫ですか？」\n「分かってます」\n\n震災後、復興支援や工事関係者で満室状態が続く中、深刻な人手不足に直面していました。\nスタッフは70代が中心。ハローワークに求人を出しても、応募はゼロ。\n\n「一本釣り」で知人に声をかけるのも限界でした。\n\nそんな時、支援員から紹介されたのが「タイミー」でした。\n「スマホでバイト募集？ 本当に来るのか？」\n\n半信半疑で募集を出すと、驚くことが起きました。\n20代の若者、大学生、そして県外からのボランティア。\n今まで出会うことのなかった層が、次々と応募してくれたのです。\n\n「震災前から使っていればよかった」\n\n今では、固定スタッフとスポットワーカーを組み合わせ、\n30名規模の満室を無理なく回せるようになりました。\n\n「新しい風」が、老舗の宿に活気をもたらしています。",
    necessity: "復興支援者や工事関係者の宿泊拠点の維持",
    connections: "タイミーワーカー、災害ボランティア、商工会",
    relatedIndustries: [1, 6],
    timeline: {
      past: "平成19年から指定管理を開始。ベテランスタッフ中心で運営していた。",
      present: "震災需要で満室。タイミーを活用し、人手不足を解消。",
      future: "固定スタッフとタイミーを併用し、柔軟な運営体制を継続する。",
      phase1: "スタッフの高齢化（70代前後）と退職により、深刻な人手不足に。ハローワークに出しても応募がなく、知人への「一本釣り」で凌いでいた。",
      phase2: "震災後、復興支援者などで宿泊需要が急増。掃除や布団敷きが回らなくなる。「タイミー」の紹介を受け、半信半疑ながらも導入を決断。",
      phase3: "求人票作成のサポートを受け、募集を開始。若者や県外ボランティアなど、予想外の層からの応募が殺到。現場の雰囲気も明るくなり、業務が回るようになった。"
    },
    deepDive: {
      past: "平成19年から指定管理を開始。ベテランスタッフ中心で運営していた。",
      present: "震災需要で満室。タイミーを活用し、人手不足を解消。",
      future: "固定スタッフとタイミーを併用し、柔軟な運営体制を継続する。"
    },
    actions: [
      { type: "visit", label: "施設情報", link: "#" }
    ],
    image: "https://files.manuscdn.com/user_upload_by_module/session_file/92549119/rKVZRyQZfQdapUrk.jpg",
    seasonalMonths: [],
    isCaseStudy: true,
    challengeCard: {
      label: "需要急増と人手不足",
      description: "震災後の宿泊需要急増に対し、高齢スタッフのみでは業務（掃除・布団敷き）が回らない状態だった。",
      solutions: [
        { title: "スキマバイトアプリの導入", detail: "「タイミー」を活用し、必要な時間帯（掃除など）にスポットで人員を確保した。" },
        { title: "求人票作成の代行活用", detail: "支援員のサポートで実態に合った求人票を作成し、ミスマッチを防いだ。" },
        { title: "業務の切り出し", detail: "「掃除」「布団敷き」など、誰でもできる業務を明確に切り出して募集した。" }
      ],
      structuredBlock: [
        { label: "活用した支援", items: ["タイミー（Timee）導入支援"] },
        { label: "成果", items: ["人手不足解消", "若年層の流入", "直接雇用へ2名転換"] }
      ]
    },
    regrets: {
      title: "もっと早く導入すればよかった。",
      content: "「震災前（審査前）からタイミーがあればよかったと思うほど、人手不足解消に役立っている」"
    },
    decisionMatrix: {
      title: "従来の手法にこだわるか、新ツールを試すか",
      optionA: {
        title: "ハロワ・縁故採用",
        pros: ["慣れている手法で安心感がある", "知っている人なら頼みやすい"],
      },
      optionB: {
        title: "タイミー導入",
        subsidy: "導入サポート",
        cost: "手数料はかかるが、即戦力が来る"
      },
      reason: "ハローワークでは全く応募がなく、背に腹は代えられない状況だったため。"
    },
    decisionProcess: {
      worry: "スマホアプリで本当に人が来るのか、どんな人が来るのか不安",
      decider: "ハローワークでの採用限界と、支援員からの強力な推奨",
      selectedSupport: "タイミー（Timee）",
      action: "スポットワークでの募集開始",
      outcome: "若者・男性・県外勢の応募多数で業務安定",
      rejectedOption: {
        title: "ハロワ・縁故採用",
        reasons: ["応募がゼロ", "知人の高齢化で限界"]
      },
      adoptedOption: {
        title: "タイミー導入",
        reasons: ["即座に人が集まる", "労務管理の手間がない"],
        decidingFactor: "ハローワークでは全く応募がなく、背に腹は代えられない状況だったため。"
      }
    },
    barriers: {
      title: "導入への心理的ハードル",
      content: "「スマホで募集なんて難しそう」「変な人が来たらどうしよう」という不安がありましたが、やってみれば拍子抜けするほど簡単でした。",
      checklist: [
        {
          title: "操作への不安（難しそう）",
          detail: "導入前は操作や労務管理が面倒かと思っていたが、想像以上にスムーズで、給与支払いの手間もなかった。"
        },
        {
          title: "人材への不安（どんな人が来るか）",
          detail: "「掃除に男性は来ないだろう」などの思い込みがあったが、実際には多様な人材が来て、ミスマッチもなかった。"
        }
      ]
    },
    editorComment: "「地方×高齢化×人手不足」という三重苦を、テクノロジー（タイミー）で鮮やかに解決した好事例。特に「掃除」という業務の切り出し方が絶妙で、スポットワーカーが働きやすい環境を作った点が勝因です。",
    supportSystem: [
      {
        name: "タイミー（Timee）導入支援",
        description: "スキマバイトアプリ「タイミー」の導入を、求人票作成や初期設定を含めてサポート。",
        link: "#",
        points: {
          label: "ここがポイント",
          term: "マッチング",
          detail: ": 最短1分で決定、面接なし"
        },
        specAmount: "初期費用・掲載費0円",
        specCondition: "働いた分の報酬＋手数料のみ"
      }
    ],
    details: {
      owner: "金屋 氏",
      founded: "平成19年（指定管理開始）",
      employees: "6名＋スポットワーカー"
    },
    story: {
      title: "山びこに響く、新しい風",
      text: [
        "「まさか、こんな山奥に若い子が来てくれるなんてね」",
        "金屋社長は、スマホの画面を見ながら目を細めました。画面には「マッチング成立」の文字。明日、また新しいスタッフが手伝いに来てくれるのです。",
        "震災後、宿はかつてない忙しさに包まれていました。復旧工事の作業員さん、ボランティアの方々。30室ある客室は連日満室。ありがたい悲鳴でしたが、現場は限界でした。",
        "「布団を敷くだけでもいい。誰か手伝ってくれないか」",
        "70代のスタッフたちが腰をさすりながら働く姿を見て、金屋社長は焦りを感じていました。ハローワークに求人を出しても、なしのつぶて。「わざわざここまで働きに来る人はいない」と諦めかけていました。",
        "そんな時、商工会の支援員が持ってきたのが「タイミー」の話でした。",
        "「スマホでバイト？ 若い子向けのやつでしょ？」",
        "最初は半信半疑でした。しかし、背に腹は代えられません。支援員に手伝ってもらいながら、「客室清掃」「布団敷き」の募集を出してみました。",
        "すると、どうでしょう。スマホが次々と鳴り始めました。",
        "「金沢の大学生です」「災害ボランティアの空き時間に来ました」",
        "現れたのは、これまで宿とは縁のなかった若者や、県外からの支援者たち。彼らはテキパキと掃除をこなし、元気な挨拶で宿の空気を明るくしてくれました。",
        "「掃除ですけど、大丈夫ですか？」と恐る恐る聞くと、「分かってます！任せてください！」と頼もしい返事。",
        "求人票で仕事内容を明確にしていたおかげで、ミスマッチもありませんでした。",
        "「震災前から使っていればよかったよ」",
        "今では、ベテランスタッフと若者が一緒に働く風景が当たり前になりました。新しい風が、山びこに新しい活気を運んできてくれたのです。"
      ]
    }
  }
];
