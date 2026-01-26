import { useState, useEffect } from 'react';
import { ArrowUpRight, Users, Handshake, Construction, Coins, TrendingUp, ArrowRight } from 'lucide-react';
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
      <section className="relative w-full h-[100vh] md:h-[90vh] flex items-center justify-center overflow-hidden bg-primary">
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
         
         <div className="relative z-10 container h-full flex flex-col justify-center md:justify-start md:pt-32">
            <div className="flex flex-row-reverse md:flex-row justify-between items-start h-full md:h-auto pb-20 md:pb-0">
               
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
               <div className="text-white max-w-md pt-24 md:pt-12 hidden md:block">
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

            {/* 課題選択エリア - PC Only (Absolute Position) */}
            <div className="hidden md:block absolute bottom-0 left-0 w-full bg-gradient-to-t from-[#1D3A52] to-transparent pt-24 pb-16">
               <div className="container">
                  <h2 className="text-white text-center font-serif text-2xl md:text-3xl mb-10 tracking-widest drop-shadow-lg font-bold">
                     今、どんなことでお困りですか？
                  </h2>
                  <div className="grid grid-cols-5 gap-6">
                     {[
                        { icon: Users, label: "後継者が\nいない" },
                        { icon: Handshake, label: "人材を\n確保したい" },
                        { icon: Construction, label: "設備の復旧・\n改修がしたい" },
                        { icon: Coins, label: "資金繰りが\n厳しい" },
                        { icon: TrendingUp, label: "売上を\n伸ばしたい" }
                     ].map((item, index) => (
                        <button 
                           key={index}
                           className="bg-white/5 backdrop-blur-sm hover:bg-white/10 border border-white/30 text-white p-6 rounded-lg transition-all hover:-translate-y-1 flex flex-col items-center text-center gap-4 group focus:outline-none focus:ring-4 focus:ring-accent/50 relative overflow-hidden"
                           aria-label={item.label.replace('\n', '')}
                        >
                           <item.icon className="w-10 h-10 text-white stroke-[1.5]" />
                           {/* UD対応: 文字サイズを大きく、太字に */}
                           <span className="text-base md:text-lg font-bold whitespace-pre-line leading-snug font-sans">{item.label}</span>
                           
                           {/* 誘導アイコン */}
                           <div className="mt-2 flex items-center text-xs tracking-widest opacity-70 group-hover:opacity-100 transition-opacity">
                              詳しく見る <ArrowRight className="w-3 h-3 ml-1" />
                           </div>
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
            <p className="text-lg font-sans leading-loose text-justify text-foreground">
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
                  { icon: Users, label: "後継者が\nいない" },
                  { icon: Handshake, label: "人材を\n確保したい" },
                  { icon: Construction, label: "設備の復旧・\n改修がしたい" },
                  { icon: Coins, label: "資金繰りが\n厳しい" },
                  { icon: TrendingUp, label: "売上を\n伸ばしたい" }
               ].map((item, index) => (
                  <button 
                     key={index}
                     className={`bg-white hover:bg-accent/10 border border-primary/20 text-primary p-4 rounded-lg transition-all active:scale-95 flex flex-col items-center text-center gap-2 shadow-sm ${index === 4 ? 'col-span-2' : ''}`}
                     aria-label={item.label.replace('\n', '')}
                  >
                     <item.icon className="w-8 h-8 stroke-[1.5]" />
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
          <div className="mb-16">
            <h2 className="font-serif text-3xl md:text-5xl tracking-wider font-bold text-primary mb-6">商いの道しるべ</h2>
            <p className="text-foreground/80 text-base md:text-lg leading-loose font-sans">
              支援制度を活かし、新たな一歩を踏み出した<br className="block md:hidden" />能登の事業者をご紹介します。
            </p>
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
                      <span className="inline-block bg-[#B33E28] text-white text-[13px] font-bold px-3 py-1 rounded-sm tracking-wide">
                        {study.challengeCard.label}
                      </span>
                    </div>
                  )}

                  {/* ② 属性データ（コントラスト改善） */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-xs font-bold text-[#333] bg-[#E0E0E0] px-2 py-1 rounded tracking-wider">
                      {study.category}
                    </span>
                    <span className="text-xs text-[#444] font-medium tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#666]"></span>
                      {study.location}
                    </span>
                  </div>

                  {/* ③ タイトル（下線削除・ゴシック化） */}
                  <h3 className="text-[22px] font-bold text-[#333] mb-3 leading-snug font-sans group-hover:text-[#B33E28] transition-colors">
                    {study.title}
                  </h3>

                  {/* ④ 本文リード文（下線削除・ゴシック化） */}
                  <p className="text-base text-[#555] font-medium leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {study.summary}
                  </p>

                  {/* ⑤ 構造化データブロック（新設） */}
                  {study.challengeCard?.structuredBlock && (
                    <div className="mb-6 space-y-3 bg-gray-50 p-4 rounded border border-gray-100">
                      {study.challengeCard.structuredBlock.map((block, idx) => (
                        <div key={idx} className="text-sm">
                          <span className="inline-block bg-gray-200 text-gray-700 text-xs font-bold px-2 py-0.5 rounded mb-1">
                            {block.label}
                          </span>
                          <ul className="list-disc list-inside text-gray-600 pl-1 space-y-0.5">
                            {block.items.map((item, i) => (
                              <li key={i} className="leading-snug">{item}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* ⑥ ボタン */}
                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center text-[#B33E28] text-sm font-bold tracking-widest group-hover:text-[#8E2F1D] transition-colors uppercase w-fit">
                      詳しく見る <ArrowUpRight className="w-4 h-4 ml-1" />
                    </div>
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

        {/* 支援制度セクション */}
        <section className="mb-32">
          <div className="mb-16">
            <h2 className="font-serif text-3xl md:text-5xl tracking-wider font-bold text-primary mb-6">使える支援制度</h2>
            <p className="text-foreground/80 text-base md:text-lg leading-loose font-sans">
              復旧・復興に向けた、国や自治体の支援制度をご案内します。<br className="block md:hidden" />
              あなたの状況に合わせてご活用ください。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                badge: "石川県",
                badgeColor: "bg-[#1D3A52]",
                title: "なりわい再建支援補助金",
                catch: "工場・店舗の再建、\n機械設備の復旧に",
                content: "施設・設備の復旧費用を補助（中堅企業等も対象）",
                amount: "上限 15億円",
                condition: "補助率 3/4（中堅は1/2）",
                link: "#"
              },
              {
                badge: "国",
                badgeColor: "bg-[#2B2B2B]",
                title: "小規模事業者持続化補助金\n（災害支援枠）",
                catch: "販路開拓や、\n業務効率化の取り組みに",
                content: "機械装置等費、広報費、ウェブサイト関連費など",
                amount: "上限 200万円",
                condition: "売上減少の間接被害の場合は100万円",
                link: "#"
              },
              {
                badge: "能登町",
                badgeColor: "bg-[#B33E28]",
                title: "能登町なりわい再建\n支援補助金",
                catch: "県の補助金に対する\n「自己負担」を軽減",
                content: "「なりわい再建支援補助金」の対象経費から交付決定額を引いた額を補助",
                amount: "補助率 3/5",
                condition: "町への申請が必要",
                link: "#"
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl border border-border/50 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden group">
                {/* ヘッダーバッジ */}
                <div className={`${item.badgeColor} text-white px-6 py-3 font-bold tracking-widest text-sm flex items-center justify-between`}>
                  <span>【 {item.badge} 】</span>
                  <ArrowUpRight className="w-4 h-4 opacity-70" />
                </div>
                
                <div className="p-8 flex flex-col flex-grow">
                  {/* キャッチコピー */}
                  <h3 className="text-lg font-bold text-primary mb-4 leading-relaxed whitespace-pre-line min-h-[3.5em]">
                    {item.catch}
                  </h3>
                  
                  {/* 制度名 */}
                  <div className="mb-6 pb-6 border-b border-dashed border-gray-200">
                    <p className="text-sm text-muted-foreground mb-1 font-bold">制度名</p>
                    <p className="text-xl font-bold text-foreground whitespace-pre-line leading-snug">
                      {item.title}
                    </p>
                  </div>

                  {/* 支援内容 */}
                  <div className="mb-6 flex-grow">
                    <p className="text-sm text-muted-foreground mb-2 font-bold">支援内容</p>
                    <p className="text-sm text-foreground/80 leading-relaxed">
                      {item.content}
                    </p>
                  </div>

                  {/* 金額・条件 */}
                  <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <Coins className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-muted-foreground block mb-0.5">金額</span>
                        <span className="text-base font-bold text-foreground">{item.amount}</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Construction className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs font-bold text-muted-foreground block mb-0.5">条件など</span>
                        <span className="text-sm font-medium text-foreground">{item.condition}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 一覧ボタン */}
          <div className="text-center">
            <button className="inline-flex items-center justify-center gap-3 bg-primary text-white px-10 py-4 rounded-full font-bold tracking-widest hover:bg-primary/90 transition-all hover:scale-105 shadow-lg hover:shadow-xl group">
              支援制度一覧を見る
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
