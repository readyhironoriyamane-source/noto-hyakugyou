import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Users, Handshake, Construction, Coins, TrendingUp, ArrowRight, ArrowUpRight, FileText } from 'lucide-react';
import { industries } from '@/data/industries';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SupportCard from '@/components/SupportCard';
import ConsultationCTA from '@/components/ConsultationCTA';
import { supportSystems } from '@/lib/supports';

export default function Home() {
  // 活用事例記事（isCaseStudyがtrue）のみを取得
  const caseStudies = industries.filter(i => i.isCaseStudy);

  // TOPページに表示する「使える支援制度」3選（固定）
  const featuredSupports = [
    supportSystems.find(s => s.id === 'nariwai-ishikawa'), // 大規模再建（県）
    supportSystems.find(s => s.id === 'jizokuka-national'), // 販路・汎用（国）
    supportSystems.find(s => s.id === 'nariwai-noto'), // 上乗せ支援（町）
  ].filter(Boolean); // undefinedを除外

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      
      {/* Navigation */}
      <Header />

      {/* Hero Section: Magazine Cover Style */}
      <section className="relative w-full h-[100vh] md:h-auto md:min-h-screen flex flex-col overflow-x-hidden bg-primary">
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
            {/* UD対応: コントラスト強化 (最重要) - #1D3A52 (深藍) の不透明度70%オーバーレイ */}
            <div className="absolute inset-0 bg-[#1D3A52]/70"></div>
         </div>
         
         <div className="relative z-10 container h-full flex flex-col justify-center md:justify-start md:pt-24">
            {/* Upper Zone: Branding (Logo & Copy) */}
            <div className="flex flex-row-reverse md:flex-row justify-between items-start h-full md:h-auto pb-20 md:pb-0 md:mb-32">
               
               {/* Vertical Title - PC: Right side, SP: Center */}
               <div className="h-full flex flex-row items-center justify-center md:justify-start md:order-last pt-12 pr-4 md:pr-16 lg:pr-24 gap-4 md:gap-8">
                  <p className="writing-vertical-rl text-white/90 text-sm md:text-base tracking-[0.3em] font-medium whitespace-nowrap drop-shadow-md font-serif">
                     明日の商いを、共に創る
                  </p>
                  <h1 className="writing-vertical-rl text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl font-serif font-bold text-white tracking-wider leading-none drop-shadow-2xl whitespace-nowrap">
                     能登百業
                  </h1>
               </div>

               {/* Intro Text - PC Only */}
               <div className="text-white max-w-md pt-24 md:pt-20 hidden md:block">
                  {/* UD対応: 英語表記を日本語へ変更 */}
                  <p className="text-sm tracking-[0.3em] mb-8 border-l-[3px] border-accent pl-4 text-white/90 font-bold">能登の商いを支える</p>
                  {/* UD対応: フォントをゴシック体(font-sans)に変更、行間を2.0(leading-loose)に */}
                  <p className="text-lg md:text-xl font-sans leading-loose mb-8 text-justify drop-shadow-md">
                     能登の事業者の皆様へ。<br/>
                     一人ひとりの悩みに寄り添い、<br/>
                     最適な支援をご案内します。<br/>
                     ここには、明日を切り拓くための<br/>
                     確かな道筋があります。
                  </p>
                  <div className="w-16 h-[2px] bg-accent"></div>
               </div>
            </div>

            {/* Lower Zone: Navigation (Question & Cards) */}
            <div className="hidden md:block w-full pb-32">
               <div className="container">
                  {/* 問いかけテキスト */}
                  <div className="text-center mb-10">
                     <h2 className="text-white font-serif text-2xl md:text-3xl tracking-widest drop-shadow-lg font-bold">
                        今、どんなことでお困りですか？
                     </h2>
                  </div>
                  
                  {/* カードグリッド (margin-top: 40px from text is handled by mb-10 above) */}
                  <div className="grid grid-cols-5 gap-6">
                     {[
                        { icon: Users, label: "後継者が\nいない", category: "hr" },
                        { icon: Handshake, label: "人材を\n確保したい", category: "hr" },
                        { icon: Construction, label: "設備の復旧・\n改修がしたい", category: "reconstruction" },
                        { icon: Coins, label: "資金繰りが\n厳しい", category: "finance" },
                        { icon: TrendingUp, label: "売上を\n伸ばしたい", category: "sales" }
                     ].map((item, index) => (
                        <Link 
                           key={index}
                           href={`/supports?category=${item.category}`}
                           className="bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/30 text-white p-6 rounded-lg transition-all hover:-translate-y-1 flex flex-col items-center text-center gap-4 group focus:outline-none focus:ring-4 focus:ring-accent/50 relative overflow-hidden cursor-pointer no-underline"
                           aria-label={item.label.replace('\n', '')}
                        >
                           <item.icon className="w-10 h-10 text-white stroke-[1.5]" />
                           {/* UD対応: 文字サイズを大きく、太字に */}
                           <span className="text-base md:text-lg font-bold whitespace-pre-line leading-snug font-sans group-hover:opacity-80 transition-opacity">{item.label}</span>
                           
                           {/* 誘導アイコン */}
                           <div className="mt-2 flex items-center text-xs tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">
                              詳しく見る <ArrowRight className="w-3 h-3 ml-1" />
                           </div>
                        </Link>
                     ))}
                  </div>
                  
                  {/* 支援制度一覧を見るボタン (margin-top: 56px) */}
                  <div className="text-center mt-14">
                     <Link href="/supports" className="inline-flex items-center gap-2 text-white border border-white/80 hover:bg-white/10 hover:border-white px-8 py-3 rounded-full transition-all text-sm tracking-wider font-medium no-underline">
                        支援制度一覧を見る <ArrowRight className="w-4 h-4" />
                     </Link>
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
            <p className="text-lg font-sans leading-loose text-justify text-foreground">
               能登の事業者の皆様へ。<br/>
               一人ひとりの悩みに寄り添い、<br/>
               最適な支援をご案内します。<br/>
               ここには、明日を切り拓くための<br/>
               確かな道筋があります。
            </p>
          </div>

          <div className="bg-primary/5 rounded-2xl p-8 border border-primary/10">
            <div className="text-center mb-8">
               <h2 className="text-primary font-serif text-xl tracking-widest font-bold mb-4">
                  今、どんなことでお困りですか？
               </h2>
               
            </div>
            <div className="grid grid-cols-2 gap-4 mb-8">
               {[
                  { icon: Users, label: "後継者が\nいない", category: "hr" },
                  { icon: Handshake, label: "人材を\n確保したい", category: "hr" },
                  { icon: Construction, label: "設備の復旧・\n改修がしたい", category: "reconstruction" },
                  { icon: Coins, label: "資金繰りが\n厳しい", category: "finance" },
                  { icon: TrendingUp, label: "売上を\n伸ばしたい", category: "sales" }
               ].map((item, index) => (
                  <Link 
                     key={index}
                     href={`/supports?category=${item.category}`}
                     className={`bg-white hover:bg-accent/10 border border-primary/20 text-primary p-4 rounded-lg transition-all active:scale-95 flex flex-col items-center text-center gap-2 shadow-sm cursor-pointer no-underline ${index === 4 ? 'col-span-2' : ''}`}
                     aria-label={item.label.replace('\n', '')}
                  >
                     <item.icon className="w-8 h-8 stroke-[1.5]" />
                     <span className="text-sm font-bold whitespace-pre-line leading-snug font-sans">{item.label}</span>
                  </Link>
               ))}
            </div>
            
            {/* 支援制度一覧を見るボタン（SP用） */}
            <div className="text-center">
               <Link href="/supports" className="inline-flex items-center gap-2 text-primary border border-primary/30 hover:bg-primary/5 px-6 py-3 rounded-full transition-all text-sm tracking-wider font-medium no-underline">
                  支援制度一覧を見る <ArrowRight className="w-4 h-4" />
               </Link>
            </div>
          </div>
        </div>
      </section>

      <main className="container py-16 md:py-32">
        
        {/* 活用事例セクション */}
        <section className="mb-32">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-3xl md:text-5xl tracking-wider font-bold text-primary mb-6">商いの道しるべ</h2>
              <p className="text-foreground/80 text-base md:text-lg leading-loose font-sans">
                先人たちの知恵と、復興への道のり。<br className="block md:hidden" />
                困難を乗り越えた、決断の記録です。
              </p>
            </div>
            {/* Link moved to Hero section */}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {caseStudies.map((study) => (
              <a 
                key={study.id}
                href={`/industry/${study.id}`}
                className="group cursor-pointer bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-border/50 focus:outline-none focus:ring-4 focus:ring-primary/30 no-underline flex flex-col h-full"
              >
                {/* 1. ヘッダー画像エリア（リンク切れ修正済み） */}
                <div className="relative aspect-[3/2] overflow-hidden bg-muted">
                  <img 
                    src={study.image} 
                    alt={`${study.title}のイメージ画像`} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/600x400/e2e8f0/1e293b?text=No+Image";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                </div>

                {/* 2. 情報エリア（白背景、余白広め） */}
                <div className="p-6 md:p-8 flex flex-col flex-grow bg-white">
                  
                  {/* ① 課題ラベル（最優先情報） */}
                  {study.challengeCard && (
                    <div className="mb-4">
                      <span className="inline-block bg-accent/10 text-accent font-bold text-sm px-3 py-1 rounded-full tracking-wide">
                        {study.challengeCard.label}
                      </span>
                    </div>
                  )}

                  {/* ② タイトル（明朝体で大きく） */}
                  <h3 className="font-serif text-2xl font-bold text-primary mb-4 leading-tight group-hover:text-accent transition-colors">
                    {study.title}
                  </h3>

                  {/* ③ リード文（ゴシック体、行間広め） */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {study.summary}
                  </p>

                  {/* ④ フッター情報（業種・地域） */}
                  <div className="flex items-center gap-4 text-xs text-muted-foreground border-t border-border/50 pt-4 mt-auto">
                    <span className="flex items-center gap-1">
                      <Construction className="w-3 h-3" />
                      {study.category}
                    </span>
                    <span className="w-[1px] h-3 bg-border"></span>
                    <span>{study.location}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* 使える支援制度セクション (Strict Style) */}
        <section className="mb-32">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-3xl md:text-5xl tracking-wider font-bold text-primary mb-6">使える支援制度</h2>
              <p className="text-foreground/80 text-base md:text-lg leading-loose font-sans">
                復旧・再建から、販路開拓まで。<br className="block md:hidden" />
                今すぐ使える制度を厳選しました。
              </p>
            </div>
            <Link href="/supports">
              <a className="hidden md:inline-flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors border-b-2 border-primary/20 hover:border-accent pb-1 no-underline">
                すべての制度を見る <ArrowRight className="w-4 h-4" />
              </a>
            </Link>
          </div>

          {/* 厳選3カード (Strict SupportCard) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredSupports.map((support) => (
              <div key={support?.id} className="h-full">
                {support && <SupportCard support={support} />}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/supports">
              <a className="inline-flex items-center gap-2 text-primary font-bold hover:text-accent transition-colors border-b-2 border-primary/20 hover:border-accent pb-1 no-underline">
                すべての制度を見る <ArrowRight className="w-4 h-4" />
              </a>
            </Link>
          </div>
        </section>

        {/* 相談誘導エリア (Strict ConsultationCTA) */}
        <section>
          <ConsultationCTA />
        </section>

      </main>

      <Footer />
    </div>
  );
}
