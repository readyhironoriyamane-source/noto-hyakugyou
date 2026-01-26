import React from 'react';

// ----------------------------------------------------------------------
// データ定義（全24件：変更なし）
// ----------------------------------------------------------------------

type SupportItem = {
  id: number;
  badge: string;
  badgeColor: string;
  mainTitle: string;
  subTitle: string;
  description: string;
  specAmount: string;
  specCondition: string;
};

const SUPPORT_ITEMS: SupportItem[] = [
  // ... (データリストは以前と同じなので省略せず、そのまま実装してください) ...
  // ※ここではコードの長さ節約のためデータ部分は省略しません。以前のデータリストをそのまま使います。
  {
    id: 11,
    badge: '石川県',
    badgeColor: 'bg-[#1D3A52]',
    mainTitle: '工場・店舗の再建、\n機械設備の復旧に',
    subTitle: 'なりわい再建支援補助金',
    description: '被災した施設・設備の復旧費用を補助（中堅企業等も対象）',
    specAmount: '上限 15億円',
    specCondition: '補助率 3/4（中堅は1/2）',
  },
  {
    id: 13,
    badge: '国',
    badgeColor: 'bg-[#2B2B2B]',
    mainTitle: '販路開拓や、\n業務効率化の取り組みに',
    subTitle: '小規模事業者持続化補助金（災害支援枠）',
    description: '機械装置等費、広報費、ウェブサイト関連費など',
    specAmount: '上限 200万円',
    specCondition: '売上減少の間接被害は100万円',
  },
  {
    id: 12,
    badge: '能登町',
    badgeColor: 'bg-[#B33E28]',
    mainTitle: '県の補助金に対する\n「自己負担」を軽減',
    subTitle: '能登町なりわい再建支援補助金',
    description: '「なりわい再建支援補助金」の対象経費から交付決定額を引いた額を補助',
    specAmount: '補助率 3/5',
    specCondition: '町への申請が必要',
  },
  {
    id: 16,
    badge: '能登町',
    badgeColor: 'bg-[#B33E28]',
    mainTitle: '早期の営業再開に向けた\n店舗修繕・備品購入',
    subTitle: '営業再開支援補助金',
    description: '店舗等の修繕、機械設備・備品の購入費用を支援',
    specAmount: '上限 20万円',
    specCondition: '補助率 10/10（定額）',
  },
  {
    id: 14,
    badge: '石川県',
    badgeColor: 'bg-[#1D3A52]',
    mainTitle: '仮設施設での\n事業再開・継続に',
    subTitle: '小規模事業者事業継続支援補助金',
    description: '仮設店舗の設置や、事業継続に必要な経費を支援',
    specAmount: '上限 100万円',
    specCondition: '補助率 2/3',
  },
  {
    id: 15,
    badge: '能登町',
    badgeColor: 'bg-[#B33E28]',
    mainTitle: '国の持続化補助金への\n「上乗せ」支援',
    subTitle: '能登町小規模事業者持続化補助金',
    description: '国の採択決定額に対して、町が独自に上乗せ補助',
    specAmount: '上限 10万円',
    specCondition: '国の補助額の 1/10',
  },
  {
    id: 17,
    badge: '公庫',
    badgeColor: 'bg-[#2B2B2B]',
    mainTitle: '災害復旧のための\n特別な融資制度',
    subTitle: '令和６年能登半島地震特別貸付',
    description: '当面の運転資金や、復旧に必要な設備資金の融資',
    specAmount: '上限 3億円',
    specCondition: '金利引き下げ措置あり',
  },
  {
    id: 18,
    badge: '再生機構',
    badgeColor: 'bg-[#2B2B2B]',
    mainTitle: '二重ローンの解消、\n債権買取の相談',
    subTitle: '復興支援ファンドによる債権買取',
    description: '既往債務の買取や、返済条件の変更をサポート',
    specAmount: '個別相談',
    specCondition: '再生計画の策定が必要',
  },
  {
    id: 1,
    badge: '中小機構',
    badgeColor: 'bg-[#2B2B2B]',
    mainTitle: '事業承継の診断や、\n計画策定のサポート',
    subTitle: '中小企業事業承継円滑支援',
    description: '事業承継診断、承継計画の策定支援、M&Aマッチング',
    specAmount: '相談無料',
    specCondition: '専門家派遣は一部負担あり',
  },
  {
    id: 2,
    badge: '商工会',
    badgeColor: 'bg-[#555555]',
    mainTitle: '税理士等による\n事業承継の無料相談',
    subTitle: '事業承継相談窓口',
    description: '親族内承継や廃業に関する手続き等の個別相談',
    specAmount: '相談無料',
    specCondition: '要予約',
  },
  {
    id: 3,
    badge: '承継センター',
    badgeColor: 'bg-[#1D3A52]',
    mainTitle: 'M&Aや、第三者への\n引き継ぎマッチング',
    subTitle: '第三者承継支援',
    description: '後継者不在の企業と、創業希望者等をマッチング',
    specAmount: '登録無料',
    specCondition: '成約時は手数料の場合あり',
  },
  {
    id: 4,
    badge: '承継センター',
    badgeColor: 'bg-[#1D3A52]',
    mainTitle: '家族・親族への\nスムーズな承継支援',
    subTitle: '親族内承継支援',
    description: '株式の移転や、後継者教育に関するアドバイス',
    specAmount: '相談無料',
    specCondition: '専門家派遣対応',
  },
  {
    id: 5,
    badge: '承継センター',
    badgeColor: 'bg-[#1D3A52]',
    mainTitle: '創業希望者との\nマッチング',
    subTitle: '後継者人材バンク',
    description: '起業家志望の人材を「後継者」として紹介',
    specAmount: '登録無料',
    specCondition: '面談審査あり',
  },
  {
    id: 6,
    badge: '民間',
    badgeColor: 'bg-[#555555]',
    mainTitle: '「今すぐ人手が欲しい」\nスポット採用に',
    subTitle: 'タイミーによる人材確保',
    description: 'スキマバイトアプリを活用した短期人材の確保',
    specAmount: '手数料無料',
    specCondition: '※被災地支援キャンペーン中',
  },
  {
    id: 7,
    badge: '復興センター',
    badgeColor: 'bg-[#555555]',
    mainTitle: '専門家ボランティアによる\n技術・実務支援',
    subTitle: 'プロボ能登',
    description: 'IT、デザイン、法務など専門スキルを持つ人材が支援',
    specAmount: '利用無料',
    specCondition: 'プロジェクト単位での支援',
  },
  {
    id: 8,
    badge: '復興センター',
    badgeColor: 'bg-[#555555]',
    mainTitle: '副業人材を活用した\n課題解決サポート',
    subTitle: '複業クラウド',
    description: '都市部の副業人材をオンラインで登用し課題解決',
    specAmount: '利用無料',
    specCondition: '※特別プラン適用',
  },
  {
    id: 9,
    badge: 'ILAC',
    badgeColor: 'bg-[#1D3A52]',
    mainTitle: 'UIターン希望者の\n採用・求人掲載',
    subTitle: 'イシカワノオト',
    description: '石川県への移住希望者に向けた求人情報の掲載',
    specAmount: '掲載無料',
    specCondition: '企業登録が必要',
  },
  {
    id: 10,
    badge: 'ISICO',
    badgeColor: 'bg-[#1D3A52]',
    mainTitle: '求人票の書き方や、\n採用活動の助言',
    subTitle: '人材アドバイザーによる相談',
    description: '採用ターゲットの明確化や、面接ノウハウの提供',
    specAmount: '相談無料',
    specCondition: '専門家派遣',
  },
  {
    id: 19,
    badge: 'ISICO',
    badgeColor: 'bg-[#1D3A52]',
    mainTitle: '新しい取引先や、\n業務提携先の紹介',
    subTitle: '受発注取引のあっせん',
    description: '県内外の企業とのマッチング、商談機会の提供',
    specAmount: '利用無料',
    specCondition: '取引希望情報の登録が必要',
  },
  {
    id: 20,
    badge: '中小機構',
    badgeColor: 'bg-[#2B2B2B]',
    mainTitle: '新製品の売り出しや、\n市場開拓の支援',
    subTitle: '新商品等の販路開拓支援',
    description: 'マーケティング調査や、テスト販売のサポート',
    specAmount: '一部補助',
    specCondition: '審査あり',
  },
  {
    id: 21,
    badge: '中小機構',
    badgeColor: 'bg-[#2B2B2B]',
    mainTitle: '首都圏などの\n展示会への出展支援',
    subTitle: '展示会への出展支援',
    description: '大規模展示会への共同出展ブースの提供',
    specAmount: '出展料補助',
    specCondition: '旅費等は自己負担',
  },
  {
    id: 22,
    badge: '中小機構',
    badgeColor: 'bg-[#2B2B2B]',
    mainTitle: 'オンラインショップの\n活用・運営相談',
    subTitle: 'EC活用支援',
    description: 'ECサイトの売上向上に向けた専門家アドバイス',
    specAmount: '相談無料',
    specCondition: 'オンライン対応可',
  },
  {
    id: 23,
    badge: '商工会',
    badgeColor: 'bg-[#555555]',
    mainTitle: 'ネット通販の\n立ち上げセミナー',
    subTitle: 'EC化支援',
    description: '初めてECに取り組む事業者向けの講座・指導',
    specAmount: '受講無料',
    specCondition: '会員事業者向け',
  },
  {
    id: 24,
    badge: '商工会',
    badgeColor: 'bg-[#555555]',
    mainTitle: '物産展やバイヤー\n商談会への参加支援',
    subTitle: '物産展・商談会への出展支援',
    description: 'デパート催事や商談会への出展枠を斡旋',
    specAmount: '出展料補助',
    specCondition: '商品審査あり',
  },
];

// ----------------------------------------------------------------------
// コンポーネント実装
// ----------------------------------------------------------------------

const SupportArchive = () => {
  return (
    <section className="bg-[#F9F8F4] py-20">
      <div className="max-w-[1140px] mx-auto px-6">
        
        {/* ページヘッダー */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-[40px] font-bold text-[#1D3A52] text-left mb-6 font-serif">
            支援制度一覧
          </h1>
          <p className="text-gray-600 text-left max-w-3xl leading-relaxed">
            事業者の皆様が活用できる、国・県・町および民間企業の支援制度を網羅しています。<br />
            目的に合わせて最適な制度をお探しください。
          </p>
        </div>

        {/* 24個のカードグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SUPPORT_ITEMS.map((item) => (
            <div 
              key={item.id}
              className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow"
            >
              {/* バッジ */}
              <span className={`inline-block px-3 py-1 text-xs font-bold text-white rounded mb-4 self-start ${item.badgeColor}`}>
                {item.badge}
              </span>

              {/* タイトル */}
              <h3 className="text-xl font-bold text-[#1D3A52] mb-2 leading-snug font-serif min-h-[56px] flex items-end whitespace-pre-wrap">
                {item.mainTitle}
              </h3>

              {/* 制度名 */}
              <p className="text-sm text-gray-500 mb-6 min-h-[40px]">
                {item.subTitle}
              </p>

              {/* 支援内容 */}
              <div className="mb-6 flex-grow">
                <h4 className="text-xs font-bold text-gray-500 mb-2">支援内容</h4>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* スペックBOX（ここを修正：ゆとり確保） */}
              <div className="bg-[#FAF9F6] rounded-lg p-6 mb-8 space-y-5"> {/* Padding増量(p-6)、行間拡大(space-y-5) */}
                
                {/* 行1：金額・条件 */}
                <div className="flex items-start">
                  {/* ラベル幅拡張 (w-24 -> w-32) + ギャップ追加 */}
                  <div className="flex items-center w-32 shrink-0 mt-0.5 gap-2"> 
                    <span className="text-[#B33E28] text-sm">💰</span>
                    <span className="text-xs font-bold text-[#B33E28]">金額・条件</span>
                  </div>
                  <div className="text-[15px] font-bold text-[#1D3A52] flex-1">
                    {item.specAmount}
                  </div>
                </div>

                {/* 行2：備考 */}
                <div className="flex items-start">
                  <div className="flex items-center w-32 shrink-0 mt-0.5 gap-2">
                    <span className="text-[#1D3A52] text-sm">📄</span>
                    <span className="text-xs font-bold text-[#1D3A52]">備考</span>
                  </div>
                  <div className="text-sm text-gray-700 flex-1 leading-snug">
                    {item.specCondition}
                  </div>
                </div>

              </div>

              {/* ボタン */}
              <a href="#" className="mt-auto w-full border border-gray-300 bg-white text-[#1D3A52] text-sm font-bold py-4 rounded hover:bg-gray-50 transition-colors flex justify-center items-center no-underline">
                詳細・相談先を見る ↗
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SupportArchive;
