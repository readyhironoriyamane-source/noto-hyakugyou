import { useState, useMemo, useEffect } from 'react';
import { useSearch } from 'wouter';
import { Search, Construction, TrendingUp, Users, Wallet } from 'lucide-react';
import { supportSystems, SupportCategory } from '@/lib/supports';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SupportCard from '@/components/SupportCard';
import ConsultationCTA from '@/components/ConsultationCTA';

// カテゴリ定義
const CATEGORIES: { id: SupportCategory | 'all'; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'すべて表示', icon: <Search className="w-4 h-4" /> },
  { id: 'reconstruction', label: '設備の復旧・再建', icon: <Construction className="w-4 h-4" /> },
  { id: 'sales', label: '販路開拓・売上', icon: <TrendingUp className="w-4 h-4" /> },
  { id: 'hr', label: '人材・事業承継', icon: <Users className="w-4 h-4" /> },
  { id: 'finance', label: '資金繰り・相談', icon: <Wallet className="w-4 h-4" /> },
];

export default function SupportsPage() {
  const searchString = useSearch();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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
      return selectedCategory === 'all' || support.category === selectedCategory;
    });
  }, [selectedCategory]);

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
      <Header />

      <main className="container mx-auto px-4 py-12 md:py-16 max-w-6xl">
        {/* ページタイトルエリア */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#1D3A52] mb-6 tracking-tight">
            支援制度一覧
          </h1>
          <p className="text-gray-600 font-medium md:text-lg leading-relaxed">
            {formattedDate} 現在の情報です。<br className="md:hidden" />
            お困りごとに合わせて制度を探せます。
          </p>
        </div>

        {/* フィルターエリア (Filter UI: 鎮静化) */}
        <div className="bg-white rounded-xl p-6 md:p-8 shadow-sm border border-gray-200 mb-16 sticky top-24 z-40">
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
                    ? 'bg-[#1D3A52] text-white border-[#1D3A52] shadow-md' // 選択時: 深藍背景
                    : 'bg-white text-[#1D3A52] border-gray-200 hover:border-[#1D3A52] hover:bg-gray-50'} // 未選択時: 白背景
                `}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 制度カードリスト (Shared Component) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
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
            <div className="col-span-full text-center py-16 bg-white rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500 font-bold mb-4">条件に一致する制度が見つかりませんでした。</p>
              <button 
                onClick={() => setSelectedCategory('all')}
                className="text-[#1D3A52] font-bold hover:underline"
              >
                すべての制度を表示する
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
