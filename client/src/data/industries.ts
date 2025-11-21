export interface Industry {
  id: number;
  title: string;
  category: string;
  operator: string;
  role: string;
  location: string;
  tags: string[];
  summary: string;
  necessity: string;
  connections: string;
  timeline: {
    past: string;
    present: string;
    future: string;
  };
  actions: Array<{
    type: string;
    label: string;
    link: string;
  }>;
  image: string;
}

export const industries: Industry[] = [
  {
    id: 1,
    title: "小木のイカ釣り漁師",
    category: "漁業",
    operator: "坂本 健太",
    role: "船団長",
    location: "能登町 小木港",
    tags: ["伝統", "食文化", "後継者募集"],
    summary: "日本海有数のイカの水揚げ高を誇る小木港。凍てつく海と共に生きる仕事。最新の冷凍技術と、長年の勘が交差する最前線。",
    necessity: "小木のイカは日本の食文化を支える資源。燃料高騰と人手不足により船を出せない日が増えているが、この味と技術を絶やすことはできない。",
    connections: "地元の加工業者、観光協会、祭りを支える若衆宿。",
    timeline: {
      past: "祖父の代から続く漁師の家系。かつて港は船で埋め尽くされていた。",
      present: "震災により施設が損傷したが、組合員総出で復旧。若手への技術継承に注力。",
      future: "「持続可能な漁業」への転換。漁師が誇りを持てる収益構造を作る。"
    },
    actions: [
      { type: "buy", label: "船凍イカを購入する", link: "#" },
      { type: "visit", label: "漁港を見学・体験", link: "#" },
      { type: "join", label: "弟子入り・アルバイト", link: "#" }
    ],
    image: "/squid-fishing.jpg"
  },
  {
    id: 2,
    title: "赤崎のイチゴ農家",
    category: "農業",
    operator: "高橋 美咲",
    role: "農園主",
    location: "能登町 赤崎地区",
    tags: ["観光農園", "Ｕターン"],
    summary: "日本海を見下ろす段々畑。太陽と潮風を浴びて育つ「赤崎いちご」。露地栽培にこだわり、甘みと酸味のバランスを追求する。",
    necessity: "市場に出回らない「幻のいちご」。希少な品種と美しい段々畑の景観を守ることは、地域の観光資源として不可欠。",
    connections: "地元のパティスリー、保育園の食育活動。",
    timeline: {
      past: "タバコ栽培が主だった土地を、先代がイチゴ畑へ開墾。",
      present: "仮設住宅から畑に通い、崩れた石積みを修復しながら苗を育てる。",
      future: "農園カフェを併設し、一年中人が集まる場所にする。"
    },
    actions: [
      { type: "visit", label: "いちご狩りに行く", link: "#" },
      { type: "join", label: "石積み修復ボランティア", link: "#" }
    ],
    image: "/strawberry-farm.jpg"
  },
  {
    id: 3,
    title: "能登の魚醤「いしり」職人",
    category: "醸造",
    operator: "山下 剛",
    role: "杜氏",
    location: "能登町 各地",
    tags: ["発酵文化", "世界農業遺産"],
    summary: "イカの内臓と塩だけで作る日本三大魚醤。数年かけて熟成させる深い旨味は、能登の風土そのもの。",
    necessity: "「いしり」は能登の家庭料理の魂。製造技術が失われれば、郷土の味が変わってしまう。",
    connections: "海外のシェフ、地元の宿、漁師。",
    timeline: {
      past: "江戸時代から変わらぬ製法。冬の寒い時期に仕込みを行う。",
      present: "蔵の一部が倒壊したが、残った樽を守り抜いた。",
      future: "「ISHIRI」として海外展開。発酵マイスターアカデミーの設立。"
    },
    actions: [
      { type: "buy", label: "いしりを購入する", link: "#" },
      { type: "visit", label: "蔵見学・試食会", link: "#" }
    ],
    image: "/ishiri-brewery.jpg"
  },
  {
    id: 4,
    title: "能登瓦の屋根職人",
    category: "建築",
    operator: "中田 誠",
    role: "棟梁",
    location: "能登町 全域",
    tags: ["復興支援", "伝統建築"],
    summary: "能登の厳しい冬に耐える、黒く光る能登瓦。美しい景観を守りながら、家という生活の基盤を物理的に支える。",
    necessity: "震災復興において屋根修復は急務。黒瓦を扱える職人は激減しており、技術継承が急がれる。",
    connections: "工務店、製瓦工場、文化財保護団体。",
    timeline: {
      past: "美しい黒瓦の町並みが当たり前の風景だった。",
      present: "需要に対し職人が不足。県外からの応援を受け入れつつ指導。",
      future: "ロボット技術も取り入れ、伝統工法を残した災害に強い屋根へ。"
    },
    actions: [
      { type: "join", label: "見習い職人に応募", link: "#" },
      { type: "visit", label: "相談会に参加", link: "#" }
    ],
    image: "/kawara-craftsman.jpg"
  }
];
