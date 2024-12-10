"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import { logIn } from "@/app/lib/auth";

export default function Page() {
  const [state, action] = useActionState(logIn, undefined);
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-md p-8 rounded-md bg-blue-200">
        <h1>Login</h1>
        <form
          action={action}
          className="flex flex-col items-center justify-center gap-8 p-8"
        >
          <div>
            <label htmlFor="name">
              <input
                type="text"
                name="name"
                placeholder="Username"
                autoComplete="username"
                className="text-center"
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
                className="text-center"
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
          <div>
            <p>Dont have an account yet?</p>
            <Link href="/signup" className="underline text-sm">
              Sign Up here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit">
      Log in
    </button>
  );
}
