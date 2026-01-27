import React from 'react';
import { Link } from 'wouter';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { SUPPORT_ITEMS } from '@/data/supportData';
import { ChevronRight, Download, ExternalLink, CheckCircle2, Calendar, User, FileText, Phone, Clock, Printer } from 'lucide-react';
import NotFound from './NotFound';

interface SupportDetailPageProps {
  params: { id: string };
}

export default function SupportDetailPage({ params }: SupportDetailPageProps) {
  if (!params || !params.id) return <NotFound />;
  
  const id = parseInt(params.id, 10);
  const item = SUPPORT_ITEMS.find((i) => i.id === id);
  
  if (!item) return <NotFound />;

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
              <span className="text-slate-800 font-medium truncate">{item.subTitle}</span>
            </nav>
            
            {/* バッジ */}
            <span className={`inline-block px-3 py-1 text-xs font-bold text-white rounded-full mb-4 ${item.badgeColor}`}>
              {item.badge}
            </span>
            
            {/* タイトル */}
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight">
              {item.subTitle}
            </h1>
            
            {/* リード文 */}
            <p className="text-lg text-slate-600 leading-relaxed">
              {item.mainTitle}。{item.description}
            </p>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-6 mt-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* 左カラム：メインコンテンツ */}
            <div className="lg:col-span-2 space-y-10">
              
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
              
              {/* C. 詳細情報セクション */}
              
              {/* 対象者 */}
              <section>
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                  <User className="w-5 h-5 text-slate-500" />
                  対象者
                </h2>
                <p className="text-slate-700 leading-relaxed bg-white p-5 rounded-lg border border-slate-100">
                  {item.targetAudience}
                </p>
              </section>
              
              {/* スケジュール */}
              <section>
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                  <Calendar className="w-5 h-5 text-slate-500" />
                  申請期限・スケジュール
                </h2>
                <div className="bg-white p-5 rounded-lg border border-slate-100">
                  <p className="text-slate-700 font-medium mb-2">
                    申請期限：<span className="text-red-600">{item.applicationDeadline}</span>
                  </p>
                  <p className="text-sm text-slate-500">
                    ※予算の上限に達し次第、終了する場合があります。最新情報は公式サイトをご確認ください。
                  </p>
                </div>
              </section>
              
              {/* 申請フロー */}
              <section>
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                  <FileText className="w-5 h-5 text-slate-500" />
                  申請フロー
                </h2>
                <div className="bg-white p-6 rounded-lg border border-slate-100">
                  <div className="relative">
                    {/* 縦線 */}
                    <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-slate-200"></div>
                    
                    <ul className="space-y-6 relative">
                      {item.flow.map((step, index) => (
                        <li key={index} className="flex items-start gap-4">
                          <div className="shrink-0 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-sm font-bold z-10 ring-4 ring-white">
                            {index + 1}
                          </div>
                          <div className="pt-1">
                            <p className="text-slate-800 font-medium">{step}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
              
              {/* 必要書類 */}
              <section>
                <h2 className="flex items-center gap-2 text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-slate-500" />
                  必要書類
                </h2>
                <div className="bg-white p-5 rounded-lg border border-slate-100">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {item.requiredDocuments.map((doc, index) => (
                      <li key={index} className="flex items-start gap-2 text-slate-700">
                        <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
                        <span>{doc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
              
            </div>
            
            {/* 右カラム：CTA・お問い合わせ */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                
                {/* D. お問い合わせ・アクション */}
                <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
                  <div className="bg-slate-900 px-6 py-4">
                    <h3 className="text-white font-bold flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      お問い合わせ・相談先
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="font-bold text-slate-900 mb-2 whitespace-pre-line">{item.contactInfo.name}</p>
                    <p className="text-2xl font-bold text-slate-800 mb-4">{item.contactInfo.phone}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 p-3 rounded">
                      <Clock className="w-4 h-4" />
                      <span>{item.contactInfo.hours}</span>
                    </div>
                  </div>
                </div>
                
                {/* アクションボタン */}
                <div className="space-y-3">
                  <a 
                    href={item.officialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white font-bold py-4 px-6 rounded-lg hover:bg-slate-800 transition-colors shadow-sm no-underline"
                  >
                    公式サイトで募集要領を見る
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  
                  <button 
                    className="flex items-center justify-center gap-2 w-full bg-white text-slate-700 font-bold py-4 px-6 rounded-lg border-2 border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm"
                    onClick={() => alert('実際のPDFダウンロードリンクは公式サイトをご確認ください')}
                  >
                    申請書類をダウンロード
                    <Download className="w-4 h-4" />
                  </button>

                  <button 
                    className="flex items-center justify-center gap-2 w-full bg-white text-slate-700 font-bold py-3 px-6 rounded-lg border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-colors shadow-sm no-print"
                    onClick={() => window.print()}
                  >
                    このページを印刷する
                    <Printer className="w-4 h-4" />
                  </button>
                </div>
                
                {/* 免責事項 */}
                <p className="text-xs text-slate-400 leading-relaxed">
                  ※本ページの情報は{new Date().getFullYear()}年{new Date().getMonth() + 1}月時点のものです。最新の募集要領や様式は、必ず公式サイトにてご確認ください。
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
