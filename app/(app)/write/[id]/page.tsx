import WriteForm from "@/app/components/form/WriteForm";
import { editPost, writerGetPost } from "@/app/lib/database";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { novel } = await writerGetPost(id);
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-md p-8 rounded-md border">
        <h1>Edit</h1>
        <WriteForm
          action={async (formData) => {
            "use server";
            await editPost(formData, id);
          }}
          defaultValue={novel}
        />
      </div>
    </div>
  );
}
