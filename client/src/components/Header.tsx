import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Fixed Navigation */}
      <header className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${isScrolled ? 'bg-stone-50/90 backdrop-blur-sm py-4 border-b border-stone-200' : 'bg-transparent py-8'}`}>
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-4 z-50">
             <a href="/" className={`font-serif font-bold text-2xl tracking-widest transition-colors ${isScrolled ? 'text-stone-900' : 'text-stone-900'}`}>
               能登百業録
             </a>
          </div>
          
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-8 text-sm tracking-widest font-medium">
              <a 
                href="/about" 
                className={`transition-colors ${isScrolled ? 'text-stone-900 hover:text-stone-600' : 'text-stone-900 hover:text-stone-600'}`}
              >
                百業について
              </a>
              <a 
                href="/map" 
                className={`transition-colors ${isScrolled ? 'text-stone-900 hover:text-stone-600' : 'text-stone-900 hover:text-stone-600'}`}
              >
                地図から探す
              </a>
            </nav>
            <button 
              className={`md:hidden ${isScrolled ? 'text-stone-900' : 'text-stone-900'}`}
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
          <div className="absolute top-0 right-0 w-64 h-full bg-stone-50 shadow-2xl">
            <div className="flex flex-col h-full">
              {/* ヘッダー */}
              <div className="flex justify-between items-center p-6 border-b border-stone-200">
                <h2 className="font-serif text-xl tracking-widest">メニュー</h2>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-stone-900"
                  aria-label="閉じる"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* ナビゲーション */}
              <nav className="flex flex-col p-6 space-y-6">
                <a 
                  href="/about" 
                  className="text-lg tracking-widest text-stone-900 hover:text-stone-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  百業について
                </a>
                <a 
                  href="/map" 
                  className="text-lg tracking-widest text-stone-900 hover:text-stone-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  地図から探す
                </a>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
