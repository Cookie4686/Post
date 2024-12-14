import { createNovel } from "@/app/lib/database";
import WriteForm from "@/app/components/form/WriteForm";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-md p-8 rounded-md border">
        <h1>Write</h1>
        <WriteForm action={createNovel} />
      </div>
    </div>
  );
}
