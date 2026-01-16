import { useState, useEffect, useRef } from "react";
import { useRoute } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { industries } from "@/data/industries";
import type { Industry } from "@/data/industries";
import { X, Share2, ChevronLeft, ChevronRight, ExternalLink, CheckCircle2, ArrowRight, AlertCircle, HelpCircle, Lightbulb } from "lucide-react";
import { highlightPhrases } from "@/lib/textHighlight";

export default function IndustryDetailPage() {
  const [, params] = useRoute("/industry/:id");
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (params?.id) {
      const foundIndustry = industries.find(i => i.id === parseInt(params.id));
      if (foundIndustry) {
        setIndustry(foundIndustry);
        
        // OGPメタタグを設定
        const url = window.location.href;
        const imageUrl = window.location.origin + foundIndustry.image;
        
        document.title = `${foundIndustry.title} - 能登百業録`;
        
        const existingMeta = document.querySelectorAll('meta[property^="og:"], meta[name="twitter:"], meta[name="description"]');
        existingMeta.forEach(tag => tag.remove());
        
        const metaTags = [
          { property: 'og:title', content: `${foundIndustry.title} - 能登百業録` },
          { property: 'og:description', content: foundIndustry.summary },
          { property: 'og:image', content: imageUrl },
          { property: 'og:url', content: url },
          { property: 'og:type', content: 'article' },
          { property: 'og:site_name', content: '能登百業録' },
          { name: 'twitter:card', content: 'summary_large_image' },
          { name: 'twitter:title', content: `${foundIndustry.title} - 能登百業録` },
          { name: 'twitter:description', content: foundIndustry.summary },
          { name: 'twitter:image', content: imageUrl },
          { name: 'description', content: foundIndustry.summary }
        ];
        
        metaTags.forEach(({ property, name, content }) => {
          const meta = document.createElement('meta');
          if (property) meta.setAttribute('property', property);
          if (name) meta.setAttribute('name', name);
          meta.setAttribute('content', content);
          document.head.appendChild(meta);
        });
      }
    }
    
    return () => {
      document.title = '能登百業録';
      const metaTags = document.querySelectorAll('meta[property^="og:"], meta[name="twitter:"]');
      metaTags.forEach(tag => tag.remove());
    };
  }, [params?.id]);
  
  // スクロールアニメーション
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        section.classList.add('opacity-0');
        observer.observe(section);
      }
    });

    return () => {
      sectionsRef.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, [industry]);

  if (!industry) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">産業が見つかりません</h2>
          <a href="/" className="text-sm text-slate-600 hover:text-slate-900 underline">
            トップページに戻る
          </a>
        </div>
      </div>
    );
  }

  const handleShare = (platform: "twitter" | "facebook" | "line") => {
    const url = window.location.href;
    const text = `${industry.title} - 能登百業録`;
    
    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "line":
        shareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;
        break;
    }
    
    window.open(shareUrl, "_blank", "width=600,height=400");
    setShowShareMenu(false);
  };

  // 活用事例記事かどうかの判定
  const isCaseStudy = !!industry.isCaseStudy;

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in fade-in duration-300 font-sans text-slate-800">
      <Header />
      
      {/* Close Button & Share Button */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        <div className="relative">
          <button 
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="p-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-slate-100 transition-colors shadow-sm border border-slate-200"
          >
            <Share2 className="w-5 h-5 text-slate-700" />
          </button>
          
          {/* Share Menu */}
          {showShareMenu && (
            <div className="absolute top-12 right-0 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden min-w-[160px]">
              <button
                onClick={() => handleShare('twitter')}
                className="w-full px-4 py-3 text-left text-sm hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Xでシェア
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="w-full px-4 py-3 text-left text-sm hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebookでシェア
              </button>
              <button
                onClick={() => handleShare('line')}
                className="w-full px-4 py-3 text-left text-sm hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                </svg>
                LINEでシェア
              </button>
            </div>
          )}
        </div>
        
        <button 
          onClick={() => {
            const referrer = document.referrer;
            if (referrer && (referrer.includes('/map') || referrer.includes(window.location.origin))) {
              window.history.back();
            } else {
              window.location.href = '/';
            }
          }}
          className="p-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-slate-100 transition-colors shadow-sm border border-slate-200"
        >
          <X className="w-5 h-5 text-slate-700" />
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[60vh] group">
        <img 
          src={industry.gallery && industry.gallery.length > 0 ? industry.gallery[currentImageIndex] : industry.image}
          alt={industry.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-slate-900/90"></div>
        
        {/* ギャラリーナビゲーション */}
        {industry.gallery && industry.gallery.length > 1 && (
          <>
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? industry.gallery!.length - 1 : prev - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-all text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev === industry.gallery!.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-all text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {industry.gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? "bg-white w-6"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
          <div className="max-w-4xl mx-auto">
            {/* 課題カード（活用事例の場合のみ表示） */}
            {isCaseStudy && industry.challengeCard && (
              <div className="inline-block bg-red-600 text-white text-sm font-bold px-3 py-1 rounded-full mb-4 shadow-lg animate-bounce-subtle">
                課題：{industry.challengeCard}
              </div>
            )}
            
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm border border-white/30">
                {industry.category}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm border border-white/30">
                {industry.location}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 leading-tight">
              {industry.title}
            </h1>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex flex-col">
                <span className="text-sm opacity-80">{industry.role}</span>
                <span className="text-lg font-medium">{industry.operator}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        
        {/* 活用事例（新しい構成）の場合 */}
        {isCaseStudy ? (
          <div className="space-y-16">
            {/* 1. 要点まとめ */}
            <section ref={(el) => { sectionsRef.current[0] = el; }} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                この事例の要点
              </h2>
              <ul className="space-y-3 mb-8">
                {industry.keyPoints?.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2.5 flex-shrink-0" />
                    <span className="text-lg text-slate-700 font-medium">{point}</span>
                  </li>
                ))}
              </ul>
              
              <div className="bg-white p-6 rounded-xl border border-emerald-100">
                <p className="text-sm text-slate-500 mb-2 font-bold">活用した支援メニュー</p>
                <div className="flex items-start justify-between gap-4 flex-wrap md:flex-nowrap">
                  <div>
                    <h3 className="text-xl font-bold text-emerald-800 mb-1">{industry.selectedSupport?.name}</h3>
                    <p className="text-sm text-slate-600">{industry.selectedSupport?.description}</p>
                  </div>
                  <a 
                    href={industry.selectedSupport?.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-emerald-600 font-bold hover:text-emerald-700 whitespace-nowrap bg-emerald-50 px-4 py-2 rounded-lg hover:bg-emerald-100 transition-colors"
                  >
                    制度詳細 <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </section>

            {/* 2. 仕事と課題 */}
            <section ref={(el) => { sectionsRef.current[1] = el; }} className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-lg font-bold text-slate-400 mb-4 uppercase tracking-wider">どんな仕事？</h3>
                <p className="text-lg leading-relaxed text-slate-700">
                  {highlightPhrases(industry.jobDescription || "", industry.highlightPhrases || [])}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-bold text-red-400 mb-4 uppercase tracking-wider flex items-center gap-2">
                  <AlertCircle className="w-5 h-5" />
                  直面した課題
                </h3>
                <p className="text-lg leading-relaxed text-slate-700 bg-red-50 p-6 rounded-xl border border-red-100">
                  {highlightPhrases(industry.challengeDescription || "", industry.highlightPhrases || [])}
                </p>
              </div>
            </section>

            {/* 3. 意思決定プロセス */}
            <section ref={(el) => { sectionsRef.current[2] = el; }} className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-200 md:left-1/2 md:-translate-x-1/2"></div>
              
              <div className="space-y-12 relative">
                {/* Step 1: 選択肢 */}
                <div className="relative flex flex-col md:flex-row gap-8 items-start">
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-slate-400 rounded-full border-4 border-white -translate-x-1/2 mt-1.5 z-10"></div>
                  <div className="md:w-1/2 md:text-right md:pr-12 pl-12 md:pl-0">
                    <h3 className="text-xl font-bold mb-2 text-slate-800">検討した選択肢</h3>
                    <div className="flex flex-wrap gap-2 md:justify-end">
                      {industry.supportOptions?.map((option, i) => (
                        <span key={i} className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-sm">
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="md:w-1/2 pl-12 md:pl-12 hidden md:block"></div>
                </div>

                {/* Step 2: 選定理由 */}
                <div className="relative flex flex-col md:flex-row gap-8 items-start">
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-emerald-500 rounded-full border-4 border-white -translate-x-1/2 mt-1.5 z-10"></div>
                  <div className="md:w-1/2 md:text-right md:pr-12 hidden md:block"></div>
                  <div className="md:w-1/2 pl-12 md:pl-12">
                    <h3 className="text-xl font-bold mb-3 text-emerald-700 flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      なぜこれを選んだ？
                    </h3>
                    <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 relative">
                      <div className="absolute top-6 -left-2 w-4 h-4 bg-emerald-50 rotate-45 border-l border-b border-emerald-100 hidden md:block"></div>
                      <p className="text-slate-700 leading-relaxed">
                        {industry.reasonForSelection}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3: アクション */}
                <div className="relative flex flex-col md:flex-row gap-8 items-start">
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white -translate-x-1/2 mt-1.5 z-10"></div>
                  <div className="md:w-1/2 md:text-right md:pr-12 pl-12 md:pl-0">
                    <h3 className="text-xl font-bold mb-3 text-blue-700">実行したアクション</h3>
                    <p className="text-slate-700 leading-relaxed">
                      {industry.actionTaken}
                    </p>
                  </div>
                  <div className="md:w-1/2 pl-12 md:pl-12 hidden md:block"></div>
                </div>

                {/* Step 4: 変化 */}
                <div className="relative flex flex-col md:flex-row gap-8 items-start">
                  <div className="absolute left-4 md:left-1/2 w-6 h-6 bg-amber-400 rounded-full border-4 border-white -translate-x-1/2 mt-0.5 z-10 shadow-md"></div>
                  <div className="md:w-1/2 md:text-right md:pr-12 hidden md:block"></div>
                  <div className="md:w-1/2 pl-12 md:pl-12">
                    <h3 className="text-2xl font-bold mb-4 text-slate-800">そして、現在</h3>
                    <p className="text-lg text-slate-700 leading-relaxed font-medium">
                      {industry.changes}
                    </p>
                    {industry.futureSupport && (
                      <div className="mt-6 pt-6 border-t border-slate-100">
                        <p className="text-sm text-slate-500 font-bold mb-2">次に検討していること</p>
                        <p className="text-slate-600">{industry.futureSupport}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* 4. 編集部コメント & おすすめ */}
            <section ref={(el) => { sectionsRef.current[3] = el; }} className="bg-slate-800 text-white p-8 md:p-12 rounded-2xl">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="font-serif font-bold text-xl">編</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-2 text-slate-300">編集部より</h3>
                  <p className="text-slate-300 leading-relaxed italic">
                    "{industry.writerComment}"
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-8">
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-400" />
                  この事例に関心がある方へのおすすめ
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {industry.recommendedSupports?.map((support, i) => (
                    <a 
                      key={i}
                      href={support.link}
                      className="block bg-slate-700/50 hover:bg-slate-700 p-4 rounded-xl transition-colors border border-slate-600 hover:border-slate-500 group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-amber-100 group-hover:text-amber-50">{support.name}</h4>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-sm text-slate-400 group-hover:text-slate-300">{support.description}</p>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          </div>
        ) : (
          /* 通常の記事（以前の構成） */
          <div className="space-y-20">
            {/* 概要 */}
            <section ref={(el) => { sectionsRef.current[0] = el; }}>
              <h2 className="text-2xl font-serif font-bold mb-6 border-b pb-4 border-slate-200">
                生業の概要
              </h2>
              <p className="text-lg leading-loose text-slate-700 mb-8">
                {highlightPhrases(industry.summary, industry.highlightPhrases || [])}
              </p>
              
              <div className="bg-slate-50 p-8 rounded-xl border border-slate-100">
                <h3 className="text-lg font-bold mb-4 text-slate-800">なぜ今、必要なのか</h3>
                <p className="text-slate-700 leading-relaxed">
                  {highlightPhrases(industry.necessity, industry.highlightPhrases || [])}
                </p>
              </div>
            </section>

            {/* 深掘りセクション */}
            <section ref={(el) => { sectionsRef.current[1] = el; }}>
              <h2 className="text-2xl font-serif font-bold mb-8 border-b pb-4 border-slate-200">
                物語を深掘りする
              </h2>
              
              <div className="space-y-12">
                <div className="grid md:grid-cols-[120px_1fr] gap-6">
                  <div className="text-slate-400 font-serif text-lg font-bold pt-1">過去</div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-slate-800">{industry.timeline.past}</h3>
                    <p className="text-slate-600 leading-relaxed">{industry.deepDive.past}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-[120px_1fr] gap-6">
                  <div className="text-slate-400 font-serif text-lg font-bold pt-1">現在</div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-slate-800">{industry.timeline.present}</h3>
                    <p className="text-slate-600 leading-relaxed">{industry.deepDive.present}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-[120px_1fr] gap-6">
                  <div className="text-slate-400 font-serif text-lg font-bold pt-1">未来</div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-slate-800">{industry.timeline.future}</h3>
                    <p className="text-slate-600 leading-relaxed">{industry.deepDive.future}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* つながり */}
            <section ref={(el) => { sectionsRef.current[2] = el; }} className="bg-slate-50 p-8 rounded-xl">
              <h2 className="text-xl font-bold mb-4 text-slate-800">地域のつながり</h2>
              <p className="text-slate-700 mb-6">{industry.connections}</p>
              
              {industry.relatedIndustries && industry.relatedIndustries.length > 0 && (
                <div>
                  <h3 className="text-sm font-bold text-slate-500 mb-3 uppercase tracking-wider">関連する生業</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {industry.relatedIndustries.map(id => {
                      const related = industries.find(i => i.id === id);
                      if (!related) return null;
                      return (
                        <a 
                          key={id} 
                          href={`/industry/${id}`}
                          className="flex items-center gap-3 p-3 bg-white rounded-lg border border-slate-200 hover:border-slate-400 hover:shadow-md transition-all group"
                        >
                          <img src={related.image} alt={related.title} className="w-12 h-12 rounded object-cover" />
                          <div>
                            <div className="text-sm font-bold text-slate-800 group-hover:text-blue-800">{related.title}</div>
                            <div className="text-xs text-slate-500">{related.category}</div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>

            {/* アクション */}
            <section ref={(el) => { sectionsRef.current[3] = el; }}>
              <h2 className="text-2xl font-serif font-bold mb-8 text-center">
                この生業に関わる
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {industry.actions.map((action, index) => (
                  <a
                    key={index}
                    href={action.link}
                    className="flex flex-col items-center p-6 bg-white border border-slate-200 rounded-xl hover:shadow-lg hover:border-slate-300 transition-all text-center group"
                  >
                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-slate-200 transition-colors">
                      {action.type === 'buy' && <span className="text-2xl">🛍️</span>}
                      {action.type === 'visit' && <span className="text-2xl">🚶</span>}
                      {action.type === 'join' && <span className="text-2xl">🤝</span>}
                      {action.type === 'support' && <span className="text-2xl">📣</span>}
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-slate-800">{action.label}</h3>
                    <span className="text-sm text-blue-600 font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      詳細を見る <ArrowRight className="w-4 h-4" />
                    </span>
                  </a>
                ))}
              </div>
            </section>

            {/* 訪問情報 */}
            {industry.visitInfo && (
              <section className="border-t border-slate-200 pt-12 mt-12">
                <h2 className="text-xl font-bold mb-6 text-slate-800">基本情報</h2>
                <dl className="grid md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                  {industry.visitInfo.hours && (
                    <div className="flex flex-col border-b border-slate-100 pb-2">
                      <dt className="text-slate-500 mb-1">営業時間・時期</dt>
                      <dd className="font-medium text-slate-800">{industry.visitInfo.hours}</dd>
                    </div>
                  )}
                  {industry.visitInfo.access && (
                    <div className="flex flex-col border-b border-slate-100 pb-2">
                      <dt className="text-slate-500 mb-1">アクセス</dt>
                      <dd className="font-medium text-slate-800">{industry.visitInfo.access}</dd>
                    </div>
                  )}
                  {industry.visitInfo.contact && (
                    <div className="flex flex-col border-b border-slate-100 pb-2">
                      <dt className="text-slate-500 mb-1">お問い合わせ</dt>
                      <dd className="font-medium text-slate-800">{industry.visitInfo.contact}</dd>
                    </div>
                  )}
                  {industry.visitInfo.website && (
                    <div className="flex flex-col border-b border-slate-100 pb-2">
                      <dt className="text-slate-500 mb-1">ウェブサイト</dt>
                      <dd className="font-medium text-slate-800">
                        <a href={industry.visitInfo.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1">
                          公式サイトへ <ExternalLink className="w-3 h-3" />
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>
              </section>
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
