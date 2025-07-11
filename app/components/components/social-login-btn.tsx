"use client";
import { FC, ReactNode } from "react";
import { cn } from "@/app/lib/utils";

type SocialLoginButtonProps = {
  title: string;
  icon: ReactNode;
  className?: string;
  handleLogin?: () => void;
};

export const SocialLoginButton: FC<SocialLoginButtonProps> = ({
  title,
  icon,
  className,
  handleLogin,
}) => {
  return (
    <button
      className={cn(
        "w-full sm:min-w-96 px-4 py-3 flex gap-4 rounded-lg font-semibold text-slate-700 hover:scale-105 transition duration-150 cursor-pointer",
        className
      )}
      onClick={handleLogin}
    >
      {icon}
      <span className="self-center">Đăng nhập với {title}</span>
    </button>
  );
};
