import { createNovel } from "@/app/lib/database";

export default function Page() {
  return (
    <>
      <div className="flex justify-center items-center h-full w-full">
        <div className="w-md p-8 rounded-md bg-blue-200">
          <form
            action={createNovel}
            className="flex flex-col items-center justify-center gap-8 p-8"
          >
            <h1>Write</h1>
            <label htmlFor="title">
              <input
                type="text"
                name="title"
                autoComplete="off"
                placeholder="Title"
              />
            </label>
            <label htmlFor="description">
              <input
                type="text"
                name="description"
                autoComplete="off"
                placeholder="Description"
              />
            </label>
            <label htmlFor="body">
              <textarea
                name="body"
                autoComplete="off"
                placeholder="write your story here"
              />
            </label>
            <div className="flex gap-4">
              <label htmlFor="tag1">
                <input type="text" name="tags" id="tag1" placeholder="Tag1" />
              </label>
              <label htmlFor="tag2">
                <input type="text" name="tags" id="tag2" placeholder="Tag2" />
              </label>
              <label htmlFor="tag3">
                <input type="text" name="tags" id="tag3" placeholder="Tag3" />
              </label>
            </div>
            <button type="submit">Post</button>
          </form>
        </div>
      </div>
    </>
  );
}
