import { signIn } from "@/auth";

export default function Page() {
  return (
    <form
      action={async (formData) => {
        "use server";
        await signIn("credentials", formData);
      }}
    >
      <label htmlFor="username">
        <input type="text" name="username" placeholder="Username" />
      </label>
      <label htmlFor="password">
        <input type="password" name="password" placeholder="Password" />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
}
