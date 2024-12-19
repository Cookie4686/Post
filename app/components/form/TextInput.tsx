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
  type?: HTMLInputTypeAttribute | "textarea";
}) {
  return type == "textarea" ? (
    <label htmlFor={name} aria-hidden className="w-1/2">
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        className="w-full text-center  border bg-transparent"
      />
    </label>
  ) : (
    <label htmlFor={name} aria-hidden>
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
