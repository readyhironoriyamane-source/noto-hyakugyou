
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
    category: string; // 追加
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
    image: "/noto-rice.webp",
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
    connections: "製材所、工務店、漆器組合、アロマ製品メーカー",
    relatedIndustries: [4, 14],
    visitInfo: {
      hours: "平日9:00〜17:00",
      access: "門前バスターミナルから車で15分",
      contact: "石川県森林組合連合会"
    },
    timeline: {
      past: "藩政時代から植林が奨励され、大切に守り育てられてきた。",
      present: "木材価格の低迷により、林業経営は厳しい状況が続く。",
      future: "建材以外の用途開発（精油、木工品）により、付加価値を高める。"
    },
    deepDive: {
      past: "「総アテの家」を建てることは、能登の人々の夢でありステータスだった。",
      present: "間伐材を利用した割り箸や、葉から抽出した蒸留水など、資源を無駄なく使う取り組みが進む。",
      future: "森林セラピーなど、癒やしの空間としての山の価値も見直されている。"
    },
    actions: [
      { type: "buy", label: "ヒバ精油を購入", link: "#" },
      { type: "support", label: "植林活動に参加", link: "#" }
    ],
    image: "/noto-hiba.jpg",
    seasonalMonths: [3, 4, 5, 10, 11]
  },
  {
    id: 8,
    title: "珠洲焼の陶芸家",
    category: "工芸",
    operator: "山田 創",
    role: "陶芸家",
    location: "珠洲市",
    locationCoords: { lat: 37.43, lng: 137.26 },
    tags: ["黒灰色の焼き物", "中世古陶", "無釉"],
    summary: "平安時代から室町時代にかけて栄え、一度は途絶えた「幻の古陶」。灰黒色の渋い輝きと、力強い造形が魅力。",
    description: "珠洲焼は、釉薬を使わず、高温で焼き締めることで、土そのものの風合いを生かす。\n\n薪窯の中で灰が溶けて自然釉となり、独特の景色を生み出す。花器や酒器として人気があり、使うほどに味わいが増す。",
    history: "中世には日本海側全域に流通したが、戦国時代に忽然と姿を消した。昭和51年に復興。",
    future: "現代のライフスタイルに合った器作りと、海外への発信。",
    necessity: "地域の土と炎が生み出す芸術。文化的な誇りであり、観光客を惹きつける魅力もある。",
    connections: "珠洲焼館、ギャラリー、茶道家、華道家",
    relatedIndustries: [4, 11],
    visitInfo: {
      hours: "9:00〜17:00（年末年始休館）",
      access: "珠洲市街から車で10分",
      contact: "珠洲焼館"
    },
    timeline: {
      past: "中世には日本海側全域に流通したが、戦国時代に忽然と姿を消した。",
      present: "昭和51年の復興以来、多くの作家が珠洲に移住し、創作活動を行っている。",
      future: "現代のライフスタイルに合った器作りと、海外への発信。"
    },
    deepDive: {
      past: "なぜ廃絶したのかは謎に包まれているが、安価な越前焼などの流入が原因という説がある。",
      present: "珠洲焼資料館では、中世の古陶と現代作家の作品を比較して見ることができる。",
      future: "奥能登国際芸術祭などを通じて、アートとしての評価も高まっている。"
    },
    actions: [
      { type: "buy", label: "珠洲焼を購入", link: "#" },
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
    tags: ["幻の和牛", "オレイン酸", "きめ細やかな肉質"],
    summary: "出荷頭数が少なく、県外にはほとんど出回らない「幻の和牛」。とろけるような食感と、甘みのある脂が特徴。",
    description: "能登の美しい自然の中で、ストレスなく育てられた能登牛。\n\n脂肪に含まれるオレイン酸の含有率が高く、口の中でさらりと溶ける。肉質等級A5ランクの出現率も高く、品質の高さは折り紙付きだ。",
    history: "但馬牛をルーツに持ち、長い年月をかけて改良されてきた。",
    future: "増頭対策を進め、県外や海外へも販路を広げる。",
    necessity: "耕作放棄地の放牧利用など、里山の保全にも役立つ。高付加価値な食材として観光を牽引。",
    connections: "JA、精肉店、レストラン、温泉旅館",
    relatedIndustries: [5, 13],
    visitInfo: {
      hours: "見学不可（直営レストランあり）",
      access: "志賀町内",
      contact: "てらおか風舎"
    },
    timeline: {
      past: "但馬牛をルーツに持ち、長い年月をかけて改良されてきた。",
      present: "「能登牛」ブランドの認定基準を厳格化し、品質を守っている。",
      future: "増頭対策を進め、県外や海外へも販路を広げる。"
    },
    deepDive: {
      past: "かつては役牛として農耕に使われていたが、明治以降に肉用牛としての改良が進んだ。",
      present: "繁殖から肥育まで一貫経営を行う農家も増え、トレーサビリティが確立されている。",
      future: "「能登牛プレミアム」など、さらに上位のブランド認定を行い、トップブランドを目指す。"
    },
    actions: [
      { type: "buy", label: "能登牛ステーキを食べる", link: "#" },
      { type: "buy", label: "精肉ギフトを購入", link: "#" }
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
    location: "珠洲市 仁江海岸",
    locationCoords: { lat: 37.46, lng: 137.10 },
    tags: ["重要無形民俗文化財", "手作業", "ミネラル豊富"],
    summary: "日本で唯一、能登に残る原始的な製塩法。海水を砂に撒き、太陽と風の力で乾燥させ、釜で煮詰める。",
    description: "早朝、海から海水を汲み上げ、塩田に撒く「潮撒き」から作業は始まる。\n\n炎天下での重労働だが、出来上がった塩は、海水のミネラルをそのまま含み、まろやかで甘みがある。おにぎりや焼き魚の味を格段に引き立てる。",
    history: "江戸時代、加賀藩の塩手米制度によって保護され、発展した。",
    future: "伝統技術の継承と、塩作り体験を通じた観光振興。",
    necessity: "能登の歴史と風土を象徴する生業。塩は生命維持に不可欠であり、その原点を知る場所として貴重。",
    connections: "道の駅、製塩会社、飲食店",
    relatedIndustries: [3, 8],
    visitInfo: {
      hours: "5月〜9月（9:00〜16:00）",
      access: "すず塩田村バス停下車すぐ",
      contact: "道の駅すず塩田村"
    },
    timeline: {
      past: "江戸時代、加賀藩の塩手米制度によって保護され、発展した。",
      present: "国の重要無形民俗文化財に指定され、観光客にも人気。",
      future: "伝統技術の継承と、塩作り体験を通じた観光振興。"
    },
    deepDive: {
      past: "専売法の施行により一度は途絶えかけたが、文化財として特別に許可され守られた。",
      present: "若い世代が弟子入りし、技術を受け継ごうとする動きもある。",
      future: "塩を使ったバスソルトやスイーツなど、新しい商品開発も盛ん。"
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
    category: "醸造",
    operator: "数馬酒造",
    role: "杜氏",
    location: "能登町 宇出津",
    locationCoords: { lat: 37.30, lng: 137.15 },
    tags: ["能登杜氏", "海洋深層水", "地産地消"],
    summary: "日本四大杜氏の一つ「能登杜氏」の技。豊かな水と米、そして厳しい冬の寒さが、芳醇な美酒を醸す。",
    description: "能登の酒は、濃厚で旨口なのが特徴。新鮮な魚介類や、濃い味付けの郷土料理によく合う。\n\n近年は、地元の米や水にこだわり、テロワール（風土）を表現する酒造りが盛ん。若手杜氏の活躍も目覚ましい。",
    history: "農閑期の出稼ぎとして酒造りが広まり、高度な技術集団「能登杜氏」が形成された。",
    future: "海外輸出の拡大と、酒蔵ツーリズムの推進。",
    necessity: "地域の米を消費し、水を守る産業。祭礼や神事とも深く結びつき、コミュニティの核となる。",
    connections: "酒米農家、酒販店、飲食店、海外バイヤー",
    relatedIndustries: [5, 1],
    visitInfo: {
      hours: "店舗による（試飲・販売あり）",
      access: "宇出津港周辺",
      contact: "能登杜氏組合"
    },
    timeline: {
      past: "農閑期の出稼ぎとして酒造りが広まり、高度な技術集団「能登杜氏」が形成された。",
      present: "特定名称酒（吟醸酒など）の比率が高まり、高品質化が進む。",
      future: "海外輸出の拡大と、酒蔵ツーリズムの推進。"
    },
    deepDive: {
      past: "かつては全国の酒蔵へ杜氏として赴き、その技術を伝えた。",
      present: "耕作放棄地を開墾して酒米を作るなど、農業との連携も深まっている。",
      future: "廃校になった小学校を酒蔵として再生するなど、地域活性化の拠点としても期待される。"
    },
    actions: [
      { type: "buy", label: "地酒飲み比べセット", link: "#" },
      { type: "visit", label: "酒蔵開きに参加", link: "#" }
    ],
    image: "/sake-brewery.jpg",
    seasonalMonths: [11, 12, 1, 2, 3]
  },
  {
    id: 12,
    title: "宇出津港の港湾管理者",
    category: "公務・インフラ",
    operator: "石川県",
    role: "港湾職員",
    location: "能登町 宇出津",
    locationCoords: { lat: 37.30, lng: 137.15 },
    tags: ["物流拠点", "防災", "あばれ祭"],
    summary: "能登半島の物流と交通の要衝・宇出津港。漁船の安全な航行を守り、地域の暮らしを支える縁の下の力持ち。",
    description: "港湾管理者の仕事は多岐にわたる。岸壁の補修、航路の浚渫、入港船舶の調整など、24時間365日、港の機能を維持している。\n\n災害時には、救援物資の受入拠点としても重要な役割を果たす。",
    history: "北前船の寄港地として栄え、古くから能登の玄関口だった。",
    future: "クルーズ船の誘致や、港周辺の賑わい創出。",
    necessity: "物流、漁業、観光の基盤インフラ。地域の安全安心を守る防災拠点としての機能も強化が必要。",
    connections: "漁協、海運会社、海上保安庁、自治体",
    relatedIndustries: [1, 6],
    visitInfo: {
      hours: "平日8:30〜17:15",
      access: "宇出津港湾合同庁舎",
      contact: "石川県奥能登土木総合事務所"
    },
    timeline: {
      past: "北前船の寄港地として栄え、古くから能登の玄関口だった。",
      present: "コンテナ物流の拠点として、また定置網漁船の基地として機能。",
      future: "クルーズ船の誘致や、港周辺の賑わい創出。"
    },
    deepDive: {
      past: "宇出津の町は港を中心に発展し、独特の路地や町並みが形成された。",
      present: "夏の大祭「あばれ祭」では、キリコが港を乱舞し、海と陸が一体となる。",
      future: "「みなとオアシス」として登録され、イベント開催など交流拠点としての活用が進む。"
    },
    actions: [
      { type: "visit", label: "港を散策", link: "#" },
      { type: "support", label: "清掃活動に参加", link: "#" }
    ],
    image: "/port-manager.jpg",
    seasonalMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  },
  {
    id: 13,
    title: "能登町ふれあい公社",
    category: "観光・サービス",
    operator: "一般社団法人",
    role: "施設運営",
    location: "能登町",
    locationCoords: { lat: 37.30, lng: 137.15 },
    tags: ["地域商社", "宿泊施設", "特産品開発"],
    summary: "宿泊施設「ホテルのときんぷら」や観光施設を運営。地域の魅力を発信し、外貨を稼ぐ地域商社としての役割も。",
    description: "観光客をもてなすだけでなく、地域の雇用を生み出し、特産品を開発して販売する。\n\n地域住民の交流の場も提供し、住みよい町づくりに貢献している。能登のファンを増やし、関係人口を創出する最前線だ。",
    history: "旧柳田村の第3セクターとして設立され、合併後も活動を継続。",
    future: "ワーケーションや移住定住の促進サポート。",
    necessity: "民間だけでは維持が難しい観光インフラを支える。地域の稼ぐ力を高めるための司令塔。",
    connections: "町役場、生産者、旅行会社、地域住民",
    relatedIndustries: [2, 9],
    visitInfo: {
      hours: "施設による",
      access: "能登町内各所",
      contact: "能登町ふれあい公社事務局"
    },
    timeline: {
      past: "旧柳田村の第3セクターとして設立され、合併後も活動を継続。",
      present: "ブルーベリー商品など、ヒット商品を数多く生み出している。",
      future: "ワーケーションや移住定住の促進サポート。"
    },
    deepDive: {
      past: "「柳田植物公園」の整備など、グリーンツーリズムの先駆けとして活動。",
      present: "ふるさと納税の返礼品開発など、町の財源確保にも貢献。",
      future: "DMO（観光地域づくり法人）としての機能を強化し、広域的な観光戦略を担う。"
    },
    actions: [
      { type: "visit", label: "ホテルに宿泊", link: "#" },
      { type: "buy", label: "特産品ギフト", link: "#" }
    ],
    image: "/tsukumall.jpg",
    seasonalMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  },
  {
    id: 101,
    title: "輪島塗の塗師",
    category: "伝統工芸",
    operator: "桐本 泰一",
    role: "塗師",
    location: "輪島市",
    locationCoords: { lat: 37.39, lng: 136.90 },
    tags: ["伝統的工芸品", "堅牢優美", "分業制"],
    summary: "124工程にも及ぶ手作業を経て作られる「輪島塗」。その堅牢さと美しさは、世界中の人々を魅了する。",
    description: "輪島塗は、木地師、下地師、研物師、塗師、蒔絵師、沈金師など、多くの職人の分業によって支えられている。\n\n塗師は、その最終工程を担い、漆を塗り重ねて仕上げる。埃一つ許されない緊張感の中で、鏡のような美しい塗面が生み出される。",
    history: "室町時代から続く伝統があり、北前船によって全国へ広まった。",
    future: "現代のライフスタイルに合わせた商品開発と、海外展開。",
    necessity: "日本の美意識を象徴する工芸品。地域の雇用と文化を守るためにも、継承が不可欠。",
    connections: "漆掻き職人、道具職人、百貨店、デザイナー",
    relatedIndustries: [7, 8],
    visitInfo: {
      hours: "工房による（見学は要予約）",
      access: "輪島塗会館周辺",
      contact: "輪島漆器商工業協同組合"
    },
    timeline: {
      past: "室町時代から続く伝統があり、北前船によって全国へ広まった。",
      present: "震災により甚大な被害を受けたが、復興に向けて歩み始めている。",
      future: "現代のライフスタイルに合わせた商品開発と、海外展開。"
    },
    deepDive: {
      past: "「輪島六職」と呼ばれる分業システムが確立され、高品質な漆器を量産できた。",
      present: "後継者不足や原材料の確保難など、課題は山積している。",
      future: "建築内装やファッションなど、異分野とのコラボレーションも進んでいる。"
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
      color: "red"
    },
    keyPoints: [
      "震災で工房が全壊し、事業継続が危ぶまれた",
      "「なりわい再建支援補助金」を活用し、仮設工房を建設",
      "伝統を絶やさないという強い意志で、再開を果たした"
    ],
    jobDescription: "輪島塗の塗師として、代々受け継がれてきた技法を守りながら、椀や膳などの漆器を製作。近年は海外のデザイナーとも協業し、新しい漆の可能性を追求している。",
    challengeDetail: "令和6年能登半島地震により、自宅兼工房が全壊。保管していた漆や道具類も瓦礫の下となり、事業再開の目処が立たない状況に追い込まれた。特に、高額な設備投資が必要な漆器作りにおいて、資金面での不安が大きかった。",
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
      outcome: "補助金の交付決定を受け、仮設工房が完成。新しい道具も少しずつ揃い、製作を再開することができた。震災前と同じ品質のものを作るにはまだ時間がかかるが、「輪島塗は不滅」というメッセージを世界に発信し続けている。"
    },
    supportMenu: {
      name: "なりわい再建支援補助金",
      description: "施設・設備の復旧費用を最大3/4（定額補助あり）支援する制度",
      link: "#"
    },
    editorComment: "伝統工芸の復興は、単なる事業再開以上の意味を持ちます。地域の誇りを取り戻すプロセスそのものです。補助金を活用してハード面を整えつつ、クラウドファンディングでファンとの絆（ソフト面）を深めた点が、再建の鍵となりました。",
    recommendedSupports: [
      {
        category: "資金調達",
        name: "小規模事業者持続化補助金",
        description: "販路開拓や業務効率化の取り組みを支援。最大200万円（災害支援枠）。",
        link: "#"
      },
      {
        category: "相談窓口",
        name: "よろず支援拠点",
        description: "経営上のあらゆる悩みに、専門家が無料で何度でも相談に乗ってくれる。",
        link: "#"
      }
    ]
  }
];
