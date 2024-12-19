"use client";

import { usePathname } from "next/navigation";
import { addBookmark, deleteBookmark } from "@/app/lib/database";
import { BookmarkIcon } from "@heroicons/react/24/outline";

export default function BookmarkButton({ postId, bookmark }: { postId: string; bookmark: boolean }) {
  const pathName = usePathname();
  return bookmark ? (
    <form action={deleteBookmark.bind(null, postId, pathName)}>
      <button title="Unbookmark">
        <BookmarkIcon width={24} height={24} fill="currentcolor" />
      </button>
    </form>
  ) : (
    <form action={addBookmark.bind(null, postId, pathName)}>
      <button title="Bookmark">
        <BookmarkIcon width={24} height={24} fill="transparent" />
      </button>
    </form>
  );
}
