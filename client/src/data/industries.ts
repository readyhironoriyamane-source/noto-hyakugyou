
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
    image: "https://images.unsplash.com/photo-1517677208171-0bc5e25e6c4a?q=80&w=1974&auto=format&fit=crop",
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
        link: "#",
        specAmount: "最大2,000万円",
        specCondition: "無担保・無保証人、低金利（当初3年間）"
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
