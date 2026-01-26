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
                    index === currentImageIndex
                      ? "bg-white w-8"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`${index + 1}枚目の画像を表示`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 text-white">
          <div className="max-w-4xl mx-auto">
            {isCaseStudy && industry.challengeCard && (
              <div className="inline-flex items-center gap-2 px-5 py-2 bg-accent text-white text-base font-bold rounded-full mb-6 backdrop-blur-sm shadow-lg">
                <AlertCircle className="w-5 h-5" />
                {industry.challengeCard.label}
              </div>
            )}
            <div className="text-base md:text-lg tracking-[0.2em] mb-4 opacity-90 font-medium">{industry.category}</div>
            <h1 className="text-4xl md:text-6xl font-bold font-serif leading-tight mb-6 drop-shadow-lg">
              {industry.title}
            </h1>
            {isCaseStudy && (
              <div className="flex flex-wrap gap-3">
                {industry.tags?.map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/30 rounded text-base font-medium">
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
              <div className="bg-secondary/30 p-8 md:p-12 rounded-lg border-l-8 border-primary mb-16">
                <h3 className="text-2xl font-bold font-serif mb-8 flex items-center gap-4 text-primary">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                  この事例の要点
                </h3>
                <ul className="space-y-6 m-0 p-0 list-none">
                  {industry.keyPoints?.map((point, i) => (
                    <li key={i} className="flex items-start gap-4 text-foreground text-xl leading-loose">
                      <span className="w-2 h-2 bg-primary rounded-full mt-3 shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid md:grid-cols-2 gap-16 mb-16">
                <div>
                  <h3 className="text-xl font-bold font-serif mb-6 text-primary border-b-2 border-primary/20 pb-3">どんな仕事？</h3>
                  <p className="text-foreground leading-loose text-lg font-sans">{industry.jobDescription}</p>
                </div>
                <div>
                  <h3 className="text-xl font-bold font-serif mb-6 text-primary border-b-2 border-primary/20 pb-3">直面した課題</h3>
                  <p className="text-foreground leading-loose text-lg font-sans">{industry.challengeDetail}</p>
                </div>
              </div>
            </section>

            {/* 2. 未来への選択（旧：再建への道のり） */}
            <section className="relative">
              <div className="text-center mb-20">
                <h2 className="text-3xl md:text-4xl font-serif font-bold inline-block relative pb-8 text-primary">
                  未来への選択
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-accent"></span>
                </h2>
              </div>

              <div className="relative pl-8 md:pl-0">
                {/* 垂直タイムラインの線 */}
                <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-border -translate-x-1/2 hidden md:block"></div>
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-border md:hidden"></div>

                {/* STEP 01: 検討した選択肢 */}
                <div className="relative mb-24 md:grid md:grid-cols-2 md:gap-20 items-start">
                  <div className="hidden md:block text-right pt-2">
                    <span className="text-base font-bold tracking-widest text-muted-foreground">STEP 01</span>
                    <h3 className="text-2xl font-bold font-serif mt-3 text-foreground">検討した選択肢</h3>
                  </div>
                  
                  {/* タイムラインのドット */}
                  <div className="absolute left-0 md:left-1/2 w-5 h-5 bg-background border-4 border-muted-foreground rounded-full -translate-x-[calc(50%-1px)] mt-3 z-10"></div>

                  <div className="pl-10 md:pl-0 pt-1 md:pt-0">
                    <div className="md:hidden mb-6">
                      <span className="text-base font-bold tracking-widest text-muted-foreground">STEP 01</span>
                      <h3 className="text-2xl font-bold font-serif mt-2 text-foreground">検討した選択肢</h3>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      {industry.decisionProcess?.options.map((option, i) => (
                        <span key={i} className="px-5 py-3 bg-white border border-border text-foreground text-lg rounded-md shadow-sm">
                          {option}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* STEP 02: なぜこれを選んだ？ & 決定事項 */}
                <div className="relative mb-24 md:grid md:grid-cols-2 md:gap-20 items-start">
                  <div className="hidden md:block text-right pt-2">
                    <span className="text-base font-bold tracking-widest text-muted-foreground">STEP 02</span>
                    <h3 className="text-2xl font-bold font-serif mt-3 text-foreground">なぜこれを選んだ？</h3>
                  </div>

                  {/* タイムラインのドット（強調） */}
                  <div className="absolute left-0 md:left-1/2 w-6 h-6 bg-accent border-4 border-background rounded-full -translate-x-[calc(50%-1px)] mt-3 z-10 shadow-md ring-2 ring-accent/30"></div>

                  <div className="pl-10 md:pl-0 pt-1 md:pt-0">
                    <div className="md:hidden mb-6">
                      <span className="text-base font-bold tracking-widest text-muted-foreground">STEP 02</span>
                      <h3 className="text-2xl font-bold font-serif mt-2 text-foreground">なぜこれを選んだ？</h3>
                    </div>
                    <p className="text-foreground leading-loose text-lg mb-10 font-sans">
                      {industry.decisionProcess?.reason}
                    </p>

                    {/* 決定事項カード（CV） */}
                    <div className="bg-card border-l-8 border-accent p-8 shadow-md hover:shadow-xl transition-all group cursor-pointer relative overflow-hidden rounded-r-lg">
                      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                        <FileText className="w-24 h-24 text-accent" />
                      </div>
                      <div className="relative z-10">
                        <span className="text-sm font-bold tracking-widest text-accent mb-3 block uppercase">Selected Support</span>
                        <h4 className="text-2xl font-bold font-serif text-foreground mb-4 group-hover:text-accent transition-colors flex items-center gap-3">
                          {industry.decisionProcess?.selectedSupport}
                          <ArrowRight className="w-6 h-6 text-accent opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </h4>
                        <p className="text-muted-foreground text-base font-medium leading-relaxed">
                          {industry.supportMenu?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* STEP 03: 実行したアクション */}
                <div className="relative mb-24 md:grid md:grid-cols-2 md:gap-20 items-start">
                  <div className="hidden md:block text-right pt-2">
                    <span className="text-base font-bold tracking-widest text-muted-foreground">STEP 03</span>
                    <h3 className="text-2xl font-bold font-serif mt-3 text-foreground">実行したアクション</h3>
                  </div>

                  {/* タイムラインのドット */}
                  <div className="absolute left-0 md:left-1/2 w-5 h-5 bg-background border-4 border-muted-foreground rounded-full -translate-x-[calc(50%-1px)] mt-3 z-10"></div>

                  <div className="pl-10 md:pl-0 pt-1 md:pt-0">
                    <div className="md:hidden mb-6">
                      <span className="text-base font-bold tracking-widest text-muted-foreground">STEP 03</span>
                      <h3 className="text-2xl font-bold font-serif mt-2 text-foreground">実行したアクション</h3>
                    </div>
                    <p className="text-foreground leading-loose text-lg font-sans">
                      {industry.decisionProcess?.action}
                    </p>
                  </div>
                </div>

                {/* STEP 04: 変化と現在 */}
                <div className="relative md:grid md:grid-cols-2 md:gap-20 items-start">
                  <div className="hidden md:block text-right pt-2">
                    <span className="text-base font-bold tracking-widest text-muted-foreground">STEP 04</span>
                    <h3 className="text-2xl font-bold font-serif mt-3 text-foreground">変化と現在</h3>
                  </div>

                  {/* タイムラインのドット */}
                  <div className="absolute left-0 md:left-1/2 w-5 h-5 bg-background border-4 border-muted-foreground rounded-full -translate-x-[calc(50%-1px)] mt-3 z-10"></div>

                  <div className="pl-10 md:pl-0 pt-1 md:pt-0">
                    <div className="md:hidden mb-6">
                      <span className="text-base font-bold tracking-widest text-muted-foreground">STEP 04</span>
                      <h3 className="text-2xl font-bold font-serif mt-2 text-foreground">変化と現在</h3>
                    </div>
                    <p className="text-foreground leading-loose text-lg font-sans">
                      {industry.decisionProcess?.outcome}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. 編集部コメント & おすすめ支援メニュー */}
            <section className="bg-secondary/20 p-8 md:p-16 rounded-lg border border-border">
              <div className="flex items-start gap-6 mb-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center shrink-0 border border-border">
                  <span className="font-serif font-bold text-muted-foreground text-xl">編</span>
                </div>
                <div className="bg-card p-8 rounded-xl shadow-sm relative flex-1 border border-border">
                  <div className="absolute top-6 -left-3 w-6 h-6 bg-card transform rotate-45 border-l border-b border-border"></div>
                  <h3 className="text-sm font-bold text-muted-foreground mb-4 tracking-widest">EDITOR'S NOTE</h3>
                  <p className="text-foreground leading-loose text-lg font-sans">
                    {industry.editorComment}
                  </p>
                </div>
              </div>

              <div className="mt-16">
                <h3 className="text-2xl font-bold font-serif mb-8 text-center text-primary">
                  この事例に関心がある方へのおすすめ支援メニュー
                </h3>
                <div className="grid md:grid-cols-2 gap-8">
                  {industry.recommendedSupports?.map((support, i) => (
                    <a key={i} href="#" className="block bg-card p-8 border border-border hover:border-accent transition-colors group shadow-sm rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold bg-secondary text-primary px-3 py-1 rounded tracking-wider">{support.category}</span>
                        <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
                      </div>
                      <h4 className="text-xl font-bold font-serif text-foreground mb-3 group-hover:text-accent transition-colors">
                        {support.title}
                      </h4>
                      <p className="text-muted-foreground text-base leading-relaxed">
                        {support.description}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </section>

          </div>
        ) : (
          // 通常記事（百業録）用のレイアウト
          <div className="prose prose-stone prose-lg max-w-none">
            <p className="text-xl leading-loose mb-12 font-serif text-foreground border-l-4 border-primary pl-6 py-2 bg-secondary/10">
              {industry.description}
            </p>
            
            <div className="grid md:grid-cols-2 gap-12 my-16">
              <div className="bg-card p-8 rounded-lg border border-border shadow-sm">
                <h3 className="text-xl font-bold font-serif mb-4 text-primary flex items-center gap-2">
                  <AlertCircle className="w-6 h-6" />
                  なぜ必要か
                </h3>
                <p className="text-foreground leading-loose font-sans">{industry.necessity}</p>
              </div>
              <div className="bg-card p-8 rounded-lg border border-border shadow-sm">
                <h3 className="text-xl font-bold font-serif mb-4 text-primary flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6" />
                  仕事を深く知る
                </h3>
                <ul className="space-y-3 list-none pl-0">
                  {industry.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3 text-foreground leading-relaxed">
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mt-2.5 shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
