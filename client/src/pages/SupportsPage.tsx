import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Construction } from 'lucide-react';

export default function SupportsPage() {
  return (
    <div className="min-h-screen bg-[#F9F8F4] font-sans text-gray-900 flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-200 max-w-2xl w-full">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Construction className="w-8 h-8 text-gray-400" />
          </div>
          <h1 className="text-2xl md:text-3xl font-serif font-bold text-[#1D3A52] mb-4">
            支援制度一覧ページ
          </h1>
          <p className="text-gray-500 font-medium mb-8">
            現在、システムメンテナンス中です。<br />
            より使いやすく、分かりやすいデザインにリニューアルを行っています。
          </p>
          <div className="inline-block px-4 py-2 bg-gray-100 text-gray-600 text-xs font-bold rounded tracking-widest">
            UNDER CONSTRUCTION
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
