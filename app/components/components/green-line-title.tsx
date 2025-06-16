"use client"

import { FC, useContext } from "react";
import { SettingsContext, Theme } from "@/app/context/setting-context";
import { cn } from "@/app/lib/utils";

type GreenLineTitleProps = {
  title: string;
};

export const GreenLineTitle: FC<GreenLineTitleProps> = ({ title }) => {
  const { theme } = useContext(SettingsContext);

  // Bản đồ lớp cho background container
  const bgMap: Record<Theme, string> = {
    light: "bg-white",
    dark: "bg-gray-900",
    sepia: "bg-[#f8f1e3]",
  };
  // Bản đồ lớp cho màu chữ
  const textMap: Record<Theme, string> = {
    light: "text-gray-900",
    dark: "text-gray-300",
    sepia: "text-[#5f4b32]",
  };
  // Bản đồ lớp cho gradient line
  const gradientMap: Record<Theme, string> = {
    light: "from-green-600 to-transparent",
    dark: "from-green-400 to-transparent",
    sepia: "from-green-500 to-transparent",
  };

  return (
    <h2
      className={cn(
        "flex items-center justify-center py-4 mb-4",
        bgMap[theme ?? "dark"]
      )}
    >
      <div className="flex items-center w-full max-w-screen-md px-4">
        <div
          className={cn(
            "flex-grow h-0.5",
            `bg-gradient-to-l ${gradientMap[theme ?? "dark"]}`
          )}
        />
        <span
          className={cn(
            "mx-4 text-xl font-semibold",
            textMap[theme ?? "dark"]
          )}
        >
          {title}
        </span>
        <div
          className={cn(
            "flex-grow h-0.5",
            `bg-gradient-to-r ${gradientMap[theme ?? "dark"]}`
          )}
        />
      </div>
    </h2>
  );
};
