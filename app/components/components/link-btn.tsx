"use client";

import React, { FC, useContext } from "react";
import Link from "next/link";
import { SettingsContext, Theme } from "@/app/context/setting-context";
import { cn } from "@/app/lib/utils";

type LinkButtonProps = {
  href: string;
  label: string;
};

export const LinkButton: FC<LinkButtonProps> = ({ href, label }) => {
  const { theme } = useContext(SettingsContext);

  // Map for background and border
  const bgMap: Record<Theme, string> = {
    light: "bg-gray-100 border-gray-300",
    dark: "bg-gray-800 border-gray-700",
    sepia: "bg-[#efe2c0] border-[#e8d9c0]",
  };

  // Map for text color and hover state
  const textMap: Record<Theme, string> = {
    light: "text-emerald-600 hover:text-emerald-500 hover:bg-gray-200",
    dark: "text-emerald-400 hover:text-emerald-300 hover:bg-gray-800",
    sepia: "text-emerald-500 hover:text-emerald-400 hover:bg-[#efe2c0]",
  };

  return (
    <div className="mt-4 text-center w-full">
      <Link
        href={href}
        className={cn(
          "inline-block w-full  px-4 py-2 rounded-md border font-medium transition-colors",
          bgMap[theme ?? "dark"],
          textMap[theme ?? "dark"]
        )}
      >
        {label}
      </Link>
    </div>
  );
};
