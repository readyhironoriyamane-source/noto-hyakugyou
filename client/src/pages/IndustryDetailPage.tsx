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
              <Link href="/industries">
                <Button variant="ghost" className="text-white/80 hover:text-white mb-4 md:mb-6 pl-0 hover:pl-2 transition-all">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  一覧に戻る
                </Button>
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

        {/* 【セクション4】メインコンテンツエリア */}
        <main className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-20">
          
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

              {/* ========== 究極の二択 + 実務の壁 + 壁の乗り越え方（スマホで線の上に重ねる）開始 ========== */}

              {/* 1. 究極の二択 */}
              {industry.decisionMatrix && (
                <div className="-ml-14 md:ml-0 w-[calc(100%+3.5rem)] md:w-full md:max-w-[800px] relative z-10 bg-[#F8F9FA] border-[3px] border-[#2D7F8F] p-6 md:p-10 rounded-xl my-12">
                  <div className="mb-6">
                    <span className="bg-[#2D7F8F] text-white px-3 py-1.5 rounded text-sm inline-block font-bold">
                      究極の二択
                    </span>
                  </div>
                  
                  <h4 className="text-[18px] md:text-2xl font-bold text-[#1E3A5F] mt-0 mb-6 pb-4 border-b-2 border-[#E0E0E0]">
                    {industry.decisionMatrix.title}
                  </h4>
                  
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 bg-white p-5 md:p-6 rounded-lg border border-[#E0E0E0] shadow-sm">
                      <div className="mb-4">
                        <span className="bg-[#E0E0E0] text-[#3A4A5A] px-3 py-1.5 rounded text-xs inline-block font-bold">
                          選択肢 A
                        </span>
                      </div>
                      <h5 className="text-[16px] md:text-lg font-bold text-[#3A4A5A] mb-4">
                        {industry.decisionMatrix.optionA.title}
                      </h5>
                      <ul className="space-y-2 text-sm md:text-base leading-[1.8] text-[#333]">
                        {industry.decisionMatrix.optionA.pros.map((pro: string, i: number) => (
                          <li key={i} className={`flex items-start gap-2 ${i === industry.decisionMatrix!.optionA.pros.length - 1 ? 'italic text-[#666]' : ''}`}>
                            <span className="text-[#333] mt-1">•</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex-1 bg-[#E6F3F5] p-5 md:p-8 rounded-lg border-2 border-[#2D7F8F] border-l-[5px] shadow-sm">
                      <div className="mb-4">
                        <span className="bg-[#2D7F8F] text-white px-4 py-2 rounded text-sm md:text-base inline-block font-bold">
                          決断
                        </span>
                      </div>
                      <h5 className="text-[16px] md:text-lg font-bold text-[#1E3A5F] mb-4">
                        {industry.decisionMatrix.optionB.title}
                      </h5>
                      <div className="bg-white/60 p-4 rounded-lg mb-4 border border-[#2D7F8F]/20">
                        <p className="text-xs md:text-sm font-bold text-[#2D7F8F] mb-2">補助金</p>
                        <p className="text-sm md:text-base text-[#1E3A5F]">
                          {industry.decisionMatrix.optionB.subsidy}
                        </p>
                      </div>
                      <div className="bg-white/60 p-4 rounded-lg border border-[#2D7F8F]/20">
                        <p className="text-xs md:text-sm font-bold text-[#2D7F8F] mb-2">コスト</p>
                        <p className="text-sm md:text-base font-bold text-[#E65100]">
                          {industry.decisionMatrix.optionB.cost}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-5 md:p-6 rounded-lg border border-[#E0E0E0] mt-6 shadow-sm">
                    <p className="text-base md:text-lg font-bold text-[#1E3A5F] mb-3">決め手：</p>
                    <p className="text-sm md:text-base leading-[1.8] text-[#333]">
                      {industry.decisionMatrix.reason}
                    </p>
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
              
              {/* 本文①②（小見出しなし） */}
              <div className="mb-12 space-y-4">
                {(() => {
                  // phase3から本文部分のみを抽出（最初の---まで）
                  const fullText = industry.timeline.phase3;
                  const firstSeparator = fullText.indexOf('\n---\n');
                  const mainText = firstSeparator > 0 ? fullText.substring(0, firstSeparator) : fullText;
                  
                  return mainText.split('\n').filter(p => p.trim()).map((paragraph, idx) => (
                    <p key={idx} className={`${baseTextSize} ${leadingRelaxed} text-[#333]`}>
                      {paragraph}
                    </p>
                  ));
                })()}
              </div>
              
              {/* 2. 実務の壁 */}
              {industry.barriers && industry.barriers.checklist && (
                <div className="-ml-14 md:ml-0 w-[calc(100%+3.5rem)] md:w-full md:max-w-[800px] relative z-10 bg-white border border-[#E0E0E0] border-l-[8px] border-l-[#C8A882] p-6 md:p-8 rounded-lg my-12 shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="text-2xl">⚠️</span>
                    <h4 className="text-[20px] md:text-2xl font-bold text-[#1E3A5F]">
                      申請する人が直面しやすい『実務の壁』
                    </h4>
                  </div>
                  
                  <div className="space-y-5">
                    {industry.barriers.checklist.map((item: any, index: number) => (
                      <div key={index} className="bg-white border border-[#E0E0E0] p-4 md:p-5 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xl text-[#2D7F8F]">✓</span>
                          <h5 className="text-[16px] md:text-lg font-bold text-[#2D7F8F]">{item.title}</h5>
                        </div>
                        <p className="text-base leading-[1.8] text-[#1E3A5F] ml-7">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 支援を受けて起きた変化（薄いティール背景＋左ティールボーダー） */}
              {industry.changes && (
                <div className="bg-[#F0F7F8] border border-[#E0E0E0] border-l-[4px] border-l-[#2D7F8F] p-6 md:p-8 rounded-lg mt-8 shadow-sm">
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

              {/* 3. 壁の乗り越え方 */}
              {(() => {
                const fullText = industry.timeline.phase3;
                const howToOvercomeMatch = fullText.match(/### 壁の乗り越え方（要点）[\s\S]*?▼ こうやって乗り越えた\n([\s\S]*?)(?:\n---|\n###|$)/);
                
                if (howToOvercomeMatch && howToOvercomeMatch[1]) {
                  const items = howToOvercomeMatch[1]
                    .split('\n')
                    .filter(line => line.trim().startsWith('・'))
                    .map(line => line.replace('・', '').trim());
                  
                  if (items.length > 0) {
                    return (
                      <div className="-ml-14 md:ml-0 w-[calc(100%+3.5rem)] md:w-full md:max-w-[800px] relative z-10 bg-[#F0F7F8] border border-[#E0E0E0] border-l-[4px] border-l-[#2D7F8F] p-6 md:p-8 rounded-lg mt-8 shadow-sm">
                        <div className="mb-5">
                          <h4 className="text-[19px] md:text-[22px] font-bold text-[#1E3A5F] mb-3">
                            壁の乗り越え方（要点）
                          </h4>
                          <p className="text-[17px] font-bold text-[#2D7F8F]">
                            ▼ こうやって乗り越えた
                          </p>
                        </div>
                        
                        <ul className="space-y-2">
                          {items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-base leading-[1.8] text-[#333]">
                              <span className="text-[#2D7F8F] mt-1">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  }
                }
                return null;
              })()}
            </div>

            {/* Phase 4 */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[9px] top-0 w-5 h-5 rounded-full bg-[#F9F8F4] border-4 border-[#1D3A52] z-10"></div>
              
              <div className="mb-2">
                <span className="bg-[#1D3A52] text-white text-xs font-bold px-2 py-1 rounded">フェーズ 4</span>
              </div>
              <h3 className="text-[24px] md:text-2xl font-bold text-[#1D3A52] mb-4">現在から未来へ</h3>
              <p className={`${baseTextSize} ${leadingRelaxed}`}>
                {industry.timeline.phase4}
              </p>
            </div>
          </div>

          {/* 【セクション12】再起の裏側（店主の独白） */}
          {industry.behindTheScenes && (
            <div className="mb-16">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden p-8 md:p-12 border-l-4 border-l-[#1D3A52]">
                <div className="flex items-center justify-center gap-3 mb-10">
                  <span className="text-2xl">📖</span>
                  <h3 className="text-2xl font-bold text-[#1D3A52]">{industry.behindTheScenes.title}</h3>
                </div>
                
                <div className="space-y-10">
                  {industry.behindTheScenes.content.map((item, idx) => (
                    <div key={idx}>
                      <h4 className="font-bold text-lg text-[#1D3A52] mb-4">
                        {item.heading}
                      </h4>
                      <p className="text-gray-700 leading-loose text-lg whitespace-pre-wrap">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 【セクション13】今回活用した制度（カード） */}
          {industry.supportSystem && (
            <div className="mb-20">
              {Array.isArray(industry.supportSystem) ? (
                // 配列の場合（既存のロジック）
                (industry.supportSystem as any[]).map((support: any, index: number) => (
                  <div key={index} className="mb-8">
                    <h3 className="text-2xl font-bold text-[#1D3A52] mb-6 flex items-center">
                      <span className="mr-2">##</span> 今回活用した制度
                    </h3>
                    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <div className="p-6 md:p-8">
                        <h4 className="text-xl md:text-2xl font-bold text-[#1D3A52] mb-4">
                          {support.name}
                        </h4>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {support.description}
                        </p>
                        {/* 既存の表示ロジックがあればここに記述 */}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                // オブジェクトの場合（新デザイン）
                <div className="bg-[#1D3A52] p-6 md:p-8 rounded-xl">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center">
                    <span className="mr-2">##</span> 今回活用した制度
                  </h3>
                  
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 md:p-8">
                      <h4 className="text-xl md:text-2xl font-bold text-[#333] mb-4">
                        {industry.supportSystem.name}
                      </h4>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {industry.supportSystem.description}
                      </p>
                      
                      <div className="bg-gray-50 rounded-lg p-5 mb-6 border border-gray-100">
                        <div className="space-y-3">
                          <div className="flex items-start gap-3">
                            <span className="text-xl">💰</span>
                            <div>
                              <span className="font-bold text-gray-700 mr-2">補助率:</span>
                              <span className="text-gray-800">{industry.supportSystem.rate}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-xl">📄</span>
                            <div>
                              <span className="font-bold text-gray-700 mr-2">上限:</span>
                              <span className="text-gray-800">{industry.supportSystem.limit}</span>
                            </div>
                          </div>
                          <div className="flex items-start gap-3">
                            <span className="text-xl text-[#C8A882]">✓</span>
                            <div>
                              <span className="font-bold text-[#C8A882] mr-2">ここがポイント:</span>
                              <span className="text-gray-800">{industry.supportSystem.point}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <a 
                          href={industry.supportSystem.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center bg-[#2D7F8F] hover:bg-[#236A7A] text-white font-bold py-3 px-8 rounded-md transition-colors duration-300 shadow-sm hover:shadow-md w-full md:w-auto"
                        >
                          この制度の詳細を見る
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Link href="/supports">
                      <Button variant="outline" className="rounded-full px-8 bg-white text-[#1D3A52] hover:bg-gray-100 border-none">
                        他の支援制度も見る
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 【セクション11】編集後記（共通コンポーネント化推奨だが、ここでは直接実装） */}
          <div className="bg-white p-8 md:p-10 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#1D3A52]"></div>
            <h3 className="text-xl font-bold text-[#1D3A52] mb-6 flex items-center">
              <span className="text-2xl mr-3">✍️</span>
              編集後記
            </h3>
            <p className="text-gray-700 leading-loose text-lg font-medium italic">
              {industry.editorComment}
            </p>
            <div className="mt-6 flex flex-col items-end">
              <div className="text-right mb-2">
                <p className="text-sm text-gray-500">能登百業録 編集部</p>
                <p className="text-sm font-bold text-[#1D3A52]">{industry.details?.writer}</p>
              </div>
              <p className="text-xs text-gray-400 text-right max-w-md">
                ※掲載情報は執筆時点のものであり、制度内容は変更される場合があります。申請をご検討の際は、窓口にて最新情報をご確認いただくことを推奨します。
              </p>
            </div>
          </div>

        </main>

        <Footer />
      </div>
    );
  }

  // ID 101 以外は既存のデザイン（または共通デザイン）を表示
  // ※ここでは既存のコードを維持
  return (
    <div className="min-h-screen bg-[#F9F8F4] font-sans text-gray-800">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-4">{industry.title}</h1>
        <p>このページは現在準備中です。</p>
        <Link href="/industries">
          <Button className="mt-4">一覧に戻る</Button>
        </Link>
      </main>
      <Footer />
    </div>
  );
}
