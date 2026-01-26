import { useState, useEffect, useRef } from 'react';
import { Menu, X, Search } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // スクロール方向による表示制御
      // 下スクロールで隠す、上スクロールで表示
      // ただし、最上部付近では常に表示
      if (currentScrollY < 50) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // 下スクロール（かつ一定以上スクロールしている場合）
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY.current) {
        // 上スクロール
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Fixed Navigation */}
      <header 
        className={`fixed top-0 left-0 w-full z-40 transition-transform duration-300 ease-in-out bg-background/95 backdrop-blur-sm border-b border-border shadow-sm
          ${isVisible ? 'translate-y-0' : '-translate-y-full'}
          /* スマホ横持ちなど高さが低い場合は固定解除（CSSメディアクエリの代用としてクラスで制御は難しいが、JS制御と併用） */
          max-h-[60px] flex items-center
        `}
        style={{ height: '60px' }}
      >
        <div className="container flex justify-between items-center h-full">
          <div className="flex items-center gap-4 z-50">
             {/* UD対応: ロゴリンクは下線なし（no-underline-link） */}
             <a href="/" className="no-underline-link font-serif font-bold text-xl md:text-2xl tracking-widest text-foreground hover:opacity-80 transition-opacity flex items-center gap-2">
               {/* ロゴがあれば表示 */}
               {/* <img src="/logo.svg" alt="" className="h-8 w-auto hidden" /> */}
               能登百業録
             </a>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8">
            {/* PC用ナビゲーション（現在はシンプルに） */}
            <nav className="hidden md:flex items-center gap-6 text-sm tracking-widest font-medium">
              {/* 将来的な拡張用プレースホルダー */}
              {/* 
              <a href="/search" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors py-2 px-3 rounded-md hover:bg-secondary/50">
                <Search className="w-4 h-4" />
                <span>検索する</span>
              </a>
              */}
            </nav>

            {/* モバイルメニューボタン（UD対応: アイコン+ラベル） */}
            {/* 現状はメニュー項目がないため非表示にするが、将来のために構造は残す */}
            {/* 
            <button 
              className="flex flex-col items-center justify-center gap-1 text-foreground p-2 min-w-[48px] min-h-[48px] hover:bg-secondary/50 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "メニューを閉じる" : "メニューを開く"}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              <span className="text-[10px] font-bold leading-none">メニュー</span>
            </button>
            */}
          </div>
        </div>
      </header>

      {/* モバイルメニュー（現在は項目がないためコメントアウト） */}
      {/* 
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden top-[60px]">
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          <div className="absolute top-0 right-0 w-64 h-[calc(100vh-60px)] bg-background shadow-2xl border-l border-border overflow-y-auto">
            <nav className="flex flex-col p-6 space-y-6">
              <a 
                href="/" 
                className="text-lg tracking-widest text-foreground hover:text-primary transition-colors py-3 border-b border-border"
                onClick={() => setIsMenuOpen(false)}
              >
                トップページ
              </a>
            </nav>
          </div>
        </div>
      )}
      */}
    </>
  );
}
