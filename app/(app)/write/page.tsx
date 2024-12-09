import { Suspense } from "react";
import { auth } from "@/auth";
import Loading from "@/app/loading";
import CardWrapper from "@/app/components/NovelCard/CardWrapper";
import { getUserNovel } from "@/app/lib/database";

export default function Page() {
  return (
    <>
      <header>
        <h1>Write</h1>
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
  const session = await auth();
  if (session?.user?.name) {
    // const { novels } = await getUserNovel(session.user.name);
    // return <CardWrapper novels={novels}></CardWrapper>;
  }
  return <div></div>;
}
