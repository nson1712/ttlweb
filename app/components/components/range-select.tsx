"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../ui/select";
import { useContext } from "react";
import { SettingsContext, Theme } from "@/app/context/setting-context";
import { cn } from "@/app/lib/utils";

interface RangeSelectProps {
  totalCount: number;
  pageSize?: number;
  pageSearchParam?: string;
}

export function RangeSelect({ totalCount, pageSize = 50, pageSearchParam }: RangeSelectProps) {
  const { theme } = useContext(SettingsContext);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const totalPages = Math.ceil(totalCount / pageSize);
  const currentPageIndex = Number(searchParams.get(pageSearchParam || "page") || 0);

  const options = Array.from({ length: totalPages }, (_, idx) => {
    const start = idx * pageSize + 1;
    const end = Math.min(totalCount, (idx + 1) * pageSize);
    return { value: idx, label: `${start}-${end}` };
  });

  const handleChange = (val: string) => {
    const sp = new URLSearchParams(searchParams?.toString());
    sp.set(pageSearchParam || "page", val);
    router.push(`${pathname}?${sp.toString()}`);
  };

  // theme maps
  const triggerBg: Record<Theme, string> = {
    light: "bg-white text-gray-900",
    dark:  "bg-gray-800 text-white",
    sepia: "bg-[#f8f1e3] text-[#5f4b32]",
  };
  const contentBg: Record<Theme, string> = {
    light: "bg-white",
    dark:  "bg-gray-800",
    sepia: "bg-[#f8f1e3]",
  };
  const itemHover: Record<Theme, string> = {
    light: "text-black hover:bg-gray-100",
    dark:  "text-white hover:bg-gray-700",
    sepia: "text-[#5f4b32] hover:bg-[#efe2c7]",
  };

  return (
    <Select defaultValue={String(currentPageIndex)} onValueChange={handleChange}>
      <SelectTrigger
        className={cn(
          "max-w-60 text-base mx-auto rounded-md border",
          triggerBg[theme ?? "dark"],
          theme === "light" ? "border-gray-300" : "border-gray-700"
        )}
      >
        <SelectValue placeholder="Chọn khoảng" />
      </SelectTrigger>
      <SelectContent className={cn(contentBg[theme ?? "dark"], "p-1 rounded-md")}>
        {options.map((opt) => (
          <SelectItem
            key={opt.value}
            value={String(opt.value)}
            className={cn("px-3 py-1 rounded text-base data-[state=checked]:bg-gradient-to-r from-emerald-500 to-teal-600 data-[state=checked]:text-white", itemHover[theme ?? "dark"])}
          >
            Chương {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}