
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
  description?: string; // 通常記事の本文用
  necessity: string;    // 追加: なぜ必要か（社会的意義）
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
  history?: string; // 通常記事の歩み用
  future?: string;  // 通常記事の展望用
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
    color?: string;
  };
  keyPoints?: string[];
  decisionProcess?: {
    options: string[];
    reason: string;
    selectedSupport: string;
    action: string;
    outcome: string;
  };
  supportMenu?: {
    name: string;
    description: string;
    link: string;
  };
  jobDescription?: string;
  challengeDetail?: string;
  editorComment?: string;
  recommendedSupports?: {
    category: string;
    name: string;
    description: string;
    link: string;
  }[];
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
    id: 2,
    title: "赤崎のイチゴ農家",
    category: "農業",
    operator: "松本 恵子",
    role: "農園主",
    location: "能登町 赤崎地区",
    locationCoords: { lat: 37.32, lng: 137.25 },
    tags: ["露地栽培", "石垣イチゴ", "観光農園"],
    summary: "日本海を見下ろす段々畑で、太陽を浴びて育つ赤崎イチゴ。甘みと酸味のバランスが絶妙な、初夏の味覚。",
    description: "赤崎地区のイチゴ栽培は、大正時代から続く伝統がある。海沿いの斜面を利用した石垣栽培は、太陽の熱を蓄え、イチゴを甘くする先人の知恵だ。\n\n5月下旬から6月中旬にかけての収穫時期には、多くの家族連れがイチゴ狩りに訪れ、地区全体が賑わいを見せる。",
    history: "大正時代に始まり、海沿いの斜面を利用した石垣栽培を確立。",
    future: "加工品開発により、通年で赤崎イチゴを楽しめる商品を届ける。",
    necessity: "観光資源としての価値だけでなく、地域のコミュニティ維持にも貢献。高齢化が進む中、無理なく続けられる農業モデルとしても注目。",
    connections: "JA内浦、地元の菓子店、観光協会",
    relatedIndustries: [5, 13],
    visitInfo: {
      hours: "5月下旬〜6月中旬（9:00〜16:00）",
      access: "宇出津港から車で15分",
      contact: "赤崎いちご園組合"
    },
    timeline: {
      past: "大正時代に始まり、海沿いの斜面を利用した石垣栽培を確立。",
      present: "観光農園として人気を博すが、後継者不足が課題。",
      future: "加工品開発により、通年で赤崎イチゴを楽しめる商品を届ける。"
    },
    deepDive: {
      past: "かつては各家庭で食べる分を作る程度だったが、その美味しさが評判を呼び、観光農園として整備された。",
      present: "露地栽培ならではの濃厚な味が特徴だが、天候に左右されやすく、収穫期間も短いのが悩み。",
      future: "ジャムやスイーツなどの加工品開発に力を入れ、収穫期以外も収益を確保できる仕組み作りを進めている。"
    },
    actions: [
      { type: "visit", label: "イチゴ狩りに行く", link: "#" },
      { type: "buy", label: "ジャムを購入", link: "#" }
    ],
    image: "/strawberry-farm.jpg",
    seasonalMonths: [5, 6]
  },
  {
    id: 3,
    title: "いしり職人",
    category: "食品加工",
    operator: "カネイシ商店",
    role: "醸造責任者",
    location: "能登町 小木",
    locationCoords: { lat: 37.30, lng: 137.23 },
    tags: ["日本三大魚醤", "発酵食", "伝統製法"],
    summary: "イカの内臓を塩と共に漬け込み、数年かけて熟成させる能登の魚醤「いしり」。深いコクと旨味は、能登の食卓に欠かせない。",
    description: "いしり作りは、寒さが厳しい冬に行われる。新鮮なイカの内臓に塩をまぶし、大きな樽に漬け込む。そこから2〜3年、じっくりと発酵・熟成させることで、琥珀色の液体へと変化する。\n\n独特の香りと濃厚な旨味は、鍋物や煮物、隠し味として、能登の家庭料理を支え続けている。",
    history: "古くから家庭で作られてきた調味料。保存食としての役割も。",
    future: "海外のシェフからも注目されており、グローバルな展開を目指す。",
    necessity: "能登の食文化の根幹をなす調味料。添加物を使わない自然な製法は、現代の健康志向にもマッチする。",
    connections: "地元の飲食店、宿泊施設、発酵食研究家",
    relatedIndustries: [1, 11],
    visitInfo: {
      hours: "9:00〜17:00（定休日：日曜）",
      access: "小木港から徒歩5分",
      contact: "カネイシ商店"
    },
    timeline: {
      past: "古くから家庭で作られてきた調味料。保存食としての役割も。",
      present: "万能調味料として再評価され、全国のスーパーや通販でも人気。",
      future: "海外のシェフからも注目されており、グローバルな展開を目指す。"
    },
    deepDive: {
      past: "各家庭に「いしり樽」があり、代々受け継がれてきた味があった。",
      present: "製造者の減少により、専業の蔵元が伝統を守っている。",
      future: "イタリアンやフレンチなど、洋食とのマリアージュを提案し、新たなファン層を開拓している。"
    },
    actions: [
      { type: "buy", label: "いしりを購入", link: "#" },
      { type: "visit", label: "蔵見学を予約", link: "#" }
    ],
    image: "/ishiri-new.jpg",
    seasonalMonths: [1, 2, 11, 12]
  },
  {
    id: 4,
    title: "能登瓦の屋根職人",
    category: "建築・工芸",
    operator: "瓦寅工業",
    role: "親方",
    location: "七尾市",
    locationCoords: { lat: 37.04, lng: 136.96 },
    tags: ["黒瓦", "耐寒性", "美しい景観"],
    summary: "能登の風景を彩る、艶やかな黒瓦。厳しい冬の寒さや海風に耐え抜く強さと美しさを兼ね備えた、能登の守り神。",
    description: "能登瓦の特徴である「黒色」は、釉薬によるもの。高温で焼き上げることで、ガラス質の被膜が形成され、耐久性が増す。\n\n屋根職人は、一枚一枚の瓦を丁寧に葺き、家を雨風から守る。その技は、美しい景観を守ることにも繋がっている。",
    history: "江戸時代から続く伝統産業。北前船で北海道へも運ばれた。",
    future: "新素材との融合や、インテリアへの活用など、瓦の可能性を広げる。",
    necessity: "能登の気候風土に最適化された建材。景観保全の観点からも重要であり、災害に強い家づくりにも貢献。",
    connections: "工務店、設計事務所、文化財保護団体",
    relatedIndustries: [7, 8],
    visitInfo: {
      hours: "8:00〜17:00",
      access: "七尾駅から車で10分",
      contact: "石川県瓦工事協同組合"
    },
    timeline: {
      past: "江戸時代から続く伝統産業。北前船で北海道へも運ばれた。",
      present: "洋風建築の増加により需要は減少傾向だが、リフォーム需要は堅調。",
      future: "新素材との融合や、インテリアへの活用など、瓦の可能性を広げる。"
    },
    deepDive: {
      past: "かつては集落ごとに瓦工場があり、地域の土で瓦を焼いていた。",
      present: "現在は工場生産が主流だが、手作業による「役瓦」の製作など、職人技は健在。",
      future: "廃瓦を粉砕して道路舗装材に利用するなど、SDGsへの取り組みも進んでいる。"
    },
    actions: [
      { type: "support", label: "瓦オーナーになる", link: "#" },
      { type: "visit", label: "工場見学", link: "#" }
    ],
    image: "/kawara-craftsman.jpg",
    seasonalMonths: [4, 5, 6, 7, 8, 9, 10, 11]
  },
  {
    id: 5,
    title: "能登米農家",
    category: "農業",
    operator: "田中 浩二",
    role: "生産者",
    location: "輪島市",
    locationCoords: { lat: 37.39, lng: 136.90 },
    tags: ["棚田米", "世界農業遺産", "コシヒカリ"],
    summary: "世界農業遺産「能登の里山里海」を象徴する棚田。手間暇かけて育てられたお米は、甘みと粘りが強く、冷めても美味しい。",
    description: "急峻な地形を開墾して作られた棚田は、大型機械が入らず、手作業での管理が必要な場所も多い。\n\nしかし、山からの清らかな水と、昼夜の寒暖差が、極上のお米を育む。美しい棚田の風景は、農家の汗と努力の結晶だ。",
    history: "千枚田に代表されるように、古くから地形を活かした稲作が行われてきた。",
    future: "オーナー制度や体験農業を通じて、都市住民との交流人口を増やす。",
    necessity: "食料生産だけでなく、国土保全や水源涵養など、多面的な機能を持つ。美しい景観は観光資源としても重要。",
    connections: "JA、酒蔵、飲食店、オーナー制度会員",
    relatedIndustries: [2, 11],
    visitInfo: {
      hours: "見学自由（農作業の妨げにならないように）",
      access: "輪島市街から車で20分",
      contact: "白米千枚田愛耕会"
    },
    timeline: {
      past: "千枚田に代表されるように、古くから地形を活かした稲作が行われてきた。",
      present: "高齢化による耕作放棄地の増加が深刻な課題。",
      future: "オーナー制度や体験農業を通じて、都市住民との交流人口を増やす。"
    },
    deepDive: {
      past: "水路の管理や草刈りなど、共同作業「結（ゆい）」によって維持されてきた。",
      present: "機械化が難しい棚田では、ドローンやICT技術の導入実験も始まっている。",
      future: "棚田米のブランド化を進め、少量生産でも高付加価値な農業を目指す。"
    },
    actions: [
      { type: "buy", label: "棚田米を購入", link: "#" },
      { type: "join", label: "田植えボランティア", link: "#" }
    ],
    image: "/noto-rice.jpg",
    seasonalMonths: [5, 9]
  },
  {
    id: 6,
    title: "定置網漁師",
    category: "漁業",
    operator: "七尾湾漁協",
    role: "網元",
    location: "七尾市 崎山",
    locationCoords: { lat: 37.08, lng: 137.03 },
    tags: ["天然の生簀", "寒ブリ", "持続可能な漁業"],
    summary: "魚の通り道に網を仕掛け、入ってきた魚を獲る「待ちの漁業」。資源を獲り尽くさない、環境に優しい漁法として世界から注目。",
    description: "七尾湾は波が穏やかで、定置網漁に適している。早朝、まだ暗いうちに出港し、網を起こす。\n\n網の中には、ブリ、アジ、サバなど、季節ごとの旬の魚が入っている。必要な分だけを水揚げし、小さな魚は海へ返すこともある。",
    history: "400年以上の歴史があり、地域全体で網を管理・運営してきた。",
    future: "漁業体験や観光定置網など、観光との連携を強化。",
    necessity: "安定的な漁獲が見込め、地域の雇用を支える重要な産業。魚食文化の継承にも寄与。",
    connections: "漁協、仲買人、加工業者、観光協会",
    relatedIndustries: [1, 3],
    visitInfo: {
      hours: "早朝（観光定置網は要予約）",
      access: "七尾駅から車で30分",
      contact: "株式会社鹿渡島定置"
    },
    timeline: {
      past: "400年以上の歴史があり、地域全体で網を管理・運営してきた。",
      present: "最新の魚群探知機や海況データを活用し、効率化を図っている。",
      future: "漁業体験や観光定置網など、観光との連携を強化。"
    },
    deepDive: {
      past: "網の権利は「株」として地域住民が持ち、利益を分配する仕組みがあった。",
      present: "漁師の高齢化が進む中、県外からの新規就業者の受け入れに積極的。",
      future: "「里海」の象徴として、環境学習の場としても活用されている。"
    },
    actions: [
      { type: "visit", label: "観光定置網に乗船", link: "#" },
      { type: "buy", label: "鮮魚セットを購入", link: "#" }
    ],
    image: "/fixed-net-fishing.jpg",
    seasonalMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  },
  {
    id: 7,
    title: "能登ヒバ林業家",
    category: "林業",
    operator: "アテの会",
    role: "山守",
    location: "輪島市 門前",
    locationCoords: { lat: 37.28, lng: 136.75 },
    tags: ["県木アテ", "高耐久", "抗菌作用"],
    summary: "「アテ」と呼ばれる能登ヒバは、湿気に強く、シロアリも寄せ付けない最強の木材。能登の家屋や輪島塗の木地に使われる。",
    description: "能登の山は、アテの美林で覆われている。植林から伐採まで数十年。親子三代にわたる手入れが必要だ。\n\nヒノキチオールという成分を多く含み、独特の香りと優れた抗菌・防虫効果を持つ。住宅建材としてだけでなく、アロマオイルなどの活用も進む。",
    history: "藩政時代から植林が奨励され、大切に守り育てられてきた。",
    future: "建材以外の用途開発（精油、木工品）により、付加価値を高める。",
    necessity: "山を守ることは、海を守ることにも繋がる。土砂災害の防止や水源涵養機能も重要。",
    connections: "製材所、工務店、漆器職人",
    relatedIndustries: [4, 10, 101],
    visitInfo: {
      hours: "見学は要問合せ",
      access: "門前バス停から車で20分",
      contact: "石川県森林組合連合会"
    },
    timeline: {
      past: "藩政時代から植林が奨励され、大切に守り育てられてきた。",
      present: "住宅着工数の減少により、木材価格が低迷。",
      future: "建材以外の用途開発（精油、木工品）により、付加価値を高める。"
    },
    deepDive: {
      past: "「総アテの家」を建てることが、能登の人々のステータスだった。",
      present: "間伐材を利用した割り箸や、葉から抽出した精油など、未利用資源の活用が進む。",
      future: "CLT（直交集成板）などの新技術により、中高層建築への利用を目指す。"
    },
    actions: [
      { type: "buy", label: "ヒバ精油を購入", link: "#" },
      { type: "support", label: "植林活動に参加", link: "#" }
    ],
    image: "/noto-hiba.jpg",
    seasonalMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  },
  {
    id: 8,
    title: "珠洲焼の陶芸家",
    category: "工芸",
    operator: "篠原 敬",
    role: "陶芸家",
    location: "珠洲市",
    locationCoords: { lat: 37.43, lng: 137.26 },
    tags: ["黒色陶器", "中世古陶", "薪窯"],
    summary: "中世に栄え、一度は途絶えた「幻の古陶」。鉄分を多く含む土を薪窯で焼き締め、灰黒色の力強い器が生まれる。",
    description: "珠洲焼の特徴は、釉薬を使わず、高温で焼き締めること。薪の灰が降りかかり、自然釉となって景色を作る。\n\n一度は歴史から姿を消したが、昭和50年代に復興。現在は多くの作家が珠洲に集まり、それぞれの表現を追求している。",
    history: "平安時代末期から室町時代にかけて日本海側全域に広がった。",
    future: "現代のライフスタイルに合った器の提案と、海外展開。",
    necessity: "地域の歴史文化を体現する存在。作家の移住促進など、地域活性化の核となっている。",
    connections: "珠洲焼館、ギャラリー、茶道家",
    relatedIndustries: [4, 10],
    visitInfo: {
      hours: "9:00〜17:00",
      access: "珠洲市街から車で10分",
      contact: "珠洲焼館"
    },
    timeline: {
      past: "平安時代末期から室町時代にかけて日本海側全域に広がった。",
      present: "戦国時代に忽然と姿を消したが、昭和に復興。",
      future: "現代のライフスタイルに合った器の提案と、海外展開。"
    },
    deepDive: {
      past: "北前船や海運によって、北海道から福井まで広く流通していた。",
      present: "「珠洲焼資料館」や「珠洲焼館」が整備され、観光拠点となっている。",
      future: "アート作品としての評価を高め、国際的な陶芸展への出品も増えている。"
    },
    actions: [
      { type: "buy", label: "器を購入", link: "#" },
      { type: "visit", label: "陶芸体験", link: "#" }
    ],
    image: "/suzu-ware.jpg",
    seasonalMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  },
  {
    id: 9,
    title: "能登牛の畜産農家",
    category: "畜産",
    operator: "寺岡牧場",
    role: "牧場主",
    location: "志賀町",
    locationCoords: { lat: 37.12, lng: 136.76 },
    tags: ["幻の和牛", "オレイン酸", "能登の里山"],
    summary: "出荷頭数が少なく「幻の和牛」とも呼ばれる能登牛。オレイン酸を多く含み、とろけるような食感と甘みが特徴。",
    description: "能登の豊かな自然の中で、ストレスなく育てられる能登牛。一頭一頭の体調を見極め、餌の配合を調整する。\n\nその肉質は、きめ細やかで、脂の融点が低い。口に入れた瞬間に広がる旨味は、多くの美食家を唸らせる。",
    history: "明治時代から改良が重ねられ、品質の高さが認められてきた。",
    future: "増頭による安定供給と、ブランド力の向上。",
    necessity: "耕作放棄地の放牧利用など、里山の維持管理にも貢献。地域ブランドとしての経済効果も大きい。",
    connections: "精肉店、レストラン、JA",
    relatedIndustries: [2, 5],
    visitInfo: {
      hours: "見学不可（防疫のため）",
      access: "直営レストランあり",
      contact: "石川県能登牛銘柄推進協議会"
    },
    timeline: {
      past: "明治時代から改良が重ねられ、品質の高さが認められてきた。",
      present: "認定基準が厳しく、希少価値が高い。",
      future: "増頭による安定供給と、ブランド力の向上。"
    },
    deepDive: {
      past: "かつては役牛として農作業を支えていたが、肉用牛へと転換した。",
      present: "「能登牛プレミアム」など、より高品質な認証制度も始まった。",
      future: "繁殖から肥育までを一貫して行う経営体が増え、品質の安定化が進んでいる。"
    },
    actions: [
      { type: "buy", label: "能登牛を購入", link: "#" },
      { type: "visit", label: "認定店で食事", link: "#" }
    ],
    image: "/noto-beef.jpg",
    seasonalMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  },
  {
    id: 10,
    title: "揚げ浜式製塩",
    category: "食品加工",
    operator: "角花 豊",
    role: "浜士",
    location: "珠洲市 仁江",
    locationCoords: { lat: 37.48, lng: 137.12 },
    tags: ["重要無形民俗文化財", "手作業", "ミネラル豊富"],
    summary: "日本で唯一、能登に残る「揚げ浜式製塩」。海水を砂浜に撒き、太陽と風の力で塩を結晶化させる、気の遠くなるような作業。",
    description: "早朝、海から海水を汲み上げ、砂浜に撒く「潮撒き」。乾燥した砂を集め、海水をかけて濃い塩水（かん水）を採る。\n\nそれを釜で煮詰めること数時間。ようやく真っ白な塩が生まれる。ミネラルを豊富に含み、まろやかな甘みがある。",
    history: "江戸時代から500年以上続く製法。専売制の時代も守り抜かれた。",
    future: "後継者の育成と、体験観光によるファン作り。",
    necessity: "能登の里海文化の象徴。伝統技術の継承だけでなく、観光資源としても極めて重要。",
    connections: "道の駅、製塩業者、観光客",
    relatedIndustries: [1, 3],
    visitInfo: {
      hours: "5月〜9月（9:00〜16:00）",
      access: "珠洲市街から車で20分",
      contact: "道の駅すず塩田村"
    },
    timeline: {
      past: "江戸時代から500年以上続く製法。専売制の時代も守り抜かれた。",
      present: "国の重要無形民俗文化財に指定され、観光客も多く訪れる。",
      future: "後継者の育成と、体験観光によるファン作り。"
    },
    deepDive: {
      past: "加賀藩の塩手米制度により、年貢米の代わりに塩を納めていた。",
      present: "「浜士（はまじ）」と呼ばれる職人が、熟練の技で塩を作る。",
      future: "塩を使ったスイーツやバスソルトなど、新しい商品開発も進んでいる。"
    },
    actions: [
      { type: "visit", label: "塩作り体験", link: "#" },
      { type: "buy", label: "揚げ浜塩を購入", link: "#" }
    ],
    image: "/salt-making.jpg",
    seasonalMonths: [5, 6, 7, 8, 9]
  },
  {
    id: 11,
    title: "能登の酒蔵杜氏",
    category: "食品加工",
    operator: "数馬酒造",
    role: "杜氏",
    location: "能登町 宇出津",
    locationCoords: { lat: 37.30, lng: 137.15 },
    tags: ["能登杜氏", "地産地消", "海洋深層水"],
    summary: "日本四大杜氏の一つ「能登杜氏」の技を受け継ぐ。地元の米、水、人にこだわり、能登の風土を醸す。",
    description: "能登の酒は、濃厚で芳醇な味わいが特徴。冬の寒さが、酒造りに適した環境を作る。\n\n近年は、耕作放棄地を再生して酒米を作ったり、海洋深層水を仕込み水に使ったりと、地域資源を活かした酒造りが盛んだ。",
    history: "農閑期の出稼ぎとして酒造りが広まり、高度な技術が確立された。",
    future: "海外輸出の拡大と、酒蔵ツーリズムの推進。",
    necessity: "地域の農業（酒米）と連携し、地域経済を循環させるハブとなる存在。祭礼などの文化行事にも欠かせない。",
    connections: "酒米農家、酒販店、地域住民",
    relatedIndustries: [2, 5],
    visitInfo: {
      hours: "9:00〜17:00（見学は要予約）",
      access: "宇出津港から徒歩10分",
      contact: "数馬酒造株式会社"
    },
    timeline: {
      past: "農閑期の出稼ぎとして酒造りが広まり、高度な技術が確立された。",
      present: "若手杜氏が台頭し、新しい酒造りに挑戦している。",
      future: "海外輸出の拡大と、酒蔵ツーリズムの推進。"
    },
    deepDive: {
      past: "能登杜氏は「阿波」「丹波」「南部」と並ぶ日本四大杜氏の一つ。",
      present: "「能登初桜」「竹葉」「宗玄」など、個性豊かな銘柄が揃う。",
      future: "ジビエ料理に合う酒など、食とのペアリングを提案し、新たな需要を喚起している。"
    },
    actions: [
      { type: "buy", label: "地酒を購入", link: "#" },
      { type: "visit", label: "酒蔵見学", link: "#" }
    ],
    image: "/sake-brewery.jpg",
    seasonalMonths: [12, 1, 2, 3]
  },
  {
    id: 12,
    title: "宇出津港の港湾管理者",
    category: "インフラ",
    operator: "石川県",
    role: "港湾職員",
    location: "能登町 宇出津",
    locationCoords: { lat: 37.30, lng: 137.15 },
    tags: ["あばれ祭", "定置網拠点", "防災拠点"],
    summary: "能登半島の物流と水産業を支える重要港湾。祭りの舞台としても知られ、地域の暮らしと密接に関わる。",
    description: "宇出津港は、天然の良港として古くから栄えてきた。現在は、定置網漁船の拠点として、また資材の搬入港として機能している。\n\n夏には「あばれ祭」が行われ、港にキリコが乱舞する。港は、人々の生活と文化の中心地でもある。",
    history: "北前船の寄港地として発展し、地域の物流拠点となってきた。",
    future: "防災機能の強化と、クルーズ船誘致など観光港としての活用。",
    necessity: "物流・水産・防災の要。災害時には救援物資の受入拠点としても機能する、地域のライフライン。",
    connections: "漁協、運送会社、自治体",
    relatedIndustries: [1, 6],
    visitInfo: {
      hours: "常時開放（立入禁止区域あり）",
      access: "のと里山空港から車で35分",
      contact: "石川県奥能登土木総合事務所"
    },
    timeline: {
      past: "北前船の寄港地として発展し、地域の物流拠点となってきた。",
      present: "岸壁の改良や耐震化が進められている。",
      future: "防災機能の強化と、クルーズ船誘致など観光港としての活用。"
    },
    deepDive: {
      past: "かつては木材や木炭の積み出し港として賑わった。",
      present: "「宇出津新港」が整備され、大型船の入港が可能になった。",
      future: "「みなとオアシス」として登録され、賑わい創出の拠点づくりが進む。"
    },
    actions: [
      { type: "visit", label: "あばれ祭を見学", link: "#" },
      { type: "support", label: "港の清掃活動", link: "#" }
    ],
    image: "/port-manager.jpg",
    seasonalMonths: [7]
  },
  {
    id: 13,
    title: "能登町ふれあい公社",
    category: "観光・サービス",
    operator: "一般社団法人",
    role: "施設運営",
    location: "能登町",
    locationCoords: { lat: 37.30, lng: 137.10 },
    tags: ["地域商社", "特産品開発", "移住支援"],
    summary: "宿泊施設や観光施設の運営を通じて、地域の魅力を発信。移住定住の相談窓口も担い、人と地域を繋ぐ。",
    description: "「ホテルのときんぷら」や「九十九湾観光船」などを運営。地域の雇用を生み出し、観光客をもてなす。\n\nまた、空き家バンクの運営や移住体験ツアーの企画など、関係人口を増やす取り組みにも力を入れている。",
    history: "町の観光振興を目的に設立され、指定管理業務を中心に事業拡大。",
    future: "DMO（観光地域づくり法人）としての機能を強化し、稼げる地域を作る。",
    necessity: "観光振興と地域課題解決の両輪を担う組織。民間と行政の橋渡し役として欠かせない。",
    connections: "町役場、観光協会、地域住民",
    relatedIndustries: [2, 11],
    visitInfo: {
      hours: "9:00〜17:00",
      access: "能登町役場内",
      contact: "能登町ふれあい公社"
    },
    timeline: {
      past: "町の観光振興を目的に設立され、指定管理業務を中心に事業拡大。",
      present: "コロナ禍を経て、ワーケーションやマイクロツーリズムに対応。",
      future: "DMO（観光地域づくり法人）としての機能を強化し、稼げる地域を作る。"
    },
    deepDive: {
      past: "第三セクターとして出発し、経営の自立化を進めてきた。",
      present: "ふるさと納税の返礼品開発など、外貨獲得に貢献している。",
      future: "地域の「困りごと」をビジネスで解決する、ソーシャルビジネスへの展開も視野に。"
    },
    actions: [
      { type: "visit", label: "運営施設に宿泊", link: "#" },
      { type: "support", label: "移住相談", link: "#" }
    ],
    image: "/tsukumall.jpg",
    seasonalMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  },
  {
    id: 101,
    title: "輪島塗の塗師",
    category: "工芸",
    operator: "桐本 泰一",
    role: "塗師",
    location: "輪島市",
    locationCoords: { lat: 37.39, lng: 136.90 },
    tags: ["伝統的工芸品", "堅牢優美", "分業制"],
    summary: "124工程にも及ぶ手作業を経て生まれる「輪島塗」。塗師は、その全工程を統括し、器に命を吹き込むプロデューサー。",
    description: "輪島塗は、木地、下地、上塗り、加飾と、多くの職人の手を経て完成する。塗師は、顧客の要望を聞き、各職人に指示を出し、最終的な仕上げを行う。\n\n震災で多くの工房が被災したが、職人たちは再び立ち上がり、伝統の灯を絶やさないよう奮闘している。",
    necessity: "輪島のアイデンティティそのもの。多くの職人の生活を支えるだけでなく、日本の工芸文化の至宝。",
    connections: "木地師、下地師、蒔絵師、沈金師",
    relatedIndustries: [7],
    visitInfo: {
      hours: "9:00〜17:00",
      access: "輪島塗会館から徒歩圏内",
      contact: "輪島漆器商工業協同組合"
    },
    timeline: {
      past: "室町時代から続く伝統。行商によって全国に販路を広げた。",
      present: "震災からの復興が最優先課題。仮設工房での製作再開が進む。",
      future: "現代の生活様式に合わせた商品開発と、海外市場への挑戦。"
    },
    deepDive: {
      past: "「椀講」という仕組みで、高価な漆器を庶民にも普及させた。",
      present: "デザイナーとのコラボレーションなど、新しい輪島塗の可能性を探っている。",
      future: "若手職人の育成機関「輪島漆芸技術研修所」が、復興の鍵を握る。"
    },
    actions: [
      { type: "buy", label: "輪島塗を購入", link: "#" },
      { type: "support", label: "復興支援募金", link: "#" }
    ],
    image: "/wajima-nuri.jpg",
    seasonalMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    
    // 活用事例データ
    isCaseStudy: true,
    challengeCard: {
      label: "資金繰りが厳しい",
      color: "bg-red-500"
    },
    keyPoints: [
      "震災で工房が全壊し、事業継続が危ぶまれた",
      "「なりわい再建支援補助金」を活用し、仮設工房を建設",
      "伝統を絶やさないという強い意志が、支援を引き寄せた"
    ],
    decisionProcess: {
      options: [
        "小規模事業者持続化補助金（災害支援枠）",
        "自治体の独自支援金",
        "なりわい再建支援補助金",
        "クラウドファンディング"
      ],
      reason: "工房の建設と高額な設備の導入には、補助上限額が高く、補助率も手厚い「なりわい再建支援補助金」が不可欠だった。また、グループ補助金ではなく単独申請が可能になったことも決め手となった。",
      selectedSupport: "なりわい再建支援補助金",
      action: "商工会議所の指導員と相談しながら、被害状況の証明書類を揃え、事業計画書を作成。同時に、仮設工房の場所探しや、道具職人への発注を行った。全国の顧客に向けてSNSで現状を発信し、クラウドファンディングも並行して実施した。",
      outcome: "申請から3ヶ月で交付決定通知を受領。仮設工房の建設に着手し、半年後には一部の作業を再開できた。「もう一度作れる」という希望が、職人たちの心を支えている。"
    },
    supportMenu: {
      name: "なりわい再建支援補助金",
      description: "被災した中小企業等の施設・設備の復旧費用を補助する制度。石川県では定額補助（自己負担ゼロ）の特例措置もある。",
      link: "https://www.pref.ishikawa.lg.jp/kinyu/nariwai/nariwai.html"
    },
    jobDescription: "輪島塗の塗師として、企画・製造・販売を一貫して行う。10名の職人を抱え、伝統的な椀や膳だけでなく、モダンなテーブルウェアも手掛ける。",
    challengeDetail: "令和6年能登半島地震により、自宅兼工房が全壊。保管していた木地や完成品、そして何より大切な「漆を乾かすための室（むろ）」を失った。再建には数千万円規模の資金が必要だが、売上はゼロになり、手元の資金だけでは到底賄えない状況だった。",
    editorComment: "「伝統を守る」という気概だけでなく、使える制度を徹底的に調べ、組み合わせる戦略的な動きが印象的。特に、補助金申請と並行してクラウドファンディングを行い、運転資金とファンとの絆を同時に確保した点は、多くの事業者にとって参考になるはずだ。",
    recommendedSupports: [
      {
        category: "資金調達",
        name: "小規模事業者持続化補助金（災害支援枠）",
        description: "販路開拓や業務効率化の取り組みを支援。上限200万円（特例あり）。",
        link: "#"
      },
      {
        category: "雇用維持",
        name: "雇用調整助成金（特例措置）",
        description: "休業手当の一部を助成し、従業員の雇用を守る制度。",
        link: "#"
      }
    ]
  }
];
