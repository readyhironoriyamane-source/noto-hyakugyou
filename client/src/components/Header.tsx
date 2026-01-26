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
               能登百業録
             </a>
          </div>
          
          <div className="flex items-center gap-4 md:gap-8">
            {/* 将来的なナビゲーション拡張エリア */}
          </div>
        </div>
      </header>
    </>
  );
}
