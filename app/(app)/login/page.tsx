import Link from "next/link";
import LoginForm from "@/app/components/form/LoginForm";
import { logIn } from "@/app/lib/auth";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-md p-8 rounded-md border">
        <h1>Log In</h1>
        <LoginForm action={logIn} buttonName="Log In" />
        <div>
          <p>Dont have an account yet?</p>
          <Link href="/signup" className="underline text-sm">
            Sign Up here
          </Link>
        </div>
      </div>
    </div>
  );
}
