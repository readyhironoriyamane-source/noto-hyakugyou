import React, { useState, useMemo } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConsultationCTA from '@/components/ConsultationCTA';
import { industries } from '@/data/industries';
import { ArrowUpRight, ArrowRight, Phone, Building2 } from 'lucide-react';

export default function IndustriesPage() {
  // State for filtering
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterRegion, setFilterRegion] = useState<string>('all');

  // 全ての記事を取得
  const allIndustries = industries;

  // Filtering Logic
  const filteredItems = useMemo(() => {
    return allIndustries.filter((item) => {
      // 1. カテゴリフィルター
      const matchCategory = filterCategory === 'all' || item.category === filterCategory;
      
      // 2. 地域フィルター (現状データには明確な地域IDがないため、location文字列で簡易判定)
      // ※ 将来的にデータ構造にregionIdなどを追加することを推奨
      const matchRegion = filterRegion === 'all' || 
        (filterRegion === 'noto' && item.location.includes('能登町'));

      return matchCategory && matchRegion;
    });
  }, [filterCategory, filterRegion, allIndustries]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Header />
      
      <main className="pt-[60px]"> {/* Header height compensation */}
        <section className="bg-[#F9F8F4] py-20">
          <div className="max-w-[1140px] mx-auto px-6">
            
            {/* ページヘッダー */}
            <div className="mb-10">
              <h1 className="text-3xl md:text-[40px] font-bold text-[#1D3A52] text-left mb-6 font-serif">
                商いの道しるべ
              </h1>
              <p className="text-gray-600 text-left max-w-3xl leading-relaxed">
                能登の事業者たちが、どう悩み、何を選び、どう乗り越えたか。<br />
                実際の決断と行動の記録です。
              </p>
            </div>

            {/* -------------------------------------------------- */}
            {/* フィルタリング UI */}
            {/* -------------------------------------------------- */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 mb-12">
              <div className="flex flex-col gap-8">
                
                {/* 1行目：悩みごとで絞り込む */}
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-[#1D3A52] rounded-full"></span>
                    悩みごとで絞り込む
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: 'all', label: 'すべて表示' },
                      { value: 'reconstruction', label: '設備が壊れた・廃業危機' },
                      { value: 'hr', label: '人手が足りない' },
                      { value: 'finance', label: '資金繰りが厳しい' },
                      { value: 'sales', label: '売上を伸ばしたい' },
                      // { value: 'successor', label: '後継者がいない' }, // データに該当カテゴリがあれば追加
                    ].map((btn) => (
                      <button
                        key={btn.value}
                        onClick={() => setFilterCategory(btn.value)}
                        className={`
                          px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                          ${filterCategory === btn.value
                            ? 'bg-[#1D3A52] text-white border-[#1D3A52] shadow-md transform scale-105'
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                          }
                        `}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 区切り線 */}
                <div className="w-full h-px bg-gray-200"></div>

                {/* 2行目：地域で絞り込む */}
                <div>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-[#B33E28] rounded-full"></span>
                    地域で絞り込む
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: 'all', label: 'すべて' },
                      { value: 'noto', label: '能登町' },
                    ].map((btn) => (
                      <button
                        key={btn.value}
                        onClick={() => setFilterRegion(btn.value)}
                        className={`
                          px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                          ${filterRegion === btn.value
                            ? 'bg-[#B33E28] text-white border-[#B33E28] shadow-md transform scale-105'
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                          }
                        `}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* 件数表示 */}
            <div className="mb-6 flex items-end border-b border-gray-200 pb-2">
              <div className="text-gray-500 text-sm">
                <span className="font-bold text-[#1D3A52] text-lg mr-1">{filteredItems.length}</span>
                件の事例を表示中
              </div>
            </div>

            {/* -------------------------------------------------- */}
            {/* 事例カードグリッド (TOPページの3カラムレイアウト流用) */}
            {/* -------------------------------------------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {filteredItems.length > 0 ? (
                filteredItems.map((study) => (
                  <a 
                    key={study.id}
                    href={`/industry/${study.id}`}
                    className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border/50 focus:outline-none focus:ring-4 focus:ring-primary/30 no-underline flex flex-col h-full"
                  >
                    {/* 1. ヘッダー画像エリア */}
                    <div className="relative aspect-[3/2] overflow-hidden bg-muted">
                      <img 
                        src={study.image} 
                        alt={`${study.title}のイメージ画像`} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        onError={(e) => {
                          e.currentTarget.src = "https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image";
                        }}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                    </div>

                    {/* 2. 情報エリア */}
                    <div className="p-6 md:p-8 flex flex-col flex-grow bg-white">
                      
                      <div className="flex flex-col flex-grow">
                        {/* ① 課題ラベル */}
                        {study.challengeCard && (
                          <div className="mb-4">
                            <span className="inline-block bg-[#E6F4EA] text-[#1D3A52] text-xs font-bold px-3 py-1 rounded-full tracking-wider border border-[#CDE8D6]">
                              {study.challengeCard.label}
                            </span>
                          </div>
                        )}

                        {/* ② 属性データ */}
                        <div className="flex flex-col gap-4 mb-4">
                          <div className="flex items-center gap-3 text-xs font-bold tracking-wider text-[#888]">
                            <span className="uppercase bg-gray-100 px-2 py-0.5 rounded text-[#555]">
                              {study.category}
                            </span>
                            <span className="text-xs font-bold text-[#666] flex items-center gap-1">
                              <span className="w-1 h-1 bg-[#888] rounded-full"></span>
                              {study.location}
                            </span>
                          </div>
                          {/* 事業者名 */}
                          <div className="text-xs font-bold text-[#555] border-l-[3px] border-[#B33E28] pl-2">
                            {study.operator}
                          </div>
                        </div>

                        {/* ③ タイトル */}
                        <h3 className="text-[22px] font-bold text-[#333] mb-3 leading-snug font-sans group-hover:text-[#B33E28] transition-colors">
                          {study.title}
                        </h3>

                        {/* ④ 本文リード文 */}
                        <p className="text-base text-[#555] font-medium leading-relaxed mb-6 line-clamp-3">
                          {study.summary}
                        </p>
                      </div>

                      {/* ⑤ 構造化データブロック */}
                      {study.challengeCard?.structuredBlock && (
                        <div className="mb-6 space-y-8 bg-gray-50 p-6 rounded border border-gray-100">
                          {study.challengeCard.structuredBlock.map((block: any, idx: number) => (
                            <div key={idx} className="text-sm">
                              <span className="inline-block bg-gray-200 text-gray-700 text-xs font-bold px-2 py-0.5 rounded mb-3">
                                {block.label}
                              </span>
                              <ul className="list-disc list-inside text-gray-600 pl-1">
                                {block.items.map((item: string, i: number) => (
                                  <li key={i} className="leading-[1.8] mb-[8px] last:mb-0 break-words">
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* ⑥ ボタン */}
                      <div className="pt-4 border-t border-gray-100">
                        <div className="flex items-center text-[#B33E28] text-sm font-bold tracking-widest group-hover:text-[#8E2F1D] transition-colors uppercase w-fit">
                          詳しく見る <ArrowUpRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </a>
                ))
              ) : (
                <div className="col-span-full py-20 text-center bg-white rounded-lg border border-gray-200">
                  <p className="text-gray-500 mb-4 text-lg">
                    条件に一致する事例が見つかりませんでした。
                  </p>
                  <button 
                    onClick={() => {
                      setFilterCategory('all'); 
                      setFilterRegion('all');
                    }}
                    className="mt-2 text-[#1D3A52] font-bold underline hover:text-[#B33E28] transition-colors"
                  >
                    条件をリセットする
                  </button>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* -------------------------------------------------- */}
        {/* ページ下部：相談誘導セクション */}
        {/* -------------------------------------------------- */}
        <section className="bg-white py-20 border-t border-gray-100">
          <div className="container max-w-4xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1D3A52] mb-6 font-serif">
              どの事例が参考になるか、分からない方へ
            </h2>
            <p className="text-gray-600 leading-loose mb-10">
              まずはお近くの商工会・商工会議所の専門相談員にご相談ください。<br />
              あなたの状況に近い事例や、使える支援制度をご案内します。
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a 
                href="tel:0000000000" 
                className="inline-flex items-center justify-center gap-2 bg-[#B33E28] text-white px-8 py-4 rounded-full font-bold hover:bg-[#8E2F1D] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all no-underline"
              >
                <Phone className="w-5 h-5" />
                商工会に電話で相談
              </a>
              <a 
                href="#" 
                className="inline-flex items-center justify-center gap-2 bg-white text-[#1D3A52] border border-gray-300 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition-colors shadow-sm hover:shadow-md no-underline"
              >
                <Building2 className="w-5 h-5" />
                相談窓口の一覧を見る
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
