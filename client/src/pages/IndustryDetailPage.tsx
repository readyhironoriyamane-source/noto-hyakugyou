import { useState, useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
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
        
        {/* 1. 課題と背景 (Narrative) */}
        <section ref={el => sectionsRef.current[0] = el}>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-8 pb-4 border-b border-gray-200">
            直面した危機
          </h2>
          <div className={`font-serif ${baseTextSize} ${leadingRelaxed} text-gray-800 whitespace-pre-line mb-10`}>
            {industry.description.split('\n').map((line, i) => {
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
                  「{industry.decisionProcess.worry || (industry.decisionProcess.options?.map((o: any) => typeof o === 'string' ? o : o.name).join(' / ')) || '選択肢'}」
                </p>
              </div>

              {/* 矢印 - 上下マージンを均等化してバランス調整 */}
              <div className="flex justify-center my-8 relative z-10">
                <div className="bg-white p-3 rounded-full border border-gray-200 shadow-sm">
                  <ArrowDown className="w-8 h-8 text-gray-400" />
                </div>
              </div>

              {/* 決め手 */}
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

              {/* 結果 */}
              <div className="mt-8 pt-8 border-t border-dashed border-gray-200">
                <div className="flex items-start gap-4">
                  <div className="bg-accent/10 p-3 rounded-full shrink-0">
                    <CheckCircle2 className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-2">その後の変化</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {industry.decisionProcess.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 3. 活用した支援制度 (Actionable Info) */}
        <section ref={el => sectionsRef.current[2] = el}>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-8 pb-4 border-b border-gray-200">
            活用した支援制度
          </h2>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-primary px-6 py-4 flex justify-between items-center">
              <h3 className="text-white font-bold text-lg">
                {industry.decisionProcess?.selectedSupport || '支援制度'}
              </h3>
              <span className="bg-white/20 text-white text-xs px-2 py-1 rounded">
                {industry.category}
              </span>
            </div>
            
            <div className="p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className="flex-1">
                  <h4 className="font-bold text-gray-700 mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4" /> 制度の概要
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {/* ダミーテキスト：実際の制度データと紐付ける必要があります */}
                    被災した中小企業・小規模事業者の施設・設備の復旧を支援する補助金です。
                    建物の建設・改修、機械装置の購入・修繕などが対象となります。
                  </p>
                </div>
                <div className="flex-1 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h4 className="font-bold text-gray-700 mb-2 text-sm">ここがポイント</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>補助率：最大3/4（国・県）</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>上限額：最大15億円</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-center">
                <a 
                  href="/supports" 
                  className="inline-flex items-center gap-2 bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-primary/90 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  この制度の詳細を見る
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* 4. 応援メッセージ (Emotional Connection) */}
        <section ref={el => sectionsRef.current[3] = el} className="bg-white rounded-xl p-8 md:p-12 text-center border border-gray-100 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary via-accent to-primary"></div>
          <MessageCircle className="w-12 h-12 text-gray-200 mx-auto mb-6" />
          <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-800 mb-6">
            「{industry.details?.owner}」さんからのメッセージ
          </h3>
          <p className="text-lg md:text-xl font-serif leading-relaxed text-gray-700 italic">
            「{industry.message}」
          </p>
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
