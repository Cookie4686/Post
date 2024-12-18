import Button from "../Button";
import TextInput from "./TextInput";

export default function WriteForm({
  action,
  defaultValue,
}: {
  action: (formData: FormData) => Promise<void>;
  defaultValue?: {
    title: string;
    description: string;
    body: string;
    tags: string[];
  };
}) {
  return (
    <form
      action={action}
      className="flex flex-col justify-center items-center gap-8 p-8"
    >
      <TextInput
        name="title"
        placeholder="Title"
        defaultValue={defaultValue?.title}
      />
      <TextInput
        name="description"
        placeholder="Description"
        defaultValue={defaultValue?.description}
      />
      <TextInput
        type="textarea"
        name="body"
        placeholder="Write your story here"
        defaultValue={defaultValue?.body}
      />
      <div className="flex gap-4">
        {["tag1", "tag2", "tag3"].map((e, idx) => (
          <TextInput
            key={e}
            id={e}
            name="tags"
            placeholder={e}
            defaultValue={defaultValue?.tags[idx]}
          />
        ))}
      </div>
      <Button type="submit">Post</Button>
    </form>
  );
}
