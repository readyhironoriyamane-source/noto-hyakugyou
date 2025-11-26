import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About & Noto Town Hall Info */}
          <div>
            <h3 className="font-serif text-xl text-white mb-4 tracking-wider">
              能登百業録
            </h3>
            <p className="text-sm leading-relaxed text-stone-400 mb-6">
              能登半島に根付く多様な生業を記録し、<br />
              次世代へ継承するプロジェクト
            </p>
            <h4 className="font-serif text-base text-white mb-2 tracking-wider">
              能登町役場
            </h4>
            <div className="text-xs leading-relaxed text-stone-400 space-y-1">
              <p>法人番号 5000020174637</p>
              <p>〒927-0492　石川県鳳珠郡能登町宇出津ト字50番地1</p>

              <p className="mt-2">開庁時間：8時30分から17時15分</p>
              <p>(土曜日・日曜日・祝日、年末年始を除く)</p>
              <p>窓口延長：能登町役場のみ毎週木曜日17時15分から18時30分(祝日は除く)</p>
            </div>
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
                href="/contact" 
                className="flex items-center gap-2 text-sm text-stone-400 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
                お問い合わせフォーム
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-stone-800 text-center">
          <p className="text-sm text-stone-500">
            © 2026 能登百業録. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
