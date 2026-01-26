import { ArrowRight, ArrowUpRight, Coins, FileText } from 'lucide-react';

export default function SupportSection() {
  return (
    <section className="mb-32 bg-[#F9F8F4] py-16 -mx-4 md:-mx-8 lg:-mx-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        {/* A. セクションヘッダー（左揃え） */}
        {/* 修正1: タイトルサイズ・スタイルをGuidepostSectionに合わせる (text-3xl md:text-5xl font-serif tracking-wider) */}
        <h2 className="font-serif text-3xl md:text-5xl tracking-wider font-bold text-[#1D3A52] text-left mb-6">
          使える支援制度
        </h2>
        <p className="text-gray-600 text-left mb-12 text-base md:text-lg leading-loose">
          復旧・復興に向けた、国や自治体の支援制度をご案内します。あなたの状況に合わせてご活用ください。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. なりわい再建支援補助金 (県) */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col h-full">
            <span className="bg-[#1D3A52] text-white text-xs font-bold px-3 py-1 rounded inline-block mb-4 self-start">
              石川県
            </span>
            <h3 className="text-xl font-bold text-[#1D3A52] mb-1">
              工場・店舗の再建、<br />機械設備の復旧に
            </h3>
            <p className="text-sm text-gray-500 mb-6">なりわい再建支援補助金</p>
            
            {/* 修正3: 「支援内容」見出しの追加 */}
            <h4 className="text-xs font-bold text-gray-500 mb-2">支援内容</h4>
            <p className="text-sm text-gray-700 mb-6 min-h-[40px]">
              施設・設備の復旧費用を補助（中堅企業等も対象）
            </p>
            
            {/* C. スペック情報エリア（修正4: 縦積みレイアウト） */}
            <div className="bg-[#FAF9F6] rounded-lg p-5 mb-6 mt-auto">
              {/* ブロック1：金額 */}
              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <Coins className="w-4 h-4 text-[#B33E28] mr-2" />
                  <span className="text-xs font-bold text-[#B33E28]">金額</span>
                </div>
                <p className="text-base font-bold text-[#1D3A52] ml-1">
                  上限 15億円
                </p>
              </div>
              {/* ブロック2：条件など */}
              <div>
                <div className="flex items-center mb-1">
                  <FileText className="w-4 h-4 text-[#1D3A52] mr-2" />
                  <span className="text-xs font-bold text-[#1D3A52]">条件など</span>
                </div>
                <p className="text-sm text-gray-700 ml-1 leading-snug">
                  補助率 3/4 (中堅は1/2)
                </p>
              </div>
            </div>

            {/* D. ボタン */}
            <a href="/supports/1" className="w-full border border-gray-300 bg-white text-[#1D3A52] text-sm py-3 rounded hover:bg-gray-50 flex justify-center items-center mt-auto no-underline transition-colors">
              詳細・相談先を見る <ArrowUpRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          {/* 2. 小規模事業者持続化補助金 (国) */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col h-full">
            <span className="bg-[#2B2B2B] text-white text-xs font-bold px-3 py-1 rounded inline-block mb-4 self-start">
              国
            </span>
            <h3 className="text-xl font-bold text-[#1D3A52] mb-1">
              販路開拓や、<br />業務効率化の取り組みに
            </h3>
            <p className="text-sm text-gray-500 mb-6">小規模事業者持続化補助金<br />(災害支援枠)</p>
            
            {/* 修正3: 「支援内容」見出しの追加 */}
            <h4 className="text-xs font-bold text-gray-500 mb-2">支援内容</h4>
            <p className="text-sm text-gray-700 mb-6 min-h-[40px]">
              機械装置等費、広報費、ウェブサイト関連費など
            </p>

            {/* C. スペック情報エリア（修正4: 縦積みレイアウト） */}
            <div className="bg-[#FAF9F6] rounded-lg p-5 mb-6 mt-auto">
              {/* ブロック1：金額 */}
              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <Coins className="w-4 h-4 text-[#B33E28] mr-2" />
                  <span className="text-xs font-bold text-[#B33E28]">金額</span>
                </div>
                <p className="text-base font-bold text-[#1D3A52] ml-1">
                  上限 200万円
                </p>
              </div>
              {/* ブロック2：条件など */}
              <div>
                <div className="flex items-center mb-1">
                  <FileText className="w-4 h-4 text-[#1D3A52] mr-2" />
                  <span className="text-xs font-bold text-[#1D3A52]">条件など</span>
                </div>
                <p className="text-sm text-gray-700 ml-1 leading-snug">
                  売上減少の間接被害の場合は100万円
                </p>
              </div>
            </div>

            {/* D. ボタン */}
            <a href="/supports/2" className="w-full border border-gray-300 bg-white text-[#1D3A52] text-sm py-3 rounded hover:bg-gray-50 flex justify-center items-center mt-auto no-underline transition-colors">
              詳細・相談先を見る <ArrowUpRight className="w-4 h-4 ml-1" />
            </a>
          </div>

          {/* 3. 能登町なりわい再建支援補助金 (町) */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col h-full">
            <span className="bg-[#B33E28] text-white text-xs font-bold px-3 py-1 rounded inline-block mb-4 self-start">
              能登町
            </span>
            <h3 className="text-xl font-bold text-[#1D3A52] mb-1">
              県の補助金に対する<br />「自己負担」を軽減
            </h3>
            <p className="text-sm text-gray-500 mb-6">能登町なりわい再建<br />支援補助金</p>
            
            {/* 修正3: 「支援内容」見出しの追加 */}
            <h4 className="text-xs font-bold text-gray-500 mb-2">支援内容</h4>
            <p className="text-sm text-gray-700 mb-6 min-h-[40px]">
              「なりわい再建支援補助金」の対象経費から交付決定額を引いた額を補助
            </p>

            {/* C. スペック情報エリア（修正4: 縦積みレイアウト） */}
            <div className="bg-[#FAF9F6] rounded-lg p-5 mb-6 mt-auto">
              {/* ブロック1：金額 */}
              <div className="mb-4">
                <div className="flex items-center mb-1">
                  <Coins className="w-4 h-4 text-[#B33E28] mr-2" />
                  <span className="text-xs font-bold text-[#B33E28]">金額</span>
                </div>
                <p className="text-base font-bold text-[#1D3A52] ml-1">
                  補助率 3/5
                </p>
              </div>
              {/* ブロック2：条件など */}
              <div>
                <div className="flex items-center mb-1">
                  <FileText className="w-4 h-4 text-[#1D3A52] mr-2" />
                  <span className="text-xs font-bold text-[#1D3A52]">条件など</span>
                </div>
                <p className="text-sm text-gray-700 ml-1 leading-snug">
                  町への申請が必要
                </p>
              </div>
            </div>

            {/* D. ボタン */}
            <a href="/supports/3" className="w-full border border-gray-300 bg-white text-[#1D3A52] text-sm py-3 rounded hover:bg-gray-50 flex justify-center items-center mt-auto no-underline transition-colors">
              詳細・相談先を見る <ArrowUpRight className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
        
        {/* 支援制度一覧を見るボタン */}
        <div className="text-center mt-10">
          <a href="/supports" className="inline-flex items-center gap-2 bg-[#1D3A52] text-white px-8 py-3 rounded-full font-bold hover:bg-[#152a3d] transition-colors no-underline">
            支援制度一覧を見る <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
