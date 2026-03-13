import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, adminProcedure } from "./_core/trpc";
import { getAllArticles, getCaseStudyArticles, getArticleById, upsertArticle, deleteArticle, updateSortOrders } from "./db";
import { storagePut } from "./storage";
import { z } from "zod";
import { nanoid } from "nanoid";
import mammoth from "mammoth";
import { invokeLLM } from "./_core/llm";

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
  sortOrder: z.number().default(0).optional(),
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
  overcomeWall: z.any().nullable().optional(),
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

    // Admin: 並び順一括更新
    reorder: adminProcedure
      .input(z.object({
        items: z.array(z.object({ id: z.number(), sortOrder: z.number() })),
      }))
      .mutation(async ({ input }) => {
        await updateSortOrders(input.items);
        return { success: true };
      }),

    // Admin: 記事複製
    duplicate: adminProcedure
      .input(z.object({
        id: z.number(),
        newId: z.number().optional(),
      }))
      .mutation(async ({ input }) => {
        const original = await getArticleById(input.id);
        if (!original) {
          throw new Error("複製元の記事が見つかりません");
        }

        // 複製データを作成（id, createdAt, updatedAtを除外）
        const { id: _id, createdAt: _c, updatedAt: _u, ...rest } = original as any;
        const duplicateData = {
          ...rest,
          id: input.newId || undefined,
          title: `${original.title}（コピー）`,
          isCaseStudy: false, // 複製直後は非公開
          sortOrder: 9999, // 末尾に配置
        };

        const newId = await upsertArticle(duplicateData);
        return { id: newId };
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

    // Word (.docx) ファイルをパースして記事フィールドに自動マッピング
    parseWord: adminProcedure
      .input(z.object({
        base64: z.string(),
        filename: z.string(),
      }))
      .mutation(async ({ input }) => {
        const buffer = Buffer.from(input.base64, "base64");

        // mammoth.js でテキスト抽出
        const result = await mammoth.extractRawText({ buffer });
        const rawText = result.value;

        if (!rawText || rawText.trim().length === 0) {
          throw new Error("Wordファイルからテキストを抽出できませんでした");
        }

        // LLMで構造化データに変換
        const llmResult = await invokeLLM({
          messages: [
            {
              role: "system",
              content: `あなたは能登百業録の記事データ構造化アシスタントです。
Wordファイルから抽出されたテキストを、以下のJSON構造にマッピングしてください。
テキストに該当する情報がない場合はnullを設定してください。
必ず有効なJSONのみを返してください。説明文は不要です。`,
            },
            {
              role: "user",
              content: `以下のテキストを記事データに構造化してください。

---
${rawText.substring(0, 12000)}
---

以下のJSON構造で返してください:
{
  "title": "記事タイトル",
  "category": "業種カテゴリ（例: クリーニング業、建築業）",
  "operator": "事業者名",
  "location": "所在地（例: 石川県鳳珠郡能登町）",
  "summary": "TOPページカードに表示する概要（2-3文）",
  "description": "事業説明（ヒーロー下部に表示される詳細説明）",
  "editorComment": "編集後記（あれば）",
  "tags": ["タグ1", "タグ2"],
  "timelinePhase1": "フェーズ1: 課題（震災直後の困難な状況）",
  "timelinePhase2": "フェーズ2: 選択と決断",
  "timelinePhase3": "フェーズ3: 行動と変化",
  "timelinePhase4": "フェーズ4: 現在から未来へ",
  "details": {
    "owner": "代表者名",
    "founded": "創業年",
    "employees": "従業員数",
    "writer": "ライター名",
    "interviewDate": "取材日"
  },
  "regrets": {
    "title": "支援がもたらした変化",
    "content": "変化の内容"
  },
  "decisionMatrix": {
    "title": "究極の二択のタイトル",
    "optionA": {
      "title": "選択肢Aのタイトル",
      "pros": ["項目1", "項目2"]
    },
    "optionB": {
      "title": "決断（選択肢B）のタイトル",
      "pros": ["項目1", "項目2"],
      "subsidy": "補助金名（あれば）",
      "cost": "コスト（あれば）"
    },
    "reason": "決め手"
  },
  "barriers": {
    "title": "実務の壁",
    "content": "",
    "checklist": [
      { "title": "壁のタイトル", "description": "詳細説明" }
    ]
  },
  "supportSystem": [
    {
      "name": "制度名",
      "description": "制度の説明",
      "rate": "補助率",
      "limit": "上限額",
      "point": "ポイント",
      "url": "詳細URL"
    }
  ],
  "behindTheScenes": {
    "title": "再起の裏側",
    "content": [
      { "heading": "見出し", "text": "本文" }
    ]
  },
  "challengeCard": {
    "label": "課題ラベル",
    "description": "課題の概要",
    "solutions": [],
    "structuredBlock": [
      { "label": "ブロックラベル", "items": ["項目1"] }
    ]
  },
  "overcomeWall": {
    "title": "壁の乗り越え方（要点）",
    "subtitle": "▼ こうやって乗り越えた",
    "items": ["乗り越えた方法の項目1", "項目2"]
  }
}`,
            },
          ],
          response_format: {
            type: "json_object",
          },
        });

        const content = llmResult.choices[0]?.message?.content;
        if (!content || typeof content !== "string") {
          throw new Error("LLMからの応答を解析できませんでした");
        }

        try {
          const parsed = JSON.parse(content);
          return { fields: parsed, rawText: rawText.substring(0, 2000) };
        } catch {
          throw new Error("LLMの応答をJSONとしてパースできませんでした");
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
