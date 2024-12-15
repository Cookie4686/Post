'use server';
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from 'zod'
import { auth } from "@/auth";
import prisma from "@/prisma/prisma";

// As a Reader 
export type ReaderCard = {
  id: string
  title: string;
  tags: string[];
  author: { name: string };
  bookmark: boolean;
};
const readerCardSelect = { id: true, title: true, tags: true, author: { select: { name: true } } };

// GET
export async function getNovels(): Promise<{ novels: ReaderCard[] }> {
  const id = (await auth())?.user.id;
  try {
    const novels = await prisma.novel.findMany({ select: { ...readerCardSelect, id: true }, where: { published: true } });
    const bookmarkIds = (await prisma.user.findUnique({ where: { id }, select: { bookmarkIds: true } }))?.bookmarkIds || [];
    return {
      novels: novels.map(e => ({
        id: e.id,
        title: e.title,
        author: e.author,
        tags: e.tags,
        bookmark: bookmarkIds.includes(e.id)
      }))
    };
  } catch (err) {
    console.error(err);
  }
  return { novels: [] }
}

export async function getBookmarks(): Promise<{ novels: ReaderCard[] }> {
  const id = (await auth())?.user.id;
  if (id) {
    try {
      const { bookmarks } = await prisma.user.findUnique({ where: { id }, select: { bookmarks: { select: readerCardSelect } } }) || { bookmarks: [] };
      const novels = bookmarks.map(e => ({ ...e, bookmark: true }));
      return { novels }
    } catch (err) {
      console.error(err);
      return { novels: [] };
    }
  }
  redirect('/login');
}

// POST
export async function addBookmark(novelId: string, path: string): Promise<void> {
  const id = (await auth())?.user.id;
  if (id) {
    try {
      await prisma.user.update({ where: { id }, data: { bookmarkIds: { push: novelId } } })
      revalidatePath(path);
    } catch (err) {
      console.error(err);
    }
  } else {
    redirect('/login');
  }
}

export async function deleteBookmark(novelId: string, path: string): Promise<void> {
  const id = (await auth())?.user.id;
  if (id) {
    try {
      const bookmarkIds = (await prisma.user.findUnique({ where: { id }, select: { bookmarkIds: true } }))?.bookmarkIds || [];
      await prisma.user.update({ where: { id }, data: { bookmarkIds: { set: bookmarkIds.filter(id => id != novelId) } } });
      revalidatePath(path);
    } catch (err) {
      console.error(err);
    }
  } else {
    redirect('/login');
  }
}


// As a Writer
export type WriterCard = {
  id: string;
  title: string;
  tags: string[];
  author: {
    name: string;
  };
  description: string;
  createdAt: Date;
  published: boolean
}
const writerCardSelect = { ...readerCardSelect, description: true, createdAt: true, published: true };

// GET
export async function writerGetNovels(): Promise<{ novels: WriterCard[] }> {
  const id = (await auth())?.user.id;
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

export async function writerGetNovel(novelId: string): Promise<{ novel: WriterCard }> {
  const authorId = (await auth())?.user.id;
  if (authorId) {
    try {
      const novel = await prisma.novel.findUnique({ where: { id: novelId, authorId }, select: writerCardSelect })
      if (novel) {
        return { novel };
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
  const id = (await auth())?.user.id;
  if (id) {
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
  const id = (await auth())?.user.id;
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
  const id = (await auth())?.user.id;
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
  } else {
    redirect('/login');
  }
}
