import { Button } from "@/components/ui/button";
import { GlossaryTerm } from "@/components/GlossaryTerm";
import { industries } from "@/data/industries";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, AlertTriangle, MessageCircle, Share2, X, ExternalLink, MapPin, Building2, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useRoute } from "wouter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function IndustryDetailPage() {
  const [, params] = useRoute("/industry/:id");
  const id = params?.id ? parseInt(params.id) : 0;
  const industry = industries.find((i) => i.id === id);
  const [activeSection, setActiveSection] = useState(0);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);
  const [showShareMenu, setShowShareMenu] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      sectionsRef.current.forEach((section, index) => {
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!industry) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F9F8F4]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">記事が見つかりません</h2>
          <Link href="/">
            <Button variant="outline">トップページへ戻る</Button>
          </Link>
        </div>
      </div>
    );
  }

  // フォントサイズと行間の設定
  const baseTextSize = "text-base md:text-lg";
  const leadingRelaxed = "leading-8 md:leading-9";

  return (
    <div className="min-h-screen bg-[#F9F8F4] font-sans text-gray-800">
      <Header />

      {/* ヒーローセクション（新デザイン） */}
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <img
          src={industry.image}
          alt={industry.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Scrim Gradient: 下から上へのグラデーションのみを適用し、上部は写真の明るさを活かす */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D3A52] via-[#1D3A52]/60 to-transparent opacity-90"></div>
        
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-20 text-white">
          <div className="max-w-4xl mx-auto">
            <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors no-underline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              一覧に戻る
            </Link>
            
            {/* タグエリア */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded text-xs font-bold border border-white/30">
                #{industry.category}
              </span>
              {industry.tags.map((tag, index) => (
                <span key={index} className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded text-xs font-bold border border-white/30">
                  #{tag}
                </span>
              ))}
            </div>

            {/* タイトル */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif leading-tight mb-6 drop-shadow-lg">
              {industry.title}
            </h1>

            {/* 取材対象者データ */}
            {industry.details && (
              <div className="flex flex-wrap items-center text-sm md:text-base text-white/90 gap-4 md:gap-8 border-t border-white/20 py-4 mt-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {industry.location}
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  {industry.details.founded}創業
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  従業員 {industry.details.employees}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 記事本文エリア: max-w-3xl (約768px) で幅を制限し、中央揃えで可読性を確保 */}
      <main className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        
        {/* 0. 基礎情報 (Basic Info) - ヒーローセクションに統合済みだが、補足情報を表示 */}
        <div className="mb-12 text-gray-600 text-sm flex justify-end gap-4">
          <span>取材日: 2024.01.15</span>
          <span>ライター: 能登 太郎</span>
        </div>

        {/* 1. 先人の教訓・後悔 (Regrets Alert) - 最優先表示 */}
        {industry.regrets && (
          <div className="bg-[#FFF4F2] border-l-4 border-[#B33E28] p-6 md:p-8 rounded-r-lg mb-16 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">⚠️</span>
              {/* 色覚バリアフリー対応: 文字色を濃い赤茶色(#4A1D1D)に変更 */}
              <h3 className="text-[#B33E28] font-bold text-lg md:text-xl">震災前に戻れるなら、これをやる。</h3>
            </div>
            <p className="font-bold text-[#4A1D1D] text-lg md:text-xl mb-3 leading-relaxed">
              「{industry.regrets.title}」
            </p>
            <p className="text-[#4A1D1D]/90 leading-relaxed">
              {industry.regrets.content}
            </p>
          </div>
        )}

        {/* Phase 1: 現状と課題 (Before) */}
        <section ref={el => sectionsRef.current[0] = el} className="mb-16">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
            <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">Phase 1</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">
              現状と課題
            </h2>
          </div>
          
          {/* Q1. 仕事の流儀 */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-gray-800 mb-4 border-l-4 border-accent pl-4">
              仕事の流儀
            </h3>
            <p className={`${baseTextSize} ${leadingRelaxed} text-gray-700 whitespace-pre-line`}>
              {industry.description}
            </p>
          </div>

          {/* Q2. 直面した壁 (Challenge Card) */}
          {industry.challengeCard && (
            <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-gray-100 text-gray-500 text-xs font-bold px-3 py-1 rounded-bl-lg">
                直面した課題
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 mt-2">
                {industry.challengeCard.label}
              </h3>
              <p className={`${baseTextSize} ${leadingRelaxed} text-gray-700 mb-6`}>
                {industry.challengeCard.description}
              </p>
            </div>
          )}
        </section>

        {/* Phase 2: 選択と決断 (Decision Matrix) */}
        <section ref={el => sectionsRef.current[1] = el} className="mb-16">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
            <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">Phase 2</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">
              当時の選択肢と、決断の理由
            </h2>
          </div>

          {industry.decisionProcess && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* 却下した選択肢 */}
              {industry.decisionProcess.rejectedOption && (
                <div className="bg-gray-100 p-6 rounded-lg opacity-80 border border-gray-200">
                  <div className="text-xs font-bold text-gray-500 mb-2">検討案 A</div>
                  <h4 className="font-bold text-gray-700 text-lg mb-4">{industry.decisionProcess.rejectedOption.title}</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
                    {industry.decisionProcess.rejectedOption.reasons.map((reason, idx) => (
                      <li key={idx}>{reason}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 選んだ選択肢（強調） */}
              {industry.decisionProcess.adoptedOption && (
                <div className="bg-white border-2 border-[#1D3A52] p-6 rounded-lg shadow-md relative transform md:-translate-y-2">
                  <div className="absolute -top-3 left-6 bg-[#1D3A52] text-white px-3 py-1 text-xs font-bold rounded-full shadow-sm">
                    採用
                  </div>
                  <div className="text-xs font-bold text-[#1D3A52] mb-2 mt-2">検討案 B</div>
                  <h4 className="font-bold text-[#1D3A52] text-xl mb-4">{industry.decisionProcess.adoptedOption.title}</h4>
                  <ul className="list-disc list-inside text-sm text-gray-800 space-y-2 mb-6">
                    {industry.decisionProcess.adoptedOption.reasons.map((reason, idx) => (
                      <li key={idx}>{reason}</li>
                    ))}
                  </ul>
                  <div className="bg-[#F9F8F4] p-4 rounded text-sm text-[#B33E28] font-bold border border-[#B33E28]/20">
                    決め手：{industry.decisionProcess.adoptedOption.decidingFactor}
                  </div>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Phase 3: 行動と変化 (Action & Reality) */}
        <section ref={el => sectionsRef.current[2] = el} className="mb-16">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
            <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">Phase 3</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">
              行動と変化
            </h2>
          </div>

          {/* Q5. 実行内容 (Action) */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-accent" />
              実行したこと
            </h3>
            <p className={`${baseTextSize} ${leadingRelaxed} text-gray-700`}>
              {industry.decisionProcess?.action}
            </p>
          </div>

          {/* Q5b. 実務の壁 (Barriers Checklist) */}
          {industry.barriers && industry.barriers.checklist && (
            <div className="mb-16">
              <h3 className="text-xl font-bold text-[#1D3A52] mb-6 border-l-4 border-[#B33E28] pl-4">
                これから申請する人が覚悟すべき「壁」
              </h3>
              <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm">
                <ul className="space-y-6">
                  {industry.barriers.checklist.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-[#B33E28] mr-4 font-bold mt-1 text-lg">✕</span>
                      <div>
                        <h4 className="font-bold text-gray-800 text-base md:text-lg mb-2">{item.title}</h4>
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Q6. ビフォーアフター (Outcome) */}
          <div className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <ArrowUpRight className="w-6 h-6 text-primary" />
              活用後の変化
            </h3>
            <p className={`${baseTextSize} ${leadingRelaxed} text-gray-700`}>
              {industry.decisionProcess?.outcome}
            </p>
          </div>
        </section>

        {/* Phase 4: 未来 (Future) */}
        <section ref={el => sectionsRef.current[3] = el} className="mb-16">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
            <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">Phase 4</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">
              未来への展望
            </h2>
          </div>
          
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-8 md:p-12 text-center border border-primary/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
            <MessageCircle className="w-12 h-12 text-primary/20 mx-auto mb-6" />
            <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-800 mb-6">
              「{industry.details?.owner}」さんからのメッセージ
            </h3>
            <p className="text-lg md:text-xl font-serif leading-relaxed text-gray-700 italic">
              「{industry.future || industry.timeline.future}」
            </p>
          </div>
        </section>

        {/* Phase 5: 編集者視点 (Writer's Eye) */}
        <section ref={el => sectionsRef.current[4] = el} className="bg-[#1D3A52] text-white rounded-xl p-8 md:p-12 shadow-lg">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-600">
            <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded">Phase 5</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">
              編集者視点
            </h2>
          </div>

          {/* W1. 一言コメント */}
          <div className="mb-10">
            <h3 className="font-bold text-lg mb-3 opacity-90">編集部より</h3>
            <p className="leading-relaxed text-white/90 text-lg">
              {industry.editorComment || "この事例は、多くの事業者にとって希望の光となるでしょう。"}
            </p>
          </div>

          {/* W3. 制度スペック */}
          <div className="bg-white text-[#1D3A52] rounded-lg p-6 md:p-8 shadow-sm mb-12">
            <h4 className="text-sm font-bold text-gray-500 mb-6 border-b border-gray-200 pb-2">
              今回活用した制度
            </h4>
            {industry.supportSystem?.map((support, index) => (
              <div key={index} className={index !== (industry.supportSystem?.length || 0) - 1 ? "mb-8" : ""}>
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h5 className="text-xl font-bold">{support.name}</h5>
                  <a href={support.link} className="text-[#B33E28] text-sm font-bold hover:underline shrink-0 flex items-center gap-1">
                    詳細 <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {support.description}
                </p>
                
                {/* ポイントBOX */}
                {support.points && (
                  <div className="bg-[#F9F8F4] p-4 rounded border border-gray-200">
                    <div className="flex items-center text-xs font-bold text-gray-500 mb-1">
                      <span className="mr-1">✓</span> {support.points.label}
                    </div>
                    <div className="font-bold text-[#1D3A52]">
                      <GlossaryTerm term={support.points.term} /> {support.points.detail}
                    </div>
                  </div>
                )}
                
                {/* 区切り線 (最後の要素以外) */}
                {index !== (industry.supportSystem?.length || 0) - 1 && (
                  <hr className="border-gray-200 my-8 border-dashed" />
                )}
              </div>
            ))}
          </div>

          {/* W2. 他のおすすめ (Editor Recommendations) */}
          {industry.recommendedSupports && (
            <div>
              <h3 className="font-serif text-xl mb-6 text-white border-l-4 border-accent pl-4">
                この記事を読んだあなたへのおすすめ制度
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {industry.recommendedSupports.map((rec, index) => (
                  <a 
                    key={index} 
                    href={rec.link}
                    className="block bg-white/10 hover:bg-white/20 p-5 rounded-lg transition-colors no-underline group border border-white/5"
                  >
                    <div className="text-xs text-gray-300 mb-2 font-bold">{rec.category}</div>
                    <div className="font-bold text-white flex items-center justify-between">
                      {rec.name}
                      <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-xs text-gray-400 mt-2 line-clamp-2">{rec.description}</p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </section>

      </main>

      {/* シェアボタン (Floating) */}
      <div className="fixed bottom-6 right-6 z-50">
        <div className={`absolute bottom-full right-0 mb-4 flex flex-col gap-3 transition-all duration-300 ${showShareMenu ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
          <button className="bg-[#1DA1F2] text-white p-3 rounded-full shadow-lg hover:bg-[#1a91da] transition-colors" aria-label="Twitterでシェア">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
          </button>
          <button className="bg-[#06C755] text-white p-3 rounded-full shadow-lg hover:bg-[#05b34c] transition-colors" aria-label="LINEでシェア">
            <MessageCircle className="w-5 h-5" />
          </button>
          <button className="bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors" onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('URLをコピーしました');
          }} aria-label="URLをコピー">
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>
        <button 
          onClick={() => setShowShareMenu(!showShareMenu)}
          className="bg-primary text-white p-4 rounded-full shadow-xl hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"
        >
          {showShareMenu ? <X className="w-6 h-6" /> : <Share2 className="w-6 h-6" />}
        </button>
      </div>

      <Footer />
    </div>
  );
}
