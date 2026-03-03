export const ConsultationCTA = () => {
  return (
    <section className="bg-[#F9F8F4] pb-20 px-6">
      <div className="max-w-[1140px] mx-auto">
        
        {/* 深藍のCTAボックス */}
        <div className="bg-[#1D3A52] rounded-2xl p-10 md:p-14 text-center text-white shadow-lg relative overflow-hidden">
          
          {/* 装飾（背景にうっすら和柄や円を入れるのも良いですが、まずはシンプルに） */}
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold font-serif mb-4">
              どの制度を使えばいいか、分からない方へ
            </h2>
            <p className="text-gray-300 mb-8 leading-relaxed">
              「自分の状況で使えるものはある？」「手続きが難しそう」<br className="hidden md:block" />
              そんな時は、お近くの商工会・商工会議所の専門相談員にご相談ください。<br className="hidden md:block" />
              あなたの復興への道のりを、私たちがサポートします。
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              {/* ボタン1：電話相談（スマホでタップしやすい） */}
              <a 
                href="#" 
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#1D3A52] font-bold rounded-full hover:bg-gray-100 transition-colors min-w-[240px] no-underline"
              >
                <span className="mr-2">📞</span> 商工会に電話で相談
              </a>
              {/* ボタン2：窓口一覧 */}
              <a 
                href="#" 
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-colors min-w-[240px] no-underline"
              >
                <span className="mr-2">🏛</span> 相談窓口の一覧を見る
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConsultationCTA;
