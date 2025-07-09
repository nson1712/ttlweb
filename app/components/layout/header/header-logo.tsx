import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "../../../lib/utils";
import { Theme } from ".";

interface HeaderLogoProps {
  theme: keyof Theme;
}

// Server Component - Logo section
export function HeaderLogo({ theme }: HeaderLogoProps) {
  const logoGradientMap: Theme = {
    light: "from-gray-900 to-gray-700",
    dark: "from-white to-gray-300",
    sepia: "from-[#5f4b32] to-[#7a6f49]",
  };

  return (
    <Link href="/" className="relative z-10 flex">
      <Image
        className="aspect-[6/5]"
        src="/favicon.ico"
        alt="favicon-ttl"
        width={60}
        height={50}
      />
      <span
        className={cn(
          "text-2xl font-bold bg-gradient-to-r bg-clip-text text-transparent self-center",
          logoGradientMap[theme]
        )}
      >
        Tàng Thư Lâu
      </span>
    </Link>
  );
}

