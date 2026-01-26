import { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { industries } from '@/data/industries';
import Footer from '@/components/Footer';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 活用事例記事（isCaseStudyがtrue）のみを取得
  const caseStudies = industries.filter(i => i.isCaseStudy);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-serif">
      
      {/* Fixed Navigation */}
      <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${isScrolled ? 'bg-stone-50/90 backdrop-blur-sm py-4 border-b border-stone-200' : 'bg-transparent py-8'}`}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-4 z-50">
             <h1 className={`font-serif font-bold text-2xl tracking-widest transition-colors ${isScrolled ? 'text-stone-900' : 'text-white drop-shadow-lg'}`}>能登百業録</h1>
          </div>
          
          {/* ナビゲーションリンクは削除されました */}
        </div>
      </header>

      {/* Hero Section: Magazine Cover Style */}
      <section className="relative w-full h-screen md:h-[70vh] flex items-center justify-center overflow-hidden bg-[#0a1929]">
         {/* Dynamic Background Video */}
         <div className="absolute inset-0 opacity-50">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/noto-sea.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a1929]/60 via-transparent to-[#0a1929]/80"></div>
         </div>
         
         <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-12 h-full flex flex-col justify-center">
            <div className="flex flex-row-reverse md:flex-row justify-between items-start h-[60%]">
               
               {/* Vertical Title */}
               <div className="h-full flex flex-row items-center justify-center md:justify-start md:order-last pt-12 pr-8 md:pr-16 lg:pr-24 gap-6 md:gap-8">
                  <p className="writing-vertical-rl text-white/80 text-xs md:text-sm tracking-[0.3em] font-light hidden md:block whitespace-nowrap drop-shadow-lg">
                     明日の商いを、共に創る
                  </p>
                  <h1 className="writing-vertical-rl text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold text-white tracking-wider leading-none drop-shadow-2xl whitespace-nowrap">
                     能登百業
                  </h1>
               </div>

               {/* Intro Text */}
               <div className="text-white max-w-md pt-24 md:pt-0 hidden md:block">
                  <p className="text-xs tracking-[0.4em] mb-8 border-l border-white/30 pl-4 text-white/70">SUPPORT FOR NOTO BUSINESS</p>
                  <p className="text-lg font-serif leading-loose mb-8 text-justify">
                     能登の事業者の皆様へ。<br/>
                     一人ひとりの悩みに寄り添い、<br/>
                     最適な支援をご案内します。<br/>
                     ここには、明日を切り拓くための<br/>
                     確かな道筋があります。
                  </p>
                  <div className="w-12 h-[1px] bg-white/50"></div>
               </div>
            </div>

            {/* 課題選択エリア */}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#0a1929] to-transparent pt-20 pb-12 px-6 md:px-12">
               <div className="max-w-screen-2xl mx-auto">
                  <h2 className="text-white text-center font-serif text-xl md:text-2xl mb-8 tracking-widest drop-shadow-lg">
                     今、どんなことでお困りですか？
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                     {[
                        { icon: "💰", label: "資金繰りが\n厳しい" },
                        { icon: "👥", label: "後継者が\nいない" },
                        { icon: "📈", label: "売上を\n伸ばしたい" },
                        { icon: "🚪", label: "事業を\nたたみたい" },
                        { icon: "❓", label: "何から始めれば\nいいかわからない" }
                     ].map((item, index) => (
                        <button 
                           key={index}
                           className="bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/20 text-white p-4 rounded-lg transition-all hover:-translate-y-1 flex flex-col items-center text-center gap-2 group"
                        >
                           <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
                           <span className="text-sm font-medium whitespace-pre-line leading-tight">{item.label}</span>
                        </button>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      <main className="max-w-screen-2xl mx-auto px-6 md:px-12 py-24">
        
        {/* 活用事例セクション */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[2px] bg-stone-900"></span>
            <h2 className="font-serif text-3xl md:text-4xl tracking-wider">活用事例</h2>
          </div>
          <p className="text-stone-600 leading-relaxed mb-12 pl-16">
            困難を乗り越え、新たな一歩を踏み出した事業者の物語をご紹介します。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study) => (
              <a 
                key={study.id}
                href={`/industry/${study.id}`}
                className="group cursor-pointer bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-stone-100"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={study.image} 
                    alt={study.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {study.challengeCard && (
                    <div className="absolute top-4 left-4 bg-red-800/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1 tracking-wider border border-red-700/50">
                      {study.challengeCard.label}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold text-stone-500 bg-stone-100 px-2 py-1 tracking-widest">{study.category}</span>
                    <span className="text-xs text-stone-400 tracking-widest">{study.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-4 group-hover:text-stone-600 transition-colors line-clamp-2 font-serif leading-snug">
                    {study.title}
                  </h3>
                  <p className="text-sm text-stone-600 line-clamp-2 mb-6 leading-relaxed font-serif">
                    {study.summary}
                  </p>
                  <div className="flex items-center text-stone-800 text-xs font-bold tracking-widest group-hover:translate-x-1 transition-transform uppercase">
                    続きを読む <ArrowUpRight className="w-3 h-3 ml-1" />
                  </div>
                </div>
              </a>
            ))}
            
            {/* 事例が少ない場合のプレースホルダー */}
            {caseStudies.length === 0 && (
              <div className="col-span-full text-center py-12 bg-stone-50 rounded-xl border border-dashed border-stone-300">
                <p className="text-stone-500">現在、公開準備中の事例があります。</p>
              </div>
            )}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
