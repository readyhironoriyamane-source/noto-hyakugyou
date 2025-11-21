import { useState, useEffect } from 'react';
import { 
  ArrowUpRight,
  ChevronDown
} from 'lucide-react';
import { industries } from '@/data/industries';
import DetailModal from '@/components/DetailModal';
import type { Industry } from '@/data/industries';

export default function Home() {
  const [selectedJob, setSelectedJob] = useState<Industry | null>(null);
  const [filter, setFilter] = useState("すべて");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ["すべて", "農業", "漁業", "林業", "食", "工芸", "伝統", "観光", "インフラ"];
  const filteredIndustries = filter === "すべて" 
    ? industries 
    : industries.filter(i => i.category === filter);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans">
      
      {/* Fixed Navigation */}
      <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${isScrolled ? 'bg-stone-50/90 backdrop-blur-sm py-4 border-b border-stone-200' : 'bg-transparent py-8'}`}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-4 z-50">
             <h1 className={`font-serif font-bold text-2xl tracking-widest transition-colors ${isScrolled ? 'text-stone-900' : 'text-white md:text-stone-900'}`}>能登百業録</h1>
          </div>
          
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-8 text-sm tracking-widest font-medium">
              <a 
                href="#" 
                className={`transition-colors ${isScrolled ? 'text-stone-900 hover:text-stone-600' : 'text-white md:text-stone-900 hover:text-stone-600'}`}
              >
                百業について
              </a>
              <a 
                href="/map" 
                className={`transition-colors ${isScrolled ? 'text-stone-900 hover:text-stone-600' : 'text-white md:text-stone-900 hover:text-stone-600'}`}
              >
                地図から探す
              </a>
              <a 
                href="#" 
                className={`transition-colors ${isScrolled ? 'text-stone-900 hover:text-stone-600' : 'text-white md:text-stone-900 hover:text-stone-600'}`}
              >
                特集
              </a>
            </nav>
            <button 
              className={`flex items-center gap-2 px-0 py-2 text-xs tracking-widest uppercase font-bold border-b ${isScrolled ? 'border-stone-900 text-stone-900' : 'border-white text-white md:border-stone-900 md:text-stone-900'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section: Magazine Cover Style */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#1a1a1a]">
         {/* Dynamic Background Image */}
         <div className="absolute inset-0 opacity-60">
            <img src="/fukuzushi.jpg" className="w-full h-full object-cover grayscale" alt="小木地区の福寿司" />
         </div>
         
         <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-6 md:px-12 h-full flex flex-col justify-center">
            <div className="flex flex-row-reverse md:flex-row justify-between items-start h-[60%]">
               
               {/* Vertical Title */}
               <div className="h-full flex flex-col items-center justify-center md:items-start md:justify-start md:order-last pt-12">
                  <h1 className="writing-vertical-rl text-6xl md:text-9xl font-serif font-bold text-white tracking-wider leading-none drop-shadow-2xl">
                     能登百業
                  </h1>
                  <p className="writing-vertical-rl text-white/80 mt-8 text-sm tracking-[0.3em] font-light hidden md:block">
                     受け継がれる生業の記録
                  </p>
               </div>

               {/* Intro Text */}
               <div className="text-white max-w-md pt-24 md:pt-0 hidden md:block">
                  <p className="text-xs tracking-[0.4em] mb-8 border-l border-white/30 pl-4 text-white/70">EST. 2025 NOTO ISHIKAWA</p>
                  <p className="text-lg font-serif leading-loose mb-8 text-justify">
                     能登には、海と共に、山と共に生きる<br/>
                     百の仕事がある。<br/>
                     その一つ一つに、<br/>
                     守り抜かれた技術と、<br/>
                     復興へ向かう物語がある。
                  </p>
                  <div className="w-12 h-[1px] bg-white/50"></div>
               </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2 animate-bounce duration-[2000ms]">
               <span className="text-[10px] tracking-widest uppercase">Scroll</span>
               <ChevronDown className="w-4 h-4" />
            </div>
         </div>
      </section>

      {/* Main Content */}
      <main className="relative z-20 bg-stone-50 pt-24 pb-32 min-h-screen">
        
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          
          {/* Minimal Filter */}
          <div className="flex flex-wrap gap-8 md:gap-12 mb-20 justify-center md:justify-start border-b border-stone-200 pb-8">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`text-sm md:text-base tracking-widest font-serif transition-all relative py-1 ${
                  filter === cat 
                  ? 'text-stone-900 font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-red-800' 
                  : 'text-stone-400 hover:text-stone-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Editorial Layout Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
            {filteredIndustries.map((job) => (
              <a 
                key={job.id} 
                href={`/industry/${job.id}`}
                className="group cursor-pointer flex flex-col gap-6"
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-stone-200">
                  <img 
                    src={job.image} 
                    alt={job.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 grayscale group-hover:grayscale-0"
                  />
                  {/* Overlay Text on Hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="bg-white text-stone-900 p-3 rounded-full">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Text Content - Minimal & Vertical */}
                <div className="relative pl-4 md:pl-0">
                  <div className="flex justify-between items-start border-t border-stone-200 pt-4">
                    <div className="space-y-2">
                      <p className="text-xs tracking-widest text-stone-500 uppercase font-medium">{job.category} - {job.location}</p>
                      <h3 className="text-xl md:text-2xl font-serif font-medium text-stone-900 leading-snug group-hover:text-red-900 transition-colors">
                        {job.title}
                      </h3>
                    </div>
                    {/* Vertical Decorative Number */}
                    <span className="font-serif text-3xl text-stone-200 font-light leading-none">
                      {String(job.id).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          
        </div>
      </main>

      {/* Minimal Footer */}
      <footer className="bg-stone-900 text-stone-400 py-24 border-t border-stone-800">
         <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-start gap-12">
            <div>
               <h2 className="text-white font-serif text-3xl tracking-widest mb-8">能登百業録</h2>
               <div className="space-y-2 text-sm font-light">
                  <p>〒927-0492</p>
                  <p>石川県鳳珠郡能登町</p>
                  <p className="mt-4 opacity-50">Provided by Noto Town Project</p>
               </div>
            </div>
            
            <div className="flex gap-16 text-sm tracking-widest">
               <ul className="space-y-4">
                  <li><a href="#" className="hover:text-white transition-colors">物語一覧</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">インタビュアー</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">寄稿・編集</a></li>
               </ul>
               <ul className="space-y-4">
                  <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
               </ul>
            </div>
         </div>
      </footer>

      {/* Detail Modal Portal */}
      {selectedJob && (
        <DetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}

    </div>
  );
}
