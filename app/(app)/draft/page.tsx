import CardWrapper from "@/app/components/NovelCard/WriterCard";
import { writerGetNovels } from "@/app/lib/database";
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
            <NovelList />
          </Suspense>
        </div>
      </section>
    </>
  );
}

async function NovelList() {
  const { novels } = await writerGetNovels();
  return <CardWrapper novels={novels}></CardWrapper>;
}
