'use server';
import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import { z } from 'zod'

export type CardData = {
  id: string;
  title: string;
  author: string;
  tags: string[];
};

const selectOption = { select: { id: true, title: true, author: true, tags: true }, cacheStrategy: { ttl: 60 } };

export async function getNovels() {
  try {
    await prisma.$connect();
    const novels = await prisma.novel.findMany({ ...selectOption, cacheStrategy: { swr: 5, tags: ['novels'] } });
    return { novels };
  } catch (err) {
    console.error(err);
    return { novels: [] }
  }
  finally {
    await prisma.$disconnect();
  }
}

export async function getNovelsByAuthor(author: string) {
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


const NovelSchema = z.object({
  title: z.string().trim(),
  author: z.string(),
  body: z.string().max(500),
  tags: z.string().array(),
})

export async function createNovel(formData: FormData) {
  const session = await auth();
  const author = session?.user?.name;
  const parsedForm = NovelSchema.safeParse({
    title: formData.get('title'),
    author,
    body: formData.get('body'),
    tags: formData.getAll('tags').filter((val) => val)
  });
  if (parsedForm.success) {
    const { data } = parsedForm;
    try {
      await prisma.$connect();
      await prisma.novel.create({ data });
    } catch (err) {
      console.error(err);
    } finally {
      await prisma.$disconnect();
    }
  }
}