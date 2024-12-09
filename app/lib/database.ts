'use server';
import { prisma } from "@/prisma/prisma";

export type CardData = {
  id: string;
  title: string;
  author: string;
  tags: string[];
};
const selectOption = { select: { id: true, title: true, author: true, tags: true } };

export async function getNovels() {
  try {
    await prisma.$connect();
    const novels = await prisma.novel.findMany(selectOption);
    return { novels };
  } catch (err) {
    console.error(err);
    return { novels: [] }
  }
  finally {
    await prisma.$disconnect();
  }
}

export async function getUserNovel(author: string) {
  try {
    await prisma.$connect();
    const novels = await prisma.novel.findMany({ ...selectOption, where: { author } });
    return { novels };
  } catch (err) {
    console.error(err);
    return { novels: [] }
  } finally {
    await prisma.$disconnect();
  }
}