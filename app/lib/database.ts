'use server';
import { FindOptions, MongoClient } from "mongodb";

export type NovelCard = {
  _id: string
  title: string
  author: string
  tags: string[]
}
const cardProjection: FindOptions = { projection: { title: 1, author: 1, tags: 1 } }

// warning
const uri = process.env.DB_STRING as string;
const client = new MongoClient(uri);

export async function getNovels(): Promise<{ novels: NovelCard[] }> {
  try {
    await client.connect();
    const db = client.db('data');
    const novels = await db.collection<NovelCard>('novels').find({}, cardProjection).toArray() as NovelCard[];
    return { novels };
  } catch (err) {
    console.log(err);
    return { novels: [] }
  }
  finally {
    await client.close();
  }
}

export async function createDraft(title: string, tags: string[]) {
  try {
    await client.connect();
    const db = client.db('data');
    await db.collection('novels').insertOne({ title, tags });
  } catch (error) {
    console.log(error);
  }
  finally {
    await client.close();
  }
}

