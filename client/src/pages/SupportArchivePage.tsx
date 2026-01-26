import React, { useState, useMemo } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConsultationCTA from '@/components/ConsultationCTA';
import { SUPPORT_ITEMS } from '@/data/supportData';

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
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 mb-12">
              <div className="flex flex-col md:flex-row gap-8">
                
                {/* 困りごとで絞り込む */}
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-[#1D3A52] rounded-full"></span>
                    困りごとで絞り込む
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: 'all', label: 'すべて表示' },
                      { value: 'reconstruction', label: '設備の復旧・再建' },
                      { value: 'finance', label: '資金繰り・融資' },
                      { value: 'hr', label: '人材確保・事業承継' },
                      { value: 'sales', label: '販路開拓・売上拡大' },
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

                {/* 区切り線 (MD以上で表示) */}
                <div className="hidden md:block w-px bg-gray-200 self-stretch"></div>

                {/* 実施主体で絞り込む */}
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-1 h-4 bg-[#B33E28] rounded-full"></span>
                    実施主体で絞り込む
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { value: 'all', label: 'すべて' },
                      { value: 'ishikawa', label: '石川県' },
                      { value: 'noto', label: '能登町' },
                      { value: 'national', label: '国・公庫' },
                      { value: 'other', label: '民間・その他' },
                    ].map((btn) => (
                      <button
                        key={btn.value}
                        onClick={() => setFilterProvider(btn.value)}
                        className={`
                          px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border
                          ${filterProvider === btn.value
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

            {/* -------------------------------------------------- */}
            {/* リスト表示エリア */}
            {/* -------------------------------------------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <Link key={item.id} href={`/support/${item.id}`} className="block group no-underline">
                    <article className="h-full bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col relative group-hover:-translate-y-1">
                      
                      {/* カード上部：バッジとタイトル */}
                      <div className="p-6 flex-grow">
                        <div className="flex items-start justify-between mb-4">
                          <span className={`inline-block px-3 py-1 text-xs font-bold text-white rounded-full ${item.badgeColor}`}>
                            {item.badge}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-bold text-[#1D3A52] mb-2 line-clamp-2 group-hover:text-[#B33E28] transition-colors">
                          {item.subTitle}
                        </h3>
                        <p className="text-sm font-medium text-gray-500 mb-4 line-clamp-2">
                          {item.mainTitle}
                        </p>
                        <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* カード下部：スペック情報（グレー背景） */}
                      <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 mt-auto">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-baseline gap-2">
                            <span className="text-xs font-bold text-gray-400 uppercase">支援金額</span>
                            <span className="text-base font-bold text-[#1D3A52]">{item.specAmount}</span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xs font-bold text-gray-400 uppercase">条件など</span>
                            <span className="text-xs text-gray-600">{item.specCondition}</span>
                          </div>
                        </div>
                      </div>

                    </article>
                  </Link>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <p className="text-gray-500 text-lg">
                    条件に一致する支援制度が見つかりませんでした。<br />
                    条件を変更して再度お試しください。
                  </p>
                  <button 
                    onClick={() => { setFilterCategory('all'); setFilterProvider('all'); }}
                    className="mt-6 px-6 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition-colors font-medium"
                  >
                    条件をリセット
                  </button>
                </div>
              )}
            </div>

          </div>
        </section>

        <ConsultationCTA />
      </main>

      <Footer />
    </div>
  );
};

export default SupportArchive;
