import type { Metadata } from "next";
import "@/app/globals.css";
import NavBar from "@/app/ui/components/Navbar";

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
      <body>
        <header className="fixed w-full h-12 px-4 bg-white">
          <NavBar />
        </header>
        <main className="pt-12 px-16">{children}</main>
      </body>
    </html>
  );
}
