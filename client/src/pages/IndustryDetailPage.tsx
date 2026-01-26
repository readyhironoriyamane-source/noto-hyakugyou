import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { industries, Industry } from "@/data/industries";
import { ArrowLeft, ArrowRight, Calendar, ExternalLink, Info, MapPin, User } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";

export default function IndustryDetailPage() {
  const [match, params] = useRoute("/industry/:id");
  const [industry, setIndustry] = useState<Industry | null>(null);

  useEffect(() => {
    if (match && params?.id) {
      const found = industries.find((i) => i.id === parseInt(params.id));
      if (found) {
        setIndustry(found);
        window.scrollTo(0, 0);
      }
    }
  }, [match, params]);

  if (!industry) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // 共通ヘッダー
  const Header = () => (
    <div className="relative h-[60vh] w-full overflow-hidden">
      <div className="absolute inset-0 bg-black/40 z-10" />
      <img
        src={industry.image}
        alt={industry.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute bottom-0 left-0 w-full p-8 z-20 bg-gradient-to-t from-black/80 to-transparent">
        <div className="container mx-auto max-w-4xl">
          <div className="flex gap-2 mb-4">
            <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm border-none">
              {industry.category}
            </Badge>
            <Badge variant="outline" className="text-white border-white/40">
              {industry.location}
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
            {industry.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {industry.tags.map((tag) => (
              <span key={tag} className="text-sm text-white/80 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Link href="/">
        <Button
          variant="ghost"
          className="absolute top-4 left-4 z-30 text-white hover:bg-white/20 hover:text-white"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          一覧に戻る
        </Button>
      </Link>
    </div>
  );

  // 共通: 訪問情報セクション
  const VisitInfoSection = () => (
    industry.visitInfo ? (
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-8 w-1 bg-primary rounded-full" />
          <h2 className="text-2xl font-bold tracking-tight">訪問情報</h2>
        </div>
        <Card>
          <CardContent className="p-6 space-y-4">
            {industry.visitInfo.hours && (
              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">営業時間・時期</p>
                  <p className="text-muted-foreground">{industry.visitInfo.hours}</p>
                </div>
              </div>
            )}
            {industry.visitInfo.access && (
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">アクセス</p>
                  <p className="text-muted-foreground">{industry.visitInfo.access}</p>
                </div>
              </div>
            )}
            {industry.visitInfo.contact && (
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">お問い合わせ</p>
                  <p className="text-muted-foreground">{industry.visitInfo.contact}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    ) : null
  );

  // 共通: 関わりを持つセクション (背景色はプロパティで制御)
  const ActionSection = ({ className = "bg-primary text-primary-foreground" }: { className?: string }) => (
    <section className={`rounded-2xl overflow-hidden shadow-xl ${className}`}>
      <div className="p-8 md:p-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">関わりを持つ</h2>
        <p className="mb-8 max-w-2xl mx-auto opacity-90">
          この産業を守り、未来へ繋ぐために、あなたにできることがあります。
          小さな一歩が、大きな力になります。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {industry.actions.map((action, index) => (
            <Button 
              key={index} 
              size="lg" 
              variant="secondary"
              className="font-bold shadow-lg min-w-[200px]"
              asChild
            >
              <a href={action.link} target="_blank" rel="noopener noreferrer">
                {action.label}
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );

  // ==========================================
  // パターンA: 活用事例 (Case Study) 用レイアウト
  // ==========================================
    // デバッグ用: 判定結果をコンソールに出力
  console.log(`Industry ID: ${industry.id}, isCaseStudy: ${industry.isCaseStudy}`);

  if (!!industry.isCaseStudy) {
    // 関連産業（活用事例に関連する産業）
    const relatedIndustries = industry.relatedIndustries
      .map(id => industries.find(i => i.id === id))
      .filter((i): i is Industry => i !== undefined);

    return (
      <div className="min-h-screen bg-background font-sans text-foreground">
        <Header />
        <div className="container mx-auto max-w-4xl px-4 py-12 space-y-16">
          
          {/* 物語 */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-1 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold tracking-tight">物語</h2>
            </div>
            <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
              {industry.description || industry.summary}
            </div>
          </section>

          {/* 歩みと展望 */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-1 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold tracking-tight">歩みと展望</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">これまでの歩み</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{industry.timeline.past}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">今後の展望</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{industry.timeline.future}</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 関連する産業 */}
          {relatedIndustries.length > 0 && (
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-1 bg-primary rounded-full" />
                <h2 className="text-2xl font-bold tracking-tight">関連する産業</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedIndustries.map((rel) => (
                  <Link key={rel.id} href={`/industry/${rel.id}`}>
                    <Card className="cursor-pointer hover:shadow-md transition-all">
                      <div className="flex items-center p-4 gap-4">
                        <img src={rel.image} alt={rel.title} className="w-16 h-16 rounded object-cover" />
                        <div>
                          <h3 className="font-bold">{rel.title}</h3>
                          <p className="text-xs text-muted-foreground">{rel.category}</p>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          )}

          <VisitInfoSection />
          <ActionSection />
        </div>
      </div>
    );
  }

  // ==========================================
  // パターンB: 能登百業録 (通常) 用レイアウト
  // ==========================================
  
  // 関連する支援事例（isCaseStudy: true の産業）を取得
  const relatedCaseStudies = industry.relatedIndustries
    .map(id => industries.find(i => i.id === id))
    .filter((i): i is Industry => i !== undefined && !!i.isCaseStudy);

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      <div className="container mx-auto max-w-4xl px-4 py-12 space-y-16">
        
        {/* 1. 仕事概要 */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1 bg-primary rounded-full" />
            <h2 className="text-2xl font-bold tracking-tight">仕事概要</h2>
          </div>
          <div className="prose prose-lg max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
            {industry.description || industry.summary}
          </div>
          
          {/* 基本情報カード */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <Card className="bg-muted/30 border-none shadow-sm">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-2 bg-background rounded-full shadow-sm">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">事業者</p>
                  <p className="font-semibold">{industry.operator}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-muted/30 border-none shadow-sm">
              <CardContent className="p-4 flex items-center gap-4">
                <div className="p-2 bg-background rounded-full shadow-sm">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-medium">所在地</p>
                  <p className="font-semibold">{industry.location}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 2. なぜ必要か */}
        {industry.necessity && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-1 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold tracking-tight">なぜ必要か</h2>
            </div>
            <Card className="bg-primary/5 border-primary/10 shadow-sm overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-primary/20" />
              <CardContent className="p-6 md:p-8">
                <p className="text-lg leading-relaxed font-medium text-foreground/90">
                  {industry.necessity}
                </p>
              </CardContent>
            </Card>
          </section>
        )}

        {/* 3. 仕事を深く知る (過去・現在・未来) */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-primary rounded-full" />
            <h2 className="text-2xl font-bold tracking-tight">仕事を深く知る</h2>
          </div>
          
          <div className="relative border-l-2 border-muted ml-4 md:ml-6 space-y-12 pb-4">
            {/* 過去 */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[9px] top-0 h-5 w-5 rounded-full border-4 border-background bg-muted-foreground/30" />
              <div className="mb-2 flex items-center gap-2">
                <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Past</span>
                <span className="h-px w-8 bg-muted" />
              </div>
              <h3 className="text-xl font-bold mb-3">歩み</h3>
              <p className="text-muted-foreground leading-relaxed">
                {industry.deepDive?.past || industry.timeline.past}
              </p>
            </div>

            {/* 現在 */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[9px] top-0 h-5 w-5 rounded-full border-4 border-background bg-primary" />
              <div className="mb-2 flex items-center gap-2">
                <span className="text-sm font-bold uppercase tracking-wider text-primary">Present</span>
                <span className="h-px w-8 bg-primary/30" />
              </div>
              <h3 className="text-xl font-bold mb-3">現在</h3>
              <p className="text-foreground leading-relaxed font-medium">
                {industry.deepDive?.present || industry.timeline.present}
              </p>
            </div>

            {/* 未来 */}
            <div className="relative pl-8 md:pl-12">
              <div className="absolute -left-[9px] top-0 h-5 w-5 rounded-full border-4 border-background bg-muted-foreground/30" />
              <div className="mb-2 flex items-center gap-2">
                <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Future</span>
                <span className="h-px w-8 bg-muted" />
              </div>
              <h3 className="text-xl font-bold mb-3">展望</h3>
              <p className="text-muted-foreground leading-relaxed">
                {industry.deepDive?.future || industry.timeline.future}
              </p>
            </div>
          </div>
        </section>

        {/* 4. 関連する支援活用事例記事へのリンク */}
        {relatedCaseStudies.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-1 bg-primary rounded-full" />
              <h2 className="text-2xl font-bold tracking-tight">関連する支援活用事例</h2>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {relatedCaseStudies.map((study) => (
                <Link key={study.id} href={`/industry/${study.id}`}>
                  <Card className="group cursor-pointer hover:shadow-md transition-all duration-300 border-muted overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-48 h-32 md:h-auto relative shrink-0">
                        <img 
                          src={study.image} 
                          alt={study.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge className="bg-blue-600 hover:bg-blue-700 text-white border-none shadow-sm">
                            活用事例
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="p-5 flex-1 flex flex-col justify-center">
                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                          {study.title}
                          <ArrowRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                          {study.challengeCard?.description || study.summary}
                        </p>
                        {study.challengeCard && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-muted-foreground">課題:</span>
                            <Badge variant="outline" className="text-xs border-red-200 text-red-700 bg-red-50">
                              {study.challengeCard.label}
                            </Badge>
                          </div>
                        )}
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        <VisitInfoSection />
        
        {/* 6. 関わりを持つ (ブルーベース背景) */}
        <ActionSection className="bg-blue-900 text-white" />

      </div>
    </div>
  );
}
