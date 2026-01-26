import { useState, useEffect, useRef } from "react";
import { useRoute } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { industries } from "@/data/industries";
import type { Industry } from "@/data/industries";
import { 
  X, Share2, ChevronLeft, ChevronRight, CheckCircle2, ArrowRight, 
  AlertCircle, FileText, MapPin, Users, Building2, ArrowDown, 
  Pin, AlertTriangle, MessageCircle, ExternalLink, ArrowUpRight
} from "lucide-react";

export default function IndustryDetailPage() {
  const [, params] = useRoute("/industry/:id");
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
          <a href="/" className="hover:text-primary transition-colors">TOP</a>
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          <a href="/#case-studies" className="hover:text-primary transition-colors">商いの道しるべ</a>
          <ChevronRight className="w-4 h-4 flex-shrink-0" />
          <span className="text-gray-800 font-medium">{industry.title}</span>
        </div>
      </div>

      {/* ヘッダーエリア (Basic Info) */}
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
            
            {/* 文字サイズ切り替え */}
            <div className="flex items-center gap-2 bg-gray-50 p-1 rounded-lg border border-gray-200 self-start md:self-auto">
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

          <h1 className="text-3xl md:text-5xl font-serif font-bold text-primary mb-8 leading-tight">
            {industry.title}
          </h1>

          {/* メインビジュアル */}
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-lg mb-8 group">
            <img 
              src={industry.image} 
              alt={industry.title} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white">
              <p className="text-lg md:text-xl font-bold opacity-90 mb-1">{industry.details?.owner}</p>
              <p className="text-sm opacity-80">{industry.details?.founded} 創業</p>
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
        
        {/* 1. 課題と背景 (Narrative) */}
        <section ref={el => sectionsRef.current[0] = el}>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-8 pb-4 border-b border-gray-200">
            直面した危機
          </h2>
          <div className={`font-serif ${baseTextSize} ${leadingRelaxed} text-gray-800 whitespace-pre-line mb-10`}>
            {industry.description}
          </div>

          {/* 先人の教訓ボックス (Regrets) */}
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

        {/* 2. 決断のロジック (Decision Logic) */}
        {industry.decisionProcess && (
          <section ref={el => sectionsRef.current[1] = el}>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-10 pb-4 border-b border-gray-200">
              決断の分かれ道
            </h2>
            
            <div className="bg-white rounded-xl p-6 md:p-10 shadow-sm border border-gray-200">
              {/* 悩み */}
              <div className="bg-gray-100 rounded-lg p-6 mb-8 text-center relative">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gray-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  悩んだ選択肢
                </span>
                <p className="text-lg font-bold text-gray-700 mt-2">
                  「{industry.decisionProcess.worry || (industry.decisionProcess.options && industry.decisionProcess.options.join(' / ')) || '選択肢'}」
                </p>
              </div>

              {/* 矢印 */}
              <div className="flex justify-center -my-4 relative z-10">
                <div className="bg-white p-2 rounded-full border border-gray-200 shadow-sm">
                  <ArrowDown className="w-8 h-8 text-gray-400" />
                </div>
              </div>

              {/* 決め手 */}
              <div className="border-2 border-primary/20 bg-primary/5 rounded-lg p-8 mt-4 text-center relative">
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

              {/* 結果 */}
              <div className="mt-8 pt-8 border-t border-dashed border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-full shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">その後の変化</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {industry.decisionProcess.action}を行い、
                      <span className="font-bold text-accent border-b-2 border-accent/20 mx-1">
                        {industry.decisionProcess.outcome}
                      </span>
                      を実現しました。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. 実務の壁 (Barriers) */}
        {industry.barriers && (
          <section ref={el => sectionsRef.current[2] = el}>
            <div className="border-2 border-[#E53935] rounded-xl p-6 md:p-8 bg-[#FFEBEE]/30 flex flex-col md:flex-row gap-6 items-start">
              <div className="shrink-0 bg-[#FFEBEE] p-4 rounded-full">
                <AlertTriangle className="w-8 h-8 text-[#E53935]" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#C62828] mb-3 flex items-center gap-2">
                  ここが大変！実務の壁
                </h3>
                <h4 className="font-bold text-gray-900 mb-3 text-lg">
                  {industry.barriers.title}
                </h4>
                <p className="text-gray-800 leading-relaxed">
                  {industry.barriers.content}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* 4. 編集部より・関連制度 (Writer's Eye) */}
        <section ref={el => sectionsRef.current[3] = el} className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
          <div className="flex items-start gap-6 mb-10">
            <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden shrink-0 border-2 border-white shadow-md">
              <img src="https://placehold.co/100x100/e2e8f0/1e293b?text=Editor" alt="編集部" className="w-full h-full object-cover" />
            </div>
            <div className="relative bg-gray-50 rounded-2xl p-6 flex-grow bubble-left">
              <div className="absolute top-6 -left-2 w-4 h-4 bg-gray-50 transform rotate-45"></div>
              <h3 className="text-sm font-bold text-gray-500 mb-2 flex items-center gap-2">
                <MessageCircle className="w-4 h-4" /> 編集部より
              </h3>
              <p className="text-gray-800 font-medium leading-relaxed">
                {industry.editorComment || "困難な状況でも、諦めずに道を探す姿勢に心を打たれました。"}
              </p>
            </div>
          </div>

          <h3 className="text-xl font-serif font-bold text-primary mb-6 border-l-4 border-primary pl-4">
            この記事で紹介した支援制度
          </h3>
          
          <div className="grid gap-6">
            {industry.supportSystem?.map((support, idx) => (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all p-6 group">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="text-lg font-bold text-primary group-hover:text-accent transition-colors">
                    {support.name}
                  </h4>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-accent" />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {support.description}
                </p>
                <a 
                  href={support.link} 
                  className="inline-flex items-center text-sm font-bold text-primary hover:text-accent hover:underline decoration-2 underline-offset-4"
                >
                  制度の詳細を見る <ArrowUpRight className="w-4 h-4 ml-1" />
                </a>
              </div>
            ))}
          </div>
        </section>

      </main>

      {/* フローティングフッター (SPのみ) */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white/90 backdrop-blur-md border-t border-gray-200 p-4 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <a 
          href="#" 
          className="flex items-center justify-center gap-2 w-full bg-primary text-white font-bold py-3 rounded-lg shadow-md active:scale-95 transition-transform"
        >
          <MessageCircle className="w-5 h-5" />
          この制度について相談する
        </a>
      </div>

      <Footer />
    </div>
  );
}
