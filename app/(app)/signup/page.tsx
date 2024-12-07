"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signUp } from "@/app/lib/auth";

export default function Page() {
  const [state, action] = useActionState(signUp, undefined);
  return (
    <form action={action}>
      <div>
        <label htmlFor="username">
          <input type="text" name="username" placeholder="Username" />
        </label>
        {state?.errors?.username && <p>{state.errors.username}</p>}
      </div>

      <div>
        <label htmlFor="password">
          <input type="password" name="password" placeholder="Password" />
        </label>
        {state?.errors?.password && <p>{state.errors.password}</p>}
      </div>
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit">
      Sign Up
    </button>
  );
}
