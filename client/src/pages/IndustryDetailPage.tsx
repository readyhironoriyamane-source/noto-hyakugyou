import { useState, useEffect, useRef } from "react";
import { useRoute } from "wouter";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { industries } from "@/data/industries";
import type { Industry } from "@/data/industries";
import { X, Share2, ChevronLeft, ChevronRight } from "lucide-react";
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
        
        // タイトルを設定
        document.title = `${foundIndustry.title} - 能登百業録`;
        
        // 既存のメタタグを削除
        const existingMeta = document.querySelectorAll('meta[property^="og:"], meta[name="twitter:"], meta[name="description"]');
        existingMeta.forEach(tag => tag.remove());
        
        // OGPメタタグを追加
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
    
    // クリーンアップ関数
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

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in fade-in duration-300">
      <Header />
      {/* Close Button & Share Button */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        <div className="relative">
          <button 
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="p-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-slate-100 transition-colors"
          >
            <Share2 className="w-6 h-6 text-slate-900" />
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
            // 遷移元を確認して適切なページに戻る
            const referrer = document.referrer;
            if (referrer && (referrer.includes('/map') || referrer.includes(window.location.origin))) {
              window.history.back();
            } else {
              window.location.href = '/';
            }
          }}
          className="p-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-slate-100 transition-colors"
        >
          <X className="w-6 h-6 text-slate-900" />
        </button>
      </div>

      {/* Hero Image (ギャラリー対応) */}
      <div className="relative w-full h-[60vh] group">
        <img 
          src={industry.gallery && industry.gallery.length > 0 ? industry.gallery[currentImageIndex] : industry.image}
          alt={industry.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* ギャラリーナビゲーション */}
        {industry.gallery && industry.gallery.length > 1 && (
          <>
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? industry.gallery!.length - 1 : prev - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-6 h-6 text-slate-900" />
            </button>
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev === industry.gallery!.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-6 h-6 text-slate-900" />
            </button>
            
            {/* インジケーター */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {industry.gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? "bg-white w-8"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          </>
        )}
        
        <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full bg-gradient-to-t from-black/80 to-transparent">
          <div className="max-w-5xl mx-auto text-white">
            <p className="text-sm tracking-[0.2em] mb-2 font-light opacity-90">{industry.category} / {industry.location}</p>
            <h2 className="text-4xl md:text-6xl font-serif font-medium tracking-wide mb-4">{industry.title}</h2>
            <div className="flex gap-3">
              {industry.tags.map(tag => (
                <span key={tag} className="text-xs border border-white/40 px-3 py-1 tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
        
        {/* Operator Info */}
        <div className="md:col-span-3 md:sticky md:top-24 h-fit text-center md:text-left md:border-r border-slate-200 md:pr-8">
          <div className="inline-block md:block mb-4">
             <div className="w-24 h-24 bg-slate-100 rounded-full mx-auto md:mx-0 mb-4 flex items-center justify-center overflow-hidden grayscale">
                <span className="font-serif text-3xl text-slate-400">{industry.operator.charAt(0)}</span>
             </div>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1 tracking-widest">事業者</p>
            <p className="text-xl font-serif mb-1">{industry.operator}</p>
            <p className="text-sm text-slate-500">{industry.role}</p>
          </div>
          <div className="mt-8 pt-8 border-t border-slate-200 hidden md:block">
            <p className="text-xs text-slate-500 mb-2 tracking-widest">つながり</p>
            <p className="text-sm font-serif text-slate-800 leading-relaxed">{industry.connections}</p>
          </div>
        </div>

        {/* Main Text */}
        <div className="md:col-span-9 space-y-16">
          
          <section ref={(el) => { sectionsRef.current[0] = el; }}>
            <h3 className="font-serif text-2xl mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-slate-900"></span>
              物語
            </h3>
            <p className="text-lg leading-[2.2] text-slate-800 font-serif text-justify">
              {industry.highlightPhrases ? highlightPhrases(industry.summary, industry.highlightPhrases) : industry.summary}
            </p>
            <div className="mt-8 p-6 bg-slate-50">
              <h4 className="text-sm font-bold mb-2 text-slate-400 tracking-widest">なぜ必要か</h4>
              <div className="text-base leading-loose text-slate-700 space-y-4">
                {industry.necessity.split('\n\n').map((paragraph, idx) => {
                  // 3つの特徴セクションを検出
                  if (paragraph.startsWith('3つの特徴')) {
                    const lines = paragraph.split('\n');
                    const title = lines[0];
                    const features = lines.slice(1);
                    return (
                      <div key={idx} className="mt-6">
                        <h5 className="text-sm font-medium mb-4 text-slate-500">{title}</h5>
                        <div className="space-y-3">
                          {features.map((feature, fIdx) => {
                            if (!feature.trim()) return null;
                            return (
                              <p key={fIdx} className="text-sm leading-relaxed">
                                {industry.highlightPhrases ? highlightPhrases(feature, industry.highlightPhrases) : feature}
                              </p>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                  return (
                    <p key={idx}>
                      {industry.highlightPhrases ? highlightPhrases(paragraph, industry.highlightPhrases) : paragraph}
                    </p>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Timeline - Clean Grid */}
          <section ref={(el) => { sectionsRef.current[1] = el; }}>
            <h3 className="font-serif text-2xl mb-8 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-slate-900"></span>
              歩みと展望
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <span className="block text-xs font-bold text-slate-300 tracking-widest flex items-center gap-2">
                  <span className="text-lg">👉</span> 過去
                </span>
                {(() => {
                  const parts = industry.timeline.past.split(' ');
                  const title = parts[0];
                  const content = parts.slice(1).join(' ');
                  return (
                    <>
                      <p className="text-base font-bold text-slate-900 mb-2">{title}</p>
                      <p className="text-sm leading-loose text-slate-600">
                        {industry.highlightPhrases ? highlightPhrases(content, industry.highlightPhrases) : content}
                      </p>
                    </>
                  );
                })()}
              </div>
              <div className="space-y-3">
                <span className="block text-xs font-bold text-slate-900 tracking-widest flex items-center gap-2">
                  <span className="text-lg">👉</span> 現在
                </span>
                {(() => {
                  const parts = industry.timeline.present.split(' ');
                  const title = parts[0];
                  const content = parts.slice(1).join(' ');
                  return (
                    <>
                      <p className="text-base font-bold text-slate-900 mb-2">{title}</p>
                      <p className="text-sm leading-loose text-slate-800 font-medium">
                        {industry.highlightPhrases ? highlightPhrases(content, industry.highlightPhrases) : content}
                      </p>
                    </>
                  );
                })()}
              </div>
              <div className="space-y-3">
                <span className="block text-xs font-bold text-slate-300 tracking-widest flex items-center gap-2">
                  <span className="text-lg">👉</span> 未来
                </span>
                {(() => {
                  const parts = industry.timeline.future.split(' ');
                  const title = parts[0];
                  const content = parts.slice(1).join(' ');
                  return (
                    <>
                      <p className="text-base font-bold text-slate-900 mb-2">{title}</p>
                      <p className="text-sm leading-loose text-slate-600">
                        {industry.highlightPhrases ? highlightPhrases(content, industry.highlightPhrases) : content}
                      </p>
                    </>
                  );
                })()}
              </div>
            </div>
          </section>

          {/* Deep Dive */}
          <section ref={(el) => { sectionsRef.current[2] = el; }} className="pt-12 border-t border-slate-200">
            <h3 className="font-serif text-2xl mb-8 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-slate-900"></span>
              仕事を深く知る
            </h3>
            <div className="space-y-8">
              <div>
                <h4 className="text-sm font-bold mb-3 text-slate-400 tracking-widest">受け継がれてきたもの</h4>
                <p className="text-base leading-loose text-slate-700">
                  {industry.highlightPhrases ? highlightPhrases(industry.deepDive.past, industry.highlightPhrases) : industry.deepDive.past}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold mb-3 text-slate-400 tracking-widest">今、取り組んでいること</h4>
                <p className="text-base leading-loose text-slate-700">
                  {industry.highlightPhrases ? highlightPhrases(industry.deepDive.present, industry.highlightPhrases) : industry.deepDive.present}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-bold mb-3 text-slate-400 tracking-widest">次の世代へ</h4>
                <p className="text-base leading-loose text-slate-700">
                  {industry.highlightPhrases ? highlightPhrases(industry.deepDive.future, industry.highlightPhrases) : industry.deepDive.future}
                </p>
              </div>
            </div>
          </section>

          {/* 関連する産業 */}
          {industry.relatedIndustries && industry.relatedIndustries.length > 0 && (
            <section ref={(el) => { sectionsRef.current[3] = el; }} className="pt-12 border-t border-slate-200">
              <h3 className="font-serif text-2xl mb-8 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-slate-900"></span>
                関連する産業
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {industry.relatedIndustries.map(relatedId => {
                  const related = industries.find(ind => ind.id === relatedId);
                  if (!related) return null;
                  return (
                    <a
                      key={related.id}
                      href={`/industry/${related.id}`}
                      className="group border border-slate-200 hover:border-slate-400 transition-all duration-300 overflow-hidden"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={related.image}
                          alt={related.title}
                          className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 text-xs bg-slate-900 text-white px-3 py-1 tracking-wider">
                          {related.category}
                        </span>
                      </div>
                      <div className="p-4">
                        <h4 className="font-serif text-lg mb-2 group-hover:text-slate-600 transition-colors">{related.title}</h4>
                        <p className="text-xs text-slate-500 line-clamp-2">{related.summary}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </section>
          )}

          {/* 訪問情報 */}
          {industry.visitInfo && (
            <section ref={(el) => { sectionsRef.current[4] = el; }} className="pt-12 border-t border-slate-200">
              <h3 className="font-serif text-2xl mb-8 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-slate-900"></span>
                訪問情報
              </h3>
              <div className="bg-slate-50 p-6 space-y-4">
                {industry.visitInfo.hours && (
                  <div>
                    <p className="text-xs text-slate-500 mb-1 tracking-widest">営業時間</p>
                    <p className="text-sm text-slate-800">{industry.visitInfo.hours}</p>
                  </div>
                )}
                {industry.visitInfo.access && (
                  <div>
                    <p className="text-xs text-slate-500 mb-1 tracking-widest">アクセス</p>
                    <p className="text-sm text-slate-800">{industry.visitInfo.access}</p>
                  </div>
                )}
                {industry.visitInfo.contact && (
                  <div>
                    <p className="text-xs text-slate-500 mb-1 tracking-widest">連絡先</p>
                    <p className="text-sm text-slate-800">{industry.visitInfo.contact}</p>
                  </div>
                )}
                {industry.visitInfo.website && (
                  <div>
                    <p className="text-xs text-slate-500 mb-1 tracking-widest">ウェブサイト</p>
                    <a
                      href={industry.visitInfo.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:underline"
                    >
                      {industry.visitInfo.website}
                    </a>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Actions - CTA */}
          <section ref={(el) => { sectionsRef.current[5] = el; }} className="pt-12 border-t border-slate-200">
            <div className="bg-slate-900 text-white p-8 md:p-12">
              <div className="md:flex items-baseline justify-between mb-8">
                <h3 className="font-serif text-3xl mb-2 md:mb-0">関わりを持つ</h3>
                <p className="text-slate-400 text-sm">この生業を未来へつなぐために</p>
              </div>
              <div className="grid gap-4">
                {industry.actions.map((action, index) => (
                  <a
                    key={index}
                    href={action.link}
                    className="group flex items-center justify-between border-b border-slate-700 py-4 hover:bg-slate-800 hover:px-4 transition-all duration-300"
                  >
                    <span className="font-serif text-lg">{action.label}</span>
                    <svg className="w-5 h-5 text-slate-500 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}
