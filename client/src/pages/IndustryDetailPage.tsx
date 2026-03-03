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

  // 記事ID: 101 の場合は、新デザインレイアウトを適用（ヘッダー・フッター・フォントは共通化）
  if (industry.id === 101) {
    return (
      <div className="min-h-screen bg-[#F9F8F4] font-sans text-gray-800">
        <Header />

        {/* 【セクション2】ヒーローセクション（共通コンポーネントベース + 詳細情報） */}
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

              {/* 取材対象者データ（詳細版） */}
              <div className="flex flex-col gap-4 text-sm md:text-base text-white/90 border-t border-white/20 py-4 mt-4 md:mt-6">
                {/* 1行目: 場所・創業・従業員・代表 */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>{industry.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg leading-none">📅</span>
                    <span>創業：{industry.details?.founded}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 shrink-0" />
                    <span>従業員：{industry.details?.employees}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg leading-none">👤</span>
                    <span>代表：{industry.details?.owner}</span>
                  </div>
                </div>

                {/* 区切り線 */}
                <div className="border-t border-white/20 w-full"></div>

                {/* 2行目: 事業者名 */}
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 shrink-0" />
                  <span className="font-bold text-lg">事業者名：{industry.operator}</span>
                </div>
                
                {/* 3行目: 事業説明 */}
                <div className="mt-1">
                  <p className="text-sm md:text-base leading-relaxed">
                    能登町で昭和初期から続く老舗クリーニング店。祖父の代から3代にわたり家族で守り継いできた。ドライクリーニングを中心に、毛布類の天日干しにこだわるなど、地域の暮らしに寄り添った丁寧なサービスを提供している。震災で設備が故障したが、小規模事業者持続化補助金を活用し、自己負担を最小限に抑えて再開を果たした。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 【セクション3】パンくずリスト（共通デザインに合わせるため削除、または共通スタイルで実装） */}
        {/* 共通デザインではパンくずリストはヘッダー下にはないため、ここでは削除し、ヒーロー内の「一覧に戻る」で代用 */}

        {/* 【セクション4】メインコンテンツエリア */}
        <main className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-20">
          
          {/* 【セクション5】基本情報カード（ヒーローに統合したため削除） */}

          {/* 【セクション6】事業概要テキスト（ヒーローに統合したため削除、または詳細として表示） */}
          {/* ここでは指示通り「事業説明が入ります」の部分をヒーローに入れたので、本文としての概要は一旦非表示にするか、詳細なストーリーとして扱う */}
          
          {/* 【セクション7】取材情報 */}
          <div className="mb-12 text-gray-600 text-sm flex justify-end gap-4">
            <span>取材日: {industry.details?.interviewDate}</span>
            <span>ライター: {industry.details?.writer}</span>
          </div>

          {/* 【セクション8】💡セクション（能登百業録カラー対応グリッチ効果付きカード） */}
          {industry.regrets && (
            <div className="relative mb-8 md:mb-16 group">
              {/* SVGノイズフィルター定義 */}
              <svg className="hidden">
                <filter id="noiseFilter">
                  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" />
                  <feColorMatrix type="saturate" values="0" />
                  <feBlend mode="multiply" />
                </filter>
              </svg>

              {/* カード本体 */}
              <div 
                className="relative overflow-hidden rounded-2xl p-5 md:p-12 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(30,58,95,0.5)] border-l-4 border-[#C8A882]"
                style={{
                  background: "linear-gradient(135deg, #1E3A5F 0%, #2D7F8F 100%)",
                }}
              >
                {/* ノイズオーバーレイ */}
                <div 
                  className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
                  style={{ filter: "url(#noiseFilter)" }}
                ></div>
                
                {/* アクセント図形（左上：ゴールド円形） */}
                <div className="absolute -top-5 -left-5 w-[80px] h-[80px] bg-[#C8A882]/70 rounded-full blur-xl"></div>
                
                {/* アクセント図形（右下：ライトティール波型） */}
                <div className="absolute -bottom-6 -right-6 w-[100px] h-[60px] bg-[#4FA8B8]/50 rounded-full blur-xl transform rotate-12"></div>

                {/* コンテンツ */}
                <div className="relative z-10">
                  {/* 見出し */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl filter drop-shadow-md">💡</span>
                    <h3 
                      className="text-[22px] md:text-[28px] font-bold text-white"
                      style={{ textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}
                    >
                      支援がもたらした変化
                    </h3>
                  </div>

                  {/* 本文 */}
                  <div 
                    className="text-[16px] md:text-[20px] leading-[1.8] text-white font-medium"
                    style={{ textShadow: "0 1px 4px rgba(0,0,0,0.3)" }}
                  >
                    {industry.regrets.content}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 【セクション9】フェーズ1-4（タイムライン） */}
          <div className="relative ml-6 md:ml-6 mb-16">
            {/* 縦ライン */}
            <div className="absolute left-0 top-2 bottom-0 w-0.5 bg-[#1D3A52]"></div>

            {/* Phase 1 */}
            <div className="relative pl-8 md:pl-12 mb-16">
              {/* マーカー */}
              <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-[#F9F8F4] border-4 border-[#1D3A52] z-10"></div>
              
              <div className="mb-2">
                <span className="bg-[#1D3A52] text-white text-xs font-bold px-2 py-1 rounded">フェーズ 1</span>
              </div>
              <h3 className="text-[24px] md:text-2xl font-bold text-[#1D3A52] mb-4">課題</h3>
              <p className={`${baseTextSize} ${leadingRelaxed} mb-6`}>
                {industry.timeline.phase1}
              </p>
            </div>

            {/* Phase 2 */}
            <div className="relative pl-8 md:pl-12 mb-16">
              <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-[#F9F8F4] border-4 border-[#1D3A52] z-10"></div>
              
              <div className="mb-2">
                <span className="bg-[#1D3A52] text-white text-xs font-bold px-2 py-1 rounded">フェーズ 2</span>
              </div>
              <h3 className="text-[24px] md:text-2xl font-bold text-[#1D3A52] mb-4">選択と決断</h3>
              <p className={`${baseTextSize} ${leadingRelaxed} mb-8`}>
                {industry.timeline.phase2}
              </p>

              {/* 【セクション10】究極の二択（能登百業録カラー対応） */}
              {industry.decisionMatrix && (
                <div className="bg-[#F8F9FA] border-[3px] border-[#2D7F8F] p-6 md:p-10 rounded-xl my-12 w-full">
                  <div className="mb-4">
                    <span className="bg-[#2D7F8F] text-white px-3 py-1.5 rounded text-sm inline-block font-bold">
                      究極の二択
                    </span>
                  </div>
                  <h4 className="text-[20px] md:text-2xl font-bold text-[#1E3A5F] mt-0 mb-6 pb-4 border-b-2 border-[#E0E0E0]">
                    450万円かけて再開するか、廃業するか
                  </h4>
                  
                  <div className="flex flex-col gap-6">
                    {/* 案A */}
                    <div className="bg-white p-5 md:p-6 rounded-lg border border-[#E0E0E0] mb-6 w-full">
                      <h5 className="text-[17px] md:text-xl font-bold text-[#3A4A5A] mb-4">
                        案A：このまま廃業する
                      </h5>
                      <ul className="space-y-2 text-base leading-[1.8] text-[#333]">
                        {industry.decisionMatrix.optionA.pros.map((pro, i) => (
                          <li key={i} className={`flex items-start gap-2 ${i === industry.decisionMatrix!.optionA.pros.length - 1 ? 'italic' : ''}`}>
                            <span className="text-[#333]">•</span>
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 案B */}
                    <div className="bg-[#E6F3F5] p-5 md:p-8 rounded-lg border-2 border-[#2D7F8F] border-l-[5px] w-full max-w-[800px]">
                      <div className="mb-4">
                        <span className="bg-[#2D7F8F] text-white px-4 py-2 rounded text-base inline-block font-bold">
                          決断
                        </span>
                      </div>
                      <h5 className="text-[17px] md:text-xl font-bold text-[#1E3A5F] mb-4">
                        案B：小規模事業者持続化補助金を活用して再開
                      </h5>
                      <ul className="space-y-2 text-base leading-[1.8] text-[#1E3A5F] mb-6">
                        <li className="flex items-start gap-2">
                          <span className="text-[#1E3A5F]">•</span>
                          {industry.decisionMatrix.optionB.subsidy}
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-[#1E3A5F]">•</span>
                          {industry.decisionMatrix.optionB.cost}
                        </li>
                      </ul>
                      
                      {/* 決め手セクション */}
                      <div className="bg-white p-6 rounded-lg border border-[#E0E0E0] mt-6">
                        <p className="text-lg font-bold text-[#1E3A5F] mb-3">決め手：</p>
                        <p className="text-base leading-[1.8] text-[#333]">{industry.decisionMatrix.reason}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Phase 3 */}
            <div className="relative pl-8 md:pl-12 mb-16">
              <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-[#F9F8F4] border-4 border-[#1D3A52] z-10"></div>
              
              <div className="mb-2">
                <span className="bg-[#1D3A52] text-white text-xs font-bold px-2 py-1 rounded">フェーズ 3</span>
              </div>
              <h3 className="text-[24px] md:text-2xl font-bold text-[#1D3A52] mb-4">行動と変化</h3>
              
              {/* 【セクション11】実務の壁（能登百業録カラー対応） */}
              {industry.barriers && industry.barriers.checklist && (
                <div className="bg-white border border-[#E0E0E0] border-l-[8px] border-l-[#C8A882] p-6 md:p-8 rounded-lg my-8">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-2xl">⚠️</span>
                    <h4 className="text-[20px] md:text-2xl font-bold text-[#1E3A5F]">
                      申請する人が直面しやすい『実務の壁』
                    </h4>
                  </div>
                  
                  <div className="space-y-5">
                    {industry.barriers.checklist.map((item: any, index: number) => (
                      <div key={index} className="bg-[#F8F9FA] p-4 md:p-5 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-lg text-[#2D7F8F]">✓</span>
                          <h5 className="text-[16px] md:text-lg font-bold text-[#2D7F8F]">{item.title}</h5>
                        </div>
                        <p className="text-base leading-[1.8] text-[#1E3A5F]">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 【セクション12】支援を受けて起きた変化（新規） */}
              {industry.changes && (
                <div className="bg-white border border-[#E0E0E0] border-l-[4px] border-l-[#2D7F8F] p-6 md:p-8 rounded-lg mt-8">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-[22px] font-bold text-[#1E3A5F]">▼</span>
                    <h4 className="text-[19px] md:text-[22px] font-bold text-[#1E3A5F]">
                      {industry.changes.title}
                    </h4>
                  </div>
                  
                  <div className="space-y-4">
                    {industry.changes.content.map((text: string, index: number) => (
                      <p key={index} className="text-base leading-[1.8] text-[#333]">
                        {text}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Phase 4 */}
            <div className="relative pl-8 md:pl-12">
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

          {/* 【セクション13】コラム（📖 再起の裏側） */}
          {industry.story && (
            <div className="bg-white border-2 border-[#1E3A5F] rounded-2xl p-8 md:p-12 lg:px-12 lg:py-14 my-12 md:my-16">
              <div className="flex items-center gap-2 mb-8 md:mb-12 justify-center">
                <span className="text-3xl">📖</span>
                <h3 className="text-[22px] md:text-[28px] font-bold text-[#1E3A5F] font-serif">
                  再起の裏側：{industry.story.title}
                </h3>
              </div>
              <div className="space-y-6 md:space-y-8 text-[16px] md:text-lg leading-[1.9] md:leading-[2.0] text-[#333] font-serif">
                {industry.story.text.map((paragraph, index) => (
                  <p 
                    key={index} 
                    className={paragraph.startsWith("「") ? "text-[18px] md:text-xl font-bold text-[#1E3A5F] py-5 md:py-6" : ""}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* 【セクション14】編集者視点＋今回活用した制度 */}
          <div className="bg-[#1E3A5F] p-8 md:p-12 rounded-lg my-12 md:my-16 text-white">
            {/* 編集者視点 */}
            <h2 className="text-[20px] md:text-2xl font-bold mb-6 font-serif">編集者視点</h2>
            <p className="text-[15px] md:text-base leading-relaxed mb-12 opacity-90">
              {industry.editorComment}
            </p>

            {/* 今回活用した制度見出し */}
            <h2 className="text-[20px] md:text-2xl font-bold mb-6 mt-12 text-white">## 今回活用した制度</h2>

            {/* 今回活用した制度（各制度ごとの白カード） */}
            <div className="space-y-6">
              {industry.supportSystem?.map((support, index) => (
                <div key={index} className="bg-white text-[#333] p-6 md:p-8 rounded-lg">
                  <h3 className="text-[18px] md:text-xl font-bold mb-4">{support.name}</h3>
                  <p className="text-sm text-gray-600 mb-5 leading-relaxed">{support.description}</p>
                  
                  <div className="space-y-3 bg-[#F9F9F9] p-4 rounded">
                    <div className="flex items-start gap-3">
                      <span className="text-lg">💰</span>
                      <span className="text-base leading-relaxed">
                        <strong>補助率</strong>: {support.points?.detail.replace(': ', '')}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lg">📄</span>
                      <span className="text-base leading-relaxed">
                        <strong>上限</strong>: {support.specAmount?.replace('上限', '')}
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lg text-[#E67E22]">✓</span>
                      <span className="text-base leading-relaxed">
                        <strong>ここがポイント</strong>: {support.specCondition}
                      </span>
                    </div>
                    
                    {/* 各制度の詳細ボタン */}
                    <div className="mt-6 flex justify-center">
                      <a 
                        href={support.link || "#"} 
                        className="bg-[#2D7F8F] text-white font-bold text-[14px] md:text-[15px] py-[12px] px-[24px] md:px-[28px] rounded-lg hover:opacity-90 transition-opacity inline-block"
                      >
                        この制度の詳細を見る →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
              
            {/* セクション末尾：制度一覧リンク */}
            <div className="flex flex-col items-center mt-12">
              <a 
                href="/support" 
                className="text-[#2D7F8F] text-sm hover:underline transition-all bg-white py-2 px-4 rounded-full"
              >
                他の支援制度も見る →
              </a>
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

        </main>

        <Footer />
      </div>
    );
  }

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
            
            {/* 本文 (前半: 実務の壁の前) */}
            <div className={`${baseTextSize} ${leadingRelaxed} mb-12 whitespace-pre-wrap`}>
              {(industry.timeline.phase3 || '').split('\n\n専門用語が伝わらない場面では')[0]}
            </div>

            {/* 実務の壁 (Practical Barriers) */}
            {industry.barriers && industry.barriers.checklist && (
              <div className="mt-12 md:ml-14">
                <div className="flex items-center gap-2 mb-8">
                  <span className="text-2xl">⚠️</span>
                  <h3 className="text-2xl font-bold text-[#1E3A5F]">
                    {industry.barriers.title}
                  </h3>
                </div>
                
                <div className="space-y-5">
                  {industry.barriers.checklist.map((item, index) => (
                    <div key={index} className="bg-white border border-[#E0E0E0] rounded-lg p-5 border-l-4 border-l-[#C8A882]">
                      <h4 className="flex items-start gap-2 font-bold text-lg text-[#2D7F8F] mb-2">
                        <span>✓</span>
                        {item.title}
                      </h4>
                      <p className="text-base leading-[1.8] text-[#1E3A5F]">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 壁の乗り越え方 (Overcoming Barriers) */}
            {industry.overcoming && (
              <div className="mt-8 md:ml-14 bg-[#F0F7F8] border border-[#E0E0E0] border-l-4 border-l-[#2D7F8F] rounded-lg p-6 mb-12">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xl">▼</span>
                  <h3 className="text-[19px] font-bold text-[#1E3A5F]">
                    {industry.overcoming.title}
                  </h3>
                </div>
                
                <h4 className="text-[17px] font-bold text-[#2D7F8F] mb-3">
                  {industry.overcoming.subtitle}
                </h4>
                
                <ul className="space-y-2">
                  {industry.overcoming.points.map((point, index) => (
                    <li key={index} className="flex items-start gap-2 text-base leading-[1.8] text-[#333] pl-5 relative">
                      <span className="absolute left-0 top-2 w-1.5 h-1.5 bg-[#333] rounded-full"></span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 本文 (後半: 壁の乗り越え方の後) */}
            <div className={`${baseTextSize} ${leadingRelaxed} mb-12 whitespace-pre-wrap`}>
              {(industry.timeline.phase3 || '').includes('\n\n専門用語が伝わらない場面では') ? 
                '専門用語が伝わらない場面では' + (industry.timeline.phase3 || '').split('\n\n専門用語が伝わらない場面では')[1] : 
                ''}
            </div>
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
