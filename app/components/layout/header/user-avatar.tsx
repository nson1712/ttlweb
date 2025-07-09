"use client";

import React from "react";
import Image from "next/image";
import { Skeleton } from "../../ui/skeleton";
import useGlobalStore from "@/app/stores/globalStore";

interface UserAvatarProps {
  avatar?: string;
  displayName?: string;
}

export const UserAvatar = ({ avatar, displayName }: UserAvatarProps) => {
  const isHydrated = useGlobalStore((state) => state.hasHydrated);

  return (
    <div className="flex gap-x-4 items-center sm:hidden">
      {!isHydrated ? (
        <Skeleton className="w-6 h-6 rounded-full" />
      ) : (
        <Image
          className="rounded-full"
          src={avatar || ""}
          alt={displayName || "avatar"}
          width={25}
          height={25}
        />
      )}
    </div>
  );
};
