import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-6 py-24">
        {/* Title */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="w-12 h-[2px] bg-stone-900"></span>
            <h1 className="font-serif text-4xl md:text-5xl tracking-wider text-stone-900">
              プライバシーポリシー
            </h1>
          </div>
          <p className="text-stone-600 leading-relaxed pl-16">
            能登百業録（以下「当サイト」）における個人情報の取り扱いについて、以下のとおりプライバシーポリシーを定めます。
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12 text-stone-700 leading-relaxed">
          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4 tracking-wider">
              個人情報の収集について
            </h2>
            <p>
              当サイトでは、お問い合わせの際に氏名・メールアドレス等の個人情報をご入力いただく場合があります。
              これらの個人情報は、お問い合わせへの回答や必要な情報を提供する目的でのみ使用し、他の目的で使用することはありません。
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4 tracking-wider">
              個人情報の管理
            </h2>
            <p>
              当サイトは、お客様の個人情報を正確かつ最新の状態に保ち、個人情報への不正アクセス・紛失・破損・改ざん・漏洩などを防止するため、
              セキュリティシステムの維持・管理体制の整備等の必要な措置を講じ、安全対策を実施し個人情報の厳重な管理を行います。
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4 tracking-wider">
              個人情報の第三者への開示・提供の禁止
            </h2>
            <p>
              当サイトは、お客様よりお預かりした個人情報を適切に管理し、次のいずれかに該当する場合を除き、
              個人情報を第三者に開示いたしません。
            </p>
            <ul className="list-disc list-inside mt-4 space-y-2 pl-4">
              <li>お客様の同意がある場合</li>
              <li>法令に基づき開示することが必要である場合</li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4 tracking-wider">
              アクセス解析ツールについて
            </h2>
            <p>
              当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。
              このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。
              このトラフィックデータは匿名で収集されており、個人を特定するものではありません。
              この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4 tracking-wider">
              免責事項
            </h2>
            <p>
              当サイトからリンクやバナーなどによって他のサイトに移動した場合、移動先サイトで提供される情報、
              サービス等について一切の責任を負いません。
            </p>
            <p className="mt-4">
              当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-stone-900 mb-4 tracking-wider">
              プライバシーポリシーの変更について
            </h2>
            <p>
              当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、
              本ポリシーの内容を適宜見直しその改善に努めます。
              修正された最新のプライバシーポリシーは常に本ページにて開示されます。
            </p>
          </section>

          <section className="pt-8 border-t border-stone-200">
            <p className="text-stone-600">
              制定日：2024年11月26日
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
