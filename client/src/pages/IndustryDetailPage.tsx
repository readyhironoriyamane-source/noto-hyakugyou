import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GlossaryTerm } from "@/components/GlossaryTerm";
import { industries } from "@/data/industries";
import type { Industry } from "@/data/industries";
import { 
  X, Share2, ChevronLeft, ChevronRight, CheckCircle2, ArrowRight, 
  AlertCircle, FileText, MapPin, Users, Building2, ArrowDown, 
  Pin, AlertTriangle, MessageCircle, ExternalLink, ArrowUpRight
} from "lucide-react";

interface IndustryDetailPageProps {
  params: { id: string };
}

export default function IndustryDetailPage({ params }: IndustryDetailPageProps) {
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (params?.id) {
      const foundIndustry = industries.find(i => i.id === parseInt(params.id));
      if (foundIndustry) {
        setIndustry(foundIndustry);
        document.title = `${foundIndustry.title} - 能登百業録`;
        window.scrollTo(0, 0);
      }
    }
  }, [params?.id]);

  // スクロールアニメーション
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
            entry.target.classList.remove('opacity-0', 'translate-y-4');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        section.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-700');
        observer.observe(section);
      }
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [industry]);

  if (!industry) return null;

  const isCaseStudy = !!industry.isCaseStudy;
  const baseTextSize = fontSize === 'normal' ? 'text-lg' : 'text-xl';
  const leadingRelaxed = fontSize === 'normal' ? 'leading-loose' : 'leading-[2.2]';

  return (
    <div className={`min-h-screen bg-[#F9F8F4] text-[#333] font-sans ${fontSize === 'large' ? 'text-lg' : ''}`}>
      <Header />

      {/* パンくずリスト */}
      <div className="bg-white border-b border-gray-200 py-3">
        <div className="container max-w-5xl mx-auto px-4 text-sm text-gray-500 flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <a href="/" className="hover:text-primary transition-colors no-underline">TOP</a>
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          <a href="/#case-studies" className="hover:text-primary transition-colors no-underline">商いの道しるべ</a>
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          <span className="text-gray-800 font-medium">{industry.title}</span>
        </div>
      </div>

      {/* Phase 0: 基礎情報 (Basic Info) */}
      <header className="bg-white pb-12 pt-8 md:pt-12 border-b border-gray-100">
        <div className="container max-w-5xl mx-auto px-4">
          {/* 属性バッジ & 文字サイズ変更 */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-bold tracking-wide">
                <MapPin className="w-4 h-4" /> {industry.location}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-bold tracking-wide">
                <Building2 className="w-4 h-4" /> {industry.category}
              </span>
              {industry.details?.employees && (
                <span className="inline-flex items-center gap-1.5 bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full text-sm font-bold tracking-wide">
                  <Users className="w-4 h-4" /> 従業員 {industry.details.employees}
                </span>
              )}
            </div>
            
            {/* 文字サイズ切り替え (PC) */}
            <div className="hidden md:flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200 self-start md:self-auto">
              <span className="text-xs font-bold text-gray-500 px-2">文字サイズ</span>
              <button 
                onClick={() => setFontSize('normal')}
                className={`px-3 py-1 rounded text-sm font-bold transition-all ${fontSize === 'normal' ? 'bg-white shadow-sm text-primary border border-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
              >
                標準
              </button>
              <button 
                onClick={() => setFontSize('large')}
                className={`px-3 py-1 rounded text-lg font-bold transition-all ${fontSize === 'large' ? 'bg-white shadow-sm text-primary border border-gray-200' : 'text-gray-400 hover:text-gray-600'}`}
              >
                大きく
              </button>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-4 leading-tight">
            {industry.title}
          </h1>

          {/* 文字サイズ切り替え (SP) - タイトル直下に配置 */}
          <div className="md:hidden flex items-center gap-2 mb-8">
            <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">文字サイズ</span>
            <div className="flex bg-gray-100 p-1 rounded-lg border border-gray-200">
              <button 
                onClick={() => setFontSize('normal')}
                className={`px-4 py-1.5 rounded text-sm font-bold transition-all ${fontSize === 'normal' ? 'bg-white shadow-sm text-primary border border-gray-200' : 'text-gray-400'}`}
              >
                標準
              </button>
              <button 
                onClick={() => setFontSize('large')}
                className={`px-4 py-1.5 rounded text-lg font-bold transition-all ${fontSize === 'large' ? 'bg-white shadow-sm text-primary border border-gray-200' : 'text-gray-400'}`}
              >
                大きく
              </button>
            </div>
          </div>

          {/* メインビジュアル */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-lg mb-8 group">
            <img 
              src={industry.image} 
              alt={industry.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* 視認性確保のための強力なグラデーションオーバーレイ */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80"></div>
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white z-10">
              <p className="text-lg md:text-xl font-bold opacity-100 mb-1 drop-shadow-md">{industry.details?.owner}</p>
              <p className="text-sm opacity-90 drop-shadow-md">{industry.details?.founded} 創業</p>
            </div>
          </div>

          {/* リード文 (Narrative) */}
          <div className="max-w-[720px] mx-auto">
            <p className={`font-serif text-xl md:text-2xl leading-relaxed text-gray-800 font-medium border-l-4 border-accent pl-6 py-2`}>
              {industry.summary}
            </p>
          </div>
        </div>
      </header>

      <main className="container max-w-[720px] mx-auto px-4 py-16 space-y-20">
        
        {/* Phase 1: 現状と課題 (Before & Regrets) */}
        <section ref={el => sectionsRef.current[0] = el}>
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-200">
            <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">Phase 1</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">
              現状と課題
            </h2>
          </div>
          
          <div className={`font-serif ${baseTextSize} ${leadingRelaxed} text-gray-800 whitespace-pre-line mb-10`}>
            {(industry.description || '').split('\n').map((line, i) => {
              // 会話文（「」や『』で始まる行）の判定
              const isConversation = line.trim().match(/^[「『]/);
              if (isConversation) {
                return (
                  <p key={i} className="font-serif font-bold pl-[1em] my-4 text-gray-900">
                    {line}
                  </p>
                );
              }
              return <span key={i}>{line}<br/></span>;
            })}
          </div>

          {/* Q2b. 教訓・後悔 (Regrets) */}
          {industry.regrets && (
            <div className="bg-[#FFF9C4] rounded-lg p-6 md:p-8 relative shadow-sm border border-[#F0E68C] my-12 transform rotate-1">
              <div className="absolute -top-4 -left-3 bg-[#B33E28] text-white px-4 py-1.5 rounded shadow-md font-bold flex items-center gap-2 transform -rotate-2">
                <Pin className="w-4 h-4 fill-white" /> 備えの教訓
              </div>
              <h3 className="text-xl font-bold text-[#5D4037] mt-2 mb-4 font-handwriting">
                {industry.regrets.title}
              </h3>
              <p className="text-[#5D4037] leading-relaxed font-medium">
                {industry.regrets.content}
              </p>
            </div>
          )}
        </section>

        {/* Phase 2: 選択と決断 (Decision) */}
        {industry.decisionProcess && (
          <section ref={el => sectionsRef.current[1] = el}>
            <div className="flex items-center gap-3 mb-10 pb-4 border-b border-gray-200">
              <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded">Phase 2</span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary">
                選択と決断
              </h2>
            </div>
            
            <div className="bg-white rounded-xl p-6 md:p-10 shadow-sm border border-gray-200">
              {/* Q3. 比較検討 (Worry) */}
              <div className="bg-gray-100 rounded-lg p-6 mb-8 text-center relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  比較検討した選択肢
                </span>
                <p className="text-lg font-bold text-gray-700 mt-2">
                  「{industry.decisionProcess.worry || (industry.decisionProcess.options?.map((o: any) => typeof o === 'string' ? o : (o as any).name).join(' / ')) || '選択肢'}」
                </p>
              </div>

              {/* 矢印 */}
              <div className="flex justify-center my-8 relative z-10">
                <div className="bg-white p-3 rounded-full border border-gray-200 shadow-sm">
                  <ArrowDown className="w-8 h-8 text-gray-400" />
                </div>
              </div>

              {/* Q4. 決め手 (Decider) */}
              <div className="border-2 border-primary/20 bg-primary/5 rounded-lg p-8 text-center relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                  選んだ決め手
                </span>
                <p className="text-xl font-bold text-primary mt-2 mb-4">
                  💡 {industry.decisionProcess.decider}
                </p>
                <div className="inline-block bg-white border border-primary/30 rounded px-4 py-2 text-sm font-bold text-primary">
                  選んだ制度：{industry.decisionProcess.selectedSupport}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Phase 3: 行動と変化 (Action & Reality) */}
        <section ref={el => sectionsRef.current[2] = el}>
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

          {/* Q5b. 実務の壁 (Barriers) */}
          {industry.barriers && (
            <div className="bg-gray-50 rounded-lg p-6 md:p-8 border-l-4 border-gray-400 mb-12">
              <h3 className="text-lg font-bold text-gray-700 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-gray-500" />
                実務の壁
              </h3>
              <h4 className="font-bold text-gray-800 mb-2">{industry.barriers.title}</h4>
              <p className="text-gray-600 leading-relaxed">
                {industry.barriers.content}
              </p>
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
        <section ref={el => sectionsRef.current[3] = el}>
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
        <section ref={el => sectionsRef.current[4] = el} className="bg-gray-800 text-white rounded-xl p-8 md:p-12 shadow-lg">
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-700">
            <span className="bg-accent text-white text-xs font-bold px-2 py-1 rounded">Phase 5</span>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-white">
              編集者視点
            </h2>
          </div>

          {/* W1. 一言コメント */}
          <div className="mb-10">
            <h3 className="text-lg font-bold text-gray-300 mb-3">編集部より</h3>
            <p className="text-lg leading-relaxed font-medium">
              {industry.editorComment || "この事例は、多くの事業者にとって希望の光となるでしょう。"}
            </p>
          </div>

          {/* W3. 制度スペック */}
          <div className="bg-gray-700/50 rounded-lg p-6 mb-8">
            <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">今回活用した制度</h3>
            {industry.supportSystem?.map((support, index) => (
              <div key={index} className="mb-4 last:mb-0">
                <div className="flex justify-between items-start gap-4 mb-2">
                  <h4 className="font-bold text-white text-lg">{support.name}</h4>
                  <a 
                    href={support.link} 
                    className="text-accent hover:text-accent/80 text-sm font-bold flex items-center gap-1 no-underline"
                  >
                    詳細 <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {support.description}
                </p>
                {/* GlossaryTermの適用例（ここがポイント） */}
                {support.name.includes("補助金") && (
                  <div className="mt-3 bg-gray-800 p-3 rounded border border-gray-600">
                    <h5 className="text-xs font-bold text-gray-400 mb-1">ここがポイント</h5>
                    <ul className="space-y-1">
                      <li className="flex items-center gap-2 text-xs text-gray-300">
                        <CheckCircle2 className="w-3 h-3 text-accent" />
                        <span><GlossaryTerm term="補助率" />：最大3/4（国・県）</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* W2. 他のおすすめ */}
          {industry.recommendedSupports && (
            <div>
              <h3 className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">あわせて検討したい制度</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {industry.recommendedSupports.map((rec, index) => (
                  <a 
                    key={index} 
                    href={rec.link}
                    className="block bg-white text-gray-800 p-4 rounded hover:bg-gray-50 transition-colors no-underline group"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        {rec.category}
                      </span>
                      <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                    </div>
                    <h4 className="font-bold text-primary mb-1">{rec.name}</h4>
                    <p className="text-xs text-gray-600 line-clamp-2">{rec.description}</p>
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
