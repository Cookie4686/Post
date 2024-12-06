import NovelList from "@/app/ui/novelList";
import { Suspense } from "react";
import Loading from "@/app/loading";

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
