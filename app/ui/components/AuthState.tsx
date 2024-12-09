import { auth } from "@/auth";

export default async function AuthState() {
  const session = await auth();
  if (session?.user) {
    return <p>Log out</p>;
  }
  return <p>Log In</p>;
}
