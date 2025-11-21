import { X, MapPin, Calendar, TrendingUp, Users, Briefcase, Target, Share2, Phone, Globe, ArrowRight, Clock } from 'lucide-react';
import { useState } from 'react';
import type { Industry } from '@/data/industries';
import { industries } from '@/data/industries';

interface DetailModalProps {
  job: Industry | null;
  onClose: () => void;
}

export default function DetailModal({ job, onClose }: DetailModalProps) {
  const [showShareMenu, setShowShareMenu] = useState(false);
  
  if (!job) return null;

  const shareUrl = typeof window !== 'undefined' ? window.location.origin + '/?industry=' + job.id : '';
  const shareText = `${job.title} - 能登百業録`;

  const handleShare = (platform: 'x' | 'facebook' | 'line') => {
    let url = '';
    switch (platform) {
      case 'x':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'line':
        url = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`;
        break;
    }
    window.open(url, '_blank', 'width=600,height=400');
    setShowShareMenu(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in fade-in duration-300">
      {/* Close Button & Share Button */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        <div className="relative">
          <button 
            onClick={() => setShowShareMenu(!showShareMenu)}
            className="p-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-stone-100 transition-colors"
          >
            <Share2 className="w-6 h-6 text-stone-900" />
          </button>
          
          {/* Share Menu */}
          {showShareMenu && (
            <div className="absolute top-12 right-0 bg-white rounded-lg shadow-xl border border-stone-200 overflow-hidden min-w-[160px]">
              <button
                onClick={() => handleShare('x')}
                className="w-full px-4 py-3 text-left text-sm hover:bg-stone-50 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
                Xでシェア
              </button>
              <button
                onClick={() => handleShare('facebook')}
                className="w-full px-4 py-3 text-left text-sm hover:bg-stone-50 transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebookでシェア
              </button>
              <button
                onClick={() => handleShare('line')}
                className="w-full px-4 py-3 text-left text-sm hover:bg-stone-50 transition-colors flex items-center gap-2"
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
          onClick={onClose}
          className="p-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-stone-100 transition-colors"
        >
          <X className="w-6 h-6 text-stone-900" />
        </button>
      </div>

      {/* Hero Image */}
      <div className="relative w-full h-[60vh]">
        <img 
          src={job.image} 
          alt={job.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-0 left-0 p-6 md:p-12 w-full bg-gradient-to-t from-black/80 to-transparent">
          <div className="max-w-5xl mx-auto text-white">
            <p className="text-sm tracking-[0.2em] mb-2 font-light opacity-90">{job.category} / {job.location}</p>
            <h2 className="text-4xl md:text-6xl font-serif font-medium tracking-wide mb-4">{job.title}</h2>
            <div className="flex gap-3">
              {job.tags.map(tag => (
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
        <div className="md:col-span-3 md:sticky md:top-24 h-fit text-center md:text-left md:border-r border-stone-200 md:pr-8">
          <div className="inline-block md:block mb-4">
             <div className="w-24 h-24 bg-stone-100 rounded-full mx-auto md:mx-0 mb-4 flex items-center justify-center overflow-hidden grayscale">
                <span className="font-serif text-3xl text-stone-400">{job.operator.charAt(0)}</span>
             </div>
          </div>
          <div>
            <p className="text-xs text-stone-500 mb-1 tracking-widest">事業者</p>
            <p className="text-xl font-serif mb-1">{job.operator}</p>
            <p className="text-sm text-stone-500">{job.role}</p>
          </div>
          <div className="mt-8 pt-8 border-t border-stone-200 hidden md:block">
            <p className="text-xs text-stone-500 mb-2 tracking-widest">つながり</p>
            <p className="text-sm font-serif text-stone-800 leading-relaxed">{job.connections}</p>
          </div>
        </div>

        {/* Main Text */}
        <div className="md:col-span-9 space-y-16">
          
          <section>
            <h3 className="font-serif text-2xl mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-stone-900"></span>
              物語
            </h3>
            <p className="text-lg leading-[2.2] text-stone-800 font-serif text-justify">
              {job.summary}
            </p>
            <div className="mt-8 p-6 bg-stone-50">
              <h4 className="text-sm font-bold mb-2 text-stone-400 tracking-widest">なぜ必要か</h4>
              <p className="text-base leading-loose text-stone-700">{job.necessity}</p>
            </div>
          </section>

          {/* Timeline - Clean Grid */}
          <section>
            <h3 className="font-serif text-2xl mb-8 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-stone-900"></span>
              歩みと展望
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-3">
                <span className="block text-xs font-bold text-stone-300 tracking-widest flex items-center gap-2">
                  <span className="text-lg">👉</span> 過去
                </span>
                <p className="text-sm leading-loose text-stone-600">{job.timeline.past}</p>
              </div>
              <div className="space-y-3">
                <span className="block text-xs font-bold text-stone-900 tracking-widest flex items-center gap-2">
                  <span className="text-lg">👉</span> 現在
                </span>
                <p className="text-sm leading-loose text-stone-800 font-medium">{job.timeline.present}</p>
              </div>
              <div className="space-y-3">
                <span className="block text-xs font-bold text-stone-300 tracking-widest flex items-center gap-2">
                  <span className="text-lg">👉</span> 未来
                </span>
                <p className="text-sm leading-loose text-stone-600">{job.timeline.future}</p>
              </div>
            </div>
          </section>

          {/* 関連する産業 */}
          {job.relatedIndustries && job.relatedIndustries.length > 0 && (
            <section className="pt-12 border-t border-stone-200">
              <h3 className="font-serif text-2xl mb-8 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-stone-900"></span>
                関連する産業
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {job.relatedIndustries.map(relatedId => {
                  const related = industries.find(ind => ind.id === relatedId);
                  if (!related) return null;
                  return (
                    <a
                      key={related.id}
                      href={`#job-${related.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onClose();
                        setTimeout(() => {
                          const element = document.getElementById(`job-${related.id}`);
                          element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        }, 100);
                      }}
                      className="group border border-stone-200 hover:border-stone-400 transition-all duration-300 overflow-hidden"
                    >
                      <div className="aspect-video relative overflow-hidden">
                        <img
                          src={related.image}
                          alt={related.title}
                          className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-500"
                        />
                        <span className="absolute top-3 left-3 text-xs bg-stone-900 text-white px-3 py-1 tracking-wider">
                          {related.category}
                        </span>
                      </div>
                      <div className="p-4">
                        <h4 className="font-serif text-lg mb-2 group-hover:text-stone-600 transition-colors">{related.title}</h4>
                        <p className="text-xs text-stone-500 line-clamp-2">{related.summary}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </section>
          )}

          {/* 訪問情報 */}
          {job.visitInfo && (
            <section className="pt-12 border-t border-stone-200">
              <h3 className="font-serif text-2xl mb-8 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-stone-900"></span>
                訪問情報
              </h3>
              <div className="bg-stone-50 p-6 md:p-8 space-y-6">
                {job.visitInfo.hours && (
                  <div className="flex gap-4">
                    <Clock className="w-5 h-5 text-stone-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-stone-500 mb-1 tracking-widest">営業時間・見学時間</p>
                      <p className="text-sm text-stone-800">{job.visitInfo.hours}</p>
                    </div>
                  </div>
                )}
                {job.visitInfo.access && (
                  <div className="flex gap-4">
                    <MapPin className="w-5 h-5 text-stone-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-stone-500 mb-1 tracking-widest">アクセス</p>
                      <p className="text-sm text-stone-800">{job.visitInfo.access}</p>
                    </div>
                  </div>
                )}
                {job.visitInfo.contact && (
                  <div className="flex gap-4">
                    <Phone className="w-5 h-5 text-stone-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-stone-500 mb-1 tracking-widest">連絡先</p>
                      <p className="text-sm text-stone-800">{job.visitInfo.contact}</p>
                    </div>
                  </div>
                )}
                {job.visitInfo.website && (
                  <div className="flex gap-4">
                    <Globe className="w-5 h-5 text-stone-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-xs text-stone-500 mb-1 tracking-widest">ウェブサイト</p>
                      <a href={job.visitInfo.website} target="_blank" rel="noopener noreferrer" className="text-sm text-stone-800 hover:text-stone-600 underline">
                        {job.visitInfo.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Actions - First CTA */}
          <section className="pt-12 border-t border-stone-200">
            <div className="bg-stone-900 text-white p-8 md:p-12">
              <div className="md:flex items-baseline justify-between mb-8">
                <h3 className="font-serif text-3xl mb-2 md:mb-0">関わりを持つ</h3>
                <p className="text-stone-400 text-sm">この生業を未来へつなぐために</p>
              </div>
              <div className="grid gap-4">
                {job.actions.map((action, idx) => (
                  <a key={idx} href={action.link} className="group flex items-center justify-between border-b border-stone-700 py-4 hover:bg-stone-800 hover:px-4 transition-all duration-300">
                    <span className="font-serif text-lg">{action.label}</span>
                    <ArrowRight className="w-5 h-5 text-stone-500 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* Job Details - New Section */}
          <section>
            <h3 className="font-serif text-2xl mb-8 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-stone-900"></span>
              仕事を深く知る
            </h3>
            <div className="space-y-10">
              <div>
                <h4 className="text-base font-bold mb-4 text-stone-700 tracking-wide flex items-center gap-2">
                  <span>👉</span> 過去
                </h4>
                <p className="text-sm leading-loose text-stone-600">{job.deepDive.past}</p>
              </div>
              <div>
                <h4 className="text-base font-bold mb-4 text-stone-700 tracking-wide flex items-center gap-2">
                  <span>👉</span> 現在
                </h4>
                <p className="text-sm leading-loose text-stone-600">{job.deepDive.present}</p>
              </div>
              <div>
                <h4 className="text-base font-bold mb-4 text-stone-700 tracking-wide flex items-center gap-2">
                  <span>👉</span> 未来
                </h4>
                <p className="text-sm leading-loose text-stone-600">{job.deepDive.future}</p>
              </div>
            </div>
          </section>

          {/* Actions - Second CTA */}
          <section className="pt-12 border-t border-stone-200">
            <div className="bg-stone-900 text-white p-8 md:p-12">
              <div className="md:flex items-baseline justify-between mb-8">
                <h3 className="font-serif text-3xl mb-2 md:mb-0">関わりを持つ</h3>
                <p className="text-stone-400 text-sm">あなたの一歩が、能登の未来を変える</p>
              </div>
              <div className="grid gap-4">
                {job.actions.map((action, idx) => (
                  <a key={idx} href={action.link} className="group flex items-center justify-between border-b border-stone-700 py-4 hover:bg-stone-800 hover:px-4 transition-all duration-300">
                    <span className="font-serif text-lg">{action.label}</span>
                    <ArrowRight className="w-5 h-5 text-stone-500 group-hover:text-white transition-colors" />
                  </a>
                ))}
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
