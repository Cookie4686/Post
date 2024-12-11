import { type ReaderCard } from "@/app/lib/database";

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
      className={`flex justify-between p-4 w-[15rem] h-[20rem] rounded bg-slate-50`}
    >
      <div className="flex flex-col justify-between w-full">
        {/* header */}
        <div className="w-full max-h-[10rem] text-ellipsis overflow-hidden">
          <div className="font-bold">{novel.title}</div>
          <div className="text-sm italic">{novel.author}</div>
        </div>
        {/* footer */}
        <li className="flex items-center gap-2">
          {novel.tags.map((tag) => (
            <ul
              className="p-1 text-xs font-semibold rounded-lg bg-white"
              key={tag}
            >
              {tag}
            </ul>
          ))}
          {/* {novel.bookmark && (
              <BookmarkOutline width={16} height={16} title="last bookmarked" />
            )} */}
        </li>
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
