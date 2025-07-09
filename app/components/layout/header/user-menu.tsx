"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { User, BookOpen, SettingsIcon, LogOutIcon } from "lucide-react";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { cn } from "../../../lib/utils";
import { signOut } from "next-auth/react";
import useGlobalStore from "@/app/stores/globalStore";
import { dropdownMenuColorMap } from "@/app/lib/store-data";
import { Theme, UserProfile } from ".";

interface UserMenuProps {
  isLoggedIn: boolean;
  userProfile: UserProfile | null;
  theme: keyof Theme;
}

export const UserMenu = ({ isLoggedIn, userProfile, theme }: UserMenuProps) => {
  const { resetState } = useGlobalStore();
  const isLoading = useGlobalStore((state) => state.isLoading);
  const hasHydrated = useGlobalStore((state) => state.hasHydrated);

  const handleLogout = () => {
    resetState();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    signOut({ callbackUrl: "/" });
  };

  const dropdownColor = dropdownMenuColorMap[theme];

  if (!hasHydrated || isLoading) {
    return (
      <div className="hidden sm:flex items-center gap-2 animate-pulse">
        <div className="w-8 h-8 rounded-full bg-gray-700"></div>
        <div className="flex flex-col gap-1">
          <div className="w-20 h-3 rounded bg-gray-700"></div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="hidden sm:flex items-center gap-2">
        <Link href="/login">
          <Button className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white border-none">
            Đăng nhập
          </Button>
        </Link>
      </div>
    );
  }

  if (!userProfile) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="hidden sm:flex bg-transparent hover:bg-gray-800/70 pl-2 pr-4 py-1 items-center gap-2 transition-all hover:border-gray-600">
          <div className="relative">
            <Image
              className="rounded-full border-2 border-emerald-500"
              width={32}
              height={32}
              src={userProfile.avatar}
              alt="User avatar"
              unoptimized
            />
            <span className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-green-500 rounded-full border-2 border-gray-900"></span>
          </div>
          <div className="flex flex-col items-start">
            <span className={cn("text-sm font-medium", dropdownColor.text)}>
              {userProfile.displayName}
            </span>
          </div>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className={cn(
          "w-56 rounded-xl shadow-xl p-2",
          dropdownColor.background,
          dropdownColor.border,
          "border"
        )}
      >
        <DropdownMenuItem
          className={cn("rounded-lg", dropdownColor.hover, dropdownColor.text)}
        >
          <User className="mr-2 h-4 w-4" />
          <Link href="/profile" className="flex-1">
            Trang cá nhân
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className={cn("rounded-lg", dropdownColor.hover, dropdownColor.text)}
        >
          <BookOpen className="mr-2 h-4 w-4" />
          <Link href="/bookmarks" className="flex-1">
            Bookmarks
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className={cn("rounded-lg", dropdownColor.hover, dropdownColor.text)}
        >
          <SettingsIcon className="mr-2 h-4 w-4" />
          <Link href="/settings" className="flex-1">
            Settings
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator className={dropdownColor.divider} />

        <DropdownMenuItem
          onClick={handleLogout}
          className={cn(
            "rounded-lg cursor-pointer hover:bg-gray-800/70",
            dropdownColor.danger,
            dropdownColor.dangerText
          )}
        >
          <LogOutIcon className="mr-2 h-4 w-4" />
          Đăng xuất
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
