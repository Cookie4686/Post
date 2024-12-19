import Link from "next/link";
import { KeyIcon, ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { auth } from "@/auth";
import { logOut } from "@/app/lib/auth";

export default async function AuthButton() {
  const session = await auth();
  return session?.user ? (
    <form className="h-6" action={logOut}>
      <button type="submit" title="log out">
        <ArrowRightEndOnRectangleIcon width={24} height={24} color="red" />
      </button>
    </form>
  ) : (
    <Link href="/login" title="log in">
      <KeyIcon width={24} height={24} color="lime" />
    </Link>
  );
}
