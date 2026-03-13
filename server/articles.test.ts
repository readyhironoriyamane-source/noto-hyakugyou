import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

/**
 * Article API tests
 *
 * Strategy: mock the db helpers so tests run without a real database.
 * We verify that the tRPC layer correctly wires inputs, auth, and responses.
 */

// ── Mock data ──────────────────────────────────────────────

const mockArticle = {
  id: 101,
  title: "テスト記事タイトル",
  category: "設備投資・修繕",
  operator: "テスト事業者",
  role: "代表",
  location: "能登町",
  locationLat: "37.300000",
  locationLng: "137.200000",
  image: "https://example.com/image.jpg",
  summary: "テスト記事のサマリー",
  description: "テスト記事の詳細説明",
  necessity: null,
  connections: null,
  editorComment: "編集者コメント",
  heroSummary: "ヒーローサマリー",
  isCaseStudy: true,
  tags: ["設備投資", "修繕"],
  seasonalMonths: null,
  relatedIndustries: null,
  timelinePast: "過去",
  timelinePresent: "現在",
  timelineFuture: "未来",
  timelinePhase1: "フェーズ1テキスト",
  timelinePhase2: "フェーズ2テキスト",
  timelinePhase3: "フェーズ3テキスト",
  timelinePhase4: null,
  deepDive: null,
  actions: null,
  challengeCard: {
    label: "設備損壊",
    description: "テスト課題",
    solutions: [{ title: "解決策1", detail: "詳細1" }],
    structuredBlock: [{ label: "活用した支援", items: ["持続化補助金"] }],
  },
  regrets: null,
  changes: null,
  decisionMatrix: {
    title: "450万円かけて再開するか、廃業するか",
    optionA: { title: "廃業する", pros: ["借金なし"] },
    optionB: { title: "補助金で再開", subsidy: "国の補助(2/3)", cost: "自己負担50万円" },
    reason: "テスト理由",
  },
  decisionProcess: null,
  barriers: {
    title: "実務の壁",
    content: "テスト内容",
    checklist: [{ title: "専門用語の壁", description: "テスト説明" }],
  },
  supportSystem: {
    name: "小規模事業者持続化補助金",
    description: "テスト説明",
    link: "/support/1",
  },
  details: {
    owner: "テスト代表",
    founded: "昭和初期",
    employees: "2名（家族経営）",
    writer: "テストライター",
    interviewDate: "2026.01.15",
  },
  story: null,
  behindTheScenes: null,
  recommendedSupports: null,
  createdAt: new Date("2026-01-01"),
  updatedAt: new Date("2026-01-01"),
};

const mockArticle2 = {
  ...mockArticle,
  id: 102,
  title: "テスト記事2",
  isCaseStudy: false,
};

// ── Mock db module ─────────────────────────────────────────

vi.mock("./db", () => ({
  getAllArticles: vi.fn(),
  getCaseStudyArticles: vi.fn(),
  getArticleById: vi.fn(),
  upsertArticle: vi.fn(),
  deleteArticle: vi.fn(),
  upsertUser: vi.fn(),
  getUserByOpenId: vi.fn(),
  getDb: vi.fn(),
}));

vi.mock("./storage", () => ({
  storagePut: vi.fn().mockResolvedValue({ url: "https://cdn.example.com/uploaded.jpg", key: "test-key" }),
}));

import { getAllArticles, getCaseStudyArticles, getArticleById, upsertArticle, deleteArticle } from "./db";

// ── Context helpers ────────────────────────────────────────

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "admin-user",
    email: "admin@example.com",
    name: "Admin User",
    loginMethod: "manus",
    role: "admin",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createUserContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 2,
    openId: "regular-user",
    email: "user@example.com",
    name: "Regular User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

// ── Tests ──────────────────────────────────────────────────

beforeEach(() => {
  vi.clearAllMocks();
});

describe("articles.list", () => {
  it("returns all articles for public users", async () => {
    vi.mocked(getAllArticles).mockResolvedValue([mockArticle, mockArticle2] as any);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.articles.list();

    expect(result).toHaveLength(2);
    expect(result[0].id).toBe(101);
    expect(result[1].id).toBe(102);
    expect(getAllArticles).toHaveBeenCalledOnce();
  });

  it("returns empty array when no articles exist", async () => {
    vi.mocked(getAllArticles).mockResolvedValue([]);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.articles.list();

    expect(result).toEqual([]);
  });
});

describe("articles.caseStudies", () => {
  it("returns only case study articles", async () => {
    vi.mocked(getCaseStudyArticles).mockResolvedValue([mockArticle] as any);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.articles.caseStudies();

    expect(result).toHaveLength(1);
    expect(result[0].isCaseStudy).toBe(true);
    expect(getCaseStudyArticles).toHaveBeenCalledOnce();
  });
});

describe("articles.getById", () => {
  it("returns an article by ID", async () => {
    vi.mocked(getArticleById).mockResolvedValue(mockArticle as any);

    const caller = appRouter.createCaller(createPublicContext());
    const result = await caller.articles.getById({ id: 101 });

    expect(result.id).toBe(101);
    expect(result.title).toBe("テスト記事タイトル");
    expect(result.challengeCard).toBeDefined();
    expect(result.decisionMatrix).toBeDefined();
    expect(getArticleById).toHaveBeenCalledWith(101);
  });

  it("throws when article is not found", async () => {
    vi.mocked(getArticleById).mockResolvedValue(undefined);

    const caller = appRouter.createCaller(createPublicContext());

    await expect(caller.articles.getById({ id: 999 })).rejects.toThrow("Article not found");
  });
});

describe("articles.upsert", () => {
  const validInput = {
    title: "新しい記事",
    category: "設備投資",
    location: "能登町",
    image: "https://example.com/img.jpg",
    summary: "テストサマリー",
    isCaseStudy: true,
  };

  it("creates a new article as admin", async () => {
    vi.mocked(upsertArticle).mockResolvedValue(200);

    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.articles.upsert(validInput);

    expect(result).toEqual({ id: 200 });
    expect(upsertArticle).toHaveBeenCalledOnce();
  });

  it("updates an existing article as admin", async () => {
    vi.mocked(upsertArticle).mockResolvedValue(101);

    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.articles.upsert({ ...validInput, id: 101 });

    expect(result).toEqual({ id: 101 });
    expect(upsertArticle).toHaveBeenCalledOnce();
  });

  it("rejects unauthenticated users", async () => {
    const caller = appRouter.createCaller(createPublicContext());

    await expect(caller.articles.upsert(validInput)).rejects.toThrow();
  });

  it("rejects non-admin users", async () => {
    const caller = appRouter.createCaller(createUserContext());

    await expect(caller.articles.upsert(validInput)).rejects.toThrow();
  });

  it("validates required fields", async () => {
    const caller = appRouter.createCaller(createAdminContext());

    // Missing title
    await expect(
      caller.articles.upsert({
        ...validInput,
        title: "",
      })
    ).rejects.toThrow();

    // Missing category
    await expect(
      caller.articles.upsert({
        ...validInput,
        category: "",
      })
    ).rejects.toThrow();
  });

  it("accepts complex JSON fields", async () => {
    vi.mocked(upsertArticle).mockResolvedValue(201);

    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.articles.upsert({
      ...validInput,
      challengeCard: {
        label: "テスト課題",
        description: "説明",
        solutions: [{ title: "解決策", detail: "詳細" }],
      },
      decisionMatrix: {
        title: "二択タイトル",
        optionA: { title: "選択A", pros: ["メリット1"] },
        optionB: { title: "選択B", subsidy: "補助金", cost: "コスト" },
        reason: "理由",
      },
      barriers: {
        title: "壁タイトル",
        content: "壁の内容",
        checklist: [{ title: "壁1", description: "説明1" }],
      },
    });

    expect(result).toEqual({ id: 201 });
    const callArg = vi.mocked(upsertArticle).mock.calls[0][0];
    expect(callArg.challengeCard).toBeDefined();
    expect(callArg.decisionMatrix).toBeDefined();
    expect(callArg.barriers).toBeDefined();
  });
});

describe("articles.delete", () => {
  it("deletes an article as admin", async () => {
    vi.mocked(deleteArticle).mockResolvedValue(undefined);

    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.articles.delete({ id: 101 });

    expect(result).toEqual({ success: true });
    expect(deleteArticle).toHaveBeenCalledWith(101);
  });

  it("rejects unauthenticated users", async () => {
    const caller = appRouter.createCaller(createPublicContext());

    await expect(caller.articles.delete({ id: 101 })).rejects.toThrow();
  });

  it("rejects non-admin users", async () => {
    const caller = appRouter.createCaller(createUserContext());

    await expect(caller.articles.delete({ id: 101 })).rejects.toThrow();
  });
});

describe("upload.image", () => {
  it("rejects unauthenticated users", async () => {
    const caller = appRouter.createCaller(createPublicContext());

    await expect(
      caller.upload.image({
        base64: "dGVzdA==",
        filename: "test.jpg",
        contentType: "image/jpeg",
      })
    ).rejects.toThrow();
  });

  it("rejects non-admin users", async () => {
    const caller = appRouter.createCaller(createUserContext());

    await expect(
      caller.upload.image({
        base64: "dGVzdA==",
        filename: "test.jpg",
        contentType: "image/jpeg",
      })
    ).rejects.toThrow();
  });

  it("uploads an image as admin", async () => {
    const caller = appRouter.createCaller(createAdminContext());
    const result = await caller.upload.image({
      base64: "dGVzdA==",
      filename: "test.jpg",
      contentType: "image/jpeg",
    });

    expect(result).toHaveProperty("url");
    expect(result.url).toBe("https://cdn.example.com/uploaded.jpg");
  });
});
