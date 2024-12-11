'use server';
import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import { redirect } from "next/navigation";
import { z } from 'zod'

export type ReaderCard = {
  id: string;
  title: string;
  author: string;
  tags: string[];
};
const readerCardSelect = { id: true, title: true, author: true, tags: true };

export async function getNovels(): Promise<{ novels: ReaderCard[] }> {
  try {
    await prisma.$connect();
    const novels = await prisma.novel.findMany({ select: readerCardSelect, where: { published: true }, cacheStrategy: { ttl: 60, swr: 5, tags: ['novels'] } });
    return { novels };
  } catch (err) {
    console.error(err);
    return { novels: [] }
  }
  finally {
    await prisma.$disconnect();
  }
}

export type WriterCard = ReaderCard & { description: string, createdAt: Date, published: boolean }
const writerCardSelect = { ...readerCardSelect, description: true, createdAt: true, published: true };
export async function writerGetNovels(): Promise<{ novels: WriterCard[] }> {
  const session = await auth();
  const author = session?.user?.name;
  if (author) {
    try {
      await prisma.$connect();
      const novels = await prisma.novel.findMany({ select: writerCardSelect, where: { author }, orderBy: { createdAt: 'desc' } })
      return { novels };
    } catch (err) {
      console.error(err);
    } finally {
      await prisma.$disconnect();
    }
  }
  redirect('/login');
}

const NovelSchema = z.object({
  title: z.string().trim(),
  author: z.string(),
  description: z.string(),
  body: z.string().max(500),
  tags: z.string().array(),
})
export async function writerGetNovel(id: string) {
  const session = await auth();
  const author = session?.user?.name;
  if (author) {
    try {
      await prisma.$connect();
      const novel = await prisma.novel.findUnique({ where: { id } });
      if (novel) {
        return { novel };
      }
    } catch (err) {
      console.error(err);
    }
    redirect('/draft');
  }
  redirect('/login');
}

export async function createNovel(formData: FormData) {
  const session = await auth();
  const author = session?.user?.name;
  const parsedForm = NovelSchema.safeParse({
    title: formData.get('title'),
    author,
    description: formData.get('description'),
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