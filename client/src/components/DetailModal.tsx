import { X, ArrowRight, MapPin, Clock, Phone, Globe } from 'lucide-react';
import type { Industry } from '@/data/industries';
import { industries } from '@/data/industries';

interface DetailModalProps {
  job: Industry | null;
  onClose: () => void;
}

export default function DetailModal({ job, onClose }: DetailModalProps) {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto animate-in fade-in duration-300">
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="fixed top-6 right-6 z-50 p-2 rounded-full bg-white/80 backdrop-blur-md hover:bg-stone-100 transition-colors"
      >
        <X className="w-6 h-6 text-stone-900" />
      </button>

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
