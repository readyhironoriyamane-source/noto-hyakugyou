import React from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SUPPORT_ITEMS } from '@/data/supportData';
import { industries } from '@/data/industries';
import { ChevronRight, Download, ExternalLink, CheckCircle2, Calendar, User, FileText, Phone, Clock, Printer, ArrowRight } from 'lucide-react';
import NotFound from './NotFound';

interface SupportDetailPageProps {
  params: { id: string };
}

export default function SupportDetailPage({ params }: SupportDetailPageProps) {
  if (!params || !params.id) return <NotFound />;
  
  const id = parseInt(params.id, 10);
  const item = SUPPORT_ITEMS.find((i) => i.id === id) as any;
  
  if (!item) return <NotFound />;

  // ID 11（なりわい再建支援補助金）の場合の特別レイアウト
  if (id === 11) {
    // この支援制度を活用している記事を検索（relatedIndustriesに101が含まれているか、またはindustriesデータ内で明示的に関連付けられているか）
    // ここでは簡易的にID 101（本合クリーニング）を関連事例として扱う
    const relatedCaseStudies = industries.filter(ind => ind.id === 101);

    return (
      <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
        <Header />
        
        <main className="pt-[80px] pb-20">
          {/* A. ヘッダーエリア */}
          <div className="bg-white border-b border-slate-200">
            <div className="max-w-4xl mx-auto px-6 py-8">
              {/* パンくずリスト */}
              <nav className="flex items-center text-xs text-slate-500 mb-6 overflow-x-auto whitespace-nowrap">
                <Link href="/" className="hover:text-slate-800 transition-colors no-underline">TOP</Link>
                <ChevronRight className="w-3 h-3 mx-2 shrink-0" />
                <Link href="/supports" className="hover:text-slate-800 transition-colors no-underline">支援制度一覧</Link>
                <ChevronRight className="w-3 h-3 mx-2 shrink-0" />
                <span className="text-slate-800 font-medium truncate">{item.mainTitle}</span>
              </nav>
              
              {/* バッジ */}
              <span className={`inline-block px-3 py-1 text-xs font-bold text-white rounded-full mb-4 ${item.badgeColor}`}>
                {item.badge}
              </span>
              
              {/* タイトル */}
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 leading-tight">
                {item.mainTitle}
              </h1>
              <p className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 leading-tight">
                <span className="bg-gradient-to-t from-yellow-200/60 from-35% to-transparent to-35% px-1">{item.subTitle}</span>
              </p>
              
              {/* リード文 */}
              <p className="text-base text-slate-600 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>

          <div className="max-w-4xl mx-auto px-6 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* 左カラム：メインコンテンツ */}
              <div className="lg:col-span-2 space-y-10 order-2 lg:order-1">
                
                {/* B. スペック強調エリア */}
                <section className="bg-slate-100 rounded-lg p-6 border border-slate-200 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">支援金額</h3>
                      <p className="text-3xl font-bold text-slate-900">{item.specAmount}</p>
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">補助率・条件</h3>
                      <p className="text-xl font-medium text-slate-800">{item.specCondition}</p>
                    </div>
                  </div>
                </section>

                {/* スマホビュー用：お問い合わせエリア（PCでは非表示） */}
                <section className="lg:hidden">
                  <div className="bg-[#1D3A52] rounded-lg shadow-md overflow-hidden text-white p-8">
                    <h2 className="flex items-center gap-2 text-xl font-bold mb-6 border-b border-slate-600 pb-4">
                      <Phone className="w-6 h-6" />
                      お問い合わせ・相談先
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-slate-300 mb-1">お問い合わせ先</p>
                        <p className="text-xl font-bold">{item.contactInfo?.name || '能登町商工会'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-slate-300 mb-1">電話番号</p>
                        <p className="text-3xl font-bold tracking-wider">{item.contactInfo?.phone || '076-204-6856'}</p>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-300 bg-[#2a4d6b] p-3 rounded inline-block">
                        <Clock className="w-4 h-4" />
                        <span>{item.contactInfo?.hours || '平日 8:30〜17:15'}</span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 必要書類 */}
                <section>
                  <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                    <FileText className="w-5 h-5 text-slate-500" />
                    必要書類
                  </h2>
                  <div className="bg-white p-5 rounded-lg border border-slate-100">
                    <ul className="space-y-3">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#2D7F8F] shrink-0 mt-0.5" />
                        <span className="text-slate-700">交付申請書（様式第1号）</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#2D7F8F] shrink-0 mt-0.5" />
                        <span className="text-slate-700">事業計画書（復旧する施設・設備の詳細）</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#2D7F8F] shrink-0 mt-0.5" />
                        <span className="text-slate-700">見積書（2社以上）</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#2D7F8F] shrink-0 mt-0.5" />
                        <span className="text-slate-700">被災証明書または罹災証明書の写し</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-[#2D7F8F] shrink-0 mt-0.5" />
                        <span className="text-slate-700">直近の決算書（1期分）</span>
                      </li>
                    </ul>
                  </div>
                </section>

                {/* スマホビュー用：CTAエリア（PCでは非表示） */}
                <div className="lg:hidden space-y-6">
                  {/* アクションボタン */}
                  <div className="space-y-4">
                    <a 
                      href={item.officialLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[#2D7F8F] text-white font-bold py-4 px-8 rounded-lg hover:bg-[#236875] transition-colors shadow-md no-underline text-lg"
                    >
                      公式サイトで詳細を見る
                      <ExternalLink className="w-5 h-5" />
                    </a>
                    
                    <button 
                      className="flex items-center justify-center gap-2 w-full bg-white text-[#2D7F8F] font-bold py-4 px-8 rounded-lg border-2 border-[#2D7F8F] hover:bg-slate-50 transition-colors shadow-sm text-lg"
                      onClick={() => alert('実際のPDFダウンロードリンクは公式サイトをご確認ください')}
                    >
                      申請書類をダウンロード
                      <Download className="w-5 h-5" />
                    </button>

                    <button 
                      className="flex items-center justify-center gap-2 w-full bg-white text-slate-700 font-bold py-3 px-6 rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm no-print mt-4"
                      onClick={() => window.print()}
                    >
                      このページを印刷する
                      <Printer className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {/* 免責事項 */}
                  <p className="text-slate-700 leading-relaxed">
                    ※本ページの情報は2026年3月時点のものです。最新の募集要領や様式は、必ず公式サイトにてご確認ください。
                  </p>
                </div>

                {/* 活用事例リンク */}
                {relatedCaseStudies.length > 0 && (
                  <section>
                    <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                      <User className="w-5 h-5 text-slate-500" />
                      この支援制度を活用した事業者の事例
                    </h2>
                    <div className="space-y-4">
                      {relatedCaseStudies.map((study) => (
                        <Link key={study.id} href={`/industry/${study.id}`}>
                          <div className="group block bg-white border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-100 overflow-hidden shrink-0">
                                  <img src={study.image} alt={study.operator} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                  <p className="font-bold text-slate-900 group-hover:text-[#2D7F8F] transition-colors">
                                    {study.operator}
                                  </p>
                                  <p className="text-sm text-slate-500 line-clamp-1">
                                    {study.title}
                                  </p>
                                </div>
                              </div>
                              <ArrowRight className="w-5 h-5 text-slate-400 group-hover:text-[#2D7F8F] transition-colors" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
                
              </div>
              
              {/* 右カラム：CTA（PCのみ表示） */}
              <div className="lg:col-span-1 order-1 lg:order-2 hidden lg:block">
                <div className="sticky top-24 space-y-6">
                  
                  {/* お問い合わせ・相談先（PC用：右カラム最上部） */}
                  <section>
                    <div className="bg-[#1D3A52] rounded-lg shadow-md overflow-hidden text-white p-6">
                      <h2 className="flex items-center gap-2 text-lg font-bold mb-4 border-b border-slate-600 pb-3 whitespace-nowrap">
                        <Phone className="w-5 h-5 shrink-0" />
                        お問い合わせ・相談先
                      </h2>
                      <div className="space-y-3">
                        <div>
                          <p className="text-xs text-slate-300 mb-1">お問い合わせ先</p>
                          <p className="text-lg font-bold whitespace-nowrap">{item.contactInfo?.name || '能登町商工会'}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-300 mb-1">電話番号</p>
                          <p className="text-2xl font-bold tracking-wider whitespace-nowrap">{item.contactInfo?.phone || '076-204-6856'}</p>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-slate-300 bg-[#2a4d6b] p-2 rounded inline-block whitespace-nowrap">
                          <Clock className="w-3 h-3 shrink-0" />
                          <span>{item.contactInfo?.hours || '平日 8:30〜17:15'}</span>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* アクションボタン */}
                  <div className="space-y-3">
                    <a 
                      href={item.officialLink || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-[#2D7F8F] text-white font-bold py-3 px-4 rounded-lg hover:bg-[#236875] transition-colors shadow-md no-underline text-base whitespace-nowrap"
                    >
                      公式サイトで詳細を見る
                      <ExternalLink className="w-4 h-4 shrink-0" />
                    </a>
                    
                    <button 
                      className="flex items-center justify-center gap-2 w-full bg-white text-[#2D7F8F] font-bold py-3 px-4 rounded-lg border-2 border-[#2D7F8F] hover:bg-slate-50 transition-colors shadow-sm text-base whitespace-nowrap"
                      onClick={() => alert('実際のPDFダウンロードリンクは公式サイトをご確認ください')}
                    >
                      申請書類をダウンロード
                      <Download className="w-4 h-4 shrink-0" />
                    </button>

                    <button 
                      className="flex items-center justify-center gap-2 w-full bg-white text-slate-700 font-bold py-2 px-4 rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm no-print mt-4 text-sm whitespace-nowrap"
                      onClick={() => window.print()}
                    >
                      このページを印刷する
                      <Printer className="w-3 h-3 shrink-0" />
                    </button>
                  </div>
                  
                  {/* 免責事項 */}
                  <p className="text-slate-700 leading-relaxed">
                    ※本ページの情報は2026年3月時点のものです。最新の募集要領や様式は、必ず公式サイトにてご確認ください。
                  </p>
                  
                </div>
              </div>
              
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  // 通常レイアウト（ID 11以外）
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Header />
      
      <main className="pt-[80px] pb-20">
        {/* ヘッダーエリア */}
        <div className="bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* パンくずリスト */}
            <nav className="flex items-center text-xs text-slate-500 mb-6 overflow-x-auto whitespace-nowrap">
              <Link href="/" className="hover:text-slate-800 transition-colors no-underline">TOP</Link>
              <ChevronRight className="w-3 h-3 mx-2 shrink-0" />
              <Link href="/supports" className="hover:text-slate-800 transition-colors no-underline">支援制度一覧</Link>
              <ChevronRight className="w-3 h-3 mx-2 shrink-0" />
              <span className="text-slate-800 font-medium truncate">{item.mainTitle}</span>
            </nav>
            
            {/* バッジ */}
            <span className={`inline-block px-3 py-1 text-xs font-bold text-white rounded-full mb-4 ${item.badgeColor}`}>
              {item.badge}
            </span>
            
            {/* タイトル */}
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 leading-tight">
              {item.mainTitle}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-6 leading-tight">
              {item.subTitle}
            </p>
            
            {/* リード文 */}
            <p className="text-base text-slate-600 leading-relaxed">
              {item.description}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* 左カラム：メインコンテンツ */}
            <div className="lg:col-span-2 space-y-10">
              
              {/* スペック強調エリア */}
              <section className="bg-slate-100 rounded-lg p-6 border border-slate-200 shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">支援金額</h3>
                    <p className="text-3xl font-bold text-slate-900">{item.specAmount}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">補助率・条件</h3>
                    <p className="text-xl font-medium text-slate-800">{item.specCondition}</p>
                  </div>
                </div>
              </section>
              
              {/* 概要・対象者 */}
              <section>
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                  <User className="w-5 h-5 text-slate-500" />
                  対象となる方
                </h2>
                <div className="bg-white p-6 rounded-lg border border-slate-100 leading-relaxed text-slate-700">
                  <p>
                    {/* ダミーテキスト：実際にはデータから取得すべき詳細情報 */}
                    石川県内で事業を行っている中小企業・小規模事業者等のうち、令和6年能登半島地震により被害を受けた方が対象です。
                    施設や設備の復旧にかかる費用の一部を補助します。
                  </p>
                </div>
              </section>

              {/* 必要書類 */}
              <section>
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                  <FileText className="w-5 h-5 text-slate-500" />
                  必要書類
                </h2>
                <div className="bg-white p-5 rounded-lg border border-slate-100">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#2D7F8F] shrink-0 mt-0.5" />
                      <span className="text-slate-700">交付申請書</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#2D7F8F] shrink-0 mt-0.5" />
                      <span className="text-slate-700">事業計画書</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-[#2D7F8F] shrink-0 mt-0.5" />
                      <span className="text-slate-700">罹災証明書など</span>
                    </li>
                  </ul>
                </div>
              </section>
              
            </div>
            
            {/* 右カラム：CTA */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                
                {/* お問い合わせ */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
                  <h3 className="flex items-center gap-2 font-bold text-slate-900 mb-4">
                    <Phone className="w-4 h-4 text-slate-500" />
                    お問い合わせ
                  </h3>
                  <p className="font-bold text-lg mb-1">{item.contactInfo?.name || '担当窓口'}</p>
                  <p className="text-2xl font-bold text-[#2D7F8F] mb-2">{item.contactInfo?.phone || '000-000-0000'}</p>
                  <p className="text-xs text-slate-500">{item.contactInfo?.hours || '平日 9:00〜17:00'}</p>
                </div>

                {/* アクションボタン */}
                <div className="space-y-3">
                  <a 
                    href={item.officialLink || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#2D7F8F] text-white font-bold py-3 px-6 rounded-lg hover:bg-[#236875] transition-colors shadow-md no-underline"
                  >
                    公式サイトを見る
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  
                  <button 
                    className="flex items-center justify-center gap-2 w-full bg-white text-slate-700 font-bold py-3 px-6 rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm"
                    onClick={() => alert('実際のPDFダウンロードリンクは公式サイトをご確認ください')}
                  >
                    申請書類ダウンロード
                    <Download className="w-4 h-4" />
                  </button>
                </div>
                
              </div>
            </div>
            
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
