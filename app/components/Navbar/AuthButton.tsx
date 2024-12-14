import { auth, signOut } from "@/auth";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { KeyIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default async function AuthButton() {
  const session = await auth();
  return session?.user ? (
    <form
      className="h-6"
      action={async () => {
        "use server";
        await signOut();
      }}
    >
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
