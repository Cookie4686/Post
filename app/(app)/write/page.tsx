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
              {["tag1", "tag2", "tag3"].map((e) => (
                <label key={e} htmlFor={e}>
                  <input type="text" name="tags" id={e} placeholder={e} />
                </label>
              ))}
            </div>
            <button type="submit">Post</button>
          </form>
        </div>
      </div>
    </>
  );
}
