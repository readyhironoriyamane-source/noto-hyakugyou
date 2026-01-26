import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Users, Handshake, Construction, Coins, TrendingUp, ArrowRight, ArrowUpRight, FileText, Wallet, Building2 } from 'lucide-react';
import { industries } from '@/data/industries';
import { supportSystems } from '@/lib/supports';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

export default function Home() {
  // 活用事例記事（isCaseStudyがtrue）のみを取得
  const caseStudies = industries.filter(i => i.isCaseStudy);

  // TOPページに固定表示する3つの支援制度ID
  const featuredSupportIds = [
    "nariwai-reconstruction", // なりわい再建支援補助金
    "small-business-sustainability-disaster", // 小規模事業者持続化補助金（災害支援枠）
    "noto-nariwai-addon" // 能登町なりわい再建支援補助金
  ];

  const featuredSupports = featuredSupportIds.map(id => 
    supportSystems.find(s => s.id === id)
  ).filter(Boolean);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      
      {/* Navigation */}
      <Header />

      {/* Hero Section: Magazine Cover Style */}
      <section className="relative w-full min-h-[120vh] flex flex-col overflow-x-hidden bg-primary">
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

      {/* 使える支援制度（おすすめ3選） */}
      <section className="py-16 md:py-24 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl md:text-4xl font-bold text-primary mb-4">使える支援制度</h2>
            <p className="text-foreground/70">特に利用頻度の高い、主要な支援制度をピックアップしました。</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredSupports.map((support) => (
              <div 
                key={support?.id} 
                className="bg-white rounded-xl border border-border/60 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group flex flex-col h-full"
              >
                {/* Header with Badge */}
                <div className="p-6 pb-4 border-b border-border/40 flex justify-between items-start">
                  <span 
                    className="inline-block px-3 py-1 text-xs font-bold text-white rounded-sm tracking-wider"
                    style={{ backgroundColor: support?.badgeColor || '#2B2B2B' }}
                  >
                    {support?.badge}
                  </span>
                  {support?.icon && <support.icon className="w-6 h-6 text-muted-foreground/50" />}
                </div>

                {/* Content */}
                <div className="p-6 pt-4 flex-grow flex flex-col">
                  <h3 className="text-xl font-bold text-primary mb-2 leading-snug group-hover:text-accent transition-colors">
                    {support?.title}
                  </h3>
                  <span className="text-sm text-muted-foreground mb-6 block font-medium">
                    {support?.officialName}
                  </span>

                  {/* Specs */}
                  {support?.specs && (
                    <div className="mt-auto bg-muted/30 rounded-lg p-4 space-y-2">
                      {support.specs.limit && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-xl">💰</span>
                          <span className="font-bold text-foreground">{support.specs.limit}</span>
                        </div>
                      )}
                      {support.specs.rate && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-xl">📝</span>
                          <span className="text-foreground/80">{support.specs.rate}</span>
                        </div>
                      )}
                      {support.specs.note && (
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-xl">📝</span>
                          <span className="text-foreground/80">{support.specs.note}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Action Area (No underline, hover effect only) */}
                <div className="p-4 bg-muted/10 border-t border-border/40 text-center group-hover:bg-primary/5 transition-colors">
                  <span className="text-sm font-bold text-primary/80 group-hover:text-primary flex items-center justify-center gap-2 transition-all group-hover:translate-x-1">
                    制度の詳細を見る <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/supports" className="inline-flex items-center gap-2 text-primary border border-primary/30 hover:bg-primary/5 px-8 py-3 rounded-full transition-all text-sm tracking-wider font-medium no-underline">
              すべての支援制度を見る（全24件） <ArrowRight className="w-4 h-4" />
            </Link>
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
                      <span className="inline-block bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full tracking-wider border border-accent/20">
                        {study.challengeCard.title}
                      </span>
                    </div>
                  )}

                  {/* ② タイトル（明朝体で大きく） */}
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-primary mb-3 leading-snug group-hover:text-accent transition-colors duration-300">
                    {study.title}
                  </h3>

                  {/* ③ 業種・地域（控えめに） */}
                  <div className="flex items-center gap-3 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-1">
                      <Building2 className="w-3 h-3" /> {study.category}
                    </span>
                    <span className="w-px h-3 bg-border"></span>
                    <span>{study.location}</span>
                  </div>

                  {/* ④ リード文（3行制限） */}
                  <p className="text-foreground/70 text-sm leading-relaxed line-clamp-3 mb-6 flex-grow">
                    {study.description}
                  </p>

                  {/* ⑤ 続きを読む（右寄せ、矢印付き） */}
                  <div className="flex justify-end mt-auto pt-4 border-t border-border/30">
                    <span className="text-sm font-bold text-primary group-hover:text-accent transition-colors flex items-center gap-2">
                      物語を読む <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="bg-primary text-white rounded-2xl p-8 md:p-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full translate-y-1/3 -translate-x-1/3 blur-3xl"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">能登百業について</h2>
            <p className="text-lg leading-loose mb-10 text-white/90">
              能登百業（のとひゃくぎょう）は、能登半島の復興と、<br className="hidden md:block" />
              これからの商いを支えるためのプラットフォームです。<br/><br/>
              行政の支援制度、専門家の知見、そして<br className="hidden md:block" />
              同じ境遇にある事業者たちの決断の物語。<br/>
              これらを集約し、あなたの「次の一歩」を後押しします。
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-primary hover:bg-accent hover:text-white px-8 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                <FileText className="w-5 h-5" />
                運営団体について
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
