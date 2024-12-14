import { cookies } from "next/headers";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { setTheme } from "@/app/lib/theme";

export default async function ThemeButton() {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme");
  return (
    <form action={setTheme} className="w-6 h-6">
      <button>
        {theme && theme.value == "dark" ? (
          <SunIcon width={24} height={24} color="white" />
        ) : (
          <MoonIcon width={24} height={24} color="black" />
        )}
      </button>
    </form>
  );
}
