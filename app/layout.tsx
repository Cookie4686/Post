import type { Metadata } from "next";
import "@/app/globals.css";
import NavBar from "@/app/components/Navbar/Navbar";

export const metadata: Metadata = {
  title: "Novel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-th">
      <body className="grid grid-rows-[1fr,auto] grid-cols-1 min-h-[100dvh]">
        <header className="fixed w-full h-12 px-4 bg-white">
          <NavBar />
        </header>
        <main className="h-full w-full pt-12 px-16">{children}</main>
      </body>
    </html>
  );
}
