import { Suspense } from "react";
import Loading from "@/app/loading";
import CardWrapper from "@/app/components/NovelCard/CardWrapper";
import { getNovels } from "@/app/lib/database";

export default function Page() {
  return (
    <>
      <header>
        <h1>Home</h1>
      </header>
      <section>
        <h2>NovelList</h2>
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
  const { novels } = await getNovels();
  return <CardWrapper novels={novels}></CardWrapper>;
}
