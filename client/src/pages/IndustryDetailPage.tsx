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
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold mb-4 text-stone-800">産業が見つかりません</h2>
          <a href="/" className="text-sm text-stone-600 hover:text-stone-900 underline">
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
    <div className="fixed inset-0 z-[100] bg-stone-50 overflow-y-auto animate-in fade-in duration-300 font-serif text-stone-800">
      <Header />
      
      {/* Close Button & Share Button */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        <div className="relative">
          <button 
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="p-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-stone-100 transition-colors shadow-sm border border-stone-200"
          >
            <Share2 className="w-5 h-5 text-stone-700" />
          </button>
          
          {/* Share Menu */}
          {showShareMenu && (
            <div className="absolute top-12 right-0 bg-white rounded-lg shadow-xl border border-stone-200 overflow-hidden min-w-[160px]">
              <button
                onClick={() => handleShare('twitter')}
                className="w-full px-4 py-3 text-left text-sm hover:bg-stone-50 transition-colors flex items-center gap-2 font-sans"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Xでシェア
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="w-full px-4 py-3 text-left text-sm hover:bg-stone-50 transition-colors flex items-center gap-2 font-sans"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebookでシェア
              </button>
              <button
                onClick={() => handleShare('line')}
                className="w-full px-4 py-3 text-left text-sm hover:bg-stone-50 transition-colors flex items-center gap-2 font-sans"
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
          className="p-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-stone-100 transition-colors shadow-sm border border-stone-200"
        >
          <X className="w-5 h-5 text-stone-700" />
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[60vh] group">
        <img 
          src={industry.gallery && industry.gallery.length > 0 ? industry.gallery[currentImageIndex] : industry.image}
          alt={industry.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-stone-900/90"></div>
        
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
              <div className="inline-block bg-red-800/90 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 mb-6 tracking-wider border border-red-700/50">
                課題：{industry.challengeCard}
              </div>
            )}
            
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-sm border border-white/20 tracking-widest font-light">
                {industry.category}
              </span>
              <span className="px-3 py-1 bg-white/10 backdrop-blur-sm text-sm border border-white/20 tracking-widest font-light">
                {industry.location}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight tracking-wide">
              {industry.title}
            </h1>
            <div className="flex items-center gap-4 text-white/90">
              <div className="flex flex-col">
                <span className="text-xs opacity-80 tracking-widest mb-1">{industry.role}</span>
                <span className="text-xl font-serif">{industry.operator}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-24">
        
        {/* 活用事例（新しい構成）の場合 */}
        {isCaseStudy ? (
          <div className="space-y-24">
            {/* 1. 要点まとめ */}
            <section ref={(el) => { sectionsRef.current[0] = el; }} className="bg-stone-100/50 p-8 md:p-12 border border-stone-200">
              <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-stone-800 tracking-widest border-b border-stone-300 pb-4">
                <span className="text-stone-400 font-light">01</span>
                この事例の要点
              </h2>
              <ul className="space-y-4 mb-10">
                {industry.keyPoints?.map((point, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <span className="w-1.5 h-1.5 bg-stone-400 rounded-full mt-2.5 flex-shrink-0" />
                    <span className="text-lg text-stone-700 font-medium leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
              
              <div className="bg-white p-8 border border-stone-200 shadow-sm">
                <p className="text-xs text-stone-500 mb-3 font-bold tracking-widest uppercase">活用した支援メニュー</p>
                <div className="flex items-start justify-between gap-6 flex-wrap md:flex-nowrap">
                  <div>
                    <h3 className="text-xl font-bold text-stone-900 mb-2 font-serif">{industry.selectedSupport?.name}</h3>
                    <p className="text-sm text-stone-600 leading-relaxed">{industry.selectedSupport?.description}</p>
                  </div>
                  <a 
                    href={industry.selectedSupport?.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-stone-800 font-medium hover:text-stone-600 whitespace-nowrap border border-stone-300 px-6 py-3 hover:bg-stone-50 transition-colors text-sm tracking-wider"
                  >
                    制度詳細 <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </section>

            {/* 2. 仕事と課題 */}
            <section ref={(el) => { sectionsRef.current[1] = el; }} className="grid md:grid-cols-2 gap-16">
              <div>
                <h3 className="text-sm font-bold text-stone-400 mb-6 uppercase tracking-widest border-b border-stone-200 pb-2">どんな仕事？</h3>
                <p className="text-lg leading-loose text-stone-800 font-serif text-justify">
                  {highlightPhrases(industry.jobDescription || "", industry.highlightPhrases || [])}
                </p>
              </div>
              <div>
                <h3 className="text-sm font-bold text-red-800/60 mb-6 uppercase tracking-widest border-b border-red-200 pb-2 flex items-center gap-2">
                  直面した課題
                </h3>
                <p className="text-lg leading-loose text-stone-800 font-serif bg-red-50/50 p-8 border border-red-100 text-justify">
                  {highlightPhrases(industry.challengeDescription || "", industry.highlightPhrases || [])}
                </p>
              </div>
            </section>

            {/* 3. 意思決定プロセス */}
            <section ref={(el) => { sectionsRef.current[2] = el; }} className="relative py-8">
              <div className="absolute left-4 top-0 bottom-0 w-[1px] bg-stone-300 md:left-1/2 md:-translate-x-1/2"></div>
              
              <div className="space-y-20 relative">
                {/* Step 1: 選択肢 */}
                <div className="relative flex flex-col md:flex-row gap-12 items-start">
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-stone-400 rounded-full ring-4 ring-white -translate-x-1/2 mt-2 z-10"></div>
                  <div className="md:w-1/2 md:text-right md:pr-16 pl-12 md:pl-0">
                    <h3 className="text-lg font-bold mb-4 text-stone-800 font-serif">検討した選択肢</h3>
                    <div className="flex flex-wrap gap-3 md:justify-end">
                      {industry.supportOptions?.map((option, i) => (
                        <span key={i} className="bg-stone-100 text-stone-600 px-4 py-2 text-sm tracking-wider border border-stone-200">
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="md:w-1/2 pl-12 md:pl-12 hidden md:block"></div>
                </div>

                {/* Step 2: 選定理由 */}
                <div className="relative flex flex-col md:flex-row gap-12 items-start">
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-stone-800 rounded-full ring-4 ring-white -translate-x-1/2 mt-2 z-10"></div>
                  <div className="md:w-1/2 md:text-right md:pr-16 hidden md:block"></div>
                  <div className="md:w-1/2 pl-12 md:pl-16">
                    <h3 className="text-lg font-bold mb-4 text-stone-800 font-serif flex items-center gap-3">
                      なぜこれを選んだ？
                    </h3>
                    <div className="bg-stone-50 p-8 border-l-2 border-stone-800">
                      <p className="text-stone-700 leading-loose font-serif text-justify">
                        {industry.reasonForSelection}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3: アクション */}
                <div className="relative flex flex-col md:flex-row gap-12 items-start">
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-stone-400 rounded-full ring-4 ring-white -translate-x-1/2 mt-2 z-10"></div>
                  <div className="md:w-1/2 md:text-right md:pr-16 pl-12 md:pl-0">
                    <h3 className="text-lg font-bold mb-4 text-stone-800 font-serif">実行したアクション</h3>
                    <p className="text-stone-700 leading-loose font-serif text-justify">
                      {industry.actionTaken}
                    </p>
                  </div>
                  <div className="md:w-1/2 pl-12 md:pl-12 hidden md:block"></div>
                </div>

                {/* Step 4: 変化 */}
                <div className="relative flex flex-col md:flex-row gap-12 items-start">
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-stone-800 rounded-full ring-4 ring-white -translate-x-1/2 mt-1.5 z-10 shadow-sm"></div>
                  <div className="md:w-1/2 md:text-right md:pr-16 hidden md:block"></div>
                  <div className="md:w-1/2 pl-12 md:pl-16">
                    <h3 className="text-2xl font-bold mb-6 text-stone-900 font-serif">そして、現在</h3>
                    <p className="text-lg text-stone-800 leading-loose font-serif font-medium text-justify">
                      {industry.changes}
                    </p>
                    {industry.futureSupport && (
                      <div className="mt-8 pt-8 border-t border-stone-200">
                        <p className="text-xs text-stone-500 font-bold mb-3 tracking-widest uppercase">次に検討していること</p>
                        <p className="text-stone-600 font-serif">{industry.futureSupport}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>

            {/* 4. 編集部コメント & おすすめ */}
            <section ref={(el) => { sectionsRef.current[3] = el; }} className="bg-stone-900 text-stone-200 p-8 md:p-16">
              <div className="flex items-start gap-6 mb-12">
                <div className="w-12 h-12 border border-stone-600 flex items-center justify-center flex-shrink-0">
                  <span className="font-serif font-bold text-xl text-stone-400">編</span>
                </div>
                <div>
                  <h3 className="text-sm font-bold mb-4 text-stone-400 tracking-widest uppercase">編集部より</h3>
                  <p className="text-stone-300 leading-loose font-serif text-lg italic">
                    "{industry.writerComment}"
                  </p>
                </div>
              </div>

              <div className="border-t border-stone-800 pt-12">
                <h3 className="text-lg font-bold mb-8 flex items-center gap-3 font-serif">
                  この事例に関心がある方へのおすすめ
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {industry.recommendedSupports?.map((support, i) => (
                    <a 
                      key={i}
                      href={support.link}
                      className="block bg-stone-800/50 hover:bg-stone-800 p-6 transition-colors border border-stone-700 hover:border-stone-600 group"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-stone-200 group-hover:text-white font-serif tracking-wide">{support.name}</h4>
                        <ArrowRight className="w-4 h-4 text-stone-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                      <p className="text-sm text-stone-400 group-hover:text-stone-300 leading-relaxed">{support.description}</p>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          </div>
        ) : (
          /* 通常の記事（以前の構成） - 順序変更反映済み */
          <div className="space-y-24">
            {/* 1. 物語（概要） */}
            <section ref={(el) => { sectionsRef.current[0] = el; }}>
              <h2 className="text-2xl font-serif font-bold mb-8 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-stone-900"></span>
                物語
              </h2>
              <p className="text-lg leading-[2.2] text-stone-800 font-serif text-justify mb-10">
                {highlightPhrases(industry.summary, industry.highlightPhrases || [])}
              </p>
              
              <div className="bg-stone-50 p-10 border border-stone-100">
                <h3 className="text-sm font-bold mb-4 text-stone-400 tracking-widest uppercase">なぜ今、必要なのか</h3>
                <p className="text-stone-700 leading-loose font-serif text-justify">
                  {highlightPhrases(industry.necessity, industry.highlightPhrases || [])}
                </p>
              </div>
            </section>

            {/* 2. 歩みと展望（深掘り） */}
            <section ref={(el) => { sectionsRef.current[1] = el; }}>
              <h2 className="text-2xl font-serif font-bold mb-10 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-stone-900"></span>
                歩みと展望
              </h2>
              
              <div className="space-y-16">
                <div className="grid md:grid-cols-[120px_1fr] gap-8">
                  <div className="text-stone-400 font-serif text-lg pt-1 tracking-widest">過去</div>
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-stone-900 font-serif">{industry.timeline.past}</h3>
                    <p className="text-stone-600 leading-loose font-serif text-justify">{industry.deepDive.past}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-[120px_1fr] gap-8">
                  <div className="text-stone-900 font-serif text-lg pt-1 tracking-widest font-bold">現在</div>
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-stone-900 font-serif">{industry.timeline.present}</h3>
                    <p className="text-stone-800 leading-loose font-serif text-justify font-medium">{industry.deepDive.present}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-[120px_1fr] gap-8">
                  <div className="text-stone-400 font-serif text-lg pt-1 tracking-widest">未来</div>
                  <div>
                    <h3 className="text-xl font-bold mb-4 text-stone-900 font-serif">{industry.timeline.future}</h3>
                    <p className="text-stone-600 leading-loose font-serif text-justify">{industry.deepDive.future}</p>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. 仕事を深く知る（つながり） */}
            <section ref={(el) => { sectionsRef.current[2] = el; }} className="bg-stone-50 p-10 border border-stone-100">
              <h2 className="text-xl font-serif font-bold mb-6 text-stone-900">仕事を深く知る</h2>
              <p className="text-stone-700 mb-8 leading-loose font-serif text-justify">{industry.connections}</p>
            </section>

            {/* 4. 訪問情報 */}
            {industry.visitInfo && (
              <section className="border-t border-stone-200 pt-16">
                <h2 className="text-2xl font-serif font-bold mb-10 flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-stone-900"></span>
                  訪問情報
                </h2>
                <dl className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-sm">
                  {industry.visitInfo.hours && (
                    <div className="flex flex-col border-b border-stone-100 pb-4">
                      <dt className="text-stone-400 mb-2 tracking-widest text-xs">営業時間・時期</dt>
                      <dd className="font-medium text-stone-800 font-serif text-lg">{industry.visitInfo.hours}</dd>
                    </div>
                  )}
                  {industry.visitInfo.access && (
                    <div className="flex flex-col border-b border-stone-100 pb-4">
                      <dt className="text-stone-400 mb-2 tracking-widest text-xs">アクセス</dt>
                      <dd className="font-medium text-stone-800 font-serif text-lg">{industry.visitInfo.access}</dd>
                    </div>
                  )}
                  {industry.visitInfo.contact && (
                    <div className="flex flex-col border-b border-stone-100 pb-4">
                      <dt className="text-stone-400 mb-2 tracking-widest text-xs">お問い合わせ</dt>
                      <dd className="font-medium text-stone-800 font-serif text-lg">{industry.visitInfo.contact}</dd>
                    </div>
                  )}
                  {industry.visitInfo.website && (
                    <div className="flex flex-col border-b border-stone-100 pb-4">
                      <dt className="text-stone-400 mb-2 tracking-widest text-xs">ウェブサイト</dt>
                      <dd className="font-medium text-stone-800">
                        <a href={industry.visitInfo.website} target="_blank" rel="noopener noreferrer" className="text-stone-900 hover:text-stone-600 flex items-center gap-2 transition-colors">
                          公式サイトへ <ExternalLink className="w-3 h-3" />
                        </a>
                      </dd>
                    </div>
                  )}
                </dl>
              </section>
            )}

            {/* 5. 関わりを持つ（アクション） */}
            <section ref={(el) => { sectionsRef.current[3] = el; }}>
              <h2 className="text-2xl font-serif font-bold mb-10 text-center tracking-widest">
                関わりを持つ
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {industry.actions.map((action, index) => (
                  <a
                    key={index}
                    href={action.link}
                    className="flex flex-col items-center p-8 bg-white border border-stone-200 hover:border-stone-400 transition-all text-center group hover:shadow-lg"
                  >
                    <div className="w-16 h-16 bg-stone-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-stone-100 transition-colors">
                      {action.type === 'buy' && <span className="text-3xl">🛍️</span>}
                      {action.type === 'visit' && <span className="text-3xl">🚶</span>}
                      {action.type === 'join' && <span className="text-3xl">🤝</span>}
                      {action.type === 'support' && <span className="text-3xl">📣</span>}
                    </div>
                    <h3 className="font-bold text-lg mb-3 text-stone-900 font-serif tracking-wide">{action.label}</h3>
                    <span className="text-xs text-stone-400 font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                      詳細を見る <ArrowRight className="w-3 h-3" />
                    </span>
                  </a>
                ))}
              </div>
            </section>

            {/* 6. 関連する産業 */}
            {industry.relatedIndustries && industry.relatedIndustries.length > 0 && (
              <section className="pt-16 border-t border-stone-200">
                <h2 className="text-2xl font-serif font-bold mb-10 flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-stone-900"></span>
                  関連する産業
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {industry.relatedIndustries.map(id => {
                    const related = industries.find(i => i.id === id);
                    if (!related) return null;
                    return (
                      <a 
                        key={id} 
                        href={`/industry/${id}`}
                        className="flex items-center gap-6 p-6 bg-white border border-stone-200 hover:border-stone-400 transition-all group"
                      >
                        <img src={related.image} alt={related.title} className="w-20 h-20 object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                        <div>
                          <div className="text-xs text-stone-400 mb-1 tracking-widest">{related.category}</div>
                          <div className="text-lg font-bold text-stone-900 font-serif group-hover:text-stone-600 transition-colors">{related.title}</div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
}
