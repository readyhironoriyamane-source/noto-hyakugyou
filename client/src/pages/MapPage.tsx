import { useState } from "react";
import { MapView } from "@/components/Map";
import { industries } from "@/data/industries";
import DetailModal from "@/components/DetailModal";

export default function MapPage() {
  const [selectedIndustry, setSelectedIndustry] = useState<typeof industries[0] | null>(null);
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [markers, setMarkers] = useState<google.maps.Marker[]>([]);

  const handleMapReady = (googleMap: google.maps.Map) => {
    setMap(googleMap);

    // 能登町の中心座標
    const notoCenter = { lat: 37.3, lng: 137.15 };
    googleMap.setCenter(notoCenter);
    googleMap.setZoom(11);

    // 各産業のマーカーを配置
    const newMarkers = industries
      .filter(industry => industry.locationCoords)
      .map(industry => {
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
        });

        return marker;
      });

    setMarkers(newMarkers);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* ヘッダー */}
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-40 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-2xl font-serif font-bold">
              能登百業録
            </a>
            <nav className="flex gap-8">
              <a href="/" className="text-sm hover:text-gray-600 transition-colors">
                すべて
              </a>
              <a href="/map" className="text-sm font-bold border-b-2 border-black">
                地図から探す
              </a>
              <a href="#" className="text-sm hover:text-gray-600 transition-colors">
                作り手
              </a>
              <a href="#" className="text-sm hover:text-gray-600 transition-colors">
                MENU
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* 地図コンテンツ */}
      <main className="flex-1 pt-20">
        <div className="h-[calc(100vh-5rem)]">
          <MapView onMapReady={handleMapReady} />
        </div>
      </main>

      {/* 詳細モーダル */}
      {selectedIndustry && (
        <DetailModal
          job={selectedIndustry}
          onClose={() => setSelectedIndustry(null)}
        />
      )}
    </div>
  );
}
