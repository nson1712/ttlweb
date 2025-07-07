"use client";

type SocialLoginButtonProps = {
  title: string;
  provider: "google" | "facebook";
  socialType: "GOOGLE" | "FACEBOOK";
  icon: ReactNode;
  className?: string;
};

import { signIn, useSession } from "next-auth/react";
import { FC, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn, getOrCreateDeviceId } from "@/app/lib/utils";
import { httpClient } from "@/app/utils/httpClient";
import useGlobalStore from "@/app/stores/globalStore";

export const SocialLoginButton: FC<SocialLoginButtonProps> = ({
  title,
  provider,
  socialType,
  icon,
  className,
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const setProfile = useGlobalStore((state) => state.setProfile);
  const setIsLoggedIn = useGlobalStore((state) => state.setIsLoggedIn);

  useEffect(() => {
    const loginBackend = async () => {
      if (session?.accessToken) {
        try {
          const deviceId = getOrCreateDeviceId();

          const response = await httpClient.post({
            url: "/public/login-by-social",
            data: {
              socialType: socialType,
              token: session.accessToken,
            },
            headers: {
              deviceId: deviceId,
            },
          });
          const result = response.data;

          setIsLoggedIn(true);
          setProfile(result);

          // 🧩 Lưu token tùy cách bạn chọn (cookie/localStorage)
          localStorage.setItem("accessToken", result.accessToken);
          localStorage.setItem("refreshToken", result.refreshToken);

          router.push("/"); // hoặc redirect về trang trước
        } catch (error) {
          console.error("Login error:", error);
        }
      }
    };

    if (status === "authenticated" && session?.provider === provider) {
      loginBackend();
    }
  }, [session, status, provider, router, setIsLoggedIn, setProfile, socialType]);

  return (
    <>
      <button
        className={cn(
          "min-w-96 px-4 py-2 flex gap-4 rounded-lg font-semibold text-slate-700 hover:scale-105 transition duration-150 cursor-pointer",

          className
        )}
        onClick={() => {
          signIn(provider);
        }}
      >
        {icon}
        <span className="self-center">Đăng nhập với {title}</span>
      </button>
    </>
  );
};
