import { Suspense, use } from "react";
import Loading from "@/app/loading";
import ReaderCardList from "@/app/components/Card/ReaderCard";
import { getPosts } from "@/app/lib/database";

type SearchParams = Promise<{ [key: string]: string | undefined }>;
export default function Page(props: { searchParams: SearchParams }) {
  const searchParams = use(props.searchParams);
  const currentPage = Number(searchParams.page || "1");
  return (
    <>
      <h1>Posts</h1>
      <hr />
      <div className="p-4">
        <Suspense fallback={<Loading />}>
          <ReaderCardList currentPage={currentPage} fetch={getPosts} />
        </Suspense>
      </div>
    </>
  );
}
