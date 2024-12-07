'use server';
import { PrismaClient } from "@prisma/client";

export type CardData = {
  id: string;
  title: string;
  author: string;
  tags: string[];
};
const selectOption = { select: { id: true, title: true, author: true, tags: true } };

const prisma = new PrismaClient();
export async function getNovels() {
  try {
    await prisma.$connect();
    const novels = await prisma.novels.findMany(selectOption);
    return { novels };
  } catch (err) {
    console.error(err);
    return { novels: [] }
  }
  finally {
    await prisma.$disconnect();
  }
}
