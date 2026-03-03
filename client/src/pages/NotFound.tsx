import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Home, List } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-6">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Number */}
          <div className="mb-8">
            <h1 className="font-serif text-9xl md:text-[12rem] text-slate-200 leading-none">
              404
            </h1>
          </div>
          
          {/* Title */}
          <div className="mb-6">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-12 h-[2px] bg-slate-900"></span>
              <h2 className="font-serif text-3xl md:text-4xl tracking-wider text-slate-900">
                ページが見つかりません
              </h2>
              <span className="w-12 h-[2px] bg-slate-900"></span>
            </div>
          </div>
          
          {/* Description */}
          <p className="text-slate-600 leading-relaxed mb-12 max-w-md mx-auto">
            お探しのページは移動または削除された可能性があります。<br />
            下記のリンクから能登の産業を探索してください。
          </p>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white hover:bg-slate-800 transition-colors tracking-widest text-sm no-underline"
            >
              <Home className="w-4 h-4" />
              トップに戻る
            </a>
            <a 
              href="/supports"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-colors tracking-widest text-sm no-underline"
            >
              <List className="w-4 h-4" />
              支援制度一覧に戻る
            </a>
          </div>
          
          {/* Decorative Element */}
          <div className="mt-16 flex justify-center">
            <div className="w-1 h-24 bg-gradient-to-b from-slate-300 to-transparent"></div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
