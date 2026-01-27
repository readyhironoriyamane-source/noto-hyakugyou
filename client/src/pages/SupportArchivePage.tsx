import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConsultationCTA from '@/components/ConsultationCTA';
import { SUPPORT_ITEMS } from '@/data/supportData';
import { Search, Heart, FolderOpen, Share2, Printer, X } from 'lucide-react';
import { useLocation } from 'wouter';

// ----------------------------------------------------------------------
// カスタムフック: 保存機能 (Local Storage)
// ----------------------------------------------------------------------
const useSavedItems = () => {
  const [savedIds, setSavedIds] = useState<number[]>([]);

  // 初期化時にLocal Storageから読み込み
  useEffect(() => {
    const saved = localStorage.getItem('noto_saved_items');
    if (saved) {
      setSavedIds(JSON.parse(saved));
    }
  }, []);

  // URLパラメータから保存リストを復元（共有機能用）
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedIds = params.get('ids');
    if (sharedIds) {
      const ids = sharedIds.split(',').map(Number).filter(n => !isNaN(n));
      if (ids.length > 0) {
        // 既存の保存リストとマージするか、共有されたリストで上書きするか
        // ここでは、共有されたリストを一時的に表示するのではなく、
        // ユーザーの保存リストに追加する挙動とする（または確認ダイアログを出すのが丁寧だが、今回はシンプルに追加）
        setSavedIds(prev => {
          const newIds = Array.from(new Set([...prev, ...ids]));
          localStorage.setItem('noto_saved_items', JSON.stringify(newIds));
          return newIds;
        });
        
        // URLパラメータをクリアして、通常の表示に戻す
        window.history.replaceState({}, '', window.location.pathname);
      }
    }
  }, []);

  // 保存状態の切り替え
  const toggleSave = (id: number) => {
    const newSavedIds = savedIds.includes(id)
      ? savedIds.filter((savedId) => savedId !== id) // 削除
      : [...savedIds, id]; // 追加

    setSavedIds(newSavedIds);
    localStorage.setItem('noto_saved_items', JSON.stringify(newSavedIds));
  };

  return { savedIds, toggleSave };
};

// ----------------------------------------------------------------------
// コンポーネント実装
// ----------------------------------------------------------------------

const SupportArchive = () => {
  // State for filtering
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterProvider, setFilterProvider] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>(''); // ★検索クエリ
  const [showSavedOnly, setShowSavedOnly] = useState<boolean>(false); // ★保存のみ表示モード
  const [showShareModal, setShowShareModal] = useState<boolean>(false); // ★共有モーダル表示

  // Hook
  const { savedIds, toggleSave } = useSavedItems();
  const [location] = useLocation();

  // URLパラメータからカテゴリを初期設定
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');
    if (categoryParam) {
      setFilterCategory(categoryParam);
    }
  }, []);

  // 共有URL生成
  const generateShareUrl = () => {
    if (savedIds.length === 0) return '';
    const baseUrl = window.location.origin + location;
    const params = new URLSearchParams();
    params.set('ids', savedIds.join(','));
    return `${baseUrl}?${params.toString()}`;
  };

  const copyToClipboard = () => {
    const url = generateShareUrl();
    navigator.clipboard.writeText(url).then(() => {
      alert('共有URLをコピーしました');
      setShowShareModal(false);
    });
  };

  // Filtering Logic
  const filteredItems = useMemo(() => {
    return SUPPORT_ITEMS.filter((item) => {
      // 1. 保存済みフィルター (ONの場合、保存されていないものは除外)
      if (showSavedOnly && !savedIds.includes(item.id)) return false;

      // 2. カテゴリフィルター
      const matchCategory = filterCategory === 'all' || item.category === filterCategory;
      
      // 3. 主体フィルター
      const matchProvider = filterProvider === 'all' || item.providerType === filterProvider;

      // 4. フリーワード検索 (タイトル、サブタイトル、説明文)
      const query = searchQuery.toLowerCase().trim();
      const matchSearch = query === '' || 
        item.mainTitle.toLowerCase().includes(query) ||
        item.subTitle.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query);

      return matchCategory && matchProvider && matchSearch;
    });
  }, [filterCategory, filterProvider, searchQuery, showSavedOnly, savedIds]);

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
            {/* ★検索 & 保存リスト UI (新規追加) */}
            {/* -------------------------------------------------- */}
            <div className="mb-8 flex flex-col md:flex-row gap-4 items-stretch">
              
              {/* 検索窓 */}
              <div className="relative flex-grow">
                <input 
                  type="text" 
                  placeholder="キーワードで探す（例：解体、冷蔵庫、車両、販路...）" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-full shadow-sm focus:ring-2 focus:ring-[#1D3A52] focus:border-transparent outline-none text-base transition-shadow"
                />
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>

              {/* 保存リストを見るボタン (トグル) */}
              <button
                onClick={() => setShowSavedOnly(!showSavedOnly)}
                className={`
                  flex items-center justify-center px-8 py-4 rounded-full font-bold transition-all shadow-sm whitespace-nowrap
                  ${showSavedOnly 
                    ? 'bg-[#B33E28] text-white border border-[#B33E28]' // Active (赤)
                    : 'bg-white text-[#1D3A52] border border-gray-300 hover:bg-gray-50' // Inactive
                  }
                `}
              >
                {showSavedOnly ? <FolderOpen className="mr-2 w-5 h-5" /> : <Heart className="mr-2 w-5 h-5" />}
                {showSavedOnly ? '全ての制度に戻る' : `保存リスト (${savedIds.length})`}
              </button>
            </div>

            {/* -------------------------------------------------- */}
            {/* フィルタリング UI (形状・色統一版) */}
            {/* -------------------------------------------------- */}
            {!showSavedOnly && (
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
            )}

            {/* 検索結果カウント & ステータス & アクションボタン */}
            <div className="mb-6 flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-2 gap-4">
              <div className="text-gray-500 text-sm">
                <span className="font-bold text-[#1D3A52] text-lg mr-1">{filteredItems.length}</span>
                件の制度を表示中
                {showSavedOnly && <span className="ml-2 text-[#B33E28] font-bold">（保存した制度のみ）</span>}
              </div>

              {/* 保存リスト表示時のみ表示するアクションボタン */}
              {showSavedOnly && savedIds.length > 0 && (
                <div className="flex gap-2 no-print">
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#1D3A52] bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    リストを共有
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-white bg-[#1D3A52] rounded-lg hover:bg-[#152a3d] transition-colors"
                  >
                    <Printer className="w-4 h-4" />
                    リストを印刷
                  </button>
                </div>
              )}
            </div>

            {/* -------------------------------------------------- */}
            {/* リスト表示エリア */}
            {/* -------------------------------------------------- */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => {
                  const isSaved = savedIds.includes(item.id);

                  return (
                    <div key={item.id} className="relative h-full">
                      <Link href={`/support/${item.id}`} className="block group no-underline h-full">
                        <article className={`
                          h-full bg-white rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col relative group-hover:-translate-y-1
                          ${isSaved ? 'border-[#B33E28] shadow-md ring-1 ring-[#B33E28]/20' : 'border-gray-200 shadow-sm'}
                        `}>
                          
                          {/* カード上部：タイトル（メリット重視） */}
                          <div className="p-6 flex-grow">
                            {/* タグエリア */}
                            <div className="flex items-center gap-2 mb-3">
                              {/* 実施主体タグ */}
                              <span className={`${item.badgeColor} text-white text-xs font-bold px-2 py-1 rounded`}>
                                {item.badge}
                              </span>
                              {/* 困りごとタグ */}
                              <span className="bg-white text-gray-600 border border-gray-200 text-xs font-bold px-2 py-1 rounded">
                                {item.tag}
                              </span>
                            </div>

                            <h3 className="text-xl font-bold text-[#1D3A52] mb-2 leading-snug group-hover:text-[#B33E28] transition-colors">
                              {item.mainTitle}
                            </h3>
                            <p className="text-sm text-gray-500 mb-6">
                              {item.subTitle}
                            </p>

                            <div className="mb-4">
                              <p className="text-xs font-bold text-gray-400 mb-1">支援内容</p>
                              <p className="text-sm text-gray-700 leading-relaxed line-clamp-3">
                                {item.description}
                              </p>
                            </div>

                            {/* スペック情報（生成り背景） */}
                            <div className="bg-[#FAF9F6] rounded-lg p-4 space-y-3">
                              <div className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-[#B33E28]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="text-[#B33E28] text-xs font-bold">¥</span>
                                </div>
                                <div>
                                  <span className="text-xs font-bold text-[#B33E28] block mb-0.5">金額</span>
                                  <span className="text-sm font-bold text-[#1D3A52]">{item.specAmount}</span>
                                </div>
                              </div>
                              <div className="flex items-start gap-3">
                                <div className="w-5 h-5 rounded-full bg-[#1D3A52]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <span className="text-[#1D3A52] text-xs">📄</span>
                                </div>
                                <div>
                                  <span className="text-xs font-bold text-[#1D3A52] block mb-0.5">条件など</span>
                                  <span className="text-xs text-gray-600 leading-relaxed">{item.specCondition}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* カード下部：アクションボタン */}
                          <div className="px-6 pb-6 mt-auto">
                            <div className="w-full py-3 border border-gray-200 rounded-lg text-center text-sm font-bold text-[#1D3A52] group-hover:bg-[#1D3A52] group-hover:text-white transition-all duration-300 flex items-center justify-center gap-2">
                              詳細・相談先を見る
                              <span className="text-xs">↗</span>
                            </div>
                          </div>

                        </article>
                      </Link>

                      {/* ★保存ボタン (ハート) - Linkの外に配置してイベント伝播を防ぐ */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleSave(item.id);
                        }}
                        className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none bg-white/80 backdrop-blur-sm shadow-sm"
                        aria-label={isSaved ? "保存を解除" : "保存する"}
                      >
                        <Heart 
                          className={`w-6 h-6 transition-colors ${isSaved ? 'fill-[#B33E28] text-[#B33E28]' : 'text-gray-400 hover:text-gray-600'}`} 
                        />
                      </button>
                    </div>
                  );
                })
              ) : (
                <div className="col-span-full py-20 text-center bg-white rounded-lg border border-gray-200">
                  <p className="text-gray-500 mb-4 text-lg">
                    {showSavedOnly 
                      ? '保存された支援制度はまだありません。気になる制度の「♡」を押して保存しましょう。' 
                      : '条件に一致する支援制度が見つかりませんでした。'}
                  </p>
                  <button 
                    onClick={() => {
                      setFilterCategory('all'); 
                      setFilterProvider('all'); 
                      setSearchQuery('');
                      setShowSavedOnly(false);
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

        <ConsultationCTA />
      </main>

      <Footer />

      {/* 共有モーダル */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative animate-fade-in-up">
            <button 
              onClick={() => setShowShareModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-xl font-bold text-[#1D3A52] mb-4 flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              保存リストを共有
            </h3>
            
            <p className="text-sm text-gray-600 mb-4">
              以下のURLをコピーして、メールやチャットで共有してください。<br/>
              受け取った人がこのURLを開くと、現在の保存リストが反映されます。
            </p>
            
            <div className="flex gap-2 mb-6">
              <input 
                type="text" 
                readOnly 
                value={generateShareUrl()} 
                className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-600 outline-none"
              />
              <button 
                onClick={copyToClipboard}
                className="bg-[#1D3A52] text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-[#152a3d] transition-colors whitespace-nowrap"
              >
                コピー
              </button>
            </div>
            
            <div className="text-center">
              <button 
                onClick={() => setShowShareModal(false)}
                className="text-gray-500 text-sm hover:text-gray-800 underline"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportArchive;
