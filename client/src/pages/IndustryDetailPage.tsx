import { useState, useEffect, useRef } from "react";
import { useRoute } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { industries } from "@/data/industries";
import type { Industry } from "@/data/industries";
import { X, Share2, ChevronLeft, ChevronRight, ExternalLink, CheckCircle2, ArrowRight, AlertCircle, HelpCircle, Lightbulb, Check } from "lucide-react";
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

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white">
          <div className="max-w-4xl mx-auto">
            {/* 課題カード（活用事例の場合） */}
            {isCaseStudy && industry.challengeCard && (
              <div className="inline-block bg-red-600/90 text-white text-sm font-bold px-4 py-1.5 mb-6 rounded-sm tracking-wider shadow-lg backdrop-blur-sm">
                {industry.challengeCard}
              </div>
            )}
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <div className="text-sm md:text-base tracking-[0.2em] mb-3 opacity-90">{industry.category} | {industry.location}</div>
                <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight mb-4 tracking-wide">
                  {industry.title}
                </h1>
                <div className="flex items-center gap-3 text-sm md:text-base opacity-90">
                  <span className="w-8 h-[1px] bg-white/60"></span>
                  <span>{industry.operator}</span>
                  <span className="text-white/60">/</span>
                  <span>{industry.role}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {isCaseStudy ? (
          // 活用事例記事のレイアウト（16項目構成）
          <div className="space-y-24">
            
            {/* 1. 要点・概要 */}
            <section ref={(el) => { sectionsRef.current[0] = el; }} className="bg-stone-50 p-8 md:p-10 border border-stone-200 shadow-sm">
              <h2 className="text-xl font-serif font-bold mb-6 flex items-center gap-3 text-stone-800">
                <Lightbulb className="w-5 h-5 text-amber-600" />
                この事例の要点
              </h2>
              <ul className="space-y-3 mb-8">
                {industry.keyPoints?.map((point, index) => (
                  <li key={index} className="flex items-start gap-3 text-stone-700 font-medium">
                    <CheckCircle2 className="w-5 h-5 text-stone-400 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-6 border-t border-stone-200">
                <h3 className="text-sm font-bold text-stone-500 mb-3 tracking-wider">活用した支援メニュー</h3>
                {industry.selectedSupport && (
                  <a 
                    href={industry.selectedSupport.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-white border border-stone-200 p-5 hover:border-red-400 hover:shadow-md transition-all duration-300 relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-500 group-hover:w-2 transition-all"></div>
                    <div className="flex justify-between items-center pl-3">
                      <div>
                        <div className="text-lg font-bold text-stone-900 group-hover:text-red-700 transition-colors font-serif mb-1">
                          {industry.selectedSupport.name}
                        </div>
                        <div className="text-sm text-stone-500 group-hover:text-stone-600">
                          {industry.selectedSupport.description}
                        </div>
                      </div>
                      <ExternalLink className="w-5 h-5 text-stone-300 group-hover:text-red-500 transition-colors" />
                    </div>
                  </a>
                )}
              </div>
            </section>

            {/* 2. 仕事と課題 */}
            <section ref={(el) => { sectionsRef.current[1] = el; }} className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-lg font-serif font-bold mb-4 text-stone-800 border-b border-stone-200 pb-2">どんな仕事？</h3>
                <p className="text-stone-600 leading-relaxed whitespace-pre-wrap">
                  {highlightPhrases(industry.jobDescription || "", industry.highlightPhrases || [])}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold mb-4 text-stone-800 border-b border-stone-200 pb-2">どんな課題があった？</h3>
                <div className="bg-red-50/50 p-6 rounded-sm border border-red-100">
                  <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">
                    {highlightPhrases(industry.challengeDescription || "", industry.highlightPhrases || [])}
                  </p>
                </div>
              </div>
            </section>

            {/* 3. 意思決定プロセス（垂直タイムライン・直線化） */}
            <section ref={(el) => { sectionsRef.current[2] = el; }}>
              <h2 className="text-2xl font-serif font-bold mb-12 text-center tracking-widest flex items-center justify-center gap-4">
                <span className="w-12 h-[1px] bg-stone-300"></span>
                再建への道のり
                <span className="w-12 h-[1px] bg-stone-300"></span>
              </h2>
              
              <div className="relative max-w-3xl mx-auto pl-8 md:pl-0">
                {/* 垂直ライン */}
                <div className="absolute left-0 md:left-8 top-4 bottom-4 w-0.5 bg-stone-200"></div>

                {/* STEP 1: 検討 */}
                <div className="relative mb-16 pl-8 md:pl-24">
                  <div className="absolute left-[-5px] md:left-[27px] top-0 w-3 h-3 rounded-full bg-stone-400 border-4 border-white shadow-sm z-10"></div>
                  <div className="mb-2 text-sm font-bold text-stone-400 tracking-widest">STEP 01</div>
                  <h3 className="text-xl font-serif font-bold mb-6 text-stone-800">検討した選択肢</h3>
                  <div className="flex flex-wrap gap-3">
                    {industry.supportOptions?.map((option, idx) => (
                      <span key={idx} className="px-4 py-2 bg-white border border-stone-200 text-stone-600 text-sm shadow-sm">
                        {option}
                      </span>
                    ))}
                  </div>
                </div>

                {/* STEP 2: 選択 */}
                <div className="relative mb-16 pl-8 md:pl-24">
                  <div className="absolute left-[-5px] md:left-[27px] top-0 w-3 h-3 rounded-full bg-red-500 border-4 border-white shadow-sm z-10"></div>
                  <div className="mb-2 text-sm font-bold text-red-500 tracking-widest">STEP 02</div>
                  <h3 className="text-xl font-serif font-bold mb-6 text-stone-800">なぜこれを選んだ？</h3>
                  <p className="text-stone-700 leading-relaxed mb-6">
                    {industry.reasonForSelection}
                  </p>
                  
                  {/* 選んだ支援メニュー（CVポイント） */}
                  {industry.selectedSupport && (
                    <a 
                      href={industry.selectedSupport.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block bg-red-600 text-white p-6 shadow-lg hover:bg-red-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-sm text-center md:text-left"
                    >
                      <div className="text-xs font-bold opacity-80 mb-1 tracking-wider">DECISION</div>
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                          <div className="text-xl font-bold font-serif mb-1 flex items-center gap-2">
                            <Check className="w-5 h-5" />
                            {industry.selectedSupport.name}
                          </div>
                          <div className="text-sm opacity-90 font-light">
                            {industry.selectedSupport.description}
                          </div>
                        </div>
                        <div className="bg-white/20 p-2 rounded-full self-center md:self-auto">
                          <ArrowRight className="w-5 h-5" />
                        </div>
                      </div>
                    </a>
                  )}
                </div>

                {/* STEP 3: アクション */}
                <div className="relative mb-16 pl-8 md:pl-24">
                  <div className="absolute left-[-5px] md:left-[27px] top-0 w-3 h-3 rounded-full bg-stone-400 border-4 border-white shadow-sm z-10"></div>
                  <div className="mb-2 text-sm font-bold text-stone-400 tracking-widest">STEP 03</div>
                  <h3 className="text-xl font-serif font-bold mb-6 text-stone-800">実行したアクション</h3>
                  <p className="text-stone-700 leading-relaxed">
                    {industry.actionTaken}
                  </p>
                </div>

                {/* STEP 4: 変化 */}
                <div className="relative pl-8 md:pl-24">
                  <div className="absolute left-[-5px] md:left-[27px] top-0 w-3 h-3 rounded-full bg-stone-800 border-4 border-white shadow-sm z-10"></div>
                  <div className="mb-2 text-sm font-bold text-stone-800 tracking-widest">STEP 04</div>
                  <h3 className="text-xl font-serif font-bold mb-6 text-stone-800">その後の変化</h3>
                  <div className="bg-stone-50 p-6 border-l-4 border-stone-800 italic text-stone-700 leading-relaxed">
                    "{industry.changes}"
                  </div>
                  {industry.futureSupport && (
                    <div className="mt-6 pt-6 border-t border-stone-200">
                      <h4 className="text-sm font-bold text-stone-500 mb-2">次に検討していること</h4>
                      <p className="text-stone-600 text-sm">{industry.futureSupport}</p>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* 4. 編集部コメント & おすすめ支援メニュー */}
            <section ref={(el) => { sectionsRef.current[3] = el; }} className="bg-stone-100 p-8 md:p-12 rounded-sm">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 bg-stone-300 rounded-full flex items-center justify-center shrink-0 text-2xl">
                  🖊️
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold mb-3 text-stone-800">編集部より</h3>
                  <p className="text-stone-700 leading-relaxed text-sm md:text-base">
                    {industry.writerComment}
                  </p>
                </div>
              </div>

              {industry.recommendedSupports && industry.recommendedSupports.length > 0 && (
                <div className="bg-white p-6 md:p-8 shadow-sm border border-stone-200">
                  <h3 className="text-lg font-serif font-bold mb-6 text-center text-stone-800 flex items-center justify-center gap-2">
                    <Lightbulb className="w-5 h-5 text-amber-500" />
                    この事例に関心がある方へのおすすめ支援メニュー
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {industry.recommendedSupports.map((support, idx) => (
                      <a 
                        key={idx}
                        href={support.link}
                        className="block p-4 border border-stone-200 hover:border-stone-400 hover:bg-stone-50 transition-all group"
                      >
                        <div className="font-bold text-stone-800 mb-1 group-hover:text-stone-600 flex items-center justify-between">
                          {support.name}
                          <ExternalLink className="w-4 h-4 text-stone-300 group-hover:text-stone-500" />
                        </div>
                        <div className="text-xs text-stone-500">
                          {support.description}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </section>

          </div>
        ) : (
          // 通常の記事レイアウト（旧構成）
          <div className="space-y-24">
            {/* 1. 物語（Deep Dive） */}
            <section ref={(el) => { sectionsRef.current[0] = el; }}>
              <h2 className="text-2xl font-serif font-bold mb-10 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-stone-900"></span>
                物語
              </h2>
              <div className="prose prose-stone max-w-none font-serif">
                <p className="text-lg leading-loose text-stone-800 mb-8 first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left">
                  {highlightPhrases(industry.deepDive.past, industry.highlightPhrases || [])}
                </p>
                <div className="grid md:grid-cols-2 gap-8 my-12">
                  <div className="bg-stone-50 p-8 border-l-2 border-stone-300">
                    <h3 className="text-lg font-bold mb-4 text-stone-600">現在</h3>
                    <p className="text-stone-700 leading-relaxed">
                      {highlightPhrases(industry.deepDive.present, industry.highlightPhrases || [])}
                    </p>
                  </div>
                  <div className="bg-stone-50 p-8 border-l-2 border-stone-300">
                    <h3 className="text-lg font-bold mb-4 text-stone-600">未来</h3>
                    <p className="text-stone-700 leading-relaxed">
                      {highlightPhrases(industry.deepDive.future, industry.highlightPhrases || [])}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. 歩みと展望（Timeline） */}
            <section ref={(el) => { sectionsRef.current[1] = el; }} className="relative border-l border-stone-200 pl-8 md:pl-12 ml-4 md:ml-0 space-y-12">
              <div className="relative">
                <span className="absolute -left-[41px] md:-left-[57px] top-0 w-5 h-5 rounded-full bg-stone-200 border-4 border-white"></span>
                <h3 className="text-xl font-bold mb-3 text-stone-400">PAST</h3>
                <p className="text-stone-600 leading-relaxed">{industry.timeline.past}</p>
              </div>
              <div className="relative">
                <span className="absolute -left-[41px] md:-left-[57px] top-0 w-5 h-5 rounded-full bg-stone-800 border-4 border-white"></span>
                <h3 className="text-xl font-bold mb-3 text-stone-900">PRESENT</h3>
                <p className="text-stone-800 leading-relaxed font-medium">{industry.timeline.present}</p>
              </div>
              <div className="relative">
                <span className="absolute -left-[41px] md:-left-[57px] top-0 w-5 h-5 rounded-full bg-stone-200 border-4 border-white"></span>
                <h3 className="text-xl font-bold mb-3 text-stone-400">FUTURE</h3>
                <p className="text-stone-600 leading-relaxed">{industry.timeline.future}</p>
              </div>
            </section>

            {/* 3. 仕事を深く知る（Summary & Necessity） */}
            <section className="bg-stone-50 p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-lg font-serif font-bold mb-4 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-stone-400" />
                    なぜ今、必要なのか
                  </h3>
                  <p className="text-stone-700 leading-relaxed">
                    {highlightPhrases(industry.necessity, industry.highlightPhrases || [])}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold mb-4 flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-stone-400" />
                    地域とのつながり
                  </h3>
                  <p className="text-stone-700 leading-relaxed">
                    {industry.connections}
                  </p>
                </div>
              </div>
            </section>

            {/* 4. 訪問情報 */}
            {industry.visitInfo && (
              <section ref={(el) => { sectionsRef.current[2] = el; }}>
                <h2 className="text-2xl font-serif font-bold mb-10 flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-stone-900"></span>
                  訪問情報
                </h2>
                <dl className="grid md:grid-cols-2 gap-x-12 gap-y-8">
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
