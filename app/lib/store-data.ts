import { Theme } from "../context/setting-context";

export const colorClasses = {
  blue: "from-blue-500/20 to-blue-600/20 border-blue-500/30 text-blue-400 hover:from-blue-500/30 hover:to-blue-600/30",
  green:
    "from-green-500/20 to-green-600/20 border-green-500/30 text-green-400 hover:from-green-500/30 hover:to-green-600/30",
  red: "from-red-500/20 to-red-600/20 border-red-500/30 text-red-400 hover:from-red-500/30 hover:to-red-600/30",
  purple:
    "from-purple-500/20 to-purple-600/20 border-purple-500/30 text-purple-400 hover:from-purple-500/30 hover:to-purple-600/30",
  orange:
    "from-orange-500/20 to-orange-600/20 border-orange-500/30 text-orange-400 hover:from-orange-500/30 hover:to-orange-600/30",
  teal: "from-teal-500/20 to-teal-600/20 border-teal-500/30 text-teal-400 hover:from-teal-500/30 hover:to-teal-600/30",
  pink: "from-pink-500/20 to-pink-600/20 border-pink-500/30 text-pink-400 hover:from-pink-500/30 hover:to-pink-600/30",
  yellow:
    "from-yellow-500/20 to-yellow-600/20 border-yellow-500/30 text-yellow-400 hover:from-yellow-500/30 hover:to-yellow-600/30",
  emerald:
    "from-emerald-500/20 to-emerald-600/20 border-emerald-500/30 text-emerald-400 hover:from-emerald-500/30 hover:to-emerald-600/30",
};

export const dropdownMenuColorMap: Record<
  Theme,
  {
    background: string;
    border: string;
    text: string;
    hover: string;
    danger: string;
    dangerText: string;
    divider: string;
  }
> = {
  light: {
    background: "bg-white",
    border: "border-gray-200",
    text: "text-gray-800",
    hover: "hover:bg-gray-100 hover:text-black",
    danger: "focus:bg-red-100",
    dangerText: "text-red-500 focus:text-red-600",
    divider: "bg-gray-200",
  },
  dark: {
    background: "bg-gray-800",
    border: "border-gray-700",
    text: "text-white",
    hover: "hover:bg-gray-700 hover:text-white",
    danger: "focus:bg-red-900/30",
    dangerText: "text-red-400 focus:text-red-300",
    divider: "bg-gray-700",
  },
  sepia: {
    background: "bg-[#f8f1e3]",
    border: "border-[#e8d9c0]",
    text: "text-[#5f4b32]",
    hover: "hover:bg-[#f0e6d2] hover:text-[#7a6f49]",
    danger: "focus:bg-[#e0cfc0]",
    dangerText: "text-red-600 focus:text-red-700",
    divider: "bg-[#e8d9c0]",
  },
};
