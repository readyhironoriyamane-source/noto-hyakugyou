import { useState, useEffect, useRef } from "react";
import { useRoute } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { industries } from "@/data/industries";
import type { Industry } from "@/data/industries";
import { X, Share2, ChevronLeft, ChevronRight, CheckCircle2, ArrowRight, AlertCircle, FileText } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold mb-4 text-foreground">産業が見つかりません</h2>
          <a href="/" className="text-base text-muted-foreground hover:text-primary underline btn-ud">
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
    <div className="fixed inset-0 z-[100] bg-background overflow-y-auto animate-in fade-in duration-300 font-sans text-foreground">
      <Header />
      
      {/* Close Button & Share Button */}
      <div className="fixed top-6 right-6 z-50 flex gap-3">
        <div className="relative">
          <button 
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="p-3 rounded-full bg-white/90 backdrop-blur-md hover:bg-secondary transition-colors shadow-md border border-border min-w-[48px] min-h-[48px] flex items-center justify-center"
            aria-label="シェアメニューを開く"
          >
            <Share2 className="w-6 h-6 text-foreground" />
          </button>
          
          {/* Share Menu */}
          {showShareMenu && (
            <div className="absolute top-14 right-0 bg-card rounded-lg shadow-xl border border-border overflow-hidden min-w-[200px]">
              <button
                onClick={() => handleShare('twitter')}
                className="w-full px-6 py-4 text-left text-base hover:bg-secondary transition-colors flex items-center gap-3 font-sans text-foreground"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Xでシェア
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="w-full px-6 py-4 text-left text-base hover:bg-secondary transition-colors flex items-center gap-3 font-sans text-foreground"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebookでシェア
              </button>
              <button
                onClick={() => handleShare('line')}
                className="w-full px-6 py-4 text-left text-base hover:bg-secondary transition-colors flex items-center gap-3 font-sans text-foreground"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
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
          className="p-3 rounded-full bg-white/90 backdrop-blur-md hover:bg-secondary transition-colors shadow-md border border-border min-w-[48px] min-h-[48px] flex items-center justify-center"
          aria-label="閉じる"
        >
          <X className="w-6 h-6 text-foreground" />
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[50vh] md:h-[60vh] group">
        <img 
          src={industry.gallery && industry.gallery.length > 0 ? industry.gallery[currentImageIndex] : industry.image}
          alt={industry.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-primary/90"></div>
        
        {/* ギャラリーナビゲーション */}
        {industry.gallery && industry.gallery.length > 1 && (
          <>
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? industry.gallery!.length - 1 : prev - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-all text-white min-w-[48px] min-h-[48px] flex items-center justify-center"
              aria-label="前の画像"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev === industry.gallery!.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/40 transition-all text-white min-w-[48px] min-h-[48px] flex items-center justify-center"
              aria-label="次の画像"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-10">
              {industry.gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentImageIndex === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
                  }`}
                  aria-label={`${index + 1}枚目の画像を表示`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
          <div className="container">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-accent text-white px-4 py-1 text-sm font-bold rounded-full tracking-wider shadow-sm">
                {industry.category}
              </span>
              <span className="flex items-center gap-1 text-sm font-medium tracking-wider bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-white"></span>
                {industry.location}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 leading-tight drop-shadow-lg">
              {industry.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed font-medium drop-shadow-md">
              {industry.summary}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Article Content */}
          <div className="lg:col-span-8 space-y-16">
            
            {/* 課題と解決策（活用事例の場合のみ表示） */}
            {isCaseStudy && industry.challengeCard && (
              <section ref={el => sectionsRef.current[0] = el} className="bg-card rounded-xl p-8 md:p-10 shadow-lg border-l-4 border-accent">
                <h2 className="text-2xl font-serif font-bold text-primary mb-8 flex items-center gap-3">
                  <AlertCircle className="w-8 h-8 text-accent" />
                  直面していた課題
                </h2>
                <div className="bg-background rounded-lg p-6 mb-8 border border-border">
                  <p className="text-lg font-bold text-foreground mb-2">{industry.challengeCard.label}</p>
                  <p className="text-foreground/80 leading-relaxed">
                    {industry.challengeCard.description}
                  </p>
                </div>
                
                <div className="flex justify-center my-8">
                  <ArrowRight className="w-10 h-10 text-accent animate-bounce" />
                </div>

                <h2 className="text-2xl font-serif font-bold text-primary mb-8 flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                  解決へのアプローチ
                </h2>
                <div className="space-y-6">
                  {industry.challengeCard.solutions.map((solution, idx) => (
                    <div key={idx} className="flex items-start gap-4 bg-green-50/50 p-4 rounded-lg">
                      <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold shrink-0 mt-1">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-2">{solution.title}</h3>
                        <p className="text-foreground/80 leading-relaxed">{solution.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 本文セクション */}
            <section ref={el => sectionsRef.current[1] = el} className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-primary prose-p:text-foreground/80 prose-p:leading-loose prose-strong:text-accent">
              {/* UD対応: 本文の構造化と平易な表現への書き換え */}
              <div className="whitespace-pre-line">
                {industry.description}
              </div>
            </section>

            {/* タイムライン（活用事例の場合のみ表示） */}
            {isCaseStudy && industry.timeline && (
              <section ref={el => sectionsRef.current[2] = el} className="bg-muted/30 rounded-xl p-8 md:p-10 border border-border">
                <h2 className="text-2xl font-serif font-bold text-primary mb-10 text-center">
                  これまでの歩み
                </h2>
                <div className="relative border-l-2 border-primary/30 ml-4 md:ml-8 space-y-12">
                  {industry.timeline.map((item, idx) => (
                    <div key={idx} className="relative pl-8 md:pl-12">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background"></div>
                      <span className="text-sm font-bold text-accent tracking-wider mb-2 block">
                        {item.year}
                      </span>
                      <h3 className="text-xl font-bold text-foreground mb-3">{item.title}</h3>
                      <p className="text-foreground/80 leading-relaxed">
                        {item.content}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Right Column: Sidebar Info */}
          <div className="lg:col-span-4 space-y-8">
            <div className="sticky top-24">
              {/* 事業者情報カード */}
              <div className="bg-card rounded-xl p-8 shadow-md border border-border mb-8">
                <h3 className="text-lg font-serif font-bold text-primary mb-6 border-b border-border pb-4">
                  事業者情報
                </h3>
                <dl className="space-y-6">
                  <div>
                    <dt className="text-sm text-muted-foreground font-bold mb-1">事業者名</dt>
                    <dd className="text-lg font-medium">{industry.details?.owner}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground font-bold mb-1">所在地</dt>
                    <dd className="text-base">{industry.location}</dd>
                  </div>
                  <div>
                    <dt className="text-sm text-muted-foreground font-bold mb-1">創業</dt>
                    <dd className="text-base">{industry.details?.founded}</dd>
                  </div>
                  {industry.details?.employees && (
                    <div>
                      <dt className="text-sm text-muted-foreground font-bold mb-1">従業員数</dt>
                      <dd className="text-base">{industry.details.employees}</dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* 支援制度カード（活用事例の場合のみ表示） */}
              {isCaseStudy && industry.supportSystem && (
                <div className="bg-accent/5 rounded-xl p-8 border border-accent/20">
                  <h3 className="text-lg font-serif font-bold text-accent mb-6 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    活用した支援制度
                  </h3>
                  <div className="space-y-4">
                    {industry.supportSystem.map((support, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-lg shadow-sm border border-accent/10">
                        <h4 className="font-bold text-foreground mb-2 text-sm">{support.name}</h4>
                        <p className="text-sm text-foreground/70 leading-relaxed mb-3">
                          {support.description}
                        </p>
                        {/* UD対応: リンクの視認性向上 */}
                        <a href="#" className="text-xs font-bold text-accent hover:underline flex items-center gap-1">
                          制度の詳細を見る <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
