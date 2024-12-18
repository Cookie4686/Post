import Image from "next/image";
import ReactLogo from "@/app/assets/react.svg";
import ThemeButton from "./ThemeButton";
import AuthButton from "./AuthButton";
import NavLinks from "./NavLinks";

export default function NavBar() {
  const links: { text: string; href: string }[] = [
    { text: "Home", href: "/" },
    { text: "Bookmark", href: "/bookmark" },
    { text: "Draft", href: "/draft" },
    { text: "Write", href: "/write" },
  ];

  return (
    <nav className="flex justify-between items-center w-full h-full">
      <div className="flex gap-4">
        <Image src={ReactLogo} alt="logo" height={24}></Image>
        <ul className="flex justify-center items-center gap-4">
          <NavLinks links={links} />
        </ul>
      </div>
      <div className="flex justify-center items-center gap-4">
        <ThemeButton />
        <AuthButton />
      </div>
    </nav>
  );
}
