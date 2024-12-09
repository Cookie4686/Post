import { auth, signOut } from "@/auth";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
import { KeyIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function AuthButton() {
  const session = await auth();
  if (session?.user) {
    return (
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
    );
  }
  return (
    <Link href="/login">
      <KeyIcon width={24} height={24} color="green" title="log in" />
    </Link>
  );
}
