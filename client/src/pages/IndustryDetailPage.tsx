import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { industries } from "@/data/industries";
import type { Industry } from "@/data/industries";
import { ArrowLeft, MapPin, Clock, Phone, Globe, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function IndustryDetailPage() {
  const [, params] = useRoute("/industry/:id");
  const [, setLocation] = useLocation();
  const [industry, setIndustry] = useState<Industry | null>(null);
  const [relatedIndustries, setRelatedIndustries] = useState<Industry[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (params?.id) {
      const foundIndustry = industries.find(i => i.id === parseInt(params.id));
      if (foundIndustry) {
        setIndustry(foundIndustry);
        
        // 関連産業を取得
        if (foundIndustry.relatedIndustries) {
          const related = foundIndustry.relatedIndustries
            .map(id => industries.find(i => i.id === id))
            .filter((i): i is Industry => i !== undefined);
          setRelatedIndustries(related);
        }
      }
    }
  }, [params?.id]);

  if (!industry) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">産業が見つかりません</h2>
          <Button onClick={() => setLocation("/")}>トップページに戻る</Button>
        </div>
      </div>
    );
  }

  const handleShare = (platform: "twitter" | "facebook" | "line") => {
    const url = window.location.href;
    const text = `${industry.title} - 能登百業録`;
    
    let shareUrl = "";
    switch (platform) {
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case "line":
        shareUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;
        break;
    }
    
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  return (
    <div className="min-h-screen bg-stone-50">
      {/* ヘッダー */}
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-stone-200/50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-serif font-bold">
              能登百業録
            </a>
            <nav className="hidden md:flex gap-8">
              <a href="/" className="text-sm hover:text-stone-600 transition-colors">
                すべて
              </a>
              <a href="/map" className="text-sm hover:text-stone-600 transition-colors">
                地図から探す
              </a>
              <a href="#" className="text-sm hover:text-stone-600 transition-colors">
                特集
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="pt-20 pb-16">
        <div className="container max-w-4xl mx-auto px-4">
          {/* 戻るボタン */}
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-sm text-stone-600 hover:text-stone-900 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            戻る
          </button>

          {/* ヒーロー画像（ギャラリー対応） */}
          <div className="relative w-full h-[400px] md:h-[500px] mb-8 rounded-lg overflow-hidden group">
            <img
              src={industry.gallery && industry.gallery.length > 0 ? industry.gallery[currentImageIndex] : industry.image}
              alt={industry.title}
              className="w-full h-full object-cover transition-opacity duration-300"
            />
            
            {/* ギャラリーナビゲーション */}
            {industry.gallery && industry.gallery.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? industry.gallery!.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="w-6 h-6 text-stone-900" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev === industry.gallery!.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="w-6 h-6 text-stone-900" />
                </button>
                
                {/* インジケーター */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {industry.gallery.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex
                          ? "bg-white w-8"
                          : "bg-white/50 hover:bg-white/75"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
            <div className="absolute top-4 left-4">
              <span className="inline-block px-4 py-2 bg-white/90 backdrop-blur-sm text-xs font-medium rounded-full">
                {industry.category}
              </span>
            </div>
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={() => handleShare("twitter")}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                title="Xでシェア"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleShare("facebook")}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                title="Facebookでシェア"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleShare("line")}
                className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                title="LINEでシェア"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* タイトルと基本情報 */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{industry.title}</h1>
            <p className="text-sm text-stone-500 mb-6 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {industry.location}
            </p>
            <p className="text-lg leading-relaxed text-stone-700">{industry.summary}</p>
          </div>

          {/* 必要性 */}
          <section className="mb-12 p-8 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-serif font-bold mb-4 border-b border-stone-200 pb-3">
              なぜ必要か
            </h2>
            <p className="text-stone-700 leading-relaxed whitespace-pre-line">{industry.necessity}</p>
          </section>

          {/* 歩みと展望 */}
          <section className="mb-12 p-8 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-serif font-bold mb-6 border-b border-stone-200 pb-3">
              歩みと展望
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2 text-stone-900">過去</h3>
                <p className="text-stone-700 leading-relaxed whitespace-pre-line">{industry.timeline.past}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-stone-900">現在</h3>
                <p className="text-stone-700 leading-relaxed whitespace-pre-line">{industry.timeline.present}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-stone-900">未来</h3>
                <p className="text-stone-700 leading-relaxed whitespace-pre-line">{industry.timeline.future}</p>
              </div>
            </div>
          </section>

          {/* 仕事を深く知る */}
          <section className="mb-12 p-8 bg-white rounded-lg shadow-sm">
            <h2 className="text-2xl font-serif font-bold mb-6 border-b border-stone-200 pb-3">
              仕事を深く知る
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-2 text-stone-900">受け継がれてきたもの</h3>
                <p className="text-stone-700 leading-relaxed whitespace-pre-line">{industry.deepDive.past}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-stone-900">今、取り組んでいること</h3>
                <p className="text-stone-700 leading-relaxed whitespace-pre-line">{industry.deepDive.present}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2 text-stone-900">次の世代へ</h3>
                <p className="text-stone-700 leading-relaxed whitespace-pre-line">{industry.deepDive.future}</p>
              </div>
            </div>
          </section>

          {/* 訪問情報 */}
          {industry.visitInfo && (
            <section className="mb-12 p-8 bg-white rounded-lg shadow-sm">
              <h2 className="text-2xl font-serif font-bold mb-6 border-b border-stone-200 pb-3">
                訪問情報
              </h2>
              <div className="space-y-4">
                {industry.visitInfo.hours && (
                  <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-stone-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-stone-900 mb-1">営業時間</p>
                      <p className="text-sm text-stone-700">{industry.visitInfo.hours}</p>
                    </div>
                  </div>
                )}
                {industry.visitInfo.access && (
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-stone-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-stone-900 mb-1">アクセス</p>
                      <p className="text-sm text-stone-700">{industry.visitInfo.access}</p>
                    </div>
                  </div>
                )}
                {industry.visitInfo.contact && (
                  <div className="flex gap-3">
                    <Phone className="w-5 h-5 text-stone-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-stone-900 mb-1">連絡先</p>
                      <p className="text-sm text-stone-700">{industry.visitInfo.contact}</p>
                    </div>
                  </div>
                )}
                {industry.visitInfo.website && (
                  <div className="flex gap-3">
                    <Globe className="w-5 h-5 text-stone-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-stone-900 mb-1">ウェブサイト</p>
                      <a
                        href={industry.visitInfo.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {industry.visitInfo.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* 関連する産業 */}
          {relatedIndustries.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-serif font-bold mb-6">関連する産業</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedIndustries.map((related) => (
                  <a
                    key={related.id}
                    href={`/industry/${related.id}`}
                    className="group bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={related.image}
                        alt={related.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium rounded-full">
                          {related.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-serif font-bold mb-2">{related.title}</h3>
                      <p className="text-xs text-stone-500 mb-2">{related.location}</p>
                      <p className="text-sm text-stone-600 line-clamp-2">{related.summary}</p>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <div className="text-center p-8 bg-stone-900 text-white rounded-lg">
            <h2 className="text-2xl font-serif font-bold mb-4">この産業に関わりを持つ</h2>
            <p className="text-sm mb-6 text-stone-300">
              見学、体験、取材、協業など、さまざまな形で関わることができます
            </p>
            <Button
              variant="outline"
              className="bg-white text-stone-900 hover:bg-stone-100"
              onClick={() => window.open("mailto:info@example.com", "_blank")}
            >
              お問い合わせ
            </Button>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-stone-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-xl font-serif font-bold mb-2">能登百業録</h3>
              <p className="text-sm text-stone-400">〒927-0492</p>
              <p className="text-sm text-stone-400">石川県鳳珠郡能登町</p>
            </div>
            <div className="flex flex-col md:flex-row gap-6 text-sm">
              <a href="#" className="hover:text-stone-300 transition-colors">
                地図から探す
              </a>
              <a href="#" className="hover:text-stone-300 transition-colors">
                インスタグラム
              </a>
              <a href="#" className="hover:text-stone-300 transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
