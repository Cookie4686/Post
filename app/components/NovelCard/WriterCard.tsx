import { type WriterCard } from "@/app/lib/database";
import { PencilIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function WriterCardWrapper(props: { novels: WriterCard[] }) {
  return (
    <div className="flex flex-col w-full">
      {props.novels.map((novel) => (
        <Card key={novel.id} novel={novel}></Card>
      ))}
    </div>
  );
}

function Card(props: { novel: WriterCard }) {
  const { novel } = props;
  return (
    <div className="grid grid-cols-[20%,10%,40%,20%,10%] items-center gap-2 h-24 p-4 w-full bg-slate-50">
      {/* title */}
      <div className="overflow-hidden">
        <div className="font-bold">{novel.title}</div>
        <li className="flex items-center gap-2">
          {novel.tags.map((tag) => (
            <ul
              className="p-1 text-xs font-semibold rounded-lg bg-white"
              key={tag}
            >
              {tag}
            </ul>
          ))}
        </li>
      </div>
      <div className="overflow-hidden">
        {novel.published ? <div>Published</div> : <div>Private</div>}
      </div>
      <div className="text-nowrap overflow-hidden">{novel.description}</div>
      <div className="overflow-hidden">{novel.createdAt.toLocaleString()}</div>
      <Link href={`/write/${novel.id}`}>
        <PencilIcon width={24} height={24} title="edit" />
      </Link>
    </div>
  );
}
