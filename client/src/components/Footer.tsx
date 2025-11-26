import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About Section */}
          <div>
            <h3 className="font-serif text-xl text-white mb-4 tracking-wider">
              能登百業録
            </h3>
            <p className="text-sm leading-relaxed text-stone-400">
              能登半島に根付く多様な生業を記録し、<br />
              次世代へ継承するプロジェクト
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4 tracking-wider">
              ナビゲーション
            </h4>
            <nav className="space-y-3">
              <a 
                href="/" 
                className="block text-sm text-stone-400 hover:text-white transition-colors"
              >
                トップページ
              </a>
              <a 
                href="/map" 
                className="block text-sm text-stone-400 hover:text-white transition-colors"
              >
                地図から探す
              </a>
              <a 
                href="/about" 
                className="block text-sm text-stone-400 hover:text-white transition-colors"
              >
                百業について
              </a>
            </nav>
          </div>

          {/* Contact & Legal */}
          <div>
            <h4 className="font-serif text-lg text-white mb-4 tracking-wider">
              お問い合わせ
            </h4>
            <div className="space-y-3">
              <a 
                href="mailto:info@noto-hyakugyou.example.com" 
                className="flex items-center gap-2 text-sm text-stone-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                info@noto-hyakugyou.example.com
              </a>
              <a 
                href="/privacy" 
                className="block text-sm text-stone-400 hover:text-white transition-colors mt-6"
              >
                プライバシーポリシー
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-stone-800 text-center">
          <p className="text-sm text-stone-500">
            © 2024 能登百業録. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
