import { type ReaderCard } from "@/app/lib/database";
import Link from "next/link";
import BookmarkButton from "./BookmarkButton";

export default function ReaderCardWrapper(props: { novels: ReaderCard[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,15rem)] gap-4 h-full w-full">
      {props.novels.map((novel) => (
        <Card key={novel.id} novel={novel}></Card>
      ))}
    </div>
  );
}

function Card(props: { novel: ReaderCard }) {
  const { novel } = props;
  return (
    <div
      className={`flex justify-between p-4 w-[15rem] h-[20rem] rounded border`}
    >
      <div className="flex flex-col justify-between w-full">
        {/* header */}
        <div className="w-full max-h-[10rem] text-ellipsis overflow-hidden">
          <Link href={`/post/${novel.id}`}>
            <span className="font-bold hover:underline">{novel.title}</span>
          </Link>
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
      <BookmarkButton postId={novel.id} bookmark={novel.bookmark} />
    </div>
  );
}
