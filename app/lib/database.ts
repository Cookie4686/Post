"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { auth } from "@/auth";
import prisma from "@/prisma/prisma";
import { paginationConfig } from "@/app/config";

// As a Reader
export type ReaderCard = {
  id: string;
  title: string;
  tags: string[];
  author: { name: string };
  bookmark: boolean;
};
const readerCardSelect = {
  id: true,
  title: true,
  tags: true,
  author: { select: { name: true } },
};

// GET
export async function getPosts(currentPage: number): Promise<{ novels: ReaderCard[]; totalPages: number }> {
  const id = (await auth())?.user.id;
  try {
    const [totalNovels, novels] = await Promise.all([
      prisma.novel.count({ where: { published: true }, cacheStrategy: { ttl: 60, swr: 15 } }),
      prisma.novel.findMany({
        select: readerCardSelect,
        where: { published: true },
        orderBy: { createdAt: "desc" },
        take: paginationConfig.cardPerPage,
        skip: (currentPage - 1) * paginationConfig.cardPerPage,
        cacheStrategy: { ttl: 30, swr: 15 },
      }),
    ]);

    const bookmarkIds = id
      ? (await prisma.user.findUnique({ where: { id }, select: { bookmarkIds: true } }))?.bookmarkIds || []
      : [];

    return {
      novels: novels.map((e) => ({ ...e, bookmark: bookmarkIds.includes(e.id) })),
      totalPages: Math.ceil(totalNovels / paginationConfig.cardPerPage),
    };
  } catch (err) {
    console.error(err);
  }
  return { novels: [], totalPages: 0 };
}

export async function getPost(novelId: string) {
  const id = (await auth())?.user.id;
  try {
    const [novel, bookmark] = await Promise.all([
      prisma.novel.findUnique({
        where: { id: novelId },
        select: { ...readerCardSelect, body: true },
        cacheStrategy: { ttl: 60 },
      }),
      id
        ? prisma.user.findUnique({
            where: { id },
            select: { _count: { select: { bookmarks: { where: { id: novelId } } } } },
          })
        : null,
    ]);

    if (novel) {
      return { novel: { ...novel, bookmark: bookmark?._count.bookmarks == 1 } };
    }
  } catch (err) {
    console.error(err);
  }
  redirect("/");
}

export async function getBookmarks(currentPage: number): Promise<{ novels: ReaderCard[]; totalPages: number }> {
  const id = (await auth())?.user.id;
  if (id) {
    try {
      const { _count, bookmarks } = (await prisma.user.findUnique({
        where: { id },
        select: {
          _count: { select: { bookmarks: { where: { published: true } } } },
          bookmarks: {
            select: readerCardSelect,
            where: { published: true },
            orderBy: { createdAt: "desc" },
            take: paginationConfig.cardPerPage,
            skip: (currentPage - 1) * paginationConfig.cardPerPage,
          },
        },
        cacheStrategy: { ttl: 15, swr: 5 },
      })) || { _count: { bookmarks: 0 }, bookmarks: [] };
      return {
        novels: bookmarks.map((e) => ({ ...e, bookmark: true })),
        totalPages: Math.ceil(_count.bookmarks / paginationConfig.cardPerPage),
      };
    } catch (err) {
      console.error(err);
    }
    return { novels: [], totalPages: 0 };
  }
  redirect("/login");
}

// POST
export async function addBookmark(novelId: string, path: string): Promise<void> {
  const id = (await auth())?.user.id;
  if (id) {
    try {
      await prisma.user.update({
        where: { id },
        data: { bookmarks: { connect: { id: novelId } } },
      });
      revalidatePath(path);
    } catch (err) {
      console.error(err);
    }
  } else {
    redirect("/login");
  }
}

export async function deleteBookmark(novelId: string, path: string): Promise<void> {
  const id = (await auth())?.user.id;
  if (id) {
    try {
      await prisma.user.update({
        where: { id },
        data: {
          bookmarks: { disconnect: { id: novelId } },
        },
      });
      revalidatePath(path);
    } catch (err) {
      console.error(err);
    }
  } else {
    redirect("/login");
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
  published: boolean;
};
const writerCardSelect = {
  id: true,
  title: true,
  tags: true,
  author: { select: { name: true } },
  description: true,
  createdAt: true,
  published: true,
};

// GET
export async function writerGetPosts(): Promise<{ novels: WriterCard[] }> {
  const id = (await auth())?.user.id;
  if (id) {
    try {
      const { novels } = (await prisma.user.findUnique({
        select: {
          novels: { select: writerCardSelect, orderBy: { createdAt: "desc" } },
        },
        where: { id },
      })) || { novels: [] };
      return { novels };
    } catch (err) {
      console.error(err);
    }
    return { novels: [] };
  }
  redirect("/login");
}

export async function writerGetPost(novelId: string): Promise<{ novel: WriterCard & { body: string } }> {
  const authorId = (await auth())?.user.id;
  if (authorId) {
    try {
      const novel = await prisma.novel.findUnique({
        where: { id: novelId, authorId },
        select: { ...writerCardSelect, body: true },
      });
      if (novel) {
        return { novel };
      }
    } catch (err) {
      console.error(err);
    }
    redirect("/draft");
  } else {
    redirect("/login");
  }
}

// POST
const NovelSchema = z.object({
  title: z.string().trim(),
  description: z.string(),
  body: z.string().max(500),
  tags: z.string().array(),
});
export async function createPost(formData: FormData) {
  const id = (await auth())?.user.id;
  if (id) {
    const parsedForm = NovelSchema.safeParse({
      title: formData.get("title"),
      description: formData.get("description"),
      body: formData.get("body"),
      tags: formData.getAll("tags"),
    });
    if (parsedForm.success) {
      const novelData = parsedForm.data;
      try {
        await prisma.user.update({
          where: { id },
          data: { novels: { create: novelData } },
        });
      } catch (err) {
        console.error(err);
      }
    }
  } else {
    redirect("/login");
  }
}

export async function editPost(formData: FormData, novelId: string) {
  const id = (await auth())?.user.id;
  if (id) {
    const parsedForm = NovelSchema.safeParse({
      title: formData.get("title"),
      description: formData.get("description"),
      body: formData.get("body"),
      tags: formData.getAll("tags").filter((val) => val),
    });
    if (parsedForm.success) {
      const { data } = parsedForm;
      try {
        await prisma.user.update({
          where: { id },
          data: {
            novels: {
              update: {
                where: { id: novelId },
                data,
              },
            },
          },
        });
      } catch (err) {
        console.error(err);
      }
      redirect("/draft");
    }
  } else {
    redirect("/login");
  }
}

export async function makePublic(published: boolean, novelId: string) {
  const id = (await auth())?.user.id;
  if (id) {
    try {
      await prisma.user.update({
        where: { id },
        data: {
          novels: {
            update: {
              where: { id: novelId },
              data: { published },
            },
          },
        },
      });
      revalidatePath("/draft");
    } catch (err) {
      console.error(err);
    }
  } else {
    redirect("/login");
  }
}
