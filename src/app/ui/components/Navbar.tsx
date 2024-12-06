import Image from "next/image";
import Link from "next/link";
import { MoonIcon } from "@heroicons/react/24/solid";
import ReactLogo from "@/app/assets/react.svg";

export default function NavBar() {
  const links: { text: string; href: string }[] = [
    { text: "Home", href: "/" },
    { text: "Bookmark", href: "/bookmark" },
    { text: "Write", href: "/write" },
  ];

  return (
    <nav className="flex justify-between items-center w-full h-full">
      <div className="flex gap-4">
        <Image src={ReactLogo} alt="logo" width={32}></Image>
        <ul className="flex justify-center items-center gap-4">
          {links.map(({ text, href }) => (
            <li key={text}>
              <Link href={href}>{text}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center">
        <button>
          <MoonIcon width={24} color="black"></MoonIcon>
        </button>
      </div>
    </nav>
  );
}
