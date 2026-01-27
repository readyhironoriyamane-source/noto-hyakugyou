'use client'; // useStateを使用するため必須

import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // スクロール検知ロジック
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // メニューが開いているときは常に表示
      if (isOpen) {
        setIsVisible(true);
        return;
      }

      // 最上部にいるときは常に表示
      if (currentScrollY < 10) {
        setIsVisible(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      // 下にスクロールしたら隠す、上にスクロールしたら出す
      if (currentScrollY > lastScrollY.current) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  return (
    <header 
      className={`bg-[#F9F8F4] border-b border-gray-200 sticky top-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="max-w-[1140px] mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* --- ロゴエリア (既存維持) --- */}
        <Link href="/" className="flex items-center hover:opacity-80 transition-opacity z-50 relative cursor-pointer no-underline">
          <div className="relative h-10 w-10 mr-3 shrink-0"> 
            <img 
              src="/images/logo.png" 
              alt="ロゴ"
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-2xl font-bold text-[#1D3A52] font-serif leading-none mt-1">
            能登百業録
          </h1>
        </Link>

        {/* --- PC用ナビゲーション (md以上で表示) --- */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold text-[#1D3A52]">
          <a href="/#guidepost" className="hover:text-[#B33E28] transition-colors cursor-pointer no-underline">
            商いの道しるべ
          </a>
          <Link href="/supports" className="hover:text-[#B33E28] transition-colors cursor-pointer no-underline">
            支援制度一覧
          </Link>
          <Link href="/contact" className="px-5 py-2 bg-[#1D3A52] text-white rounded-full hover:bg-[#2c5270] transition-colors cursor-pointer no-underline">
            お問い合わせ
          </Link>
        </nav>

        {/* --- スマホ用ハンバーガーボタン (md以下で表示) --- */}
        <button 
          onClick={toggleMenu}
          className="md:hidden z-50 p-2 text-[#1D3A52] focus:outline-none"
          aria-label="メニューを開く"
        >
          {isOpen ? (
            // 閉じるアイコン (×)
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            // ハンバーガーアイコン (三)
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* --- スマホ用全画面メニュー (オーバーレイ) --- */}
        <div className={`
          fixed inset-0 bg-[#F9F8F4] z-40 flex flex-col items-center justify-center transition-opacity duration-300
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}>
          <nav className="flex flex-col items-center gap-8 text-[#1D3A52]">
            <a 
              href="/#guidepost" 
              onClick={() => setIsOpen(false)}
              className="text-2xl font-bold font-serif hover:text-[#B33E28] transition-colors cursor-pointer no-underline"
            >
              商いの道しるべ
            </a>
            <Link 
              href="/supports" 
              onClick={() => setIsOpen(false)}
              className="text-2xl font-bold font-serif hover:text-[#B33E28] transition-colors cursor-pointer no-underline"
            >
              支援制度一覧
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setIsOpen(false)}
              className="text-2xl font-bold font-serif hover:text-[#B33E28] transition-colors cursor-pointer no-underline"
            >
              お問い合わせ
            </Link>
          </nav>
        </div>

      </div>
    </header>
  );
};
