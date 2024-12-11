import { editNovel, writerGetNovel } from "@/app/lib/database";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { novel } = await writerGetNovel(id);
  const { title, description, body, tags } = novel;
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-md p-8 rounded-md bg-blue-200">
        <form
          action={async (formData) => {
            "use server";
            await editNovel(formData, id);
          }}
          className="flex flex-col items-center justify-center gap-8 p-8"
        >
          <h1>Edit</h1>
          <label htmlFor="title">
            <input
              type="text"
              name="title"
              autoComplete="off"
              placeholder="Title"
              defaultValue={title}
            />
          </label>
          <label htmlFor="description">
            <input
              type="text"
              name="description"
              autoComplete="off"
              placeholder="Description"
              defaultValue={description}
            />
          </label>
          <label htmlFor="body">
            <textarea
              name="body"
              autoComplete="off"
              placeholder="write your story here"
              defaultValue={body}
            />
          </label>
          <div className="flex gap-4">
            {["tag1", "tag2", "tag3"].map((e, idx) => (
              <label key={e} htmlFor={e}>
                <input
                  type="text"
                  name="tags"
                  id={e}
                  placeholder={e}
                  defaultValue={tags[idx] ? tags[idx] : ""}
                />
              </label>
            ))}
          </div>
          <button type="submit">Edit</button>
        </form>
      </div>
    </div>
  );
}
