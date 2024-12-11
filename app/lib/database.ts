'use server';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from 'zod'
import { auth } from "@/auth";
import prisma from "@/prisma/prisma";

// As a Reader 
export type ReaderCard = {
  title: string;
  tags: string[];
  author: { name: string };
};
const readerCardSelect = { title: true, tags: true, author: { select: { name: true } } };

// GET
export async function getNovels(): Promise<{ novels: ReaderCard[] }> {
  try {
    const novels = await prisma.novel.findMany({ select: readerCardSelect, where: { published: true }, cacheStrategy: { ttl: 60, swr: 5, tags: ['novels'] } });
    return { novels };
  } catch (err) {
    console.error(err);
  }
  return { novels: [] }
}

// As a Writer
export type WriterCard = ReaderCard & { id: string, description: string, createdAt: Date, published: boolean }
const writerCardSelect = { ...readerCardSelect, id: true, description: true, createdAt: true, published: true };

// GET
export async function writerGetNovels(): Promise<{ novels: WriterCard[] }> {
  const session = await auth();
  const id = session?.user?.id;
  if (id) {
    try {
      const { novels } = await prisma.user.findUnique({ select: { novels: { select: writerCardSelect } }, where: { id } }) || { novels: [] };
      return { novels }
    } catch (err) {
      console.error(err);
    }
    return { novels: [] };
  }
  redirect('/login');
}

export async function writerGetNovel(novelId: string) {
  const session = await auth();
  if (session) {
    const authorId = session.user.id;
    try {
      const novel = await prisma.novel.findUnique({ where: { id: novelId, authorId } })
      if (novel) {
        return { novel }
      }
    } catch (err) {
      console.error(err);
    }
    redirect('/draft');
  } else {
    redirect('/login');
  }
}


// POST
const NovelSchema = z.object({
  title: z.string().trim(),
  description: z.string(),
  body: z.string().max(500),
  tags: z.string().array(),
})
export async function createNovel(formData: FormData) {
  const session = await auth();
  if (session) {
    const { id } = session.user;
    const parsedForm = NovelSchema.safeParse({
      title: formData.get('title'),
      description: formData.get('description'),
      body: formData.get('body'),
      tags: formData.getAll('tags'),
    });
    if (parsedForm.success) {
      const novelData = parsedForm.data;
      try {
        await prisma.user.update({ where: { id }, data: { novels: { create: novelData } } })
      } catch (err) {
        console.error(err);
      }
    }
  } else {
    redirect('/login');
  }
}

export async function editNovel(formData: FormData, novelId: string) {
  const session = await auth();
  const id = session?.user?.id;
  if (id) {
    const parsedForm = NovelSchema.safeParse({
      title: formData.get('title'),
      description: formData.get('description'),
      body: formData.get('body'),
      tags: formData.getAll('tags').filter((val) => val)
    });
    if (parsedForm.success) {
      const { data } = parsedForm;
      try {
        await prisma.user.update({
          where: { id }, data: {
            novels: {
              update: {
                where: { id: novelId }, data
              }
            }
          }
        });
      } catch (err) {
        console.error(err);
      }
      redirect('/draft');
    }
  } else {
    redirect('/login');
  }
}

export async function makePublic(published: boolean, novelId: string) {
  const session = await auth();
  if (session) {
    const { id } = session.user;
    try {
      await prisma.user.update({
        where: { id }, data: {
          novels: {
            update: {
              where: { id: novelId }, data: { published }
            }
          }
        }
      })
      revalidatePath('/draft');
    } catch (err) {
      console.error(err);
    }
  } else {
    redirect('/login');
  }
}