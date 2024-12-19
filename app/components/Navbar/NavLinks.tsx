"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks({ links }: { links: { text: string; href: string }[] }) {
  const pathname = usePathname();
  return links.map(({ text, href }) => (
    <li key={text}>
      <Link href={href} title={`go to ${text}`} className={`${pathname == href && "underline"}`}>
        {text}
      </Link>
    </li>
  ));
}
