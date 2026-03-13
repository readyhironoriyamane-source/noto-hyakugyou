import { eq, desc, asc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, InsertArticle, users, articles } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// === Article Queries ===

export async function getAllArticles() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(articles).orderBy(asc(articles.sortOrder), asc(articles.id));
}

export async function getCaseStudyArticles() {
  const db = await getDb();
  if (!db) return [];
  return db.select().from(articles).where(eq(articles.isCaseStudy, true)).orderBy(asc(articles.sortOrder), asc(articles.id));
}

export async function getArticleById(id: number) {
  const db = await getDb();
  if (!db) return undefined;
  const result = await db.select().from(articles).where(eq(articles.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function upsertArticle(article: InsertArticle): Promise<number> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  if (article.id) {
    // Check if article with this ID exists
    const existing = await db.select({ id: articles.id }).from(articles).where(eq(articles.id, article.id)).limit(1);
    
    if (existing.length > 0) {
      // Update existing
      const { id, ...updateData } = article;
      await db.update(articles).set(updateData).where(eq(articles.id, id));
      return id;
    } else {
      // Insert new with specified ID
      await db.insert(articles).values(article);
      return article.id;
    }
  } else {
    // Insert new with auto-generated ID
    const result = await db.insert(articles).values(article);
    return result[0].insertId;
  }
}

export async function deleteArticle(id: number): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  await db.delete(articles).where(eq(articles.id, id));
}

export async function updateSortOrders(items: { id: number; sortOrder: number }[]): Promise<void> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");
  
  // Update each article's sortOrder in a transaction-like batch
  for (const item of items) {
    await db.update(articles).set({ sortOrder: item.sortOrder }).where(eq(articles.id, item.id));
  }
}
