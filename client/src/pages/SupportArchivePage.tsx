import { useState, useMemo, useEffect } from 'react';
import { Link, useSearch } from 'wouter';
import { ArrowUpRight, Search, Phone, MessageCircle, AlertCircle, Calendar, Building2, Wallet, Users, TrendingUp } from 'lucide-react';
import { supports, CATEGORIES, PROVIDERS, SupportSystem } from '@/data/supports';
import Footer from '@/components/Footer';

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
    return supports.filter(support => {
      const categoryMatch = selectedCategory === 'all' || support.category === selectedCategory;
      const providerMatch = selectedProvider === 'all' || support.provider === selectedProvider;
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

  return (
    <div className="min-h-screen bg-[#F9F8F4] font-sans text-gray-900">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="font-serif font-bold text-xl text-primary tracking-wider hover:opacity-80 transition-opacity">
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
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">
            支援制度を探す
          </h1>
          <p className="text-gray-600 font-medium md:text-lg">
            お困りごとや、事業所の所在地から、<br className="md:hidden" />使える制度を絞り込めます。
          </p>
        </div>

        {/* フィルターエリア */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200 mb-12">
          {/* 1. 困りごとで絞り込む */}
          <div className="mb-8">
            <h2 className="text-sm font-bold text-gray-500 mb-4 flex items-center gap-2">
              <Search className="w-4 h-4" /> 困りごとで絞り込む
            </h2>
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`
                    h-12 px-6 rounded-full font-bold text-sm md:text-base transition-all duration-200 flex items-center gap-2
                    ${selectedCategory === cat.id 
                      ? 'bg-primary text-white shadow-md scale-105' 
                      : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400'}
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
            <h2 className="text-sm font-bold text-gray-500 mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4" /> 主体で絞り込む
            </h2>
            <div className="flex flex-wrap gap-3">
              {PROVIDERS.map((prov) => (
                <button
                  key={prov.id}
                  onClick={() => setSelectedProvider(prov.id)}
                  className={`
                    h-10 px-5 rounded-full font-bold text-sm transition-all duration-200
                    ${selectedProvider === prov.id 
                      ? 'ring-2 ring-offset-2 ring-primary bg-gray-800 text-white' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                  `}
                >
                  {prov.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 制度カードリスト */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredSupports.length > 0 ? (
            filteredSupports.map((support) => (
              <SupportCard key={support.id} support={support} isClosingSoon={isClosingSoon} />
            ))
          ) : (
            <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-300">
              <p className="text-gray-500 font-bold">条件に一致する制度が見つかりませんでした。</p>
              <button 
                onClick={() => { setSelectedCategory('all'); setSelectedProvider('all'); }}
                className="mt-4 text-primary font-bold underline hover:no-underline"
              >
                条件をリセットする
              </button>
            </div>
          )}
        </div>

        {/* 相談誘導エリア (Consultation CTA) */}
        <div className="bg-[#E8F5E9] rounded-2xl p-8 md:p-12 text-center border border-[#C8E6C9]">
          <h2 className="text-xl md:text-2xl font-bold text-[#2E7D32] mb-4">
            どの制度を使えばいいか分からない方へ
          </h2>
          <p className="text-[#1B5E20] mb-8 font-medium">
            専門の相談員が、あなたの状況に合わせて最適な制度をご案内します。<br className="hidden md:block" />
            まずはお近くの商工会へお電話ください。
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a 
              href="tel:0768-00-0000" 
              className="flex items-center justify-center gap-3 bg-[#2E7D32] text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:bg-[#1B5E20] transition-colors active:scale-95"
            >
              <Phone className="w-6 h-6" />
              商工会に電話で相談する
            </a>
            <a 
              href="#" 
              className="flex items-center justify-center gap-3 bg-white text-[#2E7D32] font-bold py-4 px-8 rounded-xl shadow border-2 border-[#2E7D32] hover:bg-[#F1F8E9] transition-colors active:scale-95"
            >
              <MessageCircle className="w-6 h-6" />
              相談窓口の一覧を見る
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// 制度カードコンポーネント
function SupportCard({ support, isClosingSoon }: { support: SupportSystem, isClosingSoon: (d?: string) => boolean }) {
  const providerConfig = PROVIDERS.find(p => p.id === support.provider);
  const closing = isClosingSoon(support.deadline);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-6 flex flex-col h-full group relative overflow-hidden">
      {/* 左側のアクセントバー */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
        support.category === 'reconstruction' ? 'bg-blue-500' :
        support.category === 'finance' ? 'bg-yellow-500' :
        support.category === 'hr' ? 'bg-green-500' :
        support.category === 'sales' ? 'bg-purple-500' : 'bg-gray-400'
      }`}></div>

      {/* ヘッダー */}
      <div className="flex justify-between items-start mb-4 pl-2">
        <span className={`text-xs font-bold px-2 py-1 rounded ${providerConfig?.color || 'bg-gray-500 text-white'}`}>
          {providerConfig?.label}
        </span>
        <div className="flex flex-col items-end">
          {closing && (
            <span className="text-xs font-bold text-red-600 flex items-center gap-1 mb-1 animate-pulse">
              <AlertCircle className="w-3 h-3" /> 締切間近
            </span>
          )}
          <span className={`text-xs font-bold ${closing ? 'text-red-600' : 'text-gray-500'}`}>
            {support.status === 'recruiting' ? '募集中' : 
             support.status === 'ongoing' ? '随時受付' : 
             support.status === 'closing_soon' ? 'まもなく終了' : '受付終了'}
          </span>
        </div>
      </div>

      {/* メインタイトル（メリット） */}
      <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug pl-2">
        {support.benefit}
      </h3>

      {/* サブタイトル（正式名称） */}
      <p className="text-sm font-medium text-gray-500 mb-6 pl-2">
        {support.name}
      </p>

      {/* スペック情報 */}
      <div className="space-y-3 mb-8 pl-2 flex-grow">
        <div className="flex items-start gap-3 text-sm">
          <Wallet className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
          <div>
            <span className="block text-xs text-gray-400 font-bold">金額・補助率</span>
            <span className="font-bold text-gray-800">{support.amount}</span>
          </div>
        </div>
        <div className="flex items-start gap-3 text-sm">
          <Users className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
          <div>
            <span className="block text-xs text-gray-400 font-bold">対象</span>
            <span className="font-medium text-gray-800">{support.target}</span>
          </div>
        </div>
        {support.deadline && (
          <div className="flex items-start gap-3 text-sm">
            <Calendar className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
            <div>
              <span className="block text-xs text-gray-400 font-bold">申請期限</span>
              <span className={`font-medium ${closing ? 'text-red-600 font-bold' : 'text-gray-800'}`}>
                {support.deadline} まで
              </span>
            </div>
          </div>
        )}
      </div>

      {/* アクションボタン */}
      <a 
        href={support.link}
        className="mt-auto w-full flex items-center justify-center gap-2 border-2 border-primary text-primary font-bold py-3 rounded-lg hover:bg-primary hover:text-white transition-colors group-hover:shadow-sm"
      >
        詳細・相談先を見る
        <ArrowUpRight className="w-4 h-4" />
      </a>
    </div>
  );
}
