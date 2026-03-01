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

  // 記事ID: 101 の場合は、新デザインレイアウトを適用
  if (industry.id === 101) {
    return (
      <div className="min-h-screen bg-white font-sans text-[#333]">
        {/* 【セクション1】ヘッダー */}
        <header className="h-[60px] bg-white border-b border-[#E0E0E0] flex items-center justify-between px-6 sticky top-0 z-50">
          <div className="flex items-center">
            {/* ロゴ（簡易表示） */}
            <Link href="/" className="font-bold text-xl text-[#1D3A52]">能登百業録</Link>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="/about" className="hover:text-[#1D3A52]">能登百業録とは</Link>
            <Link href="/supports" className="hover:text-[#1D3A52]">支援制度</Link>
            <Link href="/industries" className="hover:text-[#1D3A52]">記事一覧</Link>
            <Link href="/contact" className="hover:text-[#1D3A52]">お問い合わせ</Link>
          </nav>
        </header>

        {/* 【セクション2】ヒーローセクション */}
        <div className="relative h-[500px] w-full overflow-hidden flex items-center justify-center">
          <img
            src={industry.image}
            alt={industry.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* オーバーレイ：黒の半透明レイヤー */}
          <div className="absolute inset-0 bg-black/50"></div>
          
          <div className="relative z-10 w-full max-w-[900px] px-6 text-white">
            {/* タグ部分 */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="bg-[#3498DB] text-white px-3 py-[6px] rounded-[4px] text-[12px] font-bold mr-2">
                #クリーニング・地域サービス
              </span>
              <span className="bg-[#27AE60] text-white px-3 py-[6px] rounded-[4px] text-[12px] font-bold mr-2">
                #{industry.category}
              </span>
              <span className="bg-[#E67E22] text-white px-3 py-[6px] rounded-[4px] text-[12px] font-bold mr-2">
                #小規模事業者持続化補助金
              </span>
              <span className="bg-[#9B59B6] text-white px-3 py-[6px] rounded-[4px] text-[12px] font-bold mr-2">
                #地域貢献
              </span>
            </div>

            {/* タイトル */}
            <h1 className="text-[32px] md:text-[48px] font-bold leading-[1.4] drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              {industry.title}
            </h1>
          </div>
        </div>

        {/* 【セクション3】パンくずリスト */}
        <div className="bg-[#F5F5F5] py-3 px-6 text-[14px] text-[#666]">
          <div className="max-w-[1000px] mx-auto">
            <Link href="/" className="hover:underline">能登百業録</Link>
            <span className="mx-2">&gt;</span>
            <Link href="/industries" className="hover:underline">記事一覧</Link>
            <span className="mx-2">&gt;</span>
            <span>詳細</span>
          </div>
        </div>

        {/* 【セクション4】メインコンテンツエリア */}
        <main className="max-w-[1000px] mx-auto px-10 bg-white">
          
          {/* 【セクション5】基本情報カード */}
          <div className="bg-[#F8F9FA] border border-[#E0E0E0] p-5 rounded-lg my-10">
            <div className="space-y-2 text-[16px] leading-[1.8] text-[#333]">
              <div className="flex items-center gap-2">
                <span>📍</span> {industry.location}
              </div>
              <div className="flex items-center gap-2">
                <span>📅</span> 創業：{industry.details?.founded}
              </div>
              <div className="flex items-center gap-2">
                <span>👥</span> 従業員：{industry.details?.employees}
              </div>
              <div className="flex items-center gap-2">
                <span>👤</span> {industry.details?.owner}
              </div>
              
              {/* 事業者名（新規） */}
              <div className="mt-5 pt-5 border-t border-[#E0E0E0] font-bold text-[20px]">
                <div className="flex items-center gap-2">
                  <span>🏢</span> {industry.operator}
                </div>
              </div>
            </div>
          </div>

          {/* 【セクション6】事業概要テキスト */}
          <div className="text-[16px] leading-[1.8] text-[#333] my-6 whitespace-pre-line">
            {industry.description}
          </div>

          {/* 【セクション7】取材情報 */}
          <div className="text-[14px] text-[#666] my-4 text-right">
            取材日: {industry.details?.interviewDate} / ライター: {industry.details?.writer}
          </div>

          {/* 【セクション8】💡セクション（旧⚠️セクション） */}
          {industry.regrets && (
            <div className="bg-[#FFF9E6] border-l-4 border-[#FFB74D] p-6 rounded-lg my-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[18px]">💡</span>
                <h3 className="text-[18px] font-bold text-[#333]">{industry.regrets.title}</h3>
              </div>
              <p className="text-[16px] leading-[1.8] text-[#333]">
                {industry.regrets.content}
              </p>
            </div>
          )}

          {/* 【セクション9】フェーズ1-4（タイムライン） */}
          <div className="relative ml-[60px] my-12">
            {/* 縦ライン */}
            <div className="absolute left-[32px] top-0 bottom-0 w-[2px] bg-[#D0D0D0]"></div>

            {/* Phase 1 */}
            <div className="relative mb-12">
              {/* マーカー */}
              <div className="absolute left-[26px] top-[6px] w-[12px] h-[12px] rounded-full bg-white border-2 border-[#3498DB] z-10"></div>
              
              <div className="pl-[56px]">
                <span className="inline-block bg-[#3498DB] text-white px-3 py-[6px] rounded-[4px] text-[14px] font-bold mb-2">
                  フェーズ 1
                </span>
                <h3 className="text-[28px] font-bold text-[#333] mt-2 mb-5">課題</h3>
                <p className="text-[16px] leading-[1.8] text-[#333] max-w-[800px]">
                  {industry.timeline.phase1}
                </p>
              </div>
            </div>

            {/* フェーズ間区切り */}
            <div className="pl-[32px] my-12 border-t border-dashed border-[#D0D0D0]"></div>

            {/* Phase 2 */}
            <div className="relative mb-12">
              <div className="absolute left-[26px] top-[6px] w-[12px] h-[12px] rounded-full bg-white border-2 border-[#3498DB] z-10"></div>
              
              <div className="pl-[56px]">
                <span className="inline-block bg-[#3498DB] text-white px-3 py-[6px] rounded-[4px] text-[14px] font-bold mb-2">
                  フェーズ 2
                </span>
                <h3 className="text-[28px] font-bold text-[#333] mt-2 mb-5">選択と決断</h3>
                <p className="text-[16px] leading-[1.8] text-[#333] max-w-[800px]">
                  {industry.timeline.phase2}
                </p>

                {/* 【セクション10】究極の二択 */}
                {industry.decisionMatrix && (
                  <div className="bg-[#F8F9FA] border-2 border-[#3498DB] p-8 rounded-lg my-8">
                    <h4 className="text-[20px] font-bold text-[#333] mb-6">
                      究極の二択：{industry.decisionMatrix.title}
                    </h4>
                    
                    <div className="space-y-6">
                      <div>
                        <h5 className="text-[18px] font-bold text-[#333] mb-2">
                          案A：{industry.decisionMatrix.optionA.title}
                        </h5>
                        <ul className="list-disc pl-5 space-y-2 text-[16px] leading-[1.6] text-[#333]">
                          {industry.decisionMatrix.optionA.pros.map((pro, i) => (
                            <li key={i}>{pro}</li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[#3498DB] font-bold">→ 決断</span>
                          <h5 className="text-[18px] font-bold text-[#333]">
                            案B：{industry.decisionMatrix.optionB.title}
                          </h5>
                        </div>
                        <ul className="list-disc pl-5 space-y-2 text-[16px] leading-[1.6] text-[#333]">
                          <li>{industry.decisionMatrix.optionB.subsidy}</li>
                          <li>{industry.decisionMatrix.optionB.cost}</li>
                        </ul>
                      </div>

                      <div className="pt-5 border-t border-[#D0D0D0]">
                        <p className="font-bold text-[16px] text-[#333]">
                          決め手：{industry.decisionMatrix.reason}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* フェーズ間区切り */}
            <div className="pl-[32px] my-12 border-t border-dashed border-[#D0D0D0]"></div>

            {/* Phase 3 */}
            <div className="relative mb-12">
              <div className="absolute left-[26px] top-[6px] w-[12px] h-[12px] rounded-full bg-white border-2 border-[#3498DB] z-10"></div>
              
              <div className="pl-[56px]">
                <span className="inline-block bg-[#3498DB] text-white px-3 py-[6px] rounded-[4px] text-[14px] font-bold mb-2">
                  フェーズ 3
                </span>
                <h3 className="text-[28px] font-bold text-[#333] mt-2 mb-5">行動と変化</h3>
                
                {/* 【セクション11】実務の壁（新規） */}
                {industry.barriers && industry.barriers.checklist && (
                  <div className="bg-[#FAF8F3] border-2 border-[#E67E22] p-8 rounded-lg my-8">
                    <div className="flex items-center gap-2 mb-6">
                      <span className="text-[20px]">⚠️</span>
                      <h4 className="text-[20px] font-bold text-[#333]">
                        {industry.barriers.title}
                      </h4>
                    </div>
                    
                    <div className="space-y-6">
                      {industry.barriers.checklist.map((item: any, index: number) => (
                        <div key={index}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[18px]">✓</span>
                            <h5 className="text-[18px] font-bold text-[#333]">{item.title}</h5>
                          </div>
                          <p className="text-[16px] leading-[1.8] text-[#333] pl-6">
                            {item.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 【セクション12】支援を受けて起きた変化（新規） */}
                <div className="mt-10">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[20px] font-bold text-[#333]">▼</span>
                    <h4 className="text-[20px] font-bold text-[#333]">支援を受けて起きた変化</h4>
                  </div>
                  <div className="text-[16px] leading-[1.8] text-[#333] space-y-4">
                    {/* industry.timeline.phase3 の内容をパースして表示するか、固定テキストとして扱うか */}
                    {/* ここでは industries.ts の phase3 の後半部分を表示する想定だが、データ構造上 phase3 は文字列なので、
                        一旦 phase3 全体を表示する形にする（データ側ですでに分割されている前提であれば調整が必要）
                        ※指示書には「支援を受けて起きた変化」として本文を表示とあるため、phase3の内容を表示 */}
                     <div className="whitespace-pre-line">
                        {/* データ構造上、phase3の前半は「実務の壁」なので、後半部分のみ抽出するのが理想だが、
                            現状のデータ構造では混在しているため、phase3全体を表示しつつ、
                            実務の壁部分は上のコンポーネントで表示済みなので、重複を避けるための処理が必要。
                            ただし、今回は「完全再現」指示のため、データ構造の変更は最小限にし、
                            表示側で調整する。
                            
                            現状の industries.ts の phase3 は Markdown形式で記述されているため、
                            単純表示だとマークダウン記法がそのまま出てしまう。
                            ここでは簡易的にテキストを表示する。
                        */}
                        {/* 注: データ側の phase3 はマークダウンを含んでいるため、
                            実務の壁以外の部分（後半）を表示するようにしたいが、
                            安全のため phase3 のテキストを表示する。
                            （本来はデータ構造を分けるべきだが、指示書に従いレイアウト優先）
                        */}
                        {(industry.timeline.phase3 || "").split('---').length > 1 
                          ? (industry.timeline.phase3 || "").split('---')[1].replace('### 支援を受けて起きた変化', '').trim()
                          : industry.timeline.phase3}
                     </div>
                  </div>
                </div>
              </div>
            </div>

            {/* フェーズ間区切り */}
            <div className="pl-[32px] my-12 border-t border-dashed border-[#D0D0D0]"></div>

            {/* Phase 4 */}
            <div className="relative mb-12">
              <div className="absolute left-[26px] top-[6px] w-[12px] h-[12px] rounded-full bg-white border-2 border-[#3498DB] z-10"></div>
              
              <div className="pl-[56px]">
                <span className="inline-block bg-[#3498DB] text-white px-3 py-[6px] rounded-[4px] text-[14px] font-bold mb-2">
                  フェーズ 4
                </span>
                <h3 className="text-[28px] font-bold text-[#333] mt-2 mb-5">現在・未来に向けた取り組み</h3>
                <p className="text-[16px] leading-[1.8] text-[#333] max-w-[800px]">
                  {industry.timeline.future}
                </p>
              </div>
            </div>
          </div>

          {/* 【セクション13】コラム（📖 再起の裏側） */}
          {industry.story && (
            <div className="bg-[#F5F5F0] p-10 rounded-lg my-16">
              <div className="flex items-center gap-2 mb-6">
                <span className="text-[24px]">📖</span>
                <h3 className="text-[24px] font-bold text-[#333]">
                  {industry.story.title}
                </h3>
              </div>
              <div className="space-y-5 text-[16px] leading-[1.8] text-[#333]">
                {industry.story.text.map((paragraph, index) => (
                  <p key={index} className={paragraph.startsWith("「") ? "font-bold" : ""}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* 【セクション14】編集者視点＋今回活用した制度 */}
          <div className="bg-[#1E3A5F] p-12 rounded-lg my-16 text-white">
            <h2 className="text-[24px] font-bold mb-5">編集者視点</h2>
            <p className="text-[16px] leading-[1.8] mb-10">
              {industry.editorComment}
            </p>

            {/* 今回活用した制度（白ボックス） */}
            <div className="bg-white text-[#333] p-8 rounded-lg">
              {industry.supportSystem?.map((support, index) => (
                <div key={index}>
                  <h3 className="text-[20px] font-bold mb-4">{support.name}</h3>
                  <p className="text-[14px] text-[#666] mb-5">{support.description}</p>
                  
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="text-[16px]">💰</span>
                      <span className="text-[16px] leading-[1.8]">
                        <strong>補助率</strong>: {support.points?.detail.replace(': ', '')}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[16px]">📄</span>
                      <span className="text-[16px] leading-[1.8]">
                        <strong>上限</strong>: {support.specAmount?.replace('上限', '')}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-[16px]">✓</span>
                      <span className="text-[16px] leading-[1.8]">
                        <strong>ここがポイント</strong>: {support.specCondition}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </main>

        {/* 【セクション15】フッター */}
        <footer className="bg-[#2C3E50] text-white py-10 text-center">
          <p className="text-[14px]">&copy; 2026 能登百業録 All Rights Reserved.</p>
        </footer>
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
      <div className="relative min-h-[80vh] md:h-[70vh] w-full overflow-hidden flex flex-col justify-end">
        <img
          src={industry.image}
          alt={industry.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Scrim Gradient: 下から上へのグラデーションのみを適用し、上部は写真の明るさを活かす */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1D3A52] via-[#1D3A52]/80 to-transparent opacity-90"></div>
        
        <div className="relative z-10 w-full p-6 pb-12 md:p-12 lg:p-20 text-white mt-auto">
          <div className="max-w-4xl mx-auto">
            <Link href="/industries" className="inline-flex items-center text-white/80 hover:text-white mb-4 md:mb-6 transition-colors no-underline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              一覧に戻る
            </Link>
            
            {/* タグエリア */}
            <div className="flex flex-wrap gap-2 mb-3 md:mb-4">
              <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded text-xs font-bold border border-white/30">
                #{industry.category}
              </span>
              {industry.tags.map((tag: string, index: number) => (
                <span key={index} className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded text-xs font-bold border border-white/30">
                  #{tag}
                </span>
              ))}
            </div>

            {/* タイトル */}
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold font-serif leading-snug md:leading-tight mb-4 md:mb-6 drop-shadow-lg break-words">
              {industry.title}
            </h1>

            {/* 取材対象者データ */}
            {industry.details && (
              <div className="flex flex-wrap items-center text-xs md:text-base text-white/90 gap-x-4 gap-y-2 md:gap-8 border-t border-white/20 py-3 md:py-4 mt-4 md:mt-6">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  {industry.location}
                </div>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <Building2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  {industry.details.founded}創業
                </div>
                <div className="flex items-center gap-1.5 md:gap-2">
                  <Users className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  従業員 {industry.details.employees}
                </div>
                {industry.details.owner && (
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <span className="text-white/80">👤</span>
                    {industry.details.owner}
                  </div>
                )}
              </div>
            )}

            {/* 概要テキスト (Hero Summary) */}
            {industry.heroSummary && (
              <div className="mt-3 md:mt-4 max-w-[640px] text-left">
                <p className="text-sm md:text-lg leading-relaxed md:leading-[1.8] text-white/90 font-medium drop-shadow-md">
                  {industry.heroSummary}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 記事本文エリア: max-w-3xl (約768px) で幅を制限し、中央揃えで可読性を確保 */}
      <main className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        
        {/* 0. 基礎情報 (Basic Info) - ヒーローセクションに統合済みだが、補足情報を表示 */}
        <div className="mb-12 text-gray-600 text-sm flex justify-end gap-4">
          <span>取材日: {industry.details?.interviewDate || "2026.01.15"}</span>
          <span>ライター: {industry.details?.writer || "能登 太郎"}</span>
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
            <h3 className="text-2xl font-bold text-[#1D3A52] mb-4">課題</h3>
            <p className={`${baseTextSize} ${leadingRelaxed} mb-6`}>
              {industry.timeline.phase1 || industry.timeline.present}
            </p>
            

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
                      {industry.decisionMatrix.optionA.pros.map((pro: string, i: number) => (
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
                        決め手：{industry.decisionMatrix.reason}
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

            {/* 課題リスト (Barriers) - フェーズ3へ移動 */}
            {industry.barriers && industry.barriers.checklist && (
              <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="w-6 h-6 text-[#B33E28]" />
                  <h4 className="font-bold text-xl text-gray-800">これから申請する人が覚悟すべき「実務の壁」</h4>
                </div>
                <div className="space-y-6">
                  {industry.barriers.checklist.map((item: any, index: number) => (
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
              Phase 4: 未来 (Future) - タイムラインに統合
             ================================================================= */}
          <div ref={(el) => { sectionsRef.current[3] = el; }} className="relative pl-8 md:pl-12">
            {/* 未来を示す矢印アイコン */}
            <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-[#1D3A52] border-4 border-[#F9F8F4] z-10 flex items-center justify-center">
            </div>
            
            <div className="mb-2">
              <span className="bg-[#1D3A52] text-white text-xs font-bold px-2 py-1 rounded">フェーズ 4</span>
              
            </div>
            <h3 className="text-2xl font-bold text-[#1D3A52] mb-4">現在・未来に向けた取り組み</h3>
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
              {industry.story.text.map((paragraph: string, index: number) => (
                <p key={index} className="">
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
              {industry.recommendedSupports.map((rec: any, index: number) => (
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
