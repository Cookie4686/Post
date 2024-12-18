import { use } from "react";
import Link from "next/link";
import LoginForm from "@/app/components/form/LoginForm";
import { logIn } from "@/app/lib/auth";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default function Page(props: { searchParams: SearchParams }) {
  const searchParams = use(props.searchParams);
  const from = (searchParams.from || "/") as string;

  return (
    <div className="relative flex justify-center items-center h-full w-full">
      {from != "/" && <div className="absolute top-4">You need to log in</div>}
      <div className="w-md p-8 rounded-md border">
        <h1>Log In</h1>
        <LoginForm action={logIn} buttonName="Log In" redirectUrl={from} />
        <div>
          <p>Dont have an account yet?</p>
          <Link href={`/signup?from=${from}`} className="underline text-sm">
            Sign Up here
          </Link>
        </div>
      </div>
    </div>
  );
}
