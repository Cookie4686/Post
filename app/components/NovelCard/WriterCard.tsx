import { makePublic, type WriterCard } from "@/app/lib/database";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { PencilIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function WriterCardWrapper(props: { novels: WriterCard[] }) {
  return (
    <div className="flex flex-col gap-4 w-full">
      {props.novels.map((novel) => (
        <Card key={novel.title} novel={novel}></Card>
      ))}
    </div>
  );
}

function Card(props: { novel: WriterCard }) {
  const { novel } = props;
  return (
    <div className="grid grid-cols-[30%,50%,10%,10%] items-center gap-2 h-24 p-4 w-full border rounded">
      {/* title */}
      <div className="overflow-hidden">
        <div className="font-bold">{novel.title}</div>
        <li className="flex items-center gap-2">
          {novel.tags.map((tag, idx) => (
            <ul className="p-1 text-xs font-semibold rounded-lg " key={idx}>
              {tag}
            </ul>
          ))}
        </li>
      </div>
      <div className="text-nowrap overflow-hidden">{novel.description}</div>
      <div className="overflow-hidden">{novel.createdAt.toLocaleString()}</div>
      <div className="overflow-hidden flex gap-4">
        <Link href={`/write/${novel.id}`}>
          <PencilIcon width={24} height={24} title="edit" />
        </Link>
        <form
          action={async () => {
            "use server";
            await makePublic(!novel.published, novel.id);
          }}
        >
          <button>
            {novel.published ? (
              <EyeIcon width={24} height={24} color="lime" title="publish" />
            ) : (
              <EyeSlashIcon
                width={24}
                height={24}
                color="red"
                title="unpublish"
              />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
