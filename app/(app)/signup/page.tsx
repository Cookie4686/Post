"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signUp } from "@/app/lib/auth";

export default function Page() {
  const [state, action] = useActionState(signUp, undefined);
  return (
    <form action={action}>
      <div>
        <label htmlFor="name">
          <input
            type="text"
            name="name"
            placeholder="Username"
            autoComplete="username"
          />
        </label>
        {state?.errors?.username && (
          <p className="text-sm text-red-500">{state.errors.username}</p>
        )}
      </div>

      <div>
        <label htmlFor="password">
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoComplete="off"
          />
        </label>
        {state?.errors?.password && (
          <p className="text-sm text-red-500">{state.errors.password}</p>
        )}
      </div>
      <SubmitButton />
      {state?.message && (
        <p className="text-sm text-red-500">{state.message}</p>
      )}
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
