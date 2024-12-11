'use server';
import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import { revalidatePath } from "next/cache";
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
    const novels = await prisma.novel.findMany({ select: readerCardSelect, where: { published: true }, cacheStrategy: { ttl: 60, swr: 5, tags: ['novels'] } });
    return { novels };
  } catch (err) {
    console.error(err);
    return { novels: [] }
  }
}

export type WriterCard = ReaderCard & { description: string, createdAt: Date, published: boolean }
const writerCardSelect = { ...readerCardSelect, description: true, createdAt: true, published: true };
export async function writerGetNovels(): Promise<{ novels: WriterCard[] }> {
  const session = await auth();
  const author = session?.user?.name;
  if (author) {
    try {
      const novels = await prisma.novel.findMany({ select: writerCardSelect, where: { author }, orderBy: { createdAt: 'desc' } })
      return { novels };
    } catch (err) {
      console.error(err);
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
  if (author) {
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
        await prisma.novel.create({ data });
      } catch (err) {
        console.error(err);
      }
    }
  }
}

export async function editNovel(formData: FormData, id: string) {
  const session = await auth();
  const sessionAuthor = session?.user?.name;
  if (sessionAuthor) {
    const parsedForm = NovelSchema.safeParse({
      title: formData.get('title'),
      author: sessionAuthor,
      description: formData.get('description'),
      body: formData.get('body'),
      tags: formData.getAll('tags').filter((val) => val)
    });
    if (parsedForm.success) {
      const { title, description, body, tags } = parsedForm.data;
      try {
        await prisma.novel.update({ select: { title: true, description: true, body: true, tags: true }, data: { title, description, body, tags }, where: { id, author: sessionAuthor } })
      } catch (err) {
        console.error(err);
      }
      redirect('/draft');
    }
  }
  redirect('/login');
}

export async function makePublic(id: string, published: boolean) {
  const session = await auth();
  const author = session?.user?.name;
  if (author) {
    try {
      await prisma.novel.update({ select: { published: true }, data: { published }, where: { id, author } });
      revalidatePath('/draft');
    } catch (err) {
      console.error(err);
    }
  }
}