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

  // 新しい構成かどうかの判定
  const isNewFormat = !!industry.challengeCard;

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
          <div className="container mx-auto max-w-4xl">
            {isNewFormat && industry.challengeCard && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-600/90 text-white text-sm font-medium mb-4 backdrop-blur-sm border border-blue-400/30">
                <AlertCircle className="w-4 h-4" />
                {industry.challengeCard}
              </div>
            )}
            <h1 className="text-3xl md:text-5xl font-serif font-bold mb-4 leading-tight drop-shadow-lg">
              {industry.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm md:text-base text-slate-200 font-serif">
              <span className="flex items-center gap-1">
                <span className="opacity-70">事業者:</span> {industry.operator}
              </span>
              <span className="w-px h-4 bg-slate-400/50 my-auto"></span>
              <span className="flex items-center gap-1">
                <span className="opacity-70">地域:</span> {industry.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-slate-50 min-h-screen pb-20">
        <div className="container mx-auto max-w-4xl px-4 md:px-8 -mt-8 relative z-10">
          
          {/* Key Points Card */}
          {isNewFormat && industry.keyPoints && (
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8 border-t-4 border-blue-600">
              <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                この事例の要点
              </h2>
              <ul className="space-y-3">
                {industry.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></span>
                    <span className="leading-relaxed">{point}</span>
                  </li>
                ))}
              </ul>
              
              {industry.selectedSupport && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <p className="text-sm text-slate-500 mb-2">活用した支援メニュー</p>
                  <a 
                    href={industry.selectedSupport.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 rounded-lg p-4 transition-all"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold text-blue-700 group-hover:text-blue-800 mb-1">
                          {industry.selectedSupport.name}
                        </h3>
                        <p className="text-sm text-slate-600 line-clamp-1">
                          {industry.selectedSupport.description}
                        </p>
                      </div>
                      <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
                    </div>
                  </a>
                </div>
              )}
            </div>
          )}

          {/* Context Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <h3 className="font-serif font-bold text-xl text-slate-900 mb-4 pb-2 border-b border-slate-100">
                どんな仕事なのか
              </h3>
              <p className="text-slate-700 leading-relaxed">
                {isNewFormat ? industry.jobDescription : industry.summary}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
              <h3 className="font-serif font-bold text-xl text-slate-900 mb-4 pb-2 border-b border-slate-100">
                どんな課題があったのか
              </h3>
              <p className="text-slate-700 leading-relaxed">
                {isNewFormat ? industry.challengeDescription : industry.necessity}
              </p>
            </div>
          </div>

          {/* Decision Process */}
          {isNewFormat && (
            <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-12">
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8 text-center">
                支援活用のプロセス
              </h2>
              
              <div className="space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {/* Step 1: Options */}
                <div className="relative pl-12">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center text-slate-500 font-bold">
                    1
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">検討した選択肢</h3>
                  <div className="bg-slate-50 rounded-lg p-4 border border-slate-100">
                    <ul className="space-y-2">
                      {industry.supportOptions?.map((opt, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-slate-700 text-sm">
                          <HelpCircle className="w-4 h-4 text-slate-400" />
                          {opt}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Step 2: Decision */}
                <div className="relative pl-12">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-blue-100 border-2 border-blue-300 flex items-center justify-center text-blue-600 font-bold">
                    2
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">なぜその支援を選んだか</h3>
                  <p className="text-slate-700 leading-relaxed bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                    {industry.reasonForSelection}
                  </p>
                </div>

                {/* Step 3: Action */}
                <div className="relative pl-12">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center text-slate-500 font-bold">
                    3
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">具体的なアクション</h3>
                  <p className="text-slate-700 leading-relaxed">
                    {industry.actionTaken}
                  </p>
                </div>

                {/* Step 4: Result */}
                <div className="relative pl-12">
                  <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-green-100 border-2 border-green-300 flex items-center justify-center text-green-600 font-bold">
                    4
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">現在の変化</h3>
                  <p className="text-slate-700 leading-relaxed">
                    {industry.changes}
                  </p>
                </div>
              </div>

              {industry.futureSupport && (
                <div className="mt-8 pt-8 border-t border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-500" />
                    今後検討していること
                  </h4>
                  <p className="text-slate-600 text-sm">
                    {industry.futureSupport}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Writer's Comment & Recommendations */}
          {isNewFormat && (
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <div className="md:col-span-2 bg-slate-800 text-slate-100 rounded-xl shadow-sm p-6 md:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                <h3 className="font-serif font-bold text-xl mb-4 flex items-center gap-2">
                  <span className="w-8 h-[1px] bg-slate-400"></span>
                  編集部より
                </h3>
                <p className="leading-relaxed text-slate-300">
                  {industry.writerComment}
                </p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
                <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wider text-slate-500">
                  おすすめの支援
                </h3>
                <div className="space-y-4">
                  {industry.recommendedSupports?.map((rec, idx) => (
                    <a 
                      key={idx}
                      href={rec.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block group"
                    >
                      <h4 className="font-bold text-blue-600 group-hover:underline text-sm mb-1">
                        {rec.name}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {rec.description}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Original Content (Timeline & Deep Dive) - Only show if not new format or if desired to keep */}
          {!isNewFormat && (
            <>
              {/* Timeline */}
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
                <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">歩みと未来</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-20 shrink-0 font-bold text-slate-400">過去</div>
                    <p className="text-slate-700">{industry.timeline.past}</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 shrink-0 font-bold text-slate-900">現在</div>
                    <p className="text-slate-900 font-medium">{industry.timeline.present}</p>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 shrink-0 font-bold text-blue-600">未来</div>
                    <p className="text-slate-700">{industry.timeline.future}</p>
                  </div>
                </div>
              </div>

              {/* Deep Dive */}
              <div className="prose prose-slate max-w-none bg-white rounded-xl shadow-sm p-6 md:p-8 mb-8">
                <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">詳細レポート</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">歴史と伝統</h3>
                    <p className="text-slate-700 leading-relaxed">{industry.deepDive.past}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">現在の取り組み</h3>
                    <p className="text-slate-700 leading-relaxed">{industry.deepDive.present}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">未来への展望</h3>
                    <p className="text-slate-700 leading-relaxed">{industry.deepDive.future}</p>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            {industry.actions.map((action, index) => (
              <a
                key={index}
                href={action.link}
                className={`
                  flex items-center justify-center gap-2 p-4 rounded-lg font-bold transition-all
                  ${index === 0 
                    ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg" 
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                  }
                `}
              >
                {action.label}
                <ArrowRight className="w-4 h-4" />
              </a>
            ))}
          </div>

          {/* Related Industries */}
          {industry.relatedIndustries && industry.relatedIndustries.length > 0 && (
            <div className="border-t border-slate-200 pt-12">
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6 text-center">
                関連する事例
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {industry.relatedIndustries.map(id => {
                  const related = industries.find(i => i.id === id);
                  if (!related) return null;
                  return (
                    <a 
                      key={id}
                      href={`/industry/${id}`}
                      className="group flex gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-all border border-slate-100"
                    >
                      <div className="w-24 h-24 shrink-0 rounded-md overflow-hidden">
                        <img 
                          src={related.image} 
                          alt={related.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1">
                          {related.title}
                        </h3>
                        <p className="text-xs text-slate-500 mb-2">{related.category} / {related.location}</p>
                        <p className="text-sm text-slate-600 line-clamp-2">
                          {related.summary}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
