import { Link } from 'wouter';
import { Phone, MessageCircle } from 'lucide-react';

export default function ConsultationCTA() {
  return (
    <div className="bg-[#F9F8F4] rounded-xl p-10 md:p-14 text-center border border-[#1D3A52]">
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#1D3A52] mb-6">
        どの制度を使えばいいか分からない方へ
      </h2>
      <p className="text-[#1D3A52] mb-10 font-medium leading-relaxed">
        専門の相談員が、あなたの状況に合わせて最適な制度をご案内します。<br className="hidden md:block" />
        まずはお近くの商工会へお電話ください。
      </p>
      <div className="flex flex-col md:flex-row justify-center gap-5">
        <a 
          href="tel:0768-62-0181" 
          className="flex items-center justify-center gap-3 bg-[#1D3A52] text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:bg-[#152C3F] transition-colors active:scale-95 no-underline"
          style={{ textDecoration: 'none' }}
        >
          <Phone className="w-5 h-5" />
          商工会に電話で相談する
        </a>
        <Link href="/contact">
          <a 
            className="flex items-center justify-center gap-3 bg-white text-[#1D3A52] font-bold py-4 px-8 rounded-lg shadow-sm border border-[#1D3A52] hover:bg-gray-50 transition-colors active:scale-95 no-underline"
            style={{ textDecoration: 'none' }}
          >
            <MessageCircle className="w-5 h-5" />
            相談窓口の一覧を見る
          </a>
        </Link>
      </div>
    </div>
  );
}
