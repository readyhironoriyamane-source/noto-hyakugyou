import { useState, useMemo, useEffect } from 'react';
import { Link, useSearch } from 'wouter';
import { Search, Building2, Construction, TrendingUp, Users, Wallet } from 'lucide-react';
import { CATEGORIES as OLD_CATEGORIES, PROVIDERS } from '@/data/supports';
import Footer from '@/components/Footer';
import SupportCard from '@/components/SupportCard';
import ConsultationCTA from '@/components/ConsultationCTA';
import { supportSystems, SupportCategory } from '@/lib/supports';

// カテゴリ定義（アイコンをJSXとして直接定義せず、コンポーネントとして扱う）
const CATEGORIES: { id: SupportCategory | 'all'; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'すべて表示', icon: <Search className="w-4 h-4" /> },
  { id: 'reconstruction', label: '設備の復旧・再建', icon: <Construction className="w-4 h-4" /> },
  { id: 'sales', label: '販路開拓・売上', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'hr', label: '人材・事業承継', icon: <Users className="w-4 h-4" /> },
  { id: 'finance', label: '資金繰り・相談', icon: <Wallet className="w-4 h-4" /> },
];

export default function SupportArchivePage() {
  const searchString = useSearch();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProvider, setSelectedProvider] = useState<string>('all');

  // URLパラメータから初期フィルタを設定
  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const category = params.get('category');
    if (category && CATEGORIES.some(c => c.id === category)) {
      setSelectedCategory(category);
    }
  }, [searchString]);

  // フィルタリングロジック
  const filteredSupports = useMemo(() => {
    return supportSystems.filter(support => {
      const categoryMatch = selectedCategory === 'all' || support.category === selectedCategory;
      // providerフィルタはsupportSystemsにはないため、badgeで簡易判定
      let providerMatch = true;
      if (selectedProvider !== 'all') {
        if (selectedProvider === 'pref') providerMatch = support.badge.includes('県');
        else if (selectedProvider === 'town') providerMatch = support.badge.includes('町');
        else if (selectedProvider === 'gov') providerMatch = support.badge.includes('国');
        else if (selectedProvider === 'other') providerMatch = !support.badge.includes('県') && !support.badge.includes('町') && !support.badge.includes('国');
      }
      return categoryMatch && providerMatch;
    });
  }, [selectedCategory, selectedProvider]);

  // 今日の日付を取得
  const today = new Date();
  const formattedDate = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;

  // 締切間近判定（7日以内）
  const isClosingSoon = (deadline?: string) => {
    if (!deadline) return false;
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  };

  // 期限切れ判定
  const isExpired = (deadline?: string) => {
    if (!deadline) return false;
    const deadlineDate = new Date(deadline);
    return deadlineDate < today;
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] font-sans text-gray-900">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif font-bold text-xl text-[#1D3A52] tracking-wider hover:opacity-80 transition-opacity no-underline">
            能登百業録
          </Link>
          <div className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {formattedDate} 現在
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        {/* ページタイトルエリア */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1D3A52] mb-4">
            支援制度を探す
          </h1>
          <p className="text-gray-600 font-medium md:text-lg">
            お困りごとや、事業所の所在地から、<br className="md:hidden" />使える制度を絞り込めます。
          </p>
        </div>

        {/* フィルターエリア (Strict Style: 鎮静化) */}
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-200 mb-12">
          {/* 1. 困りごとで絞り込む */}
          <div className="mb-8">
            <h2 className="text-sm font-bold text-gray-500 mb-4 flex items-center gap-2 uppercase tracking-wider">
              <Search className="w-4 h-4" /> 困りごとで絞り込む
            </h2>
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`
                    h-11 px-5 rounded-full font-bold text-sm transition-all duration-200 flex items-center gap-2 border
                    ${selectedCategory === cat.id 
                      ? 'bg-[#1D3A52] text-white border-[#1D3A52] shadow-md' 
                      : 'bg-white text-[#1D3A52] border-gray-200 hover:border-[#1D3A52] hover:bg-gray-50'}
                  `}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. 主体で絞り込む */}
          <div>
            <h2 className="text-sm font-bold text-gray-500 mb-4 flex items-center gap-2 uppercase tracking-wider">
              <Building2 className="w-4 h-4" /> 主体で絞り込む
            </h2>
            <div className="flex flex-wrap gap-3">
              {PROVIDERS.map((prov) => (
                <button
                  key={prov.id}
                  onClick={() => setSelectedProvider(prov.id)}
                  className={`
                    h-10 px-5 rounded-full font-bold text-sm transition-all duration-200 border
                    ${selectedProvider === prov.id 
                      ? 'bg-[#2B2B2B] text-white border-[#2B2B2B]' 
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}
                  `}
                >
                  {prov.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 制度カードリスト (Shared Component) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredSupports.length > 0 ? (
            filteredSupports.map((support) => (
              <SupportCard 
                key={support.id} 
                support={support} 
                isClosingSoon={isClosingSoon}
                isExpired={isExpired}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500 font-bold mb-4">条件に一致する制度が見つかりませんでした。</p>
              <button 
                onClick={() => { setSelectedCategory('all'); setSelectedProvider('all'); }}
                className="text-[#1D3A52] font-bold hover:underline"
              >
                条件をリセットする
              </button>
            </div>
          )}
        </div>

        {/* 相談誘導エリア (Shared Component) */}
        <ConsultationCTA />
      </main>

      <Footer />
    </div>
  );
}
