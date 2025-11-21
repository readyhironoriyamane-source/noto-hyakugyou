import { useState, useRef, useEffect } from "react";
import { MapView } from "@/components/Map";
import { industries } from "@/data/industries";
import DetailModal from "@/components/DetailModal";
import type { Industry } from "@/data/industries";
import { ArrowUpRight } from "lucide-react";

export default function MapPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [highlightedIndustry, setHighlightedIndustry] = useState<Industry | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<Map<number, google.maps.Marker>>(new Map());
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  const handleMapReady = (googleMap: google.maps.Map) => {
    setMap(googleMap);

    // 能登町の中心座標
    const notoCenter = { lat: 37.3, lng: 137.15 };
    googleMap.setCenter(notoCenter);
    googleMap.setZoom(11);

    // 各産業のマーカーを配置
    const newMarkers = new Map<number, google.maps.Marker>();
    
    industries
      .filter(industry => industry.locationCoords)
      .forEach(industry => {
        const marker = new google.maps.Marker({
          position: industry.locationCoords!,
          map: googleMap,
          title: industry.title,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: "#1a1a1a",
            fillOpacity: 0.8,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          },
        });

        marker.addListener("click", () => {
          setSelectedIndustry(industry);
          setShowDetailModal(false);
          
          // 右側のカードまでスクロール
          const cardElement = cardRefs.current.get(industry.id);
          if (cardElement) {
            cardElement.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        });

        newMarkers.set(industry.id, marker);
      });

    setMarkers(newMarkers);
  };

  // マーカーのスタイルを更新
  useEffect(() => {
    markers.forEach((marker, id) => {
      const isSelected = selectedIndustry?.id === id;
      const isHighlighted = highlightedIndustry?.id === id;
      
      marker.setIcon({
        path: google.maps.SymbolPath.CIRCLE,
        scale: isSelected || isHighlighted ? 14 : 10,
        fillColor: isSelected ? "#dc2626" : "#1a1a1a",
        fillOpacity: isSelected || isHighlighted ? 1 : 0.8,
        strokeColor: "#ffffff",
        strokeWeight: isSelected || isHighlighted ? 3 : 2,
      });
    });
  }, [selectedIndustry, highlightedIndustry, markers]);

  const handleCardClick = (industry: Industry) => {
    setSelectedIndustry(industry);
    setShowDetailModal(false);
    
    // 地図の中心を移動
    if (map && industry.locationCoords) {
      map.panTo(industry.locationCoords);
      map.setZoom(13);
    }
  };

  const handleCardHover = (industry: Industry | null) => {
    setHighlightedIndustry(industry);
  };

  const handleViewDetail = () => {
    setShowDetailModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      {/* ヘッダー */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-40 border-b border-stone-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-serif font-bold">
              能登百業録
            </a>
            <nav className="flex gap-8">
              <a href="/" className="text-sm hover:text-stone-600 transition-colors">
                すべて
              </a>
              <a href="/map" className="text-sm font-bold border-b-2 border-black">
                地図から探す
              </a>
              <a href="#" className="text-sm hover:text-stone-600 transition-colors">
                特集
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* メインコンテンツ：左右分割 */}
      <main className="flex-1 pt-20 flex">
        {/* 左側：地図 */}
        <div className="w-1/2 h-[calc(100vh-5rem)] sticky top-20">
          <MapView onMapReady={handleMapReady} />
        </div>

        {/* 右側：産業カードリスト */}
        <div className="w-1/2 h-[calc(100vh-5rem)] overflow-y-auto bg-stone-50 p-8">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-2">能登の生業</h2>
            <p className="text-sm text-stone-600 mb-8 tracking-wide">
              地図上のマーカーをクリックするか、下記のカードを選択してください
            </p>

            <div className="space-y-6">
              {industries.map((industry) => (
                <div
                  key={industry.id}
                  ref={(el) => {
                    if (el) cardRefs.current.set(industry.id, el);
                  }}
                  className={`group cursor-pointer transition-all duration-300 ${
                    selectedIndustry?.id === industry.id
                      ? "ring-2 ring-stone-900 shadow-xl"
                      : "hover:shadow-lg"
                  }`}
                  onClick={() => handleCardClick(industry)}
                  onMouseEnter={() => handleCardHover(industry)}
                  onMouseLeave={() => handleCardHover(null)}
                >
                  <div className="bg-white overflow-hidden">
                    {/* 画像 */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={industry.image}
                        alt={industry.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium tracking-wider">
                          {industry.category}
                        </span>
                      </div>
                    </div>

                    {/* コンテンツ */}
                    <div className="p-6">
                      <h3 className="text-xl font-serif font-bold mb-2">
                        {industry.title}
                      </h3>
                      <p className="text-sm text-stone-600 mb-3 flex items-center gap-2">
                        <span>📍</span>
                        <span>{industry.location}</span>
                      </p>
                      <p className="text-sm text-stone-700 leading-relaxed mb-4">
                        {industry.summary}
                      </p>

                      {/* 選択時のみ表示：詳細ボタン */}
                      {selectedIndustry?.id === industry.id && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetail();
                          }}
                          className="w-full bg-stone-900 text-white py-3 px-4 flex items-center justify-center gap-2 hover:bg-stone-700 transition-colors group/btn"
                        >
                          <span className="text-sm font-medium tracking-wider">
                            詳しく見る
                          </span>
                          <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* 詳細モーダル */}
      {showDetailModal && selectedIndustry && (
        <DetailModal
          job={selectedIndustry}
          onClose={() => setShowDetailModal(false)}
        />
      )}
    </div>
  );
}
