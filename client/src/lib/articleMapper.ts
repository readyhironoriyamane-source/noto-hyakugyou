/**
 * DB記事データ → フロントエンド Industry 型へのマッピングユーティリティ
 * 
 * DBではタイムラインがフラットカラム（timelinePhase1〜4, timelinePast/Present/Future）だが、
 * フロントエンドのコンポーネントは timeline: { phase1, phase2, ... } のネスト構造を期待する。
 * この変換レイヤーにより、既存のUI実装を変更せずにAPI切り替えが可能。
 */

import type { Industry } from "@/types/industry";

// DB article型（tRPCから返ってくる型）
export type DbArticle = {
  id: number;
  title: string;
  category: string;
  operator: string | null;
  role: string | null;
  location: string;
  locationLat: string | null;
  locationLng: string | null;
  image: string;
  summary: string;
  description: string | null;
  necessity: string | null;
  connections: string | null;
  editorComment: string | null;
  heroSummary: string | null;
  isCaseStudy: boolean;
  tags: string[] | null;
  seasonalMonths: number[] | null;
  relatedIndustries: number[] | null;
  timelinePast: string | null;
  timelinePresent: string | null;
  timelineFuture: string | null;
  timelinePhase1: string | null;
  timelinePhase2: string | null;
  timelinePhase3: string | null;
  timelinePhase4: string | null;
  deepDive: any | null;
  actions: any | null;
  challengeCard: any | null;
  regrets: any | null;
  changes: any | null;
  decisionMatrix: any | null;
  decisionProcess: any | null;
  barriers: any | null;
  supportSystem: any | null;
  details: any | null;
  story: any | null;
  behindTheScenes: any | null;
  recommendedSupports: any | null;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * DB記事データをフロントエンドのIndustry型に変換
 */
export function mapArticleToIndustry(article: DbArticle): Industry {
  return {
    id: article.id,
    title: article.title,
    category: article.category,
    operator: article.operator ?? undefined,
    role: article.role ?? undefined,
    location: article.location,
    locationCoords: article.locationLat && article.locationLng
      ? { lat: parseFloat(article.locationLat), lng: parseFloat(article.locationLng) }
      : undefined,
    tags: article.tags ?? [],
    summary: article.summary,
    description: article.description ?? undefined,
    necessity: article.necessity ?? undefined,
    connections: article.connections ?? undefined,
    relatedIndustries: article.relatedIndustries ?? undefined,
    timeline: {
      past: article.timelinePast ?? undefined,
      present: article.timelinePresent ?? undefined,
      future: article.timelineFuture ?? undefined,
      phase1: article.timelinePhase1 ?? undefined,
      phase2: article.timelinePhase2 ?? undefined,
      phase3: article.timelinePhase3 ?? undefined,
      phase4: article.timelinePhase4 ?? undefined,
    },
    deepDive: article.deepDive ?? undefined,
    actions: article.actions ?? undefined,
    image: article.image,
    seasonalMonths: article.seasonalMonths ?? undefined,
    isCaseStudy: article.isCaseStudy,
    challengeCard: article.challengeCard ?? undefined,
    regrets: article.regrets ?? undefined,
    decisionMatrix: article.decisionMatrix ?? undefined,
    decisionProcess: article.decisionProcess ?? undefined,
    barriers: article.barriers ?? undefined,
    changes: article.changes ?? undefined,
    editorComment: article.editorComment ?? undefined,
    supportSystem: article.supportSystem ?? undefined,
    details: article.details ?? undefined,
    heroSummary: article.heroSummary ?? undefined,
    story: article.story ?? undefined,
    behindTheScenes: article.behindTheScenes ?? undefined,
    recommendedSupports: article.recommendedSupports ?? undefined,
  };
}

/**
 * DB記事配列をIndustry配列に変換
 */
export function mapArticlesToIndustries(articles: DbArticle[]): Industry[] {
  return articles.map(mapArticleToIndustry);
}
