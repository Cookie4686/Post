import { HTMLInputAutoCompleteAttribute, HTMLInputTypeAttribute } from "react";

export default function TextInput({
  name,
  placeholder,
  id = undefined,
  defaultValue = "",
  autoComplete = "off",
  type = "text",
}: {
  name: string;
  placeholder: string;
  id?: string;
  defaultValue?: string;
  autoComplete?: HTMLInputAutoCompleteAttribute;
  type?: HTMLInputTypeAttribute;
}) {
  return (
    <label htmlFor="name">
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        className="text-center border bg-transparent"
      />
    </label>
  );
}
