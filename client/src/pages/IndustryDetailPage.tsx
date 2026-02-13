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

  // フォントサイズと行間の設定 (UD対応: ベースサイズを大きく、行間を広めに)
  const baseTextSize = "text-lg md:text-xl";
  const leadingRelaxed = "leading-9 md:leading-10";

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
              <h3 className="text-[#B33E28] font-bold text-lg md:text-xl">「もっと早くやっておけば」と後悔しないために。</h3>
            </div>
            {/* タイトル重複削除: industry.regrets.title は表示せず、定型句のみ残す */}
            <p className="text-[#4A1D1D]/90 leading-relaxed">
              {industry.regrets.content}
            </p>
          </div>
        )}

        {/* タイムラインのコンテナ (修正: ボーダーが途切れないよう、親要素で管理) */}
        <div className="relative ml-3 md:ml-6 mb-16">
          {/* 縦線 (絶対配置で全高をカバー) */}
          <div className="absolute left-0 top-2 bottom-0 w-0.5 bg-[#1D3A52]"></div>

          {/* =================================================================
              Phase 1: 現状 (Current)
             ================================================================= */}
          <div ref={(el) => { sectionsRef.current[0] = el; }} className="relative pl-8 md:pl-12 mb-16">
            {/* 丸いマーカー */}
            <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-[#F9F8F4] border-4 border-[#1D3A52] z-10"></div>
            
            <div className="mb-2">
              <span className="bg-[#1D3A52] text-white text-xs font-bold px-2 py-1 rounded">フェーズ 1</span>
              
            </div>
            <h3 className="text-2xl font-bold text-[#1D3A52] mb-4">現状と課題</h3>
            <p className={`${baseTextSize} ${leadingRelaxed} mb-6`}>
              {industry.timeline.phase1 || industry.timeline.present}
            </p>
            
            {/* 課題リスト (Barriers) */}
            {industry.barriers && industry.barriers.checklist && (
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-6 h-6 text-[#B33E28]" />
                  <h4 className="font-bold text-xl text-gray-800">これから申請する人が覚悟すべき「実務の壁」</h4>
                </div>
                <div className="space-y-6">
                  {industry.barriers.checklist.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="mt-1 bg-gray-100 p-1 rounded">
                        <CheckCircle2 className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <div className="font-bold text-lg text-gray-800 mb-1">{item.title}</div>
                        <div className="text-gray-600 leading-relaxed text-base">{item.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* =================================================================
              Phase 2: 選択 (Decision)
             ================================================================= */}
          <div ref={(el) => { sectionsRef.current[1] = el; }} className="relative pl-8 md:pl-12 mb-16">
            <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-[#F9F8F4] border-4 border-[#1D3A52] z-10"></div>
            
            <div className="mb-2">
              <span className="bg-[#1D3A52] text-white text-xs font-bold px-2 py-1 rounded">フェーズ 2</span>
              
            </div>
            <h3 className="text-2xl font-bold text-[#1D3A52] mb-4">選択と決断</h3>
            <p className={`${baseTextSize} ${leadingRelaxed} mb-8`}>
              {industry.timeline.phase2 || industry.timeline.present}
            </p>

            {/* 決断マトリクス (Decision Matrix) - 縦積みレイアウト & フォント最大化 */}
            {industry.decisionMatrix && (
              <div className="bg-[#FAF9F6] rounded-xl p-6 md:p-8 border border-gray-200 shadow-sm">
                <h4 className="text-center font-bold text-xl md:text-2xl text-gray-700 mb-8">
                  究極の二択：{industry.decisionMatrix.title}
                </h4>
                
                <div className="flex flex-col gap-8">
                  {/* Option A: 廃業 */}
                  <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                    <h5 className="font-bold text-2xl md:text-3xl text-gray-500 mb-6">
                      案A：{industry.decisionMatrix.optionA.title}
                    </h5>
                    <ul className="space-y-4">
                      {industry.decisionMatrix.optionA.pros.map((pro, i) => (
                        <li key={i} className="flex items-start gap-3 text-lg md:text-xl text-gray-600 leading-relaxed">
                          <span className="text-gray-400 mt-1">•</span>
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Option B: 再開 (Selected) */}
                  <div className="bg-white p-8 rounded-lg border-4 border-[#1D3A52] shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 bg-[#1D3A52] text-white text-sm font-bold px-4 py-2 rounded-bl-lg">
                      決断
                    </div>
                    <h5 className="font-bold text-2xl md:text-3xl text-[#1D3A52] mb-2">
                      案B：{industry.decisionMatrix.optionB.title}
                    </h5>
                    <ul className="list-disc pl-6 mb-6 marker:text-[#B33E28]">
                      <li className="text-[#B33E28] font-bold text-xl">
                        <span>{industry.decisionMatrix.optionB.subsidy}</span>
                      </li>
                    </ul>
                    <p className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                      {industry.decisionMatrix.optionB.cost}
                    </p>
                    
                    <div className="bg-[#E6F0FA] p-6 rounded-lg border-l-4 border-[#1D3A52]">
                      <p className="font-bold text-[#1D3A52] text-lg md:text-xl leading-relaxed">
                        決め手：「{industry.decisionMatrix.reason}」
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* =================================================================
              Phase 3: 行動 (Action)
             ================================================================= */}
          <div ref={(el) => { sectionsRef.current[2] = el; }} className="relative pl-8 md:pl-12 mb-16">
            <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-[#F9F8F4] border-4 border-[#1D3A52] z-10"></div>
            
            <div className="mb-2">
              <span className="bg-[#1D3A52] text-white text-xs font-bold px-2 py-1 rounded">フェーズ 3</span>
              
            </div>
            <h3 className="text-2xl font-bold text-[#1D3A52] mb-4">行動と変化</h3>
            <p className={`${baseTextSize} ${leadingRelaxed} mb-6`}>
              {industry.timeline.phase3 || industry.timeline.future}
            </p>
          </div>

            {/* =================================================================
              Phase 4: 未来 (Future) - タイムラインに統合
             ================================================================= */}
          <div ref={(el) => { sectionsRef.current[3] = el; }} className="relative pl-8 md:pl-12">
            {/* 未来を示す矢印アイコン */}
            <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-[#1D3A52] border-4 border-[#F9F8F4] z-10 flex items-center justify-center">
            </div>
            
            <div className="mb-2">
              <span className="bg-[#1D3A52] text-white text-xs font-bold px-2 py-1 rounded">フェーズ 4</span>
              
            </div>
            <h3 className="text-2xl font-bold text-[#1D3A52] mb-4">未来</h3>
            <p className={`${baseTextSize} ${leadingRelaxed} mb-6`}>
              {industry.timeline.future}
            </p>
          </div>
        </div>

        {/* =================================================================
            Story Section: 再起の裏側 (Narrative)
           ================================================================= */}
        {industry.story && (
          <div className="mb-20 bg-white p-8 md:p-12 rounded-xl shadow-sm border-t-4 border-[#1D3A52]">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <span className="text-3xl">📖</span>
              <h3 className="text-2xl md:text-3xl font-bold text-[#1D3A52] font-serif">
                {industry.story.title}
              </h3>
            </div>
            
            <div className="space-y-6 text-gray-800 leading-loose font-serif text-lg md:text-xl">
              {industry.story.text.map((paragraph, index) => (
                <p key={index} className={index === 0 ? "font-bold text-xl md:text-2xl text-[#1D3A52] mb-8 text-center" : ""}>
                  {paragraph}
                </p>
              ))}
            </div>
            
            <div className="mt-10 flex justify-center">
              <div className="w-16 h-1 bg-[#1D3A52]/20 rounded-full"></div>
            </div>
          </div>
        )}





        {/* =================================================================
            編集者視点 (Editor's Eye) - フェーズ表記削除
           ================================================================= */}
        <div ref={(el) => { sectionsRef.current[4] = el; }} className="bg-[#1D3A52] text-white rounded-xl p-8 md:p-10 mt-16 shadow-lg">
          {/* ヘッダー */}
          <div className="flex items-center gap-4 mb-6">
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
           {/* スペックBOX（位置ズレ修正版） */}
                {(support.specAmount || support.specCondition) && (
                  <div className="bg-[#FAF9F6] rounded-lg p-6 mb-8 space-y-5">
                    {/* 1. 金額行（修正：items-start → items-center に変更し、余計なマージンを削除） */}
                    {/* これで左右の高さが違っても、ど真ん中で揃います */}
                    {support.specAmount && (
                      <div className="flex items-center">
                        <div className="flex items-center w-28 shrink-0 gap-3"> 
                          {/* アイコン（SVGに変更するとより綺麗ですが、一旦テキストで調整） */}
                          <span className="text-[#B33E28] text-lg">💰</span>
                          <span className="text-sm font-bold text-[#B33E28]">金額</span>
                        </div>
                        <div className="text-[15px] font-bold text-[#1D3A52] flex-1">
                          {support.specAmount}
                        </div>
                      </div>
                    )}
                    {/* 2. 条件行（ここは2行になる可能性があるため、上揃え items-start のまま維持） */}
                    {support.specCondition && (
                      <div className="flex items-start">
                        {/* 右の文字が大きいので、左のラベルを少し下げて(mt-0.5)視覚的な高さを合わせる */}
                        <div className="flex items-center w-28 shrink-0 mt-0.5 gap-3">
                          <span className="text-[#1D3A52] text-lg">📄</span>
                          <span className="text-sm font-bold text-[#1D3A52]">条件など</span>
                        </div>
                        <div className="text-sm text-gray-700 flex-1 leading-snug">
                          {support.specCondition}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ポイントBOX（既存） */}
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
