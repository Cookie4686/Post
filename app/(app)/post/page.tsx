import { Suspense } from "react";
import Loading from "@/app/loading";
import CardWrapper from "@/app/components/Card/ReaderCard";
import { getPosts } from "@/app/lib/database";

export default function Page() {
  return (
    <>
      <h1>Posts</h1>
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
  const { novels } = await getPosts();
  return <CardWrapper novels={novels}></CardWrapper>;
}
