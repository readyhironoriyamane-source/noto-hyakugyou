import { useState, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { industries } from '@/data/industries';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Home() {
  // 活用事例記事（isCaseStudyがtrue）のみを取得
  const caseStudies = industries.filter(i => i.isCaseStudy);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      
      {/* Navigation */}
      <Header />

      {/* Hero Section: Magazine Cover Style */}
      <section className="relative w-full h-[100vh] md:h-[80vh] flex items-center justify-center overflow-hidden bg-primary">
         {/* Dynamic Background Video */}
         <div className="absolute inset-0 opacity-60">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/noto-sea.mp4" type="video/mp4" />
            </video>
            {/* UD対応: コントラスト確保のためのオーバーレイを強化 */}
            <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/40 to-primary/90"></div>
         </div>
         
         <div className="relative z-10 container h-full flex flex-col justify-center">
            <div className="flex flex-row-reverse md:flex-row justify-between items-center h-full md:h-[70%] pb-20 md:pb-0">
               
               {/* Vertical Title - PC: Right side, SP: Center */}
               <div className="h-full flex flex-row items-center justify-center md:justify-start md:order-last pt-12 pr-4 md:pr-16 lg:pr-24 gap-4 md:gap-8">
                  <p className="writing-vertical-rl text-white/90 text-sm md:text-base tracking-[0.3em] font-medium whitespace-nowrap drop-shadow-md font-serif">
                     明日の商いを、共に創る
                  </p>
                  <h1 className="writing-vertical-rl text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-serif font-bold text-white tracking-wider leading-none drop-shadow-2xl whitespace-nowrap">
                     能登百業
                  </h1>
               </div>

               {/* Intro Text - PC Only */}
               <div className="text-white max-w-md pt-24 md:pt-0 hidden md:block">
                  {/* UD対応: 英語表記を日本語へ変更 */}
                  <p className="text-sm tracking-[0.3em] mb-8 border-l-2 border-accent pl-4 text-white/90 font-bold">能登の商いを支える</p>
                  {/* UD対応: 行間を広げ、文字サイズを大きく */}
                  <p className="text-lg md:text-xl font-serif leading-loose mb-8 text-justify drop-shadow-md">
                     能登の事業者の皆様へ。<br/>
                     一人ひとりの悩みに寄り添い、<br/>
                     最適な支援をご案内します。<br/>
                     ここには、明日を切り拓くための<br/>
                     確かな道筋があります。
                  </p>
                  <div className="w-16 h-[2px] bg-accent"></div>
               </div>
            </div>

            {/* 課題選択エリア - PC Only (Absolute Position) */}
            <div className="hidden md:block absolute bottom-0 left-0 w-full bg-gradient-to-t from-primary to-transparent pt-24 pb-16">
               <div className="container">
                  <h2 className="text-white text-center font-serif text-2xl md:text-3xl mb-10 tracking-widest drop-shadow-lg font-bold">
                     今、どんなことでお困りですか？
                  </h2>
                  <div className="grid grid-cols-5 gap-6">
                     {[
                        { icon: "👥", label: "後継者が\nいない" },
                        { icon: "🤝", label: "人材を\n確保したい" },
                        { icon: "🏗️", label: "設備の復旧・\n改修がしたい" },
                        { icon: "💰", label: "資金繰りが\n厳しい" },
                        { icon: "📈", label: "売上を\n伸ばしたい" }
                     ].map((item, index) => (
                        <button 
                           key={index}
                           className="bg-white/10 backdrop-blur-md hover:bg-accent/90 border-2 border-white/30 text-white p-6 rounded-lg transition-all hover:-translate-y-1 flex flex-col items-center text-center gap-3 group focus:outline-none focus:ring-4 focus:ring-accent/50"
                           aria-label={item.label.replace('\n', '')}
                        >
                           <span className="text-4xl group-hover:scale-110 transition-transform drop-shadow-md">{item.icon}</span>
                           {/* UD対応: 文字サイズを大きく、太字に */}
                           <span className="text-base md:text-lg font-bold whitespace-pre-line leading-snug font-sans">{item.label}</span>
                        </button>
                     ))}
                  </div>
               </div>
            </div>
            
            {/* Scroll Indicator - SP Only */}
            <div className="md:hidden absolute bottom-8 left-1/2 -translate-x-1/2 text-white flex flex-col items-center gap-2 animate-bounce">
              <span className="text-xs tracking-widest uppercase">Scroll</span>
              <div className="w-[1px] h-12 bg-white"></div>
            </div>
         </div>
      </section>

      {/* SP用: イントロダクション & 課題選択エリア (スクロール後に表示) */}
      <section className="md:hidden py-16 bg-background">
        <div className="container">
          <div className="mb-16">
            <p className="text-sm tracking-[0.3em] mb-6 border-l-4 border-accent pl-4 text-primary font-bold">能登の商いを支える</p>
            <p className="text-lg font-serif leading-loose text-justify text-foreground">
               能登の事業者の皆様へ。<br/>
               一人ひとりの悩みに寄り添い、<br/>
               最適な支援をご案内します。<br/>
               ここには、明日を切り拓くための<br/>
               確かな道筋があります。
            </p>
          </div>

          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
            <h2 className="text-primary text-center font-serif text-xl mb-8 tracking-widest font-bold">
               今、どんなことでお困りですか？
            </h2>
            <div className="grid grid-cols-2 gap-4">
               {[
                  { icon: "👥", label: "後継者が\nいない" },
                  { icon: "🤝", label: "人材を\n確保したい" },
                  { icon: "🏗️", label: "設備の復旧・\n改修がしたい" },
                  { icon: "💰", label: "資金繰りが\n厳しい" },
                  { icon: "📈", label: "売上を\n伸ばしたい" }
               ].map((item, index) => (
                  <button 
                     key={index}
                     className={`bg-white hover:bg-accent/10 border border-primary/20 text-primary p-4 rounded-lg transition-all active:scale-95 flex flex-col items-center text-center gap-2 shadow-sm ${index === 4 ? 'col-span-2' : ''}`}
                     aria-label={item.label.replace('\n', '')}
                  >
                     <span className="text-3xl">{item.icon}</span>
                     <span className="text-sm font-bold whitespace-pre-line leading-snug font-sans">{item.label}</span>
                  </button>
               ))}
            </div>
          </div>
        </div>
      </section>

      <main className="container py-16 md:py-32">
        
        {/* 活用事例セクション */}
        <section className="mb-32">
          <div className="flex items-center gap-6 mb-8">
            <span className="w-16 h-[4px] bg-primary"></span>
            <h2 className="font-serif text-3xl md:text-5xl tracking-wider font-bold text-primary">活用事例</h2>
          </div>
          <p className="text-foreground/80 text-base md:text-lg leading-loose mb-16 pl-4 md:pl-20 max-w-3xl font-sans">
            困難を乗り越え、新たな一歩を踏み出した事業者の物語をご紹介します。<br/>
            同じ悩みを抱える方のヒントになれば幸いです。
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {caseStudies.map((study) => (
              <a 
                key={study.id}
                href={`/industry/${study.id}`}
                className="group cursor-pointer bg-card rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border border-border focus:outline-none focus:ring-4 focus:ring-primary/30"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={study.image} 
                    alt={`${study.title}のイメージ画像`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {study.challengeCard && (
                    <div className="absolute top-4 left-4 bg-accent text-white text-sm font-bold px-4 py-2 tracking-wider shadow-md rounded-sm">
                      {study.challengeCard.label}
                    </div>
                  )}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-sm font-bold text-primary bg-primary/10 px-3 py-1 rounded-full tracking-wider">{study.category}</span>
                    <span className="text-sm text-muted-foreground tracking-widest flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground/50"></span>
                      {study.location}
                    </span>
                  </div>
                  {/* UD対応: 見出しの行間を広げ、視認性を向上 */}
                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors line-clamp-2 font-serif leading-normal">
                    {study.title}
                  </h3>
                  {/* UD対応: 本文の文字サイズと行間を確保 */}
                  <p className="text-base text-foreground/80 line-clamp-3 mb-8 leading-loose font-sans">
                    {study.summary}
                  </p>
                  <div className="flex items-center text-primary text-sm font-bold tracking-widest group-hover:translate-x-2 transition-transform uppercase btn-ud w-fit -ml-6 pl-6">
                    詳しく見る <ArrowUpRight className="w-5 h-5 ml-2" />
                  </div>
                </div>
              </a>
            ))}
            
            {/* 事例が少ない場合のプレースホルダー */}
            {caseStudies.length === 0 && (
              <div className="col-span-full text-center py-20 bg-muted/30 rounded-xl border-2 border-dashed border-muted-foreground/30">
                <p className="text-lg md:text-xl text-muted-foreground font-bold">現在、公開準備中の事例があります。</p>
              </div>
            )}
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
