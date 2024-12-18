"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { FormState } from "@/app/lib/auth";
import TextInput from "./TextInput";
import Button from "../Button";

export default function LoginForm({
  action,
  buttonName,
  redirectUrl,
}: {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
  buttonName: string;
  redirectUrl?: string;
}) {
  const [state, act] = useActionState(action, undefined);
  return (
    <form
      action={act}
      className="flex flex-col items-center justify-center gap-8 p-8"
    >
      <input
        type="hidden"
        name="redirectUrl"
        defaultValue={redirectUrl || "/"}
      />
      <div>
        <TextInput name="name" placeholder="Username" autoComplete="username" />
        {state?.errors?.username && (
          <p className="text-sm text-red-500">{state.errors.username}</p>
        )}
      </div>
      <div>
        <TextInput name="password" placeholder="Password" type="password" />
        {state?.errors?.password && (
          <p className="text-sm text-red-500">{state.errors.password}</p>
        )}
      </div>
      <SubmitButton name={buttonName} />
      {state?.message && (
        <p className="text-sm text-red-500">{state.message}</p>
      )}
    </form>
  );
}

function SubmitButton({ name }: { name: string }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {name}
    </Button>
  );
}
