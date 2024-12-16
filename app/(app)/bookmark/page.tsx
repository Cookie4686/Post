import { Suspense } from "react";
import Loading from "@/app/loading";
import CardWrapper from "@/app/components/Card/ReaderCard";
import { getBookmarks } from "@/app/lib/database";

export default function Page() {
  return (
    <>
      <h1>Bookmark</h1>
      <hr />
      <div className="p-4">
        <Suspense fallback={<Loading />}>
          <CardList />
        </Suspense>
      </div>
    </>
  );
}

async function CardList() {
  const { novels } = await getBookmarks();
  return <CardWrapper novels={novels} />;
}
