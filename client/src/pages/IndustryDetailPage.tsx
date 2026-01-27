import { Button } from "@/components/ui/button";
import { GlossaryTerm } from "@/components/GlossaryTerm";
import { industries } from "@/data/industries";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, AlertTriangle, MessageCircle, Share2, X, ExternalLink, MapPin, Building2, Users } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useRoute } from "wouter";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

export default function IndustryDetailPage() {
  const [match, params] = useRoute("/industry/:id");
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

        {/* タイムラインのコンテナ */}
        <div className="relative border-l-2 border-[#1D3A52]/20 ml-3 md:ml-6 space-y-16 mb-16">

          {/* =================================================================
              Phase 1: 現状と課題 (Before)
             ================================================================= */}
          <div ref={el => sectionsRef.current[0] = el} className="relative pl-8 md:pl-12">
            {/* タイムラインの点（マーカー） */}
            <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-[#1D3A52] border-4 border-[#F9F8F4]" />
            
            <div className="mb-2">
              <span className="bg-[#1D3A52] text-white text-xs font-bold px-2 py-1 rounded">Phase 1</span>
              <span className="text-gray-500 text-xs font-bold ml-2">発災直後〜1ヶ月</span>
            </div>
            <h3 className="text-2xl font-bold text-[#1D3A52] mb-4">現状と課題</h3>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h4 className="font-bold text-lg mb-2">「{industry.challengeCard?.label}」</h4>
              <p className="text-gray-700 leading-relaxed mb-6">
                {industry.challengeCard?.description}
              </p>

              {/* ⚠️ 教訓アラート */}
              {industry.regrets && (
                <div className="bg-[#FFF4F2] border-l-4 border-[#B33E28] p-4 rounded-r">
                  <div className="text-[#B33E28] font-bold text-sm mb-1 flex items-center gap-2">
                    <span className="text-lg">⚠️</span> {industry.regrets.title}
                  </div>
                  <p className="font-bold text-[#4A1D1D] text-sm">
                    {industry.regrets.content}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* =================================================================
              Phase 2: 選択と決断 (Decision)
             ================================================================= */}
          <div ref={el => sectionsRef.current[1] = el} className="relative pl-8 md:pl-12">
            <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-[#1D3A52] border-4 border-[#F9F8F4]" />
            
            <div className="mb-2">
              <span className="bg-[#1D3A52] text-white text-xs font-bold px-2 py-1 rounded">Phase 2</span>
              <span className="text-gray-500 text-xs font-bold ml-2">3ヶ月後〜</span>
            </div>
            <h3 className="text-2xl font-bold text-[#1D3A52] mb-4">選択と決断</h3>

            {/* 比較マトリクス（カードの中に配置） */}
            {industry.decisionProcess && (
              <div className="bg-[#F9F8F4] p-6 rounded-lg border border-gray-200">
                <div className="text-center text-sm font-bold text-gray-500 mb-4">
                  究極の二択：{industry.decisionProcess?.worry}
                </div>
                
                {/* 分岐図 */}
                <div className="flex flex-col md:flex-row gap-4 items-stretch">
                  {/* 却下案 */}
                  {industry.decisionProcess.rejectedOption && (
                    <div className="flex-1 bg-white/50 p-4 rounded text-gray-500 text-sm border border-gray-200">
                       <div className="font-bold mb-1">案A：{industry.decisionProcess.rejectedOption.title}</div>
                       <ul className="list-disc list-inside space-y-1">
                         {industry.decisionProcess.rejectedOption.reasons.map((reason, i) => (
                           <li key={i}>{reason}</li>
                         ))}
                       </ul>
                    </div>
                  )}
                  {/* 採用案 */}
                  {industry.decisionProcess.adoptedOption && (
                    <div className="flex-1 bg-white border-2 border-[#1D3A52] p-4 rounded shadow-md relative overflow-hidden">
                       <div className="absolute top-0 right-0 bg-[#1D3A52] text-white text-[10px] px-2 py-0.5 font-bold">DECISION</div>
                       <div className="font-bold text-[#1D3A52] mb-1">案B：{industry.decisionProcess.adoptedOption.title}</div>
                       <div className="text-sm font-bold text-[#B33E28] mb-1">補助金活用</div>
                       <p className="text-xs text-gray-700 mb-2">
                         {industry.decisionProcess.adoptedOption.reasons[0]}
                       </p>
                       <div className="bg-[#E6F0FA] p-2 rounded text-xs font-bold text-[#1D3A52]">
                         決め手：{industry.decisionProcess.adoptedOption.decidingFactor}
                       </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* =================================================================
              Phase 3: 行動と変化 (Action)
             ================================================================= */}
          <div ref={el => sectionsRef.current[2] = el} className="relative pl-8 md:pl-12">
            {/* 最後の点は白丸にして「現在進行形」感を出す */}
            <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-white border-4 border-[#1D3A52]" />
            
            <div className="mb-2">
              <span className="bg-[#1D3A52] text-white text-xs font-bold px-2 py-1 rounded">Phase 3</span>
              <span className="text-gray-500 text-xs font-bold ml-2">半年後〜現在</span>
            </div>
            <h3 className="text-2xl font-bold text-[#1D3A52] mb-4">行動と変化</h3>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
              <h4 className="font-bold text-lg mb-3">実行したこと</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
                {industry.challengeCard?.solutions.map((solution, i) => (
                  <li key={i}>
                    <span className="font-bold">{solution.title}</span>：{solution.detail}
                  </li>
                ))}
              </ul>

              {/* 実務の壁チェックリスト */}
              {industry.barriers && (
                <div className="bg-gray-50 p-4 rounded border border-gray-200">
                  <div className="font-bold text-gray-600 mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    これから申請する人が覚悟すべき「実務の壁」
                  </div>
                  <div className="space-y-2">
                    {industry.barriers.checklist?.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <input type="checkbox" className="mt-1" disabled checked />
                        <div>
                          <div className="font-bold text-sm">{item.title}</div>
                          <div className="text-xs text-gray-500">{item.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* =================================================================
            Phase 4: 未来 (Future)
           ================================================================= */}
        <div ref={el => sectionsRef.current[3] = el} className="mb-16">
          <h3 className="text-2xl font-bold text-[#1D3A52] mb-6 border-b-2 border-[#1D3A52] pb-2 inline-block">
            Phase 4: 未来への展望
          </h3>
          <p className={`${baseTextSize} ${leadingRelaxed} mb-6`}>
            {industry.deepDive.future}
          </p>
        </div>

        {/* =================================================================
            Phase 5: 編集者視点 (Editor's Eye) - 新デザイン
           ================================================================= */}
        <div ref={el => sectionsRef.current[4] = el} className="bg-[#1D3A52] text-white rounded-xl p-8 md:p-10 mt-16 shadow-lg">
          {/* ヘッダー */}
          <div className="flex items-center gap-4 mb-6">
            <span className="bg-[#B33E28] text-white text-xs font-bold px-3 py-1 rounded">Phase 5</span>
            <h2 className="text-2xl font-bold font-serif">編集者視点</h2>
          </div>
          {/* 編集部のコメント */}
          <div className="mb-10">
            <h3 className="font-bold text-lg mb-3 opacity-90">編集部より</h3>
            <p className="leading-relaxed text-white/90 text-lg">
              {industry.editorComment}
            </p>
          </div>
          {/* 制度データエリア（白いカード） */}
          <div className="bg-white text-[#1D3A52] rounded-lg p-6 md:p-8 shadow-sm">
            <h4 className="text-sm font-bold text-gray-500 mb-6 border-b border-gray-200 pb-2">
              今回活用した制度
            </h4>
            {industry.supportSystem?.map((support: any, index: number) => (
              <div key={index} className={index > 0 ? "mt-8 pt-8 border-t border-gray-200 border-dashed" : ""}>
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
              </div>
            ))}
          </div>
        </div>

        {/* シェアボタン */}
        <div className="mt-12 flex justify-center">
          <Button 
            variant="outline" 
            className="gap-2 rounded-full px-8 py-6 text-lg border-[#1D3A52] text-[#1D3A52] hover:bg-[#1D3A52] hover:text-white transition-colors"
            onClick={() => setShowShareMenu(!showShareMenu)}
          >
            <Share2 className="w-5 h-5" />
            この記事をシェアする
          </Button>
        </div>

        {/* 関連記事レコメンド */}
        {industry.recommendedSupports && (
          <div className="mt-20 pt-12 border-t border-gray-200">
            <h3 className="text-xl font-bold text-[#1D3A52] mb-6 flex items-center gap-2">
              <ArrowUpRight className="w-5 h-5" />
              この記事を読んだあなたへのおすすめ
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {industry.recommendedSupports.map((rec, index) => (
                <a 
                  key={index} 
                  href={rec.link}
                  className="block bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow no-underline group"
                >
                  <div className="text-xs font-bold text-[#B33E28] mb-2">{rec.category}</div>
                  <h4 className="font-bold text-lg text-[#1D3A52] mb-2 group-hover:text-[#B33E28] transition-colors">
                    {rec.name}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {rec.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
