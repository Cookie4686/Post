// import Image from "next/image";
// import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid";
// import { BookmarkIcon as BookmarkOutline } from "@heroicons/react/24/outline";
import { CardData } from "@/app/lib/database";
import "./card.css";

export default function Card(props: { novel: CardData }) {
  const { novel } = props;
  return (
    <div className="flex justify-between p-4 w-[--card-w] h-[--card-h] rounded bg-slate-50">
      <div className="flex flex-col justify-between w-full">
        {/* header */}
        <div className="w-full max-h-[--card-h-half] text-ellipsis overflow-hidden">
          <div className="font-bold">{novel.title}</div>
          <div className="text-sm italic">{novel.author}</div>
        </div>
        {/* footer */}
        <div className="flex items-center">
          {novel.tags.slice(0, 3).map((tag) => (
            <span
              className="p-1 text-xs font-semibold rounded-lg bg-white"
              key={tag}
            >
              {tag}
            </span>
          ))}
          {/* {novel.bookmark && (
              <BookmarkOutline width={16} height={16} title="last bookmarked" />
            )} */}
        </div>
      </div>
      {/* <form>
        <button>
          { {novel.bookmark ? (
              <BookmarkSolid width={24} height={24} title="UnBookmark" />
            ) : (
              <BookmarkOutline width={24} height={24} title="Bookmark" />
            )}}
        </button>
      </form> */}
    </div>
  );
}
