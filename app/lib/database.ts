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
export type WriterCard = ReaderCard & { description: string, createdAt: Date, published: boolean }
const writerCardSelect = { ...readerCardSelect, description: true, createdAt: true, published: true };

// GET
export async function writerGetNovels(): Promise<{ novels: WriterCard[] }> {
  const session = await auth();
  const id = session?.user?.id;
  console.log(id);
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


// POST
const NovelSchema = z.object({
  title: z.string().trim(),
  description: z.string(),
  body: z.string().max(500),
  tags: z.string().array(),
})
export async function createNovel(formData: FormData) {
  const session = await auth();
  const id = session?.user?.id;
  const name = session?.user?.name;
  if (id && name) {
    const parsedForm = NovelSchema.safeParse({
      title: formData.get('title'),
      description: formData.get('description'),
      body: formData.get('body'),
      tags: formData.get('tags'),
    });
    if (parsedForm.success) {
      const novelData = parsedForm.data;
      try {
        await prisma.user.update({ where: { id }, data: { novels: { create: novelData } } })
      } catch (err) {
        console.error(err);
      }
    }
  }
  redirect('/login');
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
  }
  redirect('/login');
}

export async function makePublic(published: boolean, novelId: string) {
  const session = await auth();
  const id = session?.user?.id;
  if (id) {
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
  }
  redirect('/login');
}