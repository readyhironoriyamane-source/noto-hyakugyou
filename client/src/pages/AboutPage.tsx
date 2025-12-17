import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      {/* Hero Section */}
      <section className="relative bg-slate-900 text-white py-24 md:py-32">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="font-serif text-4xl md:text-6xl mb-6 leading-tight">
              能登百業録について
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              能登半島に息づく100の生業を記録し、<br />
              未来へつなぐためのプロジェクト
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto space-y-24">
          
          {/* プロジェクト概要 */}
          <section>
            <h2 className="font-serif text-3xl mb-8 flex items-center gap-4">
              <span className="w-12 h-[2px] bg-slate-900"></span>
              プロジェクト概要
            </h2>
            <div className="space-y-6 text-slate-700 leading-loose">
              <p className="text-lg">
                「能登百業録」は、能登半島で営まれている多様な生業を記録し、その価値を広く伝えるためのプロジェクトです。
                漁業、農業、工芸、製造業、観光業など、能登の暮らしと文化を支える100の産業を取材し、
                それぞれの物語、技術、そして未来への想いを記録しています。
              </p>
              <p>
                2024年1月の能登半島地震により、多くの産業が大きな被害を受けました。
                しかし、困難な状況の中でも、能登の人々は生業を守り、再建に向けて歩み続けています。
                このプロジェクトは、そうした能登の産業の「今」を記録し、
                その魅力と価値を次世代へ、そして世界へ伝えることを目指しています。
              </p>
            </div>
          </section>

          {/* プロジェクトの意義 */}
          <section className="pt-12 border-t border-slate-200">
            <h2 className="font-serif text-3xl mb-8 flex items-center gap-4">
              <span className="w-12 h-[2px] bg-slate-900"></span>
              なぜ記録するのか
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-8 border border-slate-200">
                <div className="text-4xl mb-4">📖</div>
                <h3 className="font-serif text-xl mb-3">記憶を残す</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  失われつつある技術や知恵、産業の歴史を記録し、次世代に継承します。
                </p>
              </div>
              <div className="bg-white p-8 border border-slate-200">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="font-serif text-xl mb-3">つながりを生む</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  産業同士、そして産業と人々をつなぎ、新たな協力関係や支援の輪を広げます。
                </p>
              </div>
              <div className="bg-white p-8 border border-slate-200">
                <div className="text-4xl mb-4">💡</div>
                <h3 className="font-serif text-xl mb-3">価値を伝える</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  能登の産業が持つ独自の価値や魅力を発信し、関心と理解を深めます。
                </p>
              </div>
            </div>
          </section>

          {/* 関わり方 */}
          <section className="pt-12 border-t border-slate-200">
            <h2 className="font-serif text-3xl mb-8 flex items-center gap-4">
              <span className="w-12 h-[2px] bg-slate-900"></span>
              あなたにできること
            </h2>
            <div className="space-y-8">
              <div className="bg-slate-900 text-white p-8 md:p-12">
                <h3 className="font-serif text-2xl mb-4">訪れる</h3>
                <p className="text-slate-300 leading-relaxed mb-6">
                  能登を訪れ、実際に産業の現場を見学したり、商品を購入したりすることで、
                  直接的な支援につながります。各産業の詳細ページには訪問情報を掲載しています。
                </p>
                <a href="/map" className="inline-flex items-center gap-2 text-white border-b border-white hover:border-slate-400 hover:text-slate-400 transition-colors">
                  地図から探す
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-8 border border-slate-200">
                  <h3 className="font-serif text-xl mb-3">商品を購入する</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    能登の産品をオンラインや店頭で購入することで、産業を経済的に支援できます。
                  </p>
                </div>
                <div className="bg-white p-8 border border-slate-200">
                  <h3 className="font-serif text-xl mb-3">情報を共有する</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    SNSなどで能登の産業について発信し、より多くの人に知ってもらうことができます。
                  </p>
                </div>
                <div className="bg-white p-8 border border-slate-200">
                  <h3 className="font-serif text-xl mb-3">後継者になる</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    能登に移住し、産業の担い手として新たな一歩を踏み出すことができます。
                  </p>
                </div>
                <div className="bg-white p-8 border border-slate-200">
                  <h3 className="font-serif text-xl mb-3">応援する</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    クラウドファンディングや寄付を通じて、産業の再建や発展を支援できます。
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* プロジェクト進捗 */}
          <section className="pt-12 border-t border-slate-200">
            <h2 className="font-serif text-3xl mb-8 flex items-center gap-4">
              <span className="w-12 h-[2px] bg-slate-900"></span>
              プロジェクトの進捗
            </h2>
            <div className="bg-slate-100 p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-5xl font-serif text-slate-900 mb-2">3</div>
                  <div className="text-sm text-slate-600 tracking-widest">記録済み産業</div>
                </div>
                <div>
                  <div className="text-5xl font-serif text-slate-900 mb-2">100</div>
                  <div className="text-sm text-slate-600 tracking-widest">目標産業数</div>
                </div>
                <div>
                  <div className="text-5xl font-serif text-slate-900 mb-2">97</div>
                  <div className="text-sm text-slate-600 tracking-widest">残り産業数</div>
                </div>
              </div>
              <p className="text-sm text-slate-600 text-center mt-8">
                ※ 2024年11月現在の進捗状況です
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="pt-12 border-t border-slate-200">
            <div className="bg-slate-900 text-white p-12 text-center">
              <h3 className="font-serif text-3xl mb-4">能登の生業を未来へ</h3>
              <p className="text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                一つひとつの産業が、能登の暮らしと文化を支えています。<br />
                あなたも、能登の生業を未来へつなぐ一員になりませんか。
              </p>
              <a href="/" className="inline-block bg-white text-slate-900 px-8 py-4 font-serif text-lg hover:bg-slate-100 transition-colors">
                産業を見る
              </a>
            </div>
          </section>

        </div>
      </div>
      
      <Footer />
    </div>
  );
}
