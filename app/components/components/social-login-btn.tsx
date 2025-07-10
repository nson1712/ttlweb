"use client";

import { signIn, useSession } from "next-auth/react";
import { FC, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { cn, getOrCreateDeviceId } from "@/app/lib/utils";
import { httpClient } from "@/app/utils/httpClient";
import useGlobalStore from "@/app/stores/globalStore";

type SocialLoginButtonProps = {
  title: string;
  provider: "google" | "facebook";
  socialType: "GOOGLE" | "FACEBOOK";
  icon: ReactNode;
  className?: string;
};

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
  const isLoggedIn = useGlobalStore((state) => state.isLoggedIn);
  const setIsLoading = useGlobalStore((state) => state.setIsLoading);

  console.log("SESSIONN: ", session)

  useEffect(() => {
    const loginBackend = async () => {
      try {
        setIsLoading(true);

        const deviceId = getOrCreateDeviceId();
        const response = await httpClient.post({
          url: "/public/login-by-social",
          data: {
            socialType: socialType,
            token: session?.accessToken,
          },
          headers: { deviceId },
        });

        const result = response.data;
        setIsLoggedIn(true);
        setProfile(result);

        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);

        router.push("/");

      } catch (err) {
        console.error("Login error:", err);
      } finally {
        setIsLoading(false); // stop loading
      }
    };

    if (
      status === "authenticated" &&
      session?.provider === provider &&
      !isLoggedIn
    ) {
      loginBackend();
    }
  }, [
    status,
    session,
    provider,
    socialType,
    isLoggedIn,
    setProfile,
    setIsLoggedIn,
    setIsLoading,
    router,
  ]);
  return (
    <button
      className={cn(
        "w-full sm:min-w-96 px-4 py-2 flex gap-4 rounded-lg font-semibold text-slate-700 hover:scale-105 transition duration-150 cursor-pointer",
        className
      )}
      onClick={() => signIn(provider)}
    >
      {icon}
      <span className="self-center">Đăng nhập với {title}</span>
    </button>
  );
};
