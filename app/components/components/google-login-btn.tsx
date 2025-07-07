"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getOrCreateDeviceId } from "@/app/lib/utils";
import { httpClient } from "@/app/utils/httpClient";
import useGlobalStore from "@/app/stores/globalStore";
import Image from "next/image";

export const GoogleLoginButton = () => {
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
            url: "https://fsdfssf.truyenso1.xyz/customer/public/login-by-social",
            data: {
              socialType: "GOOGLE",
              token: session.accessToken,
            },
            headers: {
              deviceId: deviceId,
            },
          });
          const result = response.data;

          console.log("RESULT: ", result);
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

    if (status === "authenticated") {
      loginBackend();
    }
  }, [session, status, router, setIsLoggedIn, setProfile]);

  return (
    <>
    <button
      className="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
      onClick={() => signIn("google")}
    >
      <Image
        className="w-6 h-6"
        width={24}
        height={24}
        src="https://www.svgrepo.com/show/475656/google-color.svg"
        loading="lazy"
        alt="google logo"
      />
      <span>Đăng nhập với Google</span>
    </button>
    </>
  );
};
