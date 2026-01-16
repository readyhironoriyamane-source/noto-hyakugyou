

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
  challengeCard?: string;
  keyPoints?: string[];
  selectedSupport?: {
    name: string;
    description: string;
    link: string;
  };
  jobDescription?: string;
  challengeDescription?: string;
  supportOptions?: string[];
  reasonForSelection?: string;
  actionTaken?: string;
  changes?: string;
  futureSupport?: string;
  writerComment?: string;
  recommendedSupports?: {
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
    seasonalMonths: [6, 7, 8, 9, 10, 11, 12, 1],
    highlightPhrases: [
      "船凍イカ",
      "日本三大イカ釣り港",
      "大黒柱",
      "一攫千金",
      "世界へ"
    ]
  },
  {
    id: 2,
    title: "赤崎のイチゴ農家",
    category: "農業",
    operator: "松本 恵子",
    role: "農園主",
    location: "能登町 赤崎",
    locationCoords: { lat: 37.32, lng: 137.20 },
    tags: ["露地栽培", "石垣イチゴ", "観光農園"],
    summary: "日本海を望む斜面で、太陽と潮風を浴びて育つ赤崎イチゴ。甘みと酸味のバランスが絶妙な、初夏の味覚。",
    necessity: "限られた時期しか味わえない露地栽培のイチゴは、季節の訪れを告げる地域の宝。観光資源としても重要。",
    connections: "地元の菓子店、観光協会、ジャム加工場",
    relatedIndustries: [13],
    visitInfo: {
      hours: "5月下旬〜6月中旬（収穫体験）",
      access: "宇出津港から車で15分",
      website: "https://noto-town.jp"
    },
    timeline: {
      past: "戦後、傾斜地を利用して栽培が始まり、地域の名産品として定着した。",
      present: "高齢化による担い手不足の中、観光農園としてファンを増やしている。",
      future: "加工品開発を進め、通年で赤崎イチゴの魅力を発信したい。"
    },
    deepDive: {
      past: "赤崎の急峻な斜面は、水はけが良く日当たりも抜群。先人たちは石垣を組んで段々畑を作り、一株一株丁寧にイチゴを植えた。それは厳しい地形を恵みに変える知恵だった。",
      present: "ハウス栽培が主流の現代において、露地栽培にこだわる赤崎イチゴ。小粒ながら味が濃く、昔ながらの「イチゴらしい」酸味が特徴。収穫時期は短いが、その希少性が人を惹きつける。",
      future: "「この景色と味を残したい」。若手農家や移住者を受け入れ、栽培技術を継承。カフェ併設やオーナー制度など、新しい農業の形にも挑戦している。"
    },
    actions: [
      { type: "visit", label: "イチゴ狩りを予約", link: "#" },
      { type: "buy", label: "ジャムを購入", link: "#" }
    ],
    image: "/strawberry-farm.jpg",
    seasonalMonths: [5, 6],
    highlightPhrases: [
      "露地栽培",
      "石垣",
      "恵みに変える知恵",
      "希少性",
      "景色と味を残したい"
    ]
  },
  {
    id: 3,
    title: "いしり職人",
    category: "食品加工",
    operator: "カネイシ商店",
    role: "醸造責任者",
    location: "能登町 小木",
    locationCoords: { lat: 37.30, lng: 137.23 },
    tags: ["発酵食", "魚醤", "伝統製法"],
    summary: "イカの内臓を塩漬けにし、数年かけて発酵・熟成させる能登の魚醤「いしり」。深いコクと旨味は、能登の食卓に欠かせない。",
    necessity: "地域の余剰資源を有効活用するSDGsな調味料。独特の食文化を支える味のベースとして不可欠。",
    connections: "イカ釣り漁師、飲食店、発酵料理研究家",
    relatedIndustries: [1],
    visitInfo: {
      hours: "平日 9:00-17:00",
      access: "小木港近く",
      website: "https://kaneishi.com"
    },
    timeline: {
      past: "各家庭で自家製のいしりが作られ、それぞれの家の味があった。",
      present: "製造元の減少により、専業メーカーが伝統の味を守り継いでいる。",
      future: "海外のシェフからも注目されており、万能調味料として世界へ発信。"
    },
    deepDive: {
      past: "冷蔵庫のない時代、大量に獲れたイカを無駄にしないために生まれた知恵。樽の中で四季を越し、じっくりと発酵することで、魚の生臭さが芳醇な旨味へと変化する。",
      present: "仕込みは寒い冬に行われる。材料はイカと塩のみ。添加物を一切使わず、自然の力と時間だけが作り出す味。近年は隠し味としての使いやすさが見直されている。",
      future: "「いしり」の可能性は無限大。イタリアンやフレンチとのコラボレーション、手軽なドレッシング開発など、伝統を守りながら新しい食のシーンを切り拓く。"
    },
    actions: [
      { type: "buy", label: "いしりを購入", link: "#" },
      { type: "visit", label: "蔵見学に申し込む", link: "#" }
    ],
    image: "/ishiri-new.jpg",
    seasonalMonths: [1, 2, 11, 12],
    highlightPhrases: [
      "発酵・熟成",
      "SDGs",
      "家の味",
      "自然の力と時間",
      "無限大"
    ]
  },
  {
    id: 4,
    title: "能登瓦の屋根職人",
    category: "建築・工芸",
    operator: "瓦寅工業",
    role: "瓦葺き職人",
    location: "七尾市",
    locationCoords: { lat: 37.04, lng: 136.96 },
    tags: ["黒瓦", "景観保全", "耐寒性"],
    summary: "能登の風景を彩る、艶やかな黒瓦。厳しい冬の寒さや海風に耐え抜く強さと美しさを、職人の技が支えている。",
    necessity: "能登の気候風土に最適化された建材であり、美しい里山の景観を形成する重要な要素。",
    connections: "珠洲焼作家、建築家、古民家再生団体",
    relatedIndustries: [8, 7],
    visitInfo: {
      contact: "石川県瓦工事協同組合"
    },
    timeline: {
      past: "北前船で運ばれた瓦文化が独自に進化し、釉薬を使った黒瓦が定着。",
      present: "震災での被害を受け、軽量化や施工方法の改良が進められている。",
      future: "災害に強い屋根作りと、伝統的な景観美の両立を目指す。"
    },
    deepDive: {
      past: "能登の冬は湿気が多く、凍害が起きやすい。高温で焼き締め、釉薬をかけた能登瓦は、水分を吸わず割れにくい。その黒く光る屋根は、豊かさの象徴でもあった。",
      present: "地震による家屋倒壊で瓦の重さが指摘されたが、瓦自体が悪いわけではない。ガイドラインに沿った正しい施工を行えば、地震にも台風にも強い。職人たちは信頼回復に奔走している。",
      future: "「瓦の文化を絶やさない」。廃瓦を砕いて道路舗装材や庭の砂利として再利用する取り組みや、現代建築にマッチする新しいデザイン瓦の開発など、挑戦は続く。"
    },
    actions: [
      { type: "support", label: "復興支援募金", link: "#" },
      { type: "join", label: "ボランティア参加", link: "#" }
    ],
    image: "/kawara-craftsman.jpg",
    seasonalMonths: [4, 5, 6, 7, 8, 9, 10],
    highlightPhrases: [
      "艶やかな黒瓦",
      "気候風土に最適化",
      "豊かさの象徴",
      "信頼回復",
      "再利用"
    ]
  },
  {
    id: 5,
    title: "能登米農家",
    category: "農業",
    operator: "白米千枚田愛耕会",
    role: "保全活動家",
    location: "輪島市 白米町",
    locationCoords: { lat: 37.42, lng: 137.00 },
    tags: ["世界農業遺産", "棚田", "コシヒカリ"],
    summary: "日本海に面した急斜面に広がる千枚田。小さな田んぼ一枚一枚に、耕作の苦労と収穫の喜び、そして景観を守る誇りが詰まっている。",
    necessity: "棚田は米を作るだけでなく、保水機能による土砂崩れ防止や、多様な生態系の維持に貢献している。",
    connections: "棚田オーナー、ボランティア、酒蔵",
    relatedIndustries: [11],
    visitInfo: {
      hours: "見学自由（ライトアップ期間あり）",
      access: "輪島市街から車で20分",
      website: "http://senmaida.wajima-kankou.jp"
    },
    timeline: {
      past: "機械が入らない狭い田んぼを、手作業で守り続けてきた。",
      present: "地震で亀裂が入るなど甚大な被害を受けたが、復旧作業が進む。",
      future: "オーナー制度などを通じて関係人口を増やし、未来へつなぐ。"
    },
    deepDive: {
      past: "「田植えしたのが九百九十九枚、あとの一枚蓑の下」。蓑の下に隠れるほど小さな田んぼまで大切にしてきた先人たちの執念と愛情が、この絶景を作り上げた。",
      present: "震災により、棚田のあちこちに亀裂が走り、水が張れない状況に。それでも「ここを荒れ地にはしない」と、ボランティアと共に修復作業が続く。今年の田植えは、復興のシンボルだ。",
      future: "千枚田は能登の原風景。農業としての効率は悪くても、ここにはお金に換えられない価値がある。世界中から愛されるこの場所を、次の1000年も残していくために。"
    },
    actions: [
      { type: "join", label: "オーナーになる", link: "#" },
      { type: "support", label: "保全活動に寄付", link: "#" }
    ],
    image: "/noto-rice.webp",
    seasonalMonths: [5, 9, 10],
    highlightPhrases: [
      "世界農業遺産",
      "景観を守る誇り",
      "執念と愛情",
      "復興のシンボル",
      "お金に換えられない価値"
    ]
  },
  {
    id: 6,
    title: "定置網漁師",
    category: "漁業",
    operator: "七尾湾漁協",
    role: "網元",
    location: "七尾市 崎山",
    locationCoords: { lat: 37.08, lng: 137.02 },
    tags: ["天然の生簀", "寒ブリ", "資源管理"],
    summary: "穏やかな七尾湾に仕掛けられた定置網。魚の通り道を読み、入ってきた魚の一部をいただく「待ちの漁」は、持続可能な漁業の原点。",
    necessity: "乱獲を防ぎ、海の資源を守りながら安定的に魚を供給する定置網漁は、SDGsの観点からも再評価されている。",
    connections: "市場仲買人、寿司店、水産加工場",
    relatedIndustries: [1, 3],
    visitInfo: {
      hours: "早朝の水揚げ見学可（要予約）",
      contact: "石川県定置漁業協会"
    },
    timeline: {
      past: "経験と勘を頼りに網を張り、大漁を神に祈った。",
      present: "魚群探知機や海況データを活用し、効率的かつ科学的な漁へ。",
      future: "スマート水産業の導入で、省力化と高付加価値化を目指す。"
    },
    deepDive: {
      past: "定置網は、魚を根こそぎ獲るのではなく、網に入った魚だけを獲る。網の目より小さい魚は逃げられる仕組みだ。これは「海から利子だけをいただく」という、能登の漁師の哲学でもある。",
      present: "冬の寒ブリは「能登の宝」。脂の乗ったブリが網に入ると、港は活気づく。しかし、海水温の上昇など環境変化の影響も。漁師たちは海の変化を敏感に感じ取っている。",
      future: "「海を休ませる」ことも漁師の仕事。植林活動による森づくりや、未利用魚の活用など、海全体の豊かさを守る活動に取り組み、孫の代まで魚が獲れる海を残す。"
    },
    actions: [
      { type: "buy", label: "鮮魚セット購入", link: "#" },
      { type: "visit", label: "漁師体験", link: "#" }
    ],
    image: "/fixed-net-fishing.jpg",
    seasonalMonths: [11, 12, 1, 2],
    highlightPhrases: [
      "待ちの漁",
      "持続可能",
      "海から利子だけをいただく",
      "能登の宝",
      "海を休ませる"
    ]
  },
  {
    id: 7,
    title: "能登ヒバ林業家",
    category: "林業",
    operator: "アテの会",
    role: "山守",
    location: "輪島市 門前",
    locationCoords: { lat: 37.28, lng: 136.75 },
    tags: ["県木アテ", "耐久性", "森林浴"],
    summary: "「能登ヒバ（アテ）」は、湿気に強く腐りにくい最強の建築材。親子三代、百年かけて育てた森は、地域の家と水を守っている。",
    necessity: "適切な間伐と手入れは、健全な森を維持し、土砂災害を防ぐために不可欠。ヒバの抗菌作用は現代の生活にも有用。",
    connections: "製材所、工務店、アロマ製品作家",
    relatedIndustries: [4, 8],
    visitInfo: {
      access: "門前町中心部から車で20分"
    },
    timeline: {
      past: "植林から伐採まで数十年。孫のために木を植えてきた。",
      present: "安価な輸入材に押される中、ヒバの機能性（抗菌・防虫）をPR。",
      future: "建材だけでなく、精油やバイオマスなど多角的な活用へ。"
    },
    deepDive: {
      past: "能登の山は急峻で、機械化が難しい。それでも先人たちは、一本一本丁寧に枝打ちをし、真っ直ぐで節の少ない良材を育ててきた。その山は、緑のダムとして地域を守ってきた。",
      present: "ヒバに含まれる「ヒノキチオール」は、カビやシロアリに強い。この特性を活かし、住宅の土台や内装材として再注目。癒やしの香りも人気で、アロマオイルとしての需要も増えている。",
      future: "「木を使うことは、森を守ること」。切って、使って、また植える。この循環を取り戻すため、木育イベントや家具作りワークショップを開催し、木の魅力を伝えている。"
    },
    actions: [
      { type: "buy", label: "ヒバ製品を購入", link: "#" },
      { type: "join", label: "植林体験", link: "#" }
    ],
    image: "/noto-hiba.jpg",
    seasonalMonths: [3, 4, 5, 10, 11],
    highlightPhrases: [
      "最強の建築材",
      "百年かけて",
      "緑のダム",
      "ヒノキチオール",
      "循環を取り戻す"
    ]
  },
  {
    id: 8,
    title: "珠洲焼の陶芸家",
    category: "工芸",
    operator: "珠洲焼館",
    role: "作家",
    location: "珠洲市",
    locationCoords: { lat: 37.43, lng: 137.25 },
    tags: ["黒灰色の焼き物", "中世古陶", "還元炎焼成"],
    summary: "一度は途絶えた「幻の古陶」珠洲焼。釉薬を使わず、薪窯で焼き締めることで生まれる力強い黒灰色は、土と炎の芸術。",
    necessity: "地域の土を使い、地域の文化を表現する珠洲焼は、珠洲のアイデンティティそのもの。芸術祭などを通じて交流人口を生む。",
    connections: "茶道家、華道家、料理人、能登瓦職人",
    relatedIndustries: [4],
    visitInfo: {
      hours: "9:00-17:00",
      access: "珠洲市街から車で10分",
      website: "https://suzuyaki.org"
    },
    timeline: {
      past: "中世に日本海側全域で使われたが、戦国時代に忽然と姿を消した。",
      present: "昭和50年代に復興。現代の作家たちが新しい感性で創作。",
      future: "震災で多くの窯が壊れたが、不屈の精神で再建を目指す。"
    },
    deepDive: {
      past: "珠洲の土は鉄分を多く含む。これを酸素を遮断して焼く（還元炎焼成）ことで、独特の須恵器のような黒灰色になる。中世には生活雑器として広く流通していた実用の器だった。",
      present: "復興から半世紀。現代の珠洲焼は、オブジェから日常食器まで多様化。花が長持ちすると言われ、花器としても人気が高い。作家それぞれの個性が光る。",
      future: "地震で登り窯の多くが崩壊し、作品も割れた。しかし、「土がある限り、また作れる」。作家たちは欠けた器を「呼び継ぎ」で蘇らせたり、瓦礫の中から土を集めたりして、創作の火を絶やさない。"
    },
    actions: [
      { type: "buy", label: "作品を購入", link: "#" },
      { type: "support", label: "窯再建支援", link: "#" }
    ],
    image: "/suzu-ware.jpg",
    seasonalMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    highlightPhrases: [
      "幻の古陶",
      "土と炎の芸術",
      "アイデンティティ",
      "実用の器",
      "創作の火"
    ]
  },
  {
    id: 9,
    title: "能登牛の畜産農家",
    category: "畜産",
    operator: "てらおか風舎",
    role: "肥育農家",
    location: "志賀町",
    locationCoords: { lat: 37.13, lng: 136.76 },
    tags: ["幻の和牛", "オレイン酸", "里山放牧"],
    summary: "出荷頭数が少なく「幻の和牛」と呼ばれる能登牛。能登の美しい自然と水で育まれた肉は、とろけるような食感と甘い脂が特徴。",
    necessity: "耕作放棄地の放牧利用など、里山の維持管理にも貢献。高付加価値なブランド牛は地域の稼ぐ力になる。",
    connections: "精肉店、レストラン、獣医師",
    relatedIndustries: [5],
    visitInfo: {
      hours: "レストランにて提供",
      website: "https://notoushi.net"
    },
    timeline: {
      past: "役牛として飼われていた牛を、肉用牛として改良。",
      present: "品質の高さが評価され、ブランド化に成功。増頭が課題。",
      future: "繁殖から肥育までの一貫経営を増やし、安定供給を目指す。"
    },
    deepDive: {
      past: "能登の農家にとって、牛は家族同然の働き手だった。その愛情深い飼育環境が、現在の能登牛の質の高さ（オレイン酸含有量の多さ）につながっている。",
      present: "「和牛のオリンピック」で特別賞を受賞するなど、評価はうなぎ登り。しかし、生産者の高齢化と震災の影響で、存続の危機も。若手生産者がICT技術などを導入し、省力化に挑んでいる。",
      future: "「能登牛を食べて能登を応援」。地産地消だけでなく、東京や大阪のレストランでも提供され、能登の美食をPRするアンバサダー的な役割を果たしていく。"
    },
    actions: [
      { type: "buy", label: "能登牛ギフト購入", link: "#" },
      { type: "visit", label: "レストラン予約", link: "#" }
    ],
    image: "/noto-beef.jpg",
    seasonalMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    highlightPhrases: [
      "幻の和牛",
      "とろけるような食感",
      "稼ぐ力",
      "家族同然",
      "アンバサダー"
    ]
  },
  {
    id: 10,
    title: "揚げ浜式製塩",
    category: "食品加工",
    operator: "奥能登塩田村",
    role: "浜士",
    location: "珠洲市 仁江",
    locationCoords: { lat: 37.48, lng: 137.12 },
    tags: ["重要無形民俗文化財", "手作業", "ミネラル豊富"],
    summary: "江戸時代から続く、日本で唯一の「揚げ浜式」製塩。海水を砂に撒き、天日で乾かす。気の遠くなるような作業から、甘みのある塩が生まれる。",
    necessity: "効率を度外視してでも守るべき文化遺産。この塩作りがあるからこそ、能登の里海は特別な場所であり続けている。",
    connections: "観光客、料理人、漬物業者",
    relatedIndustries: [1, 2, 5],
    visitInfo: {
      hours: "5月〜9月（塩作り体験）",
      access: "道の駅すず塩田村",
      website: "https://enden.jp"
    },
    timeline: {
      past: "加賀藩の塩手米制度により、能登の沿岸部で盛んに行われた。",
      present: "専売法の廃止後、復活。観光と実益を兼ねた生業として定着。",
      future: "後継者育成と、塩の付加価値向上（バスソルトなど）へ。"
    },
    deepDive: {
      past: "「浜士（はまじ）」と呼ばれる職人が、重い桶を担いで海水を汲み、砂浜に撒く。太陽と風で乾いた砂を集め、海水をかけて「かん水」を採る。そして釜で煮詰める。すべてが人力、自然任せ。",
      present: "地盤隆起により海岸線が遠のき、海水を汲むのが困難に。それでも職人たちはポンプを使わず、新しい浜を作って塩作りを再開しようとしている。「この味が待っている人がいるから」。",
      future: "揚げ浜塩は、ただしょっぱいだけでなく、海そのものの味がする。おにぎりや焼き魚、シンプルな料理ほどその真価を発揮する。この塩を次世代に残すことは、能登の人の粘り強さを残すことだ。"
    },
    actions: [
      { type: "buy", label: "揚げ浜塩を購入", link: "#" },
      { type: "visit", label: "塩作り体験", link: "#" }
    ],
    image: "/salt-making.jpg",
    seasonalMonths: [5, 6, 7, 8, 9],
    highlightPhrases: [
      "日本で唯一",
      "気の遠くなるような作業",
      "文化遺産",
      "すべてが人力",
      "海そのものの味"
    ]
  },
  {
    id: 11,
    title: "能登の酒蔵杜氏",
    category: "醸造",
    operator: "数馬酒造",
    role: "杜氏",
    location: "能登町 宇出津",
    locationCoords: { lat: 37.30, lng: 137.15 },
    tags: ["能登杜氏", "地産地消", "耕作放棄地再生"],
    summary: "日本四大杜氏の一つ「能登杜氏」の技を受け継ぐ。地元の米、地元の水、そして地元の人が醸す酒は、能登の風土そのもの。",
    necessity: "酒造りは地域の農業を守り、祭りを支え、コミュニティの潤滑油となる。復興の祝杯を挙げるその日まで、酒を造り続ける。",
    connections: "酒米農家、飲食店、デザイナー",
    relatedIndustries: [5, 1],
    visitInfo: {
      hours: "直売所あり",
      website: "https://chikuha.co.jp"
    },
    timeline: {
      past: "農閑期の出稼ぎとして酒造技術が磨かれ、全国へ輩出した。",
      present: "若手蔵元を中心に、オール能登での酒造りに回帰。",
      future: "海外輸出や、熟成酒など新しい価値の創造。"
    },
    deepDive: {
      past: "能登杜氏の酒は「濃厚で芳醇」。濃い味付けの郷土料理や、新鮮な魚介類に負けない力強さがある。厳しい冬の寒さが、酒造りには最適な環境だった。",
      present: "震災で多くの酒蔵が全壊・半壊。仕込み中のタンクも倒れた。しかし、蔵元たちは互いに助け合い、委託醸造（共同醸造）で銘柄を守った。「能登の酒を絶やさない」という執念。",
      future: "耕作放棄地を開墾して酒米を作るなど、酒造りを通じた地域課題解決に取り組む。能登の酒は、単なる嗜好品を超えて、地域を醸すメディアになっている。"
    },
    actions: [
      { type: "buy", label: "能登の酒を購入", link: "#" },
      { type: "support", label: "蔵元支援募金", link: "#" }
    ],
    image: "/sake-brewery.jpg",
    seasonalMonths: [12, 1, 2, 3],
    highlightPhrases: [
      "能登杜氏",
      "風土そのもの",
      "コミュニティの潤滑油",
      "互いに助け合い",
      "地域を醸す"
    ]
  },
  {
    id: 12,
    title: "宇出津港の港湾管理者",
    category: "インフラ",
    operator: "石川県",
    role: "管理者",
    location: "能登町 宇出津",
    locationCoords: { lat: 37.30, lng: 137.15 },
    tags: ["物流拠点", "防災", "あばれ祭り"],
    summary: "能登の海の玄関口・宇出津港。漁船の安全を守り、物流を支え、時には祭りの舞台となる港を、裏方として支え続ける。",
    necessity: "港が機能しなければ、漁業も物流も止まる。災害時には救援物資の受入拠点としても生命線となる。",
    connections: "漁協、海運会社、建設業者",
    relatedIndustries: [1, 6],
    visitInfo: {
      access: "宇出津中心部"
    },
    timeline: {
      past: "北前船の寄港地として栄え、地域の中心地として発展。",
      present: "岸壁の復旧と、機能強化（耐震化）を進める。",
      future: "賑わい空間としての港湾整備（みなとオアシス）。"
    },
    deepDive: {
      past: "宇出津は「あばれ祭り」の町。港は神輿が海や川に入るクライマックスの舞台であり、町民の魂の拠り所。港の歴史は、町の歴史そのものだ。",
      present: "地震と津波で岸壁が崩れ、地盤が隆起した。一刻も早い復旧のため、昼夜を問わず工事が続く。漁師が安心して船を出せるように、船が入れる深さを確保することが最優先。",
      future: "「海と生きる町」のシンボルとして。釣り公園やイベント広場を整備し、人が集まる港へ。防災機能を強化しつつ、日常の憩いの場としても愛される港を目指す。"
    },
    actions: [
      { type: "visit", label: "あばれ祭りを見学", link: "#" },
      { type: "support", label: "港周辺の清掃", link: "#" }
    ],
    image: "/port-manager.jpg",
    seasonalMonths: [7],
    highlightPhrases: [
      "海の玄関口",
      "生命線",
      "魂の拠り所",
      "最優先",
      "海と生きる町"
    ]
  },
  {
    id: 13,
    title: "能登町ふれあい公社",
    category: "観光・地域商社",
    operator: "一般社団法人",
    role: "地域プロデューサー",
    location: "能登町",
    locationCoords: { lat: 37.30, lng: 137.10 },
    tags: ["道の駅", "特産品開発", "移住定住"],
    summary: "能登の「いいもの」を発掘し、磨き上げ、届ける。道の駅や宿泊施設の運営を通じて、地域の魅力を発信する総合プロデューサー。",
    necessity: "個々の事業者では難しい販路開拓や商品開発を担い、地域全体で稼ぐ仕組みを作るプラットフォーム。",
    connections: "農家、漁師、職人、観光客",
    relatedIndustries: [2, 9, 10],
    visitInfo: {
      hours: "各施設による",
      website: "https://noto-fureai.jp"
    },
    timeline: {
      past: "行政の補完的な役割からスタート。",
      present: "指定管理だけでなく、自主事業で収益を上げる組織へ。",
      future: "DMO（観光地域づくり法人）として、地域の司令塔に。"
    },
    deepDive: {
      past: "過疎化が進む中、地域の雇用を守り、特産品を販売する拠点として「道の駅」などが整備された。公社はそれらを運営し、地域のお母さんたちの働く場を作ってきた。",
      present: "震災で観光客は激減したが、全国からの支援物資の拠点として、また復興ボランティアの宿泊先として機能。地域の「縁の下の力持ち」としての役割を果たしている。",
      future: "「能登はやさしや土までも」。この言葉通りの温かいおもてなしと、ここでしか味わえない体験を提供し、再び観光客で賑わう能登を取り戻す。そのための新しいツアーや商品を企画中。"
    },
    actions: [
      { type: "buy", label: "特産品セット購入", link: "#" },
      { type: "visit", label: "宿泊施設を利用", link: "#" }
    ],
    image: "/tsukumall.jpg",
    seasonalMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    highlightPhrases: [
      "いいもの",
      "総合プロデューサー",
      "プラットフォーム",
      "縁の下の力持ち",
      "能登はやさしや土までも"
    ]
  },
  {
    id: 101,
    isCaseStudy: true,
    title: "輪島塗の塗師",
    category: "工芸",
    operator: "桐本 匠",
    role: "塗師",
    location: "輪島市 河井町",
    locationCoords: { lat: 37.39, lng: 136.90 },
    tags: ["伝統工芸", "震災復興", "なりわい補助金"],
    summary: "1000年の歴史を誇る輪島塗。震災で工房と道具を失った塗師が、伝統の灯を消さないために選んだ再建への道。",
    necessity: "輪島塗は能登の誇りであり、日本の宝。一度途絶えれば二度と戻らない技術を守るため、今こそ再建が必要。",
    connections: "輪島漆器商工業協同組合、木地師、蒔絵師、沈金師、全国の支援者",
    relatedIndustries: [4], // 能登瓦の屋根職人
    visitInfo: {
      hours: "仮設工房にて見学可能（要予約）",
      access: "のと里山海道・能登空港ICより車で約40分",
      contact: "桐本漆器店 TEL: 0768-22-xxxx"
    },
    timeline: {
      past: "代々続く塗師の家系。分業制の中で塗りの工程を一手に担ってきた。",
      present: "震災で工房が全壊。仮設工房での再開に向け、道具を一つずつ揃えている。",
      future: "新しい工房で、震災前以上の作品を作り上げる。若手育成にも力を入れる。"
    },
    deepDive: {
      past: "輪島塗は、木地、塗り、加飾という多くの工程を専門の職人が分担して作り上げる総合芸術。桐本家は代々「塗り」を担当する塗師として、漆の精製から上塗りまでを行ってきた。埃一つ許されない緊張感の中で、漆を塗り重ねていく作業は、まさに精神修養そのもの。長年使い込んだ刷毛やヘラは、職人の手の一部となっていた。",
      present: "1月の地震と火災により、朝市通り近くにあった工房は全焼。代々受け継いできた道具も、乾燥中の作品もすべて灰になった。一時は廃業も頭をよぎったが、「輪島の灯を消さないで」という全国からの声に励まされ、再起を決意。現在は仮設住宅で暮らしながら、少しずつ道具を買い揃え、仮設工房での作業再開を準備している。",
      future: "「なりわい再建支援補助金」を活用し、新しい工房を建設する計画が進んでいる。単に元に戻すだけでなく、見学スペースを設けて観光客との接点を作ったり、若手職人が住み込みで修行できる環境を整えたりと、次世代につなぐための新しい試みも考えている。10年後、復興した輪島の街で、再び美しい漆器が輝く日を夢見ている。"
    },
    actions: [
      { type: "buy", label: "復興応援品を購入", link: "#" },
      { type: "support", label: "クラウドファンディング", link: "#" },
      { type: "visit", label: "仮設工房を見学", link: "#" }
    ],
    image: "/wajima-nuri.jpg",
    gallery: [
      "/wajima-nuri.jpg",
      "/wajima-tools.jpg",
      "/wajima-kasetu.jpg"
    ],
    seasonalMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    
    // 新しい構成のためのフィールド
    challengeCard: "資金繰りが厳しい",
    keyPoints: [
      "工房・道具の全焼からの再起",
      "なりわい再建支援補助金の活用",
      "伝統技術の継承と革新"
    ],
    selectedSupport: {
      name: "なりわい再建支援補助金",
      description: "施設・設備の復旧費用を最大3/4（定額補助あり）支援する制度",
      link: "https://www.pref.ishikawa.lg.jp/kinyu/nariwai/nariwai.html"
    },
    jobDescription: "輪島塗の「塗り」の工程を担当。木地に漆を塗り重ね、堅牢で美しい漆器の素地を作る仕事。気温や湿度に合わせて漆の調合を変える繊細な技術が求められる。",
    challengeDescription: "震災による火災で工房と自宅が全焼。代々受け継いできた道具、材料の漆、乾燥中の商品すべてを失った。再建には数千万円規模の資金が必要だが、売上が立たない中での借入には限界があった。",
    supportOptions: [
      "小規模事業者持続化補助金（災害支援枠）",
      "自治体の独自支援金",
      "なりわい再建支援補助金",
      "クラウドファンディング"
    ],
    reasonForSelection: "工房の建設と高額な設備の導入には、補助上限額が高く、補助率も手厚い「なりわい再建支援補助金」が不可欠だった。また、グループ補助金ではなく単独申請が可能になったことも決め手となった。",
    actionTaken: "商工会議所の指導員と相談しながら、被害状況の証明書類を揃え、事業計画書を作成。同時に、仮設工房の場所探しや、道具職人への発注を行った。全国の顧客に向けてSNSで現状を発信し、クラウドファンディングも並行して実施した。",
    changes: "補助金の交付決定により、金融機関からのつなぎ融資がスムーズに受けられ、仮設工房の建設に着手できた。失った道具も少しずつ揃い始め、半年ぶりに刷毛を握ることができた。「もう一度やれる」という希望が、日々の活力になっている。",
    futureSupport: "販路開拓のための「IT導入補助金」や、若手職人を雇用するための「キャリアアップ助成金」の活用を検討中。",
    writerComment: "伝統工芸の復興は、単なるモノの再生ではなく、地域の魂の再生です。桐本さんの決断は、多くの職人に勇気を与えています。補助金はあくまで「きっかけ」であり、それをどう活かすかは事業者の情熱次第だと改めて感じました。",
    recommendedSupports: [
      {
        name: "伝統的工芸品産業支援補助金",
        description: "後継者育成や原材料確保などを支援",
        link: "#"
      },
      {
        name: "石川県伝統工芸事業者緊急支援金",
        description: "道具や原材料の購入費を助成",
        link: "#"
      }
    ]
  }
];
