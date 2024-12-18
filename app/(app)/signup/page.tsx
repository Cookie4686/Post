import { use } from "react";
import Link from "next/link";
import LoginForm from "@/app/components/form/LoginForm";
import { signUp } from "@/app/lib/auth";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default function Page(props: { searchParams: SearchParams }) {
  const searchParams = use(props.searchParams);
  const from = (searchParams.from || "/") as string;

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="w-md p-8 rounded-md border">
        <h1>Sign Up</h1>
        <LoginForm action={signUp} buttonName="Sign Up" redirectUrl={from} />
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
