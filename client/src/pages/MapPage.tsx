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
  const [selectedCategory, setSelectedCategory] = useState<string>("すべて");
  const [mobileView, setMobileView] = useState<"map" | "list">("map");
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  // カテゴリ別の色定義
  const categoryColors: Record<string, string> = {
    "漁業": "#0ea5e9",
    "農業": "#22c55e",
    "林業": "#84cc16",
    "食": "#f59e0b",
    "醸造": "#a855f7",
    "工芸": "#ec4899",
    "伝統": "#ef4444",
    "建築": "#6366f1",
    "観光": "#14b8a6",
    "インフラ": "#64748b",
  };

  // カテゴリ一覧を取得
  const categories = ["すべて", ...Object.keys(categoryColors)];

  // フィルタリングされた産業リスト
  const filteredIndustries = selectedCategory === "すべて"
    ? industries
    : industries.filter(i => i.category === selectedCategory);

  const handleMapReady = (googleMap: google.maps.Map) => {
    setMap(googleMap);

    // 能登半島全体が見渡せるように調整
    const notoCenter = { lat: 37.35, lng: 137.0 };
    googleMap.setCenter(notoCenter);
    googleMap.setZoom(10);

    // 各産業のマーカーを配置
    const newMarkers = new Map<number, google.maps.Marker>();
    
    industries
      .filter(industry => industry.locationCoords)
      .forEach(industry => {
        const markerColor = categoryColors[industry.category] || "#1a1a1a";
        
        const marker = new google.maps.Marker({
          position: industry.locationCoords!,
          map: googleMap,
          title: industry.title,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: markerColor,
            fillOpacity: 0.9,
            strokeColor: "#ffffff",
            strokeWeight: 2,
          },
        });

        marker.addListener("click", () => {
          setSelectedIndustry(industry);
          setShowDetailModal(false);
          setMobileView("list");
          
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

  // マーカーの表示/非表示とスタイルを更新
  useEffect(() => {
    markers.forEach((marker, id) => {
      const industry = industries.find(i => i.id === id);
      if (!industry) return;
      
      // フィルタリング: 選択されたカテゴリに応じて表示/非表示
      const shouldShow = selectedCategory === "すべて" || industry.category === selectedCategory;
      marker.setVisible(shouldShow);
      
      if (shouldShow) {
        const isSelected = selectedIndustry?.id === id;
        const isHighlighted = highlightedIndustry?.id === id;
        const markerColor = categoryColors[industry.category] || "#1a1a1a";
        
        marker.setIcon({
          path: google.maps.SymbolPath.CIRCLE,
          scale: isSelected || isHighlighted ? 14 : 10,
          fillColor: isSelected ? "#dc2626" : markerColor,
          fillOpacity: isSelected || isHighlighted ? 1 : 0.9,
          strokeColor: "#ffffff",
          strokeWeight: isSelected || isHighlighted ? 3 : 2,
        });
      }
    });
  }, [selectedIndustry, highlightedIndustry, markers, selectedCategory]);

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

      {/* モバイル用タブ切り替え */}
      <div className="md:hidden fixed top-16 left-0 right-0 bg-white border-b border-stone-200 z-40 flex">
        <button
          onClick={() => setMobileView("map")}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            mobileView === "map"
              ? "bg-stone-900 text-white"
              : "bg-white text-stone-600 hover:bg-stone-50"
          }`}
        >
          地図
        </button>
        <button
          onClick={() => setMobileView("list")}
          className={`flex-1 py-3 text-sm font-medium transition-colors ${
            mobileView === "list"
              ? "bg-stone-900 text-white"
              : "bg-white text-stone-600 hover:bg-stone-50"
          }`}
        >
          リスト
        </button>
      </div>

      {/* メインコンテンツ：左右分割（デスクトップ）/ 上下切り替え（モバイル） */}
      <main className="flex flex-col md:flex-row pt-16 md:pt-0">
        {/* 左側：地図 */}
        <div className={`w-full md:w-1/2 h-[calc(100vh-4rem)] md:h-screen md:fixed md:top-0 md:left-0 ${
          mobileView === "list" ? "hidden md:block" : ""
        }`}>
          <MapView onMapReady={handleMapReady} />
        </div>

        {/* 右側：産業カードリスト */}
        <div className={`w-full md:w-1/2 min-h-screen overflow-y-auto bg-stone-50 pt-24 md:pt-20 p-4 md:p-8 md:ml-[50%] ${
          mobileView === "map" ? "hidden md:block" : ""
        }`}>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-2">能登の生業</h2>
            <p className="text-sm text-stone-600 mb-6 tracking-wide">
              地図上のマーカーをクリックするか、下記のカードを選択してください
            </p>

            {/* カテゴリフィルター */}
            <div className="mb-6 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-xs font-medium rounded-full transition-all ${
                    selectedCategory === category
                      ? "bg-stone-900 text-white shadow-md"
                      : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                  }`}
                  style={
                    selectedCategory === category && category !== "すべて"
                      ? { backgroundColor: categoryColors[category], color: "white", borderColor: categoryColors[category] }
                      : {}
                  }
                >
                  {category}
                </button>
              ))}
            </div>

            {/* 凡例 */}
            <div className="mb-8 bg-white rounded-lg shadow-sm p-4 border border-stone-200">
              <h3 className="text-xs font-bold mb-3 text-stone-900">カテゴリ凡例</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(categoryColors).map(([category, color]) => (
                  <div key={category} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-xs text-stone-700">{category}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {filteredIndustries.map((industry) => (
                <div
                  key={industry.id}
                  ref={(el) => {
                    if (el) cardRefs.current.set(industry.id, el);
                  }}
                  className={`group cursor-pointer transition-all duration-300 ${
                    selectedIndustry?.id === industry.id
                      ? "ring-2 shadow-xl"
                      : "hover:shadow-lg"
                  }`}
                  style={
                    selectedIndustry?.id === industry.id
                      ? { boxShadow: `0 0 0 2px ${categoryColors[industry.category] || "#1a1a1a"}` }
                      : {}
                  }
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
                        <span
                          className="px-3 py-1 text-xs font-medium tracking-wider text-white rounded"
                          style={{ backgroundColor: categoryColors[industry.category] || "#1a1a1a" }}
                        >
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
                          className="w-full py-3 px-4 flex items-center justify-center gap-2 text-white transition-colors group/btn"
                          style={{ backgroundColor: categoryColors[industry.category] || "#1a1a1a" }}
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
