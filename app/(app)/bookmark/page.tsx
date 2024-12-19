import { Suspense, use } from "react";
import Loading from "@/app/loading";
import ReaderCardList from "@/app/components/Card/ReaderCard";
import { getBookmarks } from "@/app/lib/database";

type SearchParams = Promise<{ [key: string]: string | undefined }>;
export default function Page(props: { searchParams: SearchParams }) {
  const searchParams = use(props.searchParams);
  const currentPage = Number(searchParams.page || "1");
  return (
    <section>
      <h1>Bookmark</h1>
      <hr className="pb-4" />
      <Suspense fallback={<Loading />}>
        <ReaderCardList currentPage={currentPage} fetch={getBookmarks} />
      </Suspense>
    </section>
  );
}
