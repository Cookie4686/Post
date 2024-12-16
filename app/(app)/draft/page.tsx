import CardWrapper from "@/app/components/Card/WriterCard";
import { writerGetPosts } from "@/app/lib/database";
import Loading from "@/app/loading";
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <header>
        <h1>Draft</h1>
      </header>
      <section>
        <h2>Your Novels</h2>
        <hr />
        <div className="p-4">
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
