import { Suspense } from "react";
import Loading from "@/app/loading";
import CardWrapper from "@/app/components/Card/WriterCard";
import { writerGetPosts } from "@/app/lib/database";

export default function Page() {
  return (
    <>
      <section>
        <h1>Draft</h1>
        <div className="mt-4 p-4 border">
          <Suspense fallback={<Loading />}>
            <CardList />
          </Suspense>
        </div>
      </section>
    </>
  );
}

async function CardList() {
  const { novels } = await writerGetPosts();
  return <CardWrapper novels={novels}></CardWrapper>;
}
