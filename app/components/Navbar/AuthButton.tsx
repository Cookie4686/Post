import Link from "next/link";
import {
  KeyIcon,
  ArrowRightEndOnRectangleIcon,
} from "@heroicons/react/24/solid";
import { auth } from "@/auth";
import { logOut } from "@/app/lib/auth";

export default async function AuthButton() {
  const session = await auth();
  return session?.user ? (
    <form className="h-6" action={logOut}>
      <button type="submit">
        <ArrowRightEndOnRectangleIcon
          width={24}
          height={24}
          color="red"
          title="log out"
        />
      </button>
    </form>
  ) : (
    <Link href="/login">
      <KeyIcon width={24} height={24} color="lime" title="log in" />
    </Link>
  );
}
