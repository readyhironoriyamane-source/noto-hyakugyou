import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, json, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Articles table - 能登百業録の記事データ
 * 
 * 設計方針:
 * - 検索・フィルタに使うフィールドは正規カラム
 * - 複雑なネスト構造（二択、壁、タイムライン詳細等）はJSONカラム
 * - これにより、JOIN地獄を避けつつ、必要な検索性能を確保
 */
export const articles = mysqlTable("articles", {
  // === 基本情報 ===
  id: int("id").autoincrement().primaryKey(),
  title: text("title").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  operator: varchar("operator", { length: 200 }),
  role: varchar("role", { length: 100 }),
  location: varchar("location", { length: 200 }).notNull(),
  locationLat: decimal("locationLat", { precision: 10, scale: 6 }),
  locationLng: decimal("locationLng", { precision: 10, scale: 6 }),
  image: text("image").notNull(),
  
  // === テキストコンテンツ ===
  summary: text("summary").notNull(),
  description: text("description"),
  necessity: text("necessity"),
  connections: text("connections"),
  editorComment: text("editorComment"),
  heroSummary: text("heroSummary"),
  
  // === フラグ・分類 ===
  isCaseStudy: boolean("isCaseStudy").default(false).notNull(),
  
  // === 表示順（小さい数字ほど先頭に表示） ===
  sortOrder: int("sortOrder").default(0).notNull(),
  
  // === JSON配列（単純なリスト） ===
  tags: json("tags").$type<string[]>(),
  seasonalMonths: json("seasonalMonths").$type<number[]>(),
  relatedIndustries: json("relatedIndustries").$type<number[]>(),
  
  // === タイムライン（サマリー） ===
  timelinePast: text("timelinePast"),
  timelinePresent: text("timelinePresent"),
  timelineFuture: text("timelineFuture"),
  
  // === タイムライン（フェーズ詳細：長文テキスト） ===
  timelinePhase1: text("timelinePhase1"),
  timelinePhase2: text("timelinePhase2"),
  timelinePhase3: text("timelinePhase3"),
  timelinePhase4: text("timelinePhase4"),
  
  // === DeepDive（詳細版タイムライン） ===
  deepDive: json("deepDive").$type<{
    past?: string;
    present?: string;
    future?: string;
  }>(),
  
  // === アクション（CTAボタン等） ===
  actions: json("actions").$type<{
    type: string;
    label: string;
    link: string;
  }[]>(),
  
  // === 課題カード ===
  challengeCard: json("challengeCard").$type<{
    label: string;
    description: string;
    solutions: { title: string; detail: string }[];
    structuredBlock?: { label: string; items: string[] }[];
  }>(),
  
  // === 後悔・変化 ===
  regrets: json("regrets").$type<{
    title: string;
    content: string;
  }>(),
  
  changes: json("changes").$type<{
    title: string;
    content: string[];
  }>(),
  
  // === 究極の二択（DecisionMatrix） ===
  decisionMatrix: json("decisionMatrix").$type<{
    title: string;
    optionA: {
      title: string;
      pros: string[];
      cons?: string[];
    };
    optionB: {
      title: string;
      pros?: string[];
      cons?: string[];
      subsidy?: string;
      cost?: string;
    };
    reason: string;
  }>(),
  
  // === 決断プロセス ===
  decisionProcess: json("decisionProcess").$type<{
    worry: string;
    decider: string;
    selectedSupport: string;
    action: string;
    outcome: string;
    rejectedOption: {
      title: string;
      reasons: string[];
    };
    adoptedOption: {
      title: string;
      reasons: string[];
      decidingFactor: string;
    };
  }>(),
  
  // === 実務の壁 ===
  barriers: json("barriers").$type<{
    title: string;
    content: string;
    checklist: {
      title: string;
      description: string;
    }[];
  }>(),
  
  // === 壁の乗り越え方（要点） ===
  overcomeWall: json("overcomeWall").$type<{
    title: string;
    subtitle: string;
    items: string[];
  }>(),
  
  // === 活用した支援制度（単一 or 複数対応） ===
  supportSystem: json("supportSystem").$type<{
    name: string;
    description: string;
    link?: string;
    url?: string;
    points?: {
      label: string;
      term: string;
      detail: string;
    };
    specAmount?: string;
    specCondition?: string;
    rate?: string;
    limit?: string;
    point?: string;
  } | {
    name: string;
    description: string;
    link: string;
    points?: {
      label: string;
      term: string;
      detail: string;
    };
    specAmount?: string;
    specCondition?: string;
  }[]>(),
  
  // === 記事詳細（取材情報） ===
  details: json("details").$type<{
    owner?: string;
    founded?: string;
    employees?: string;
    writer?: string;
    interviewDate?: string;
  }>(),
  
  // === ストーリー ===
  story: json("story").$type<{
    title: string;
    text: string[];
  }>(),
  
  // === 再起の裏側 ===
  behindTheScenes: json("behindTheScenes").$type<{
    title: string;
    content: {
      heading: string;
      text: string;
    }[];
  }>(),
  
  // === おすすめ支援制度 ===
  recommendedSupports: json("recommendedSupports").$type<{
    category: string;
    name: string;
    description: string;
    link: string;
  }[]>(),
  
  // === メタ情報 ===
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Article = typeof articles.$inferSelect;
export type InsertArticle = typeof articles.$inferInsert;
