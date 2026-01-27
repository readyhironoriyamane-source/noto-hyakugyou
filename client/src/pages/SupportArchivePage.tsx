'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SUPPORT_ITEMS } from '@/data/supportData';
import { Search, Bookmark, BookmarkCheck, ChevronRight, Filter, ArrowRight, Share2, Printer } from 'lucide-react';

// ----------------------------------------------------------------------
// カスタムフック: 保存機能 (Local Storage)
// ----------------------------------------------------------------------
const useSavedItems = () => {
  const [savedIds, setSavedIds] = useState<number[]>([]);

  useEffect(() => {
    // サーバーサイドレンダリング対策
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('noto_saved_items');
      if (saved) {
        setSavedIds(JSON.parse(saved));
      }
      
      // URLパラメータからの復元（共有機能）
      const params = new URLSearchParams(window.location.search);
      const sharedIds = params.get('ids');
      if (sharedIds) {
        const idsToSave = sharedIds.split(',').map(id => parseInt(id, 10)).filter(id => !isNaN(id));
        if (idsToSave.length > 0) {
          // 既存の保存リストとマージ（重複排除）
          const currentSaved = saved ? JSON.parse(saved) : [];
          const newSaved = Array.from(new Set([...currentSaved, ...idsToSave]));
          setSavedIds(newSaved);
          localStorage.setItem('noto_saved_items', JSON.stringify(newSaved));
          
          // URLパラメータをクリアして保存済みモードにする
          window.history.replaceState({}, '', window.location.pathname);
          // 少し遅延させてから保存済みフィルターをONにする（コンポーネント側で制御するためここではstate更新のみ）
        }
      }
    }
  }, []);

  const toggleSave = (id: number) => {
    const newSavedIds = savedIds.includes(id)
      ? savedIds.filter((savedId) => savedId !== id)
      : [...savedIds, id];
    setSavedIds(newSavedIds);
    localStorage.setItem('noto_saved_items', JSON.stringify(newSavedIds));
  };

  return { savedIds, toggleSave };
};

// ----------------------------------------------------------------------
// メインコンポーネント (検索 + 保存 + リスト表示)
// ----------------------------------------------------------------------
export default function SupportArchivePage() {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterProvider, setFilterProvider] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSavedOnly, setShowSavedOnly] = useState<boolean>(false);
  const [location] = useLocation();
  
  const { savedIds, toggleSave } = useSavedItems();

  // URLパラメータからカテゴリフィルターを初期化
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setFilterCategory(categoryParam);
    }
    
    // 共有リンクで来た場合は保存済みリストを表示
    const idsParam = params.get('ids');
    if (idsParam) {
      setShowSavedOnly(true);
    }
  }, []);

  const filteredItems = useMemo(() => {
    return SUPPORT_ITEMS.filter((item) => {
      if (showSavedOnly && !savedIds.includes(item.id)) return false;

      const matchCategory = filterCategory === 'all' || item.category === filterCategory;
      const matchProvider = filterProvider === 'all' || item.providerType === filterProvider;
      
      const query = searchQuery.toLowerCase().trim();
      const matchSearch = query === '' || 
        item.mainTitle.toLowerCase().includes(query) ||
        item.subTitle.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      return matchCategory && matchProvider && matchSearch;
    });
  }, [filterCategory, filterProvider, searchQuery, showSavedOnly, savedIds]);

  // 共有用URLの生成
  const generateShareUrl = () => {
    if (savedIds.length === 0) return '';
    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?ids=${savedIds.join(',')}`;
  };

  // 共有アクション
  const handleShare = async () => {
    const url = generateShareUrl();
    if (!url) return;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: '能登百業録 - 保存した支援制度リスト',
          text: '私が気になった支援制度のリストです。',
          url: url,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert('共有用URLをコピーしました');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 print:bg-white">
      <Header />
      
      <main className="pt-[80px] pb-20 print:pt-0 print:pb-0">
        {/* ヒーローエリア（印刷時は非表示） */}
        <div className="bg-slate-900 text-white py-16 px-6 print:hidden">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 tracking-wider">
              支援制度一覧
            </h1>
            <p className="text-slate-300 text-lg max-w-2xl mx-auto">
              事業者様の状況や目的に合わせた支援制度を、<br className="hidden md:block" />
              目的・提供元・キーワードから検索できます。
            </p>
          </div>
        </div>

        {/* 検索・フィルターエリア（印刷時は非表示） */}
        <div className="sticky top-[60px] z-30 bg-white/95 backdrop-blur shadow-sm border-b border-slate-200 print:hidden">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              
              {/* カテゴリフィルター */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto no-scrollbar">
                {[
                  { id: 'all', label: 'すべて' },
                  { id: 'reconstruction', label: '設備の復旧・再建' },
                  { id: 'finance', label: '資金繰り・融資' },
                  { id: 'hr', label: '人材・承継' },
                  { id: 'sales', label: '販路開拓' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setFilterCategory(cat.id)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all ${
                      filterCategory === cat.id
                        ? 'bg-slate-900 text-white shadow-md'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* 保存リスト切り替え */}
              <button
                onClick={() => setShowSavedOnly(!showSavedOnly)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all border ${
                  showSavedOnly
                    ? 'bg-yellow-50 border-yellow-400 text-yellow-700 shadow-sm'
                    : 'bg-white border-slate-300 text-slate-600 hover:bg-slate-50'
                }`}
              >
                {showSavedOnly ? <BookmarkCheck className="w-4 h-4 fill-current" /> : <Bookmark className="w-4 h-4" />}
                {showSavedOnly ? '保存済みを表示中' : '保存リストを見る'}
                <span className="bg-slate-200 text-slate-700 text-xs px-2 py-0.5 rounded-full ml-1">
                  {savedIds.length}
                </span>
              </button>
            </div>

            {/* 詳細フィルター（2段目） */}
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="キーワードで検索（例：補助金、融資、雇用...）"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all"
                />
              </div>
              
              <div className="flex items-center gap-2 overflow-x-auto">
                <Filter className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="text-xs font-bold text-slate-500 shrink-0">提供元：</span>
                {[
                  { id: 'all', label: 'すべて' },
                  { id: 'ishikawa', label: '石川県' },
                  { id: 'noto', label: '能登町' },
                  { id: 'national', label: '国・公庫' },
                  { id: 'other', label: 'その他' },
                ].map((prov) => (
                  <button
                    key={prov.id}
                    onClick={() => setFilterProvider(prov.id)}
                    className={`whitespace-nowrap px-3 py-1 rounded text-xs font-medium transition-colors ${
                      filterProvider === prov.id
                        ? 'bg-slate-800 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {prov.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 保存リスト表示時のアクションバー */}
        {showSavedOnly && savedIds.length > 0 && (
          <div className="max-w-6xl mx-auto px-4 mt-6 print:hidden">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <BookmarkCheck className="w-6 h-6 text-yellow-600" />
                <div>
                  <h3 className="font-bold text-yellow-800">保存した制度リスト（{filteredItems.length}件）</h3>
                  <p className="text-xs text-yellow-700">このリストはブラウザに保存されています。</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-yellow-300 text-yellow-800 rounded-md text-sm font-bold hover:bg-yellow-100 transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  リストを共有
                </button>
                <button 
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-md text-sm font-bold hover:bg-yellow-700 transition-colors shadow-sm"
                >
                  <Printer className="w-4 h-4" />
                  リストを印刷
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 印刷用ヘッダー（画面では非表示） */}
        <div className="hidden print:block p-8 border-b-2 border-black mb-8">
          <h1 className="text-2xl font-bold mb-2">能登百業録 - 支援制度保存リスト</h1>
          <p className="text-sm">出力日: {new Date().toLocaleDateString()}</p>
        </div>

        {/* リスト表示エリア */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {filteredItems.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
              <p className="text-slate-500 font-medium">条件に一致する支援制度は見つかりませんでした。</p>
              <button 
                onClick={() => {
                  setFilterCategory('all');
                  setFilterProvider('all');
                  setSearchQuery('');
                }}
                className="mt-4 text-slate-900 underline hover:text-slate-600"
              >
                条件をリセットしてすべて表示
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className="group bg-white border border-gray-200 rounded-lg p-6 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow relative print:break-inside-avoid print:border-black"
                >
                  {/* 保存ボタン */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSave(item.id);
                    }}
                    className="absolute top-6 right-6 z-10 transition-colors print:hidden"
                  >
                    {savedIds.includes(item.id) ? (
                      <Bookmark className="w-6 h-6 text-[#1D3A52] fill-[#1D3A52]" />
                    ) : (
                      <Bookmark className="w-6 h-6 text-gray-300 hover:text-gray-400" />
                    )}
                  </button>

                  {/* カードヘッダー */}
                  <div className="flex items-center mb-4">
                    <span className={`px-2 py-1 text-[10px] font-bold text-white rounded ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                    <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-1 rounded ml-2 font-bold">
                      {item.category === 'reconstruction' && '再建'}
                      {item.category === 'finance' && '資金'}
                      {item.category === 'hr' && '人材'}
                      {item.category === 'sales' && '販路'}
                    </span>
                  </div>
                  
                  {/* タイトルエリア */}
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 leading-tight font-sans min-h-[64px] flex items-end group-hover:text-slate-700 transition-colors whitespace-pre-line">
                    {item.mainTitle}
                  </h3>
                  <p className="text-sm text-gray-500 mb-6 min-h-[40px] font-bold">
                    {item.subTitle}
                  </p>
                  
                  {/* 支援内容 */}
                  <h4 className="text-xs font-bold text-gray-500 mb-2">支援内容</h4>
                  <p className="text-sm text-gray-700 leading-relaxed mb-6 flex-grow line-clamp-3">
                    {item.description}
                  </p>

                  {/* スペックBOX（生成りBOX） */}
                  <div className="bg-[#FAF9F6] rounded-lg p-6 mb-8 space-y-5">
                    {/* 金額・条件行 */}
                    <div className="flex items-start">
                      <div className="flex items-center w-24 shrink-0 mt-0.5 gap-2">
                        <span className="text-[#B33E28] text-sm">💰</span>
                        <span className="text-xs font-bold text-[#B33E28]">金額・条件</span>
                      </div>
                      <div className="text-[15px] font-bold text-[#1D3A52] flex-1">
                        {item.specAmount}
                        {item.specCondition && <span className="block text-xs font-normal mt-1">{item.specCondition}</span>}
                      </div>
                    </div>
                    {/* 備考行（条件等を備考として表示） */}
                    <div className="flex items-start">
                      <div className="flex items-center w-24 shrink-0 mt-0.5 gap-2">
                        <span className="text-[#1D3A52] text-sm">📄</span>
                        <span className="text-xs font-bold text-[#1D3A52]">備考</span>
                      </div>
                      <div className="text-sm text-gray-700 flex-1 leading-snug">
                        {item.specCondition}
                      </div>
                    </div>
                  </div>

                  {/* フッターボタン */}
                  <Link href={`/support/${item.id}`} className="mt-auto w-full border border-gray-300 bg-white text-[#1D3A52] text-sm font-bold py-4 rounded hover:bg-gray-50 transition-colors flex justify-center items-center no-underline print:hidden">
                    詳細・相談先を見る ↗
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
