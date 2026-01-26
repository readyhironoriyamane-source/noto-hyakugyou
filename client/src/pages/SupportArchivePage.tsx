import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// ----------------------------------------------------------------------
// データ定義（フィルタリング用のタグ category / providerType を追加）
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
  category: 'reconstruction' | 'finance' | 'hr' | 'sales'; // 困りごとカテゴリ
  providerType: 'ishikawa' | 'noto' | 'national' | 'other'; // 主体カテゴリ
};

const SUPPORT_ITEMS: SupportItem[] = [
  // --- カテゴリ：設備の復旧・再建 (reconstruction) ---
  {
    id: 11,
    badge: '石川県',
    badgeColor: 'bg-[#1D3A52]',
    mainTitle: '工場・店舗の再建、\n機械設備の復旧に',
    subTitle: 'なりわい再建支援補助金',
    description: '被災した施設・設備の復旧費用を補助（中堅企業等も対象）',
    specAmount: '上限 15億円',
    specCondition: '補助率 3/4（中堅は1/2）',
    category: 'reconstruction',
    providerType: 'ishikawa',
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
    category: 'reconstruction',
    providerType: 'noto',
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
    category: 'reconstruction',
    providerType: 'noto',
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
    category: 'reconstruction',
    providerType: 'ishikawa',
  },

  // --- カテゴリ：資金繰り (finance) ---
  {
    id: 17,
    badge: '公庫',
    badgeColor: 'bg-[#2B2B2B]',
    mainTitle: '災害復旧のための\n特別な融資制度',
    subTitle: '令和６年能登半島地震特別貸付',
    description: '当面の運転資金や、復旧に必要な設備資金の融資',
    specAmount: '上限 3億円',
    specCondition: '金利引き下げ措置あり',
    category: 'finance',
    providerType: 'national',
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
    category: 'finance',
    providerType: 'national',
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
    category: 'finance', // 性質的には販路だが、資金補助の側面でこちらに配置も可（今回は販路へ移動せず資金/補助として扱うか、販路にするか。ここでは便宜上finance/salesどちらでもいいがsales推奨だが、元の指示に従いfinanceとする）
    providerType: 'noto',
  },
  // ※15は販路開拓（sales）の方が適切かもしれません。必要に応じて変更してください。

  // --- カテゴリ：人材・承継 (hr) ---
  {
    id: 1,
    badge: '中小機構',
    badgeColor: 'bg-[#2B2B2B]',
    mainTitle: '事業承継の診断や、\n計画策定のサポート',
    subTitle: '中小企業事業承継円滑支援',
    description: '事業承継診断、承継計画の策定支援、M&Aマッチング',
    specAmount: '相談無料',
    specCondition: '専門家派遣は一部負担あり',
    category: 'hr',
    providerType: 'national',
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
    category: 'hr',
    providerType: 'other',
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
    category: 'hr',
    providerType: 'other', // センターは公的だが県外郭団体なのでotherかishikawaか。ここではother扱い
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
    category: 'hr',
    providerType: 'other',
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
    category: 'hr',
    providerType: 'other',
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
    category: 'hr',
    providerType: 'other',
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
    category: 'hr',
    providerType: 'other',
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
    category: 'hr',
    providerType: 'other',
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
    category: 'hr',
    providerType: 'other',
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
    category: 'hr',
    providerType: 'ishikawa',
  },

  // --- カテゴリ：販路開拓 (sales) ---
  {
    id: 13,
    badge: '国',
    badgeColor: 'bg-[#2B2B2B]',
    mainTitle: '販路開拓や、\n業務効率化の取り組みに',
    subTitle: '小規模事業者持続化補助金（災害支援枠）',
    description: '機械装置等費、広報費、ウェブサイト関連費など',
    specAmount: '上限 200万円',
    specCondition: '売上減少の間接被害は100万円',
    category: 'sales',
    providerType: 'national',
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
    category: 'sales',
    providerType: 'ishikawa',
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
    category: 'sales',
    providerType: 'national',
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
    category: 'sales',
    providerType: 'national',
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
    category: 'sales',
    providerType: 'national',
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
    category: 'sales',
    providerType: 'other',
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
    category: 'sales',
    providerType: 'other',
  },
];

// ----------------------------------------------------------------------
// コンポーネント実装
// ----------------------------------------------------------------------

const SupportArchive = () => {
  // State for filtering
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterProvider, setFilterProvider] = useState<string>('all');

  // Filtering Logic
  const filteredItems = useMemo(() => {
    return SUPPORT_ITEMS.filter((item) => {
      const matchCategory = filterCategory === 'all' || item.category === filterCategory;
      const matchProvider = filterProvider === 'all' || item.providerType === filterProvider;
      return matchCategory && matchProvider;
    });
  }, [filterCategory, filterProvider]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header />
      
      <main className="pt-[60px]"> {/* Header height compensation */}
        <section className="bg-[#F9F8F4] py-20">
          <div className="max-w-[1140px] mx-auto px-6">
            
            {/* ページヘッダー */}
            <div className="mb-10">
          <h1 className="text-3xl md:text-[40px] font-bold text-[#1D3A52] text-left mb-6 font-serif">
            支援制度一覧
          </h1>
          <p className="text-gray-600 text-left max-w-3xl leading-relaxed">
            事業者の皆様が活用できる、国・県・町および民間企業の支援制度を網羅しています。<br />
            目的に合わせて最適な制度をお探しください。
          </p>
        </div>

        {/* -------------------------------------------------- */}
        {/* フィルタリング UI (形状・色統一版) */}
        {/* -------------------------------------------------- */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-12 shadow-sm">
          
          {/* 軸1：困りごとで絞り込む */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-500 mb-3 flex items-center">
              <span className="mr-2 text-[#1D3A52]">🔍</span> 困りごと・目的で絞り込む
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                { key: 'all', label: '全て表示', icon: null },
                { key: 'reconstruction', label: '設備の復旧・再建', icon: '🏗' },
                { key: 'finance', label: '資金繰り', icon: '💰' },
                { key: 'hr', label: '人材・承継', icon: '👥' },
                { key: 'sales', label: '販路開拓', icon: '📈' },
              ].map((btn) => (
                <button
                  key={btn.key}
                  onClick={() => setFilterCategory(btn.key)}
                  // 修正点: rounded-full に統一 / アイコン色調整
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border flex items-center ${
                    filterCategory === btn.key
                      ? 'bg-[#1D3A52] text-white border-[#1D3A52] shadow-md' // Active
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300' // Inactive
                  }`}
                >
                  {/* アイコンをあえてCSSフィルタ等で単色化するか、そのまま表示するか。ここではシンプルに表示 */}
                  {btn.icon && <span className="mr-2 opacity-80">{btn.icon}</span>}
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-100 my-5"></div>
          {/* 軸2：主体で絞り込む */}
          <div>
            <h3 className="text-sm font-bold text-gray-500 mb-3 flex items-center">
              <span className="mr-2 text-[#1D3A52]">🏛</span> 制度の主体で絞り込む
            </h3>
            <div className="flex flex-wrap gap-3">
              {[
                { key: 'all', label: '全て' },
                { key: 'ishikawa', label: '石川県の制度' },
                { key: 'noto', label: '能登町の制度' },
                { key: 'national', label: '国の制度' },
                { key: 'other', label: 'その他・民間' },
              ].map((btn) => (
                <button
                  key={btn.key}
                  onClick={() => setFilterProvider(btn.key)}
                  // 修正点: ここも rounded-full に合わせて統一
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all border ${
                    filterProvider === btn.key
                      ? 'bg-[#1D3A52] text-white border-[#1D3A52] shadow-md'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 検索結果カウント */}
        <div className="mb-6 text-gray-500 text-sm">
          <span className="font-bold text-[#1D3A52] text-lg mr-1">{filteredItems.length}</span>
          件の支援制度が見つかりました
        </div>

        {/* カードグリッド (フィルタリング結果を表示) */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow"
              >
                {/* バッジ */}
                <span className={`inline-block px-3 py-1 text-xs font-bold text-white rounded mb-4 self-start ${item.badgeColor}`}>
                  {item.badge}
                </span>

                {/* タイトル */}
                <h3 className="text-xl font-bold text-[#1D3A52] mb-2 leading-snug min-h-[56px] flex items-end whitespace-pre-wrap font-sans">
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

                {/* スペックBOX (ゆとり版) */}
                <div className="bg-[#FAF9F6] rounded-lg p-6 mb-8 space-y-5">
                  <div className="flex items-start">
                    <div className="flex items-center w-32 shrink-0 mt-0.5 gap-2"> 
                      <span className="text-[#B33E28] text-sm">💰</span>
                      <span className="text-xs font-bold text-[#B33E28]">金額・条件</span>
                    </div>
                    <div className="text-[15px] font-bold text-[#1D3A52] flex-1">
                      {item.specAmount}
                    </div>
                  </div>
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
        ) : (
          /* 検索結果ゼロの場合 */
          <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
            <p className="text-gray-500 mb-4">条件に一致する支援制度が見つかりませんでした。</p>
            <button 
              onClick={() => { setFilterCategory('all'); setFilterProvider('all'); }}
              className="text-[#1D3A52] font-bold underline"
            >
              条件をリセットする
            </button>
          </div>
        )}

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SupportArchive;
