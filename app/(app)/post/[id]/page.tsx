import BookmarkButton from "@/app/components/Card/BookmarkButton";
import { getPost } from "@/app/lib/database";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { novel } = await getPost(id);
  return (
    <article className="max-w-3xl py-4 mx-auto">
      <div className="flex justify-between">
        <h1 className="py-4 max-w-2xl text-left">{novel.title}</h1>
        <BookmarkButton postId={novel.id} bookmark={novel.bookmark} />
      </div>
      <span className="italic">by {novel.author.name}</span>
      <hr />
      <div className="py-4">{novel.body}</div>
    </article>
  );
}
