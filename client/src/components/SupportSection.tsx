import { ArrowRight } from 'lucide-react';

export default function SupportSection() {
  return (
    <section className="mb-32 bg-[#F9F8F4] py-16 -mx-4 md:-mx-8 lg:-mx-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        {/* A. セクションヘッダー（左揃え） */}
        <h2 className="text-3xl font-bold text-[#1D3A52] text-left mb-4">
          使える支援制度
        </h2>
        <p className="text-gray-600 text-left mb-12">
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
            <p className="text-sm text-gray-500 mb-4">なりわい再建支援補助金</p>
            <p className="text-sm text-gray-700 mb-6 min-h-[40px]">
              被災した施設・設備の復旧費用を補助します。
            </p>
            
            {/* C. スペック情報エリア（薄いグレーの箱） */}
            <div className="bg-[#F9F9F9] rounded p-4 mb-6 mt-auto">
              <div className="flex items-center mb-2">
                <span className="text-xs text-[#B33E28] font-bold">💰 金額</span>
                <span className="text-base font-bold text-[#1D3A52] ml-2">上限 15億円</span>
              </div>
              <div className="flex items-start">
                <span className="text-xs text-[#1D3A52] font-bold mt-0.5">📄 条件など</span>
                <span className="text-sm text-gray-700 ml-2">補助率 3/4 (中堅は1/2)</span>
              </div>
            </div>

            {/* D. ボタン */}
            <a href="/supports/1" className="w-full border border-gray-300 bg-white text-[#1D3A52] text-sm py-3 rounded hover:bg-gray-50 flex justify-center items-center mt-auto no-underline">
              詳細・相談先を見る ↗
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
            <p className="text-sm text-gray-500 mb-4">小規模事業者持続化補助金<br />(災害支援枠)</p>
            <p className="text-sm text-gray-700 mb-6 min-h-[40px]">
              地道な販路開拓等の取組や、業務効率化の取組を支援します。
            </p>

            {/* C. スペック情報エリア（薄いグレーの箱） */}
            <div className="bg-[#F9F9F9] rounded p-4 mb-6 mt-auto">
              <div className="flex items-center mb-2">
                <span className="text-xs text-[#B33E28] font-bold">💰 金額</span>
                <span className="text-base font-bold text-[#1D3A52] ml-2">上限 200万円</span>
              </div>
              <div className="flex items-start">
                <span className="text-xs text-[#1D3A52] font-bold mt-0.5">📄 条件など</span>
                <span className="text-sm text-gray-700 ml-2">売上減少の間接被害の場合は100万円</span>
              </div>
            </div>

            {/* D. ボタン */}
            <a href="/supports/2" className="w-full border border-gray-300 bg-white text-[#1D3A52] text-sm py-3 rounded hover:bg-gray-50 flex justify-center items-center mt-auto no-underline">
              詳細・相談先を見る ↗
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
            <p className="text-sm text-gray-500 mb-4">能登町なりわい再建<br />支援補助金</p>
            <p className="text-sm text-gray-700 mb-6 min-h-[40px]">
              県のなりわい再建支援補助金の上乗せ支援を行います。
            </p>

            {/* C. スペック情報エリア（薄いグレーの箱） */}
            <div className="bg-[#F9F9F9] rounded p-4 mb-6 mt-auto">
              <div className="flex items-center mb-2">
                <span className="text-xs text-[#B33E28] font-bold">💰 金額</span>
                <span className="text-base font-bold text-[#1D3A52] ml-2">補助率 3/5</span>
              </div>
              <div className="flex items-start">
                <span className="text-xs text-[#1D3A52] font-bold mt-0.5">📄 条件など</span>
                <span className="text-sm text-gray-700 ml-2">町への申請が必要</span>
              </div>
            </div>

            {/* D. ボタン */}
            <a href="/supports/3" className="w-full border border-gray-300 bg-white text-[#1D3A52] text-sm py-3 rounded hover:bg-gray-50 flex justify-center items-center mt-auto no-underline">
              詳細・相談先を見る ↗
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
