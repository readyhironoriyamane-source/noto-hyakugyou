import { useState, useEffect, useRef } from "react";
import { useRoute } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { industries } from "@/data/industries";
import type { Industry } from "@/data/industries";
import { X, Share2, ChevronLeft, ChevronRight, ExternalLink, CheckCircle2, ArrowRight, AlertCircle, HelpCircle, Lightbulb, Check, FileText, MapPin, Clock, Phone, Globe } from "lucide-react";
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

  // 関連する支援事例を取得（通常記事用）
  const relatedCaseStudies = industries.filter(i => i.isCaseStudy && industry.relatedIndustries?.includes(i.id));

  return (
    <div className="fixed inset-0 z-[100] bg-stone-50 overflow-y-auto animate-in fade-in duration-300 font-serif text-stone-900">
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
            {isCaseStudy && industry.challengeCard && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/90 text-white text-sm font-bold rounded-full mb-6 backdrop-blur-sm shadow-lg">
                <AlertCircle className="w-4 h-4" />
                {industry.challengeCard.label}
              </div>
            )}
            <div className="text-sm md:text-base tracking-[0.2em] mb-4 opacity-90 font-light">{industry.category}</div>
            <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight mb-6 drop-shadow-lg">
              {industry.title}
            </h1>
            {isCaseStudy && (
              <div className="flex flex-wrap gap-3">
                {industry.tags?.map((tag, i) => (
                  <span key={i} className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {isCaseStudy ? (
          // 活用事例用のレイアウト（新構成）
          <div className="space-y-24">
            
            {/* 1. 要点・概要 */}
            <section className="prose prose-stone prose-lg max-w-none">
              <div className="bg-stone-50 p-8 md:p-10 rounded-sm border-l-4 border-stone-300 mb-12">
                <h3 className="text-xl font-bold font-serif mb-6 flex items-center gap-3 text-stone-800">
                  <CheckCircle2 className="w-6 h-6 text-stone-400" />
                  この事例の要点
                </h3>
                <ul className="space-y-4 m-0 p-0 list-none">
                  {industry.keyPoints?.map((point, i) => (
                    <li key={i} className="flex items-start gap-3 text-stone-700 text-lg leading-relaxed">
                      <span className="w-1.5 h-1.5 bg-stone-400 rounded-full mt-2.5 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-12 mb-16">
                <div>
                  <h3 className="text-lg font-bold font-serif mb-4 text-stone-800 border-b border-stone-200 pb-2">どんな仕事？</h3>
                  <p className="text-stone-700 leading-loose text-lg">{industry.jobDescription}</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold font-serif mb-4 text-stone-800 border-b border-stone-200 pb-2">直面した課題</h3>
                  <p className="text-stone-700 leading-loose text-lg">{industry.challengeDetail}</p>
                </div>
              </div>
            </section>

            {/* 2. 未来への選択（旧：再建への道のり） */}
            <section className="relative">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-serif font-bold inline-block relative pb-6 text-stone-900">
                  未来への選択
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-[1px] bg-stone-400"></span>
                </h2>
              </div>

              <div className="relative pl-8 md:pl-0">
                {/* 垂直タイムラインの線 */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-stone-200 -translate-x-1/2 hidden md:block"></div>
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-stone-200 md:hidden"></div>

                {/* STEP 01: 検討した選択肢 */}
                <div className="relative mb-20 md:grid md:grid-cols-2 md:gap-16 items-start">
                  <div className="hidden md:block text-right pt-2">
                    <span className="text-sm font-bold tracking-widest text-stone-400">STEP 01</span>
                    <h3 className="text-2xl font-bold font-serif mt-2 text-stone-800">検討した選択肢</h3>
                  </div>
                  
                  {/* タイムラインのドット */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-white border-4 border-stone-300 rounded-full -translate-x-[calc(50%-0.5px)] mt-3 z-10"></div>

                  <div className="pl-8 md:pl-0 pt-1 md:pt-0">
                    <div className="md:hidden mb-4">
                      <span className="text-sm font-bold tracking-widest text-stone-400">STEP 01</span>
                      <h3 className="text-2xl font-bold font-serif mt-1 text-stone-800">検討した選択肢</h3>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {industry.decisionProcess?.options.map((option, i) => (
                        <span key={i} className="px-4 py-3 bg-white border border-stone-200 text-stone-600 text-base rounded-sm shadow-sm">
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* STEP 02: なぜこれを選んだ？ & 決定事項 */}
                <div className="relative mb-20 md:grid md:grid-cols-2 md:gap-16 items-start">
                  <div className="hidden md:block text-right pt-2">
                    <span className="text-sm font-bold tracking-widest text-stone-400">STEP 02</span>
                    <h3 className="text-2xl font-bold font-serif mt-2 text-stone-800">なぜこれを選んだ？</h3>
                  </div>

                  {/* タイムラインのドット（強調） */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-red-600 border-4 border-white rounded-full -translate-x-[calc(50%-0.5px)] mt-3 z-10 shadow-md"></div>

                  <div className="pl-8 md:pl-0 pt-1 md:pt-0">
                    <div className="md:hidden mb-4">
                      <span className="text-sm font-bold tracking-widest text-stone-400">STEP 02</span>
                      <h3 className="text-2xl font-bold font-serif mt-1 text-stone-800">なぜこれを選んだ？</h3>
                    </div>
                    <p className="text-stone-700 leading-loose text-lg mb-8">
                      {industry.decisionProcess?.reason}
                    </p>

                    {/* 決定事項カード（CV） */}
                    <div className="bg-white border-l-4 border-red-600 p-6 shadow-sm hover:shadow-md transition-shadow group cursor-pointer relative overflow-hidden">
                      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <FileText className="w-16 h-16 text-red-600" />
                      </div>
                      <div className="relative z-10">
                        <span className="text-xs font-bold tracking-widest text-red-600 mb-2 block uppercase">Selected Support</span>
                        <h4 className="text-xl font-bold font-serif text-stone-900 mb-2 group-hover:text-red-700 transition-colors flex items-center gap-2">
                          {industry.decisionProcess?.selectedSupport}
                          <ArrowRight className="w-5 h-5 text-red-600 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </h4>
                        <p className="text-stone-600 text-sm font-medium">
                          {industry.supportMenu?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 03: 実行したアクション */}
                <div className="relative mb-20 md:grid md:grid-cols-2 md:gap-16 items-start">
                  <div className="hidden md:block text-right pt-2">
                    <span className="text-sm font-bold tracking-widest text-stone-400">STEP 03</span>
                    <h3 className="text-2xl font-bold font-serif mt-2 text-stone-800">実行したアクション</h3>
                  </div>

                  {/* タイムラインのドット */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-white border-4 border-stone-300 rounded-full -translate-x-[calc(50%-0.5px)] mt-3 z-10"></div>

                  <div className="pl-8 md:pl-0 pt-1 md:pt-0">
                    <div className="md:hidden mb-4">
                      <span className="text-sm font-bold tracking-widest text-stone-400">STEP 03</span>
                      <h3 className="text-2xl font-bold font-serif mt-1 text-stone-800">実行したアクション</h3>
                    </div>
                    <p className="text-stone-700 leading-loose text-lg">
                      {industry.decisionProcess?.action}
                    </p>
                  </div>
                </div>

                {/* STEP 04: 変化と現在 */}
                <div className="relative md:grid md:grid-cols-2 md:gap-16 items-start">
                  <div className="hidden md:block text-right pt-2">
                    <span className="text-sm font-bold tracking-widest text-stone-400">STEP 04</span>
                    <h3 className="text-2xl font-bold font-serif mt-2 text-stone-800">変化と現在</h3>
                  </div>

                  {/* タイムラインのドット */}
                  <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-white border-4 border-stone-300 rounded-full -translate-x-[calc(50%-0.5px)] mt-3 z-10"></div>

                  <div className="pl-8 md:pl-0 pt-1 md:pt-0">
                    <div className="md:hidden mb-4">
                      <span className="text-sm font-bold tracking-widest text-stone-400">STEP 04</span>
                      <h3 className="text-2xl font-bold font-serif mt-1 text-stone-800">変化と現在</h3>
                    </div>
                    <p className="text-stone-700 leading-loose text-lg">
                      {industry.decisionProcess?.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. 編集部コメント & おすすめ支援メニュー */}
            <section className="bg-stone-100 p-8 md:p-12 rounded-sm border border-stone-200">
              <div className="flex items-start gap-4 mb-8">
                <div className="w-12 h-12 bg-stone-300 rounded-full flex items-center justify-center shrink-0">
                  <span className="font-serif font-bold text-stone-600">編</span>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm relative flex-1">
                  <div className="absolute top-4 -left-2 w-4 h-4 bg-white transform rotate-45"></div>
                  <h3 className="text-sm font-bold text-stone-400 mb-2 tracking-widest">EDITOR'S NOTE</h3>
                  <p className="text-stone-700 leading-relaxed text-lg">
                    {industry.editorComment}
                  </p>
                </div>
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-bold font-serif mb-6 text-center text-stone-800">
                  この事例に関心がある方へのおすすめ支援メニュー
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {industry.recommendedSupports?.map((support, i) => (
                    <a key={i} href="#" className="block bg-white p-6 border border-stone-200 hover:border-red-400 transition-colors group shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold bg-stone-100 text-stone-600 px-2 py-1 rounded">{support.category}</span>
                        <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-red-500 transition-colors" />
                      </div>
                      <h4 className="text-lg font-bold font-serif text-stone-900 mb-2 group-hover:text-red-600 transition-colors">
                        {support.name}
                      </h4>
                      <p className="text-stone-600 text-sm leading-relaxed">
                        {support.description}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </section>

          </div>
        ) : (
          // 通常の記事レイアウト（新構成）
          <div className="space-y-24">
            {/* 1. 仕事概要（旧：物語） */}
            <section ref={(el) => { sectionsRef.current[0] = el; }}>
              <h2 className="text-2xl font-serif font-bold mb-10 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-stone-900"></span>
                仕事概要
              </h2>
              <div className="prose prose-stone prose-lg max-w-none font-serif leading-loose">
                <p className="text-xl md:text-2xl leading-relaxed text-stone-800 mb-12 font-medium">
                  {industry.summary}
                </p>
                <div className="whitespace-pre-wrap text-stone-700">
                  {highlightPhrases(industry.description || "", industry.highlightPhrases || [])}
                </div>
              </div>
            </section>

            {/* 2. なぜ必要か（新設） */}
            <section ref={(el) => { sectionsRef.current[1] = el; }} className="bg-stone-50 p-8 md:p-12 border-l-4 border-stone-300">
              <h2 className="text-xl font-serif font-bold mb-6 flex items-center gap-3 text-stone-800">
                <AlertCircle className="w-6 h-6 text-stone-400" />
                なぜ必要か
              </h2>
              <p className="text-stone-700 leading-relaxed text-lg">
                {industry.necessity}
              </p>
            </section>

            {/* 3. 仕事を深く知る（旧：歩みと展望を統合） */}
            <section ref={(el) => { sectionsRef.current[2] = el; }}>
              <h2 className="text-2xl font-serif font-bold mb-10 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-stone-900"></span>
                仕事を深く知る
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 border border-stone-200">
                  <h3 className="text-lg font-serif font-bold mb-4 flex items-center gap-2 text-stone-800 border-b border-stone-100 pb-2">
                    <span className="text-stone-400 text-xs tracking-widest uppercase mr-2">Past</span>
                    歩み
                  </h3>
                  <p className="text-stone-700 leading-relaxed text-sm">
                    {industry.timeline.past}
                  </p>
                </div>
                <div className="bg-white p-6 border border-stone-200">
                  <h3 className="text-lg font-serif font-bold mb-4 flex items-center gap-2 text-stone-800 border-b border-stone-100 pb-2">
                    <span className="text-stone-400 text-xs tracking-widest uppercase mr-2">Present</span>
                    現在
                  </h3>
                  <p className="text-stone-700 leading-relaxed text-sm">
                    {industry.timeline.present}
                  </p>
                </div>
                <div className="bg-white p-6 border border-stone-200">
                  <h3 className="text-lg font-serif font-bold mb-4 flex items-center gap-2 text-stone-800 border-b border-stone-100 pb-2">
                    <span className="text-stone-400 text-xs tracking-widest uppercase mr-2">Future</span>
                    展望
                  </h3>
                  <p className="text-stone-700 leading-relaxed text-sm">
                    {industry.timeline.future}
                  </p>
                </div>
              </div>
            </section>

            {/* 4. 関連する支援活用事例（新設） */}
            {relatedCaseStudies.length > 0 && (
              <section>
                <h2 className="text-2xl font-serif font-bold mb-10 flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-stone-900"></span>
                  関連する支援活用事例
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedCaseStudies.map(caseStudy => (
                    <a 
                      key={caseStudy.id} 
                      href={`/industry/${caseStudy.id}`}
                      className="group block bg-white border border-stone-200 hover:border-red-400 transition-all overflow-hidden shadow-sm hover:shadow-md"
                    >
                      <div className="flex h-full">
                        <div className="w-1/3 relative overflow-hidden">
                          <img 
                            src={caseStudy.image} 
                            alt={caseStudy.title} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {caseStudy.challengeCard && (
                            <div className="absolute top-0 left-0 bg-red-600 text-white text-[10px] font-bold px-2 py-1">
                              {caseStudy.challengeCard.label}
                            </div>
                          )}
                        </div>
                        <div className="w-2/3 p-5 flex flex-col justify-between">
                          <div>
                            <div className="text-xs text-stone-400 mb-1 tracking-widest">{caseStudy.category}</div>
                            <h3 className="text-lg font-bold font-serif text-stone-900 mb-2 group-hover:text-red-700 transition-colors line-clamp-2">
                              {caseStudy.title}
                            </h3>
                            <p className="text-xs text-stone-600 line-clamp-2 mb-3">
                              {caseStudy.summary}
                            </p>
                          </div>
                          <div className="flex items-center text-xs font-bold text-red-600 gap-1">
                            事例を読む <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* 5. 訪問情報 */}
            {industry.visitInfo && (
              <section ref={(el) => { sectionsRef.current[3] = el; }}>
                <h2 className="text-2xl font-serif font-bold mb-10 flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-stone-900"></span>
                  訪問情報
                </h2>
                <div className="bg-white border border-stone-200 p-8">
                  <dl className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                    {industry.visitInfo.hours && (
                      <div className="flex items-start gap-4 border-b border-stone-100 pb-4">
                        <Clock className="w-5 h-5 text-stone-400 mt-1 shrink-0" />
                        <div>
                          <dt className="text-stone-400 mb-1 text-xs tracking-widest">営業時間・時期</dt>
                          <dd className="font-medium text-stone-800 font-serif">{industry.visitInfo.hours}</dd>
                        </div>
                      </div>
                    )}
                    {industry.visitInfo.access && (
                      <div className="flex items-start gap-4 border-b border-stone-100 pb-4">
                        <MapPin className="w-5 h-5 text-stone-400 mt-1 shrink-0" />
                        <div>
                          <dt className="text-stone-400 mb-1 text-xs tracking-widest">アクセス</dt>
                          <dd className="font-medium text-stone-800 font-serif">{industry.visitInfo.access}</dd>
                        </div>
                      </div>
                    )}
                    {industry.visitInfo.contact && (
                      <div className="flex items-start gap-4 border-b border-stone-100 pb-4">
                        <Phone className="w-5 h-5 text-stone-400 mt-1 shrink-0" />
                        <div>
                          <dt className="text-stone-400 mb-1 text-xs tracking-widest">お問い合わせ</dt>
                          <dd className="font-medium text-stone-800 font-serif">{industry.visitInfo.contact}</dd>
                        </div>
                      </div>
                    )}
                    {industry.visitInfo.website && (
                      <div className="flex items-start gap-4 border-b border-stone-100 pb-4">
                        <Globe className="w-5 h-5 text-stone-400 mt-1 shrink-0" />
                        <div>
                          <dt className="text-stone-400 mb-1 text-xs tracking-widest">ウェブサイト</dt>
                          <dd className="font-medium text-stone-800">
                            <a href={industry.visitInfo.website} target="_blank" rel="noopener noreferrer" className="text-stone-900 hover:text-stone-600 flex items-center gap-2 transition-colors underline decoration-stone-300 underline-offset-4">
                              公式サイトへ <ExternalLink className="w-3 h-3" />
                            </a>
                          </dd>
                        </div>
                      </div>
                    )}
                  </dl>
                </div>
              </section>
            )}

            {/* 6. 関わりを持つ（アクション） - ブルー背景に変更 */}
            <section ref={(el) => { sectionsRef.current[4] = el; }} className="bg-blue-900 text-white p-10 md:p-16 -mx-6 md:-mx-24 rounded-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px]"></div>
              </div>
              
              <div className="relative z-10 max-w-3xl mx-auto text-center">
                <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6 tracking-widest">
                  関わりを持つ
                </h2>
                <p className="text-blue-100 mb-12 leading-relaxed">
                  この産業を守り、未来へつなぐために、あなたにできることがあります。<br className="hidden md:block" />
                  小さな一歩が、大きな力になります。
                </p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  {industry.actions.map((action, index) => (
                    <a
                      key={index}
                      href={action.link}
                      className="flex items-center gap-4 p-6 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all group text-left rounded-sm"
                    >
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                        {action.type === 'buy' && <span className="text-2xl">🛍️</span>}
                        {action.type === 'visit' && <span className="text-2xl">🚶</span>}
                        {action.type === 'join' && <span className="text-2xl">🤝</span>}
                        {action.type === 'support' && <span className="text-2xl">📣</span>}
                      </div>
                      <div>
                        <div className="text-xs text-blue-200 font-bold uppercase tracking-widest mb-1">{action.type}</div>
                        <h3 className="font-bold text-lg text-white font-serif flex items-center gap-2">
                          {action.label}
                          <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </h3>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </section>

            {/* 7. 関連する産業（他カテゴリ） */}
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
                        <img src={related.image} alt={related.title} className="w-20 h-20 object-cover group-hover:scale-105 transition-transform duration-500" />
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
