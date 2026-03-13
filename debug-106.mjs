import 'dotenv/config';
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import { eq } from 'drizzle-orm';
import { articles } from './drizzle/schema.ts';

const conn = await mysql.createConnection(process.env.DATABASE_URL);
const db = drizzle(conn);
const [art] = await db.select({
  id: articles.id,
  title: articles.title,
  challengeCard: articles.challengeCard,
  summary: articles.summary,
}).from(articles).where(eq(articles.id, 106));
console.log('ID:', art.id);
console.log('Title:', art.title);
console.log('ChallengeCard:', JSON.stringify(art.challengeCard, null, 2));
console.log('Summary:', art.summary);
await conn.end();
