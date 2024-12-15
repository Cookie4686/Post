"use client";

import { type ReaderCard } from "@/app/lib/database";
import { BookmarkIcon } from "@heroicons/react/24/outline";
import { addBookmark, deleteBookmark } from "@/app/lib/database";
import { usePathname } from "next/navigation";

export default function ReaderCardWrapper(props: { novels: ReaderCard[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,15rem)] gap-4 h-full w-full">
      {props.novels.map((novel) => (
        <Card key={novel.title} novel={novel}></Card>
      ))}
    </div>
  );
}

function Card(props: { novel: ReaderCard }) {
  const { novel } = props;
  const pathName = usePathname();
  return (
    <div
      className={`flex justify-between p-4 w-[15rem] h-[20rem] rounded border`}
    >
      <div className="flex flex-col justify-between w-full">
        {/* header */}
        <div className="w-full max-h-[10rem] text-ellipsis overflow-hidden">
          <div className="font-bold">{novel.title}</div>
          <div className="text-sm italic">{novel.author.name}</div>
        </div>
        {/* footer */}
        <li className="flex items-center gap-2">
          {novel.tags.map((tag, idx) => (
            <ul className="p-1 text-xs font-semibold rounded-lg" key={idx}>
              {tag}
            </ul>
          ))}
        </li>
      </div>
      {novel.bookmark ? (
        <form action={deleteBookmark.bind(null, novel.id, pathName)}>
          <button>
            <BookmarkIcon width={24} height={24} fill="currentcolor" />
          </button>
        </form>
      ) : (
        <form action={addBookmark.bind(null, novel.id, pathName)}>
          <button>
            <BookmarkIcon width={24} height={24} fill="transparent" />
          </button>
        </form>
      )}
    </div>
  );
}
