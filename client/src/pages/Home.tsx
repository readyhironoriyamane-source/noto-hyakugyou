import { useState, useEffect } from 'react';
import { ArrowUpRight, Menu, X, ChevronDown } from 'lucide-react';
import { industries } from '@/data/industries';
import DetailModal from '@/components/DetailModal';
import Footer from '@/components/Footer';
import type { Industry } from '@/data/industries';

function SeasonalPickup() {
  const currentMonth = new Date().getMonth() + 1; // 1-12月
  const seasonal = industries.filter(i => 
    i.seasonalMonths?.includes(currentMonth)
  );
  const picked = seasonal.length > 0 
    ? seasonal.slice(0, 3) 
    : industries.slice(0, 3); // 該当なしの場合は最初の3件
  
  // 月ごとの能登の特徴
  const seasonalDescriptions: Record<number, string> = {
    1: "寒風の中、冬の旬を迎える能登。寒ブリやカニが最も美味しい季節です。",
    2: "雪解けの兆しが見え始める能登。漁師たちは春の漁に備え、農家は種まきの準備を始めます。",
    3: "春の訪れとともに、新たな生命が芽吹く能登。山菜や春野菜が旬を迎えます。",
    4: "桜が舞い、海も穏やかになる能登。春の風物詩とともに、新しい季節が始まります。",
    5: "新緑が輝く能登。田植えが始まり、海ではイカ釣りのシーズンが到来します。",
    6: "梅雨の季節、湿润を帯びた風が吹く能登。稲がすくすくと育ち、海ではイカが豊漁を迎えます。",
    7: "夏の太陽が燦めく能登。海水浴と夏祭り、そして旬の魚介を楽しむ季節です。",
    8: "真夏の熱気の中、生命力に溢れる能登。夏野菜が豊作を迎え、祭りが各地で開かれます。",
    9: "秋の気配が漂い始める能登。稲穂が金色に色づき、収穫の時期が近づきます。",
    10: "実りの秋、収穫の喜びに満ちた能登。新米、キノコ、秋鮭など、秋の味覚が楽しめます。",
    11: "紅葉が山々を彩る能登。冬の備えを始める一方、カニ漁が解禁を迎えます。",
    12: "本格的な冬が訪れる能登。雪景色の中、冬の味覚であるカニやブリが旬を迎えます。"
  };
  
  return (
    <section className="mb-32">
      <div className="flex items-center gap-4 mb-6">
        <span className="w-12 h-[2px] bg-slate-900"></span>
        <h2 className="font-serif text-3xl md:text-4xl tracking-wider">今月のピックアップ</h2>
      </div>
      <p className="text-slate-600 leading-relaxed mb-12 pl-16">
        {seasonalDescriptions[currentMonth]}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
        {picked.map((job) => (
          <a 
            key={job.id} 
            href={`/industry/${job.id}`}
            className="group cursor-pointer flex flex-col gap-6"
          >
            <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-slate-200">
              <img 
                src={job.image} 
                alt={job.title} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="bg-white text-slate-900 p-3 rounded-full">
                  <ArrowUpRight className="w-5 h-5" />
                </div>
              </div>
              {/* 旬バッジ */}
              {job.seasonalMonths?.includes(currentMonth) && (
                <div className="absolute top-4 left-4 bg-blue-700 text-white px-3 py-1 text-xs tracking-widest">
                  旬
                </div>
              )}
            </div>
            <div className="relative pl-4 md:pl-0">
              <div className="flex justify-between items-start border-t border-slate-200 pt-4">
                <div className="space-y-2">
                  <p className="text-xs tracking-widest text-slate-500 uppercase font-medium">{job.category} - {job.location}</p>
                  <h3 className="text-xl md:text-2xl font-serif font-medium text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                    {job.title}
                  </h3>
                </div>
                <span className="font-serif text-3xl text-slate-200 font-light leading-none">
                  {String(job.id).padStart(2, '0')}
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

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
    <div className="min-h-screen bg-slate-50 text-slate-900 font-serif">
      
      {/* Fixed Navigation */}
      <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${isScrolled ? 'bg-slate-50/90 backdrop-blur-sm py-4 border-b border-slate-200' : 'bg-transparent py-8'}`}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-4 z-50">
             <h1 className={`font-serif font-bold text-2xl tracking-widest transition-colors ${isScrolled ? 'text-slate-900' : 'text-white drop-shadow-lg'}`}>能登百業録</h1>
          </div>
          
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-8 text-sm tracking-widest font-medium">
              <a 
                href="/about" 
                className={`transition-colors ${isScrolled ? 'text-slate-900 hover:text-slate-600' : 'text-white hover:text-white/80 drop-shadow-lg'}`}
              >
                百業について
              </a>
              <a 
                href="/map" 
                className={`transition-colors ${isScrolled ? 'text-slate-900 hover:text-slate-600' : 'text-white hover:text-white/80 drop-shadow-lg'}`}
              >
                地図から探す
              </a>
            </nav>
            <button 
              className={`md:hidden ${isScrolled ? 'text-slate-900' : 'text-white'}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="メニュー"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* モバイルメニュー */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* 背景オーバーレイ */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* メニューパネル */}
          <div className="absolute top-0 right-0 w-64 h-full bg-slate-50 shadow-2xl">
            <div className="flex flex-col h-full">
              {/* ヘッダー */}
              <div className="flex justify-between items-center p-6 border-b border-slate-200">
                <h2 className="font-serif text-xl tracking-widest">メニュー</h2>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-slate-900"
                  aria-label="閉じる"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* ナビゲーション */}
              <nav className="flex flex-col p-6 space-y-6">
                <a 
                  href="/about" 
                  className="text-lg tracking-widest text-slate-900 hover:text-slate-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  百業について
                </a>
                <a 
                  href="/map" 
                  className="text-lg tracking-widest text-slate-900 hover:text-slate-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  地図から探す
                </a>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section: Magazine Cover Style */}
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#0a1929]">
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
                     受け継がれる生業の記録
                  </p>
                  <h1 className="writing-vertical-rl text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-bold text-white tracking-wider leading-none drop-shadow-2xl whitespace-nowrap">
                     能登百業
                  </h1>
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
                           className="group relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 md:p-6 text-center hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-white/40"
                        >
                           <div className="text-2xl md:text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                           <p className="text-white text-xs md:text-sm font-medium tracking-wider leading-relaxed whitespace-pre-line">
                              {item.label}
                           </p>
                           <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              <ArrowUpRight className="w-4 h-4 text-white/70" />
                           </div>
                        </button>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Main Content */}
      <main className="relative z-20 bg-slate-50 pt-24 pb-32 min-h-screen">
        
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
          
          {/* イントロダクション（スマホのみ） */}
          <section className="md:hidden mb-20 py-12 border-y border-slate-200">
            <p className="text-xs tracking-[0.4em] mb-8 border-l-2 border-slate-300 pl-4 text-slate-500">EST. 2025 NOTO ISHIKAWA</p>
            <p className="text-base font-serif leading-loose text-slate-700 text-justify">
              能登には、海と共に、山と共に生きる<br/>
              百の仕事がある。<br/>
              その一つ一つに、<br/>
              守り抜かれた技術と、<br/>
              復興へ向かう物語がある。
            </p>
          </section>
          
          {/* 今月のピックアップ */}
          <SeasonalPickup />
          
          {/* すべてセクション */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[2px] bg-slate-900"></span>
              <h2 className="font-serif text-3xl md:text-4xl tracking-wider">すべて</h2>
            </div>
            <p className="text-slate-600 leading-relaxed mb-8 pl-16">
              能登半島に根付くさまざまな生業をご紹介します。
            </p>
          </div>
          
          {/* Minimal Filter */}
          <div className="flex flex-wrap gap-8 md:gap-12 mb-20 justify-center md:justify-start border-b border-slate-200 pb-8">
            {categories.map(cat => {
              const count = cat === 'すべて' 
                ? industries.length 
                : industries.filter(i => i.category === cat).length;
              return (
                <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`text-sm md:text-base tracking-widest font-serif transition-all relative py-1 ${
                    filter === cat 
                    ? 'text-slate-900 font-bold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-blue-700' 
                    : 'text-slate-400 hover:text-slate-600'
                  }`}
                >
                  {cat}
                  <span className="ml-2 text-xs text-slate-400">({count})</span>
                </button>
              );
            })}
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
                <div className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden bg-slate-200">
                  <img 
                    src={job.image} 
                    alt={job.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Overlay Text on Hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="bg-white text-slate-900 p-3 rounded-full">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Text Content - Minimal & Vertical */}
                <div className="relative pl-4 md:pl-0">
                  <div className="flex justify-between items-start border-t border-slate-200 pt-4">
                    <div className="space-y-2">
                      <p className="text-xs tracking-widest text-slate-500 uppercase font-medium">{job.category} - {job.location}</p>
                      <h3 className="text-xl md:text-2xl font-serif font-medium text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                        {job.title}
                      </h3>
                    </div>
                    {/* Vertical Decorative Number */}
                    <span className="font-serif text-3xl text-slate-200 font-light leading-none">
                      {String(job.id).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          
        </div>
      </main>

      <Footer />

      {/* Detail Modal Portal */}
      {selectedJob && (
        <DetailModal job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}

    </div>
  );
}
