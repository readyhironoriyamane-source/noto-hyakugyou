import { ArrowRight, ArrowUpRight, Coins, FileText } from 'lucide-react';

export default function SupportSection() {
  return (
    <section className="mb-32">
      {/* セクションヘッダー - GuidepostSectionと位置・スタイルを統一 */}
      <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="font-serif text-3xl md:text-5xl tracking-wider font-bold text-[#1D3A52] mb-6">
            使える支援制度
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-loose font-sans">
            復旧・復興に向けた、国や自治体の支援制度をご案内します。<br className="block md:hidden" />
            あなたの状況に合わせてご活用ください。
          </p>
        </div>
      </div>

      {/* カードグリッド - 幅制限なしで画面いっぱいに */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        
        {/* カード1：石川県 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
          <span className="inline-block px-3 py-1 text-xs font-bold text-white rounded mb-4 self-start bg-[#1D3A52]">
            石川県
          </span>
          {/* タイトル：高さ固定 (min-h-[64px]) */}
          <h3 className="text-2xl font-bold text-gray-800 mb-3 leading-tight font-sans min-h-[64px] flex items-end">
            工場・店舗の再建、<br />機械設備の復旧に
          </h3>
          {/* 制度名：高さ固定 (min-h-[40px]) */}
          <p className="text-sm text-gray-500 mb-6 min-h-[40px]">
            なりわい再建支援補助金
          </p>

          {/* 支援内容ブロック */}
          <div className="mb-6 flex-grow">
            <h4 className="text-xs font-bold text-gray-500 mb-2">支援内容</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              施設・設備の復旧費用を補助（中堅企業等も対象）
            </p>
          </div>

          {/* スペックBOX */}
          <div className="bg-[#FAF9F6] rounded-lg p-5 mb-8 space-y-4">
            <div className="flex items-start">
              <div className="flex items-center w-24 shrink-0 mt-0.5">
                <Coins className="w-4 h-4 text-[#B33E28] mr-2" />
                <span className="text-xs font-bold text-[#B33E28]">金額</span>
              </div>
              <div className="text-[15px] font-bold text-[#1D3A52] flex-1">
                上限 15億円
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center w-24 shrink-0 mt-0.5">
                <FileText className="w-4 h-4 text-[#1D3A52] mr-2" />
                <span className="text-xs font-bold text-[#1D3A52]">条件など</span>
              </div>
              <div className="text-sm text-gray-700 flex-1 leading-snug">
                補助率 3/4（中堅は1/2）
              </div>
            </div>
          </div>

          <a href="/supports/1" className="mt-auto w-full border border-gray-300 bg-white text-[#1D3A52] text-sm font-bold py-4 rounded hover:bg-gray-50 transition-colors flex justify-center items-center no-underline">
            詳細・相談先を見る <ArrowUpRight className="w-4 h-4 ml-1" />
          </a>
        </div>

        {/* カード2：国 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
          <span className="inline-block px-3 py-1 text-xs font-bold text-white rounded mb-4 self-start bg-[#2B2B2B]">
            国
          </span>
          {/* タイトル：高さ固定 */}
          <h3 className="text-2xl font-bold text-gray-800 mb-3 leading-tight font-sans min-h-[64px] flex items-end">
            販路開拓や、<br />業務効率化の取り組みに
          </h3>
          {/* 制度名：高さ固定 */}
          <p className="text-sm text-gray-500 mb-6 min-h-[40px]">
            小規模事業者持続化補助金<br />（災害支援枠）
          </p>

          <div className="mb-6 flex-grow">
            <h4 className="text-xs font-bold text-gray-500 mb-2">支援内容</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              機械装置等費、広報費、ウェブサイト関連費など
            </p>
          </div>

          <div className="bg-[#FAF9F6] rounded-lg p-5 mb-8 space-y-4">
            <div className="flex items-start">
              <div className="flex items-center w-24 shrink-0 mt-0.5">
                <Coins className="w-4 h-4 text-[#B33E28] mr-2" />
                <span className="text-xs font-bold text-[#B33E28]">金額</span>
              </div>
              <div className="text-[15px] font-bold text-[#1D3A52] flex-1">
                上限 200万円
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center w-24 shrink-0 mt-0.5">
                <FileText className="w-4 h-4 text-[#1D3A52] mr-2" />
                <span className="text-xs font-bold text-[#1D3A52]">条件など</span>
              </div>
              <div className="text-sm text-gray-700 flex-1 leading-snug">
                売上減少の間接被害の場合は100万円
              </div>
            </div>
          </div>

          <a href="/supports/2" className="mt-auto w-full border border-gray-300 bg-white text-[#1D3A52] text-sm font-bold py-4 rounded hover:bg-gray-50 transition-colors flex justify-center items-center no-underline">
            詳細・相談先を見る <ArrowUpRight className="w-4 h-4 ml-1" />
          </a>
        </div>

        {/* カード3：能登町 */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow">
          <span className="inline-block px-3 py-1 text-xs font-bold text-white rounded mb-4 self-start bg-[#B33E28]">
            能登町
          </span>
          {/* タイトル：高さ固定 */}
          <h3 className="text-2xl font-bold text-gray-800 mb-3 leading-tight font-sans min-h-[64px] flex items-end">
            県の補助金に対する<br />「自己負担」を軽減
          </h3>
          {/* 制度名：高さ固定 */}
          <p className="text-sm text-gray-500 mb-6 min-h-[40px]">
            能登町なりわい再建<br />支援補助金
          </p>

          <div className="mb-6 flex-grow">
            <h4 className="text-xs font-bold text-gray-500 mb-2">支援内容</h4>
            <p className="text-sm text-gray-700 leading-relaxed">
              「なりわい再建支援補助金」の対象経費から交付決定額を引いた額を補助
            </p>
          </div>

          <div className="bg-[#FAF9F6] rounded-lg p-5 mb-8 space-y-4">
            <div className="flex items-start">
              <div className="flex items-center w-24 shrink-0 mt-0.5">
                <Coins className="w-4 h-4 text-[#B33E28] mr-2" />
                <span className="text-xs font-bold text-[#B33E28]">金額</span>
              </div>
              <div className="text-[15px] font-bold text-[#1D3A52] flex-1">
                補助率 3/5
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex items-center w-24 shrink-0 mt-0.5">
                <FileText className="w-4 h-4 text-[#1D3A52] mr-2" />
                <span className="text-xs font-bold text-[#1D3A52]">条件など</span>
              </div>
              <div className="text-sm text-gray-700 flex-1 leading-snug">
                町への申請が必要
              </div>
            </div>
          </div>

          <a href="/supports/3" className="mt-auto w-full border border-gray-300 bg-white text-[#1D3A52] text-sm font-bold py-4 rounded hover:bg-gray-50 transition-colors flex justify-center items-center no-underline">
            詳細・相談先を見る <ArrowUpRight className="w-4 h-4 ml-1" />
          </a>
        </div>

      </div>
      
      {/* 支援制度一覧を見るボタン */}
      <div className="text-center mt-12">
        <a href="/supports" className="inline-flex items-center gap-2 bg-[#1D3A52] text-white px-10 py-4 rounded-full font-bold hover:bg-[#152a3d] transition-colors no-underline shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
          支援制度一覧を見る <ArrowRight className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
