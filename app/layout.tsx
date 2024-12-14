import type { Metadata } from "next";
import "@/app/globals.css";
import NavBar from "@/app/components/Navbar/Navbar";
import { cookies } from "next/headers";

export const metadata: Metadata = {
  title: "Novel",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = cookieStore.get("theme");
  return (
    <html lang="en-th">
      <body
        className={`grid grid-rows-[1fr,auto] grid-cols-1 min-h-[100dvh] ${
          theme && theme.value == "dark" ? "dark" : "light"
        }`}
      >
        <header className="fixed w-full h-12 px-4">
          <NavBar />
        </header>
        <main className="h-full w-full pt-12 px-16">{children}</main>
      </body>
    </html>
  );
}
