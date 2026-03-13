import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, adminProcedure } from "./_core/trpc";
import { getAllArticles, getCaseStudyArticles, getArticleById, upsertArticle, deleteArticle } from "./db";
import { storagePut } from "./storage";
import { z } from "zod";
import { nanoid } from "nanoid";

// Zod schema for article input validation
const articleInputSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1),
  category: z.string().min(1),
  operator: z.string().nullable().optional(),
  role: z.string().nullable().optional(),
  location: z.string().min(1),
  locationLat: z.string().nullable().optional(),
  locationLng: z.string().nullable().optional(),
  image: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().nullable().optional(),
  necessity: z.string().nullable().optional(),
  connections: z.string().nullable().optional(),
  editorComment: z.string().nullable().optional(),
  heroSummary: z.string().nullable().optional(),
  isCaseStudy: z.boolean().default(false),
  tags: z.array(z.string()).nullable().optional(),
  seasonalMonths: z.array(z.number()).nullable().optional(),
  relatedIndustries: z.array(z.number()).nullable().optional(),
  timelinePast: z.string().nullable().optional(),
  timelinePresent: z.string().nullable().optional(),
  timelineFuture: z.string().nullable().optional(),
  timelinePhase1: z.string().nullable().optional(),
  timelinePhase2: z.string().nullable().optional(),
  timelinePhase3: z.string().nullable().optional(),
  timelinePhase4: z.string().nullable().optional(),
  deepDive: z.any().nullable().optional(),
  actions: z.any().nullable().optional(),
  challengeCard: z.any().nullable().optional(),
  regrets: z.any().nullable().optional(),
  changes: z.any().nullable().optional(),
  decisionMatrix: z.any().nullable().optional(),
  decisionProcess: z.any().nullable().optional(),
  barriers: z.any().nullable().optional(),
  supportSystem: z.any().nullable().optional(),
  details: z.any().nullable().optional(),
  story: z.any().nullable().optional(),
  behindTheScenes: z.any().nullable().optional(),
  recommendedSupports: z.any().nullable().optional(),
});

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // === Article Routes ===
  articles: router({
    // Public: 全記事一覧
    list: publicProcedure.query(async () => {
      return getAllArticles();
    }),

    // Public: 活用事例のみ
    caseStudies: publicProcedure.query(async () => {
      return getCaseStudyArticles();
    }),

    // Public: 記事詳細
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        const article = await getArticleById(input.id);
        if (!article) {
          throw new Error("Article not found");
        }
        return article;
      }),

    // Admin: 記事作成・更新
    upsert: adminProcedure
      .input(articleInputSchema)
      .mutation(async ({ input }) => {
        const id = await upsertArticle(input as any);
        return { id };
      }),

    // Admin: 記事削除
    delete: adminProcedure
      .input(z.object({ id: z.number() }))
      .mutation(async ({ input }) => {
        await deleteArticle(input.id);
        return { success: true };
      }),
  }),

  // === Upload Route ===
  upload: router({
    image: adminProcedure
      .input(z.object({
        base64: z.string(),
        filename: z.string(),
        contentType: z.string(),
      }))
      .mutation(async ({ input }) => {
        const buffer = Buffer.from(input.base64, "base64");
        const ext = input.filename.split(".").pop() || "jpg";
        const key = `articles/${nanoid()}.${ext}`;
        const { url } = await storagePut(key, buffer, input.contentType);
        return { url };
      }),
  }),
});

export type AppRouter = typeof appRouter;
