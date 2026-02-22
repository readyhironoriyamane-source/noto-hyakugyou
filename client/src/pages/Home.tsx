import { Button } from "@/components/ui/button";
import { APP_TITLE } from "@/const";
import { ArrowUpRight, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";
import { industries } from "../data/industries";

export default function Home() {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterRegion, setFilterRegion] = useState<string>('all');

  // フィルタリングロジック
  const filteredStudies = industries.filter(study => {
    // isCaseStudyフラグがfalseの場合は表示しない（石川シードなど）
    if (study.isCaseStudy === false) return false;

    const matchCategory = filterCategory === 'all' || study.category === filterCategory;
    const matchRegion = filterRegion === 'all' || study.region === filterRegion;
    return matchCategory && matchRegion;
  });

  // ユニークな地域リストを作成
  const regions = Array.from(new Set(industries.map(s => s.region)));

  return (
    <div className="min-h-screen flex flex-col font-sans text-[#333]">
      <main className="flex-grow">
        {/* -------------------------------------------------- */}
        {/* ヒーローセクション：雑誌の表紙風デザイン */}
        {/* -------------------------------------------------- */}
        <section className="relative bg-[#F4F1EA] py-20 md:py-32 overflow-hidden border-b border-gray-200">
          {/* 背景装飾：和紙っぽいテクスチャや伝統的なパターンを想定 */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" 
               style={{ backgroundImage: 'radial-gradient(#B33E28 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
          </div>

          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block py-1 px-3 border border-[#333] text-xs font-bold tracking-widest mb-6 uppercase">
                Noto Hyakugyou Roku
              </span>
              
              <h1 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight leading-tight">
                <span className="block text-[#B33E28] mb-2 font-serif">能登百業録</span>
                <span className="block text-2xl md:text-3xl font-normal mt-4 text-[#555]">
                  生業を記録し、未来へつなぐ。
                </span>
              </h1>

              <p className="text-lg md:text-xl text-[#555] leading-relaxed max-w-2xl mx-auto mb-12 font-medium">
                能登の地で育まれた伝統、技術、そして人々の想い。<br className="hidden md:inline"/>
                震災を乗り越え、次代へと受け継がれる「百の生業」を<br className="hidden md:inline"/>
                ドキュメンタリーとして記録・発信します。
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button 
                  size="lg" 
                  className="bg-[#B33E28] hover:bg-[#8E2F1D] text-white rounded-none px-8 py-6 text-lg font-bold tracking-wide shadow-lg transition-all hover:translate-y-[-2px]"
                  onClick={() => document.getElementById('case-studies')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  取材記事を読む
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-[#333] text-[#333] hover:bg-[#333] hover:text-white rounded-none px-8 py-6 text-lg font-bold tracking-wide transition-all"
                  onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfP-xWqKqDqZqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq/viewform', '_blank')}
                >
                  掲載を依頼する
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* -------------------------------------------------- */}
        {/* 記事一覧セクション：グリッドレイアウト */}
        {/* -------------------------------------------------- */}
        <section id="case-studies" className="py-20 bg-white">
          <div className="container">
            
            {/* セクションヘッダー */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-200 pb-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2 font-serif">取材記事一覧</h2>
                <p className="text-[#666]">能登の復興と挑戦の記録</p>
              </div>
              
              {/* フィルタリングUI */}
              <div className="flex flex-wrap gap-4 mt-6 md:mt-0">
                <div className="relative">
                  <select 
                    className="appearance-none bg-[#F9F9F9] border border-gray-300 py-2 pl-4 pr-10 rounded-none focus:outline-none focus:border-[#B33E28] text-sm font-medium"
                    value={filterRegion}
                    onChange={(e) => setFilterRegion(e.target.value)}
                  >
                    <option value="all">すべての地域</option>
                    {regions.map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>

                <div className="relative">
                  <select 
                    className="appearance-none bg-[#F9F9F9] border border-gray-300 py-2 pl-4 pr-10 rounded-none focus:outline-none focus:border-[#B33E28] text-sm font-medium"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="all">すべての業種</option>
                    <option value="伝統工芸">伝統工芸</option>
                    <option value="食品・加工">食品・加工</option>
                    <option value="観光・サービス">観光・サービス</option>
                    <option value="農業・林業">農業・林業</option>
                    <option value="その他">その他</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* 記事グリッド */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {filteredStudies.length > 0 ? (
                filteredStudies.map((study) => (
                  <Link key={study.id} href={`/industry/${study.id}`}>
                    <div className="group cursor-pointer flex flex-col h-full border-b border-gray-200 pb-8 hover:opacity-90 transition-opacity">
                      {/* ① アイキャッチ画像 */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 mb-6">
                        <img 
                          src={study.heroImage} 
                          alt={study.title}
                          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-0 left-0 bg-[#B33E28] text-white text-xs font-bold px-3 py-1">
                          {study.category}
                        </div>
                      </div>

                      <div className="flex-grow">
                        {/* ② メタ情報（地域・事業者名） */}
                        <div className="flex items-center text-xs font-bold tracking-wider text-gray-500 mb-3 uppercase">
                          <span className="mr-3">{study.region}</span>
                          <span className="w-px h-3 bg-gray-300 mr-3"></span>
                          <div className="flex items-center">
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

                      {/* ⑤ 構造化データブロック（新設） */}
                      {study.challengeCard?.structuredBlock && (
                        <div className="mb-6 space-y-8 bg-gray-50 p-6 rounded border border-gray-100">
                          {study.challengeCard.structuredBlock.map((block: any, idx: number) => (
                            <div key={idx} className="text-sm">
                              <span className="inline-block bg-gray-200 text-gray-700 text-xs font-bold px-2 py-0.5 rounded mb-3">
                                {block.label}
                              </span>
                              <ul className="list-disc list-inside text-gray-600 pl-1">
                                {block.items.map((item: string, i: number) => {
                                  // 支援制度へのリンクマッピング
                                  let linkTarget = "";
                                  if (item.includes("なりわい再建支援補助金") && !item.includes("能登町")) {
                                    linkTarget = "#support-nariwai";
                                  } else if (item.includes("小規模事業者持続化補助金")) {
                                    linkTarget = "#support-jizoku";
                                  } else if (item.includes("能登町なりわい再建支援補助金")) {
                                    linkTarget = "#support-noto-nariwai";
                                  }

                                  return (
                                    <li key={i} className="leading-[1.8] mb-[8px] last:mb-0 break-words">
                                      {linkTarget ? (
                                        // ネストされたaタグを避けるため、spanタグでラップし、イベント伝播を止める
                                        <span
                                          className="text-primary hover:text-accent hover:underline decoration-1 underline-offset-2 font-medium transition-colors cursor-pointer"
                                          onClick={(e) => {
                                            // 親のカードリンクへの遷移を防止
                                            e.stopPropagation();
                                            e.preventDefault();
                                            // スムーズスクロール
                                            const target = document.querySelector(linkTarget);
                                            if (target) {
                                              target.scrollIntoView({ behavior: 'smooth' });
                                            }
                                          }}
                                        >
                                          {item}
                                        </span>
                                      ) : (
                                        item
                                      )}
                                    </li>
                                  );
                                })}
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
                  </Link>
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
            <h2 className="text-3xl font-bold mb-6 font-serif">
              あなたの生業も、<br/>
              未来へ残しませんか？
            </h2>
            <p className="text-[#555] mb-10 leading-relaxed">
              能登百業録では、震災からの復興に取り組む事業者の皆様を取材しています。<br/>
              自薦・他薦は問いません。お気軽にご連絡ください。
            </p>
            <Button 
              size="lg" 
              className="bg-[#333] hover:bg-black text-white rounded-none px-10 py-6 text-lg font-bold tracking-wide"
              onClick={() => window.open('https://docs.google.com/forms/d/e/1FAIpQLSfP-xWqKqDqZqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJqJq/viewform', '_blank')}
            >
              お問い合わせ・取材依頼
            </Button>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="bg-[#333] text-white py-12 border-t border-gray-800">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <span className="text-2xl font-bold font-serif tracking-wider">能登百業録</span>
              <p className="text-gray-400 text-sm mt-2">能登の生業を記録し、未来へつなぐ。</p>
            </div>
            <div className="flex gap-8 text-sm font-medium text-gray-300">
              <a href="#" className="hover:text-white transition-colors">運営について</a>
              <a href="#" className="hover:text-white transition-colors">プライバシーポリシー</a>
              <a href="#" className="hover:text-white transition-colors">お問い合わせ</a>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700 text-center text-gray-500 text-xs">
            &copy; {new Date().getFullYear()} Noto Hyakugyou Roku. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
