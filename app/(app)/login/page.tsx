import Link from "next/link";
import { signIn } from "@/auth";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-md p-8 rounded-md bg-blue-200">
        <h1>Login</h1>
        <form
          action={async (formData) => {
            "use server";
            await signIn("credentials", formData);
          }}
          className="flex flex-col items-center justify-center gap-8 p-8"
        >
          <label htmlFor="name">
            <input
              type="text"
              name="name"
              placeholder="Username"
              autoComplete="username"
              className="text-center"
            />
          </label>
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="off"
              className="text-center"
            />
          </label>
          <button type="submit">Log In</button>
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
