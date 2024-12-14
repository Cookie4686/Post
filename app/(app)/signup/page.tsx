import Link from "next/link";
import LoginForm from "@/app/components/form/LoginForm";
import { signUp } from "@/app/lib/auth";

export default function Page() {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-md p-8 rounded-md border">
        <h1>Sign Up</h1>
        <LoginForm action={signUp} buttonName="Sign Up" />
        <div>
          <p>Already have an account?</p>
          <Link href="/login" className="underline text-sm">
            Log In here
          </Link>
        </div>
      </div>
    </div>
  );
}
