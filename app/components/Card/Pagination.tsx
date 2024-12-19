"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/16/solid";
import Link from "next/link";

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    params.set("page", pageNumber.toString());
    return `${pathname}?${params}`;
  };

  return (
    <div className="flex items-center">
      {currentPage > 1 ? (
        <Link href={createPageUrl(currentPage - 1)}>
          <ArrowLeftIcon width={16} height={16} color="blue" />
        </Link>
      ) : (
        <ArrowLeftIcon width={16} height={16} color="grey" />
      )}

      <span>{currentPage}</span>

      {currentPage < totalPages ? (
        <Link href={createPageUrl(currentPage + 1)}>
          <ArrowRightIcon width={16} height={16} color="blue" />
        </Link>
      ) : (
        <ArrowRightIcon width={16} height={16} color="grey" />
      )}
    </div>
  );
}
