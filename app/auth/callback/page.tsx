"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import useGlobalStore from "@/app/stores/globalStore";
import {toast} from "sonner"

export default function AuthCallbackPage() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const provider = searchParams.get("provider");
  const router = useRouter();
  const setProfile = useGlobalStore((s) => s.setProfile);
  const setIsLoggedIn = useGlobalStore((s) => s.setIsLoggedIn);

  console.log("SESSION: ", session)

  useEffect(() => {
    const loginToBackend = async () => {
      if (status !== "authenticated" || !session?.accessToken) return;

      try {
        const res = await axios.post("https://fsdfssf.truyenso1.xyz/customer/public/login-by-social", {
          token: session.accessToken,
          socialType: provider?.toUpperCase(), // GOOGLE or FACEBOOK
        });

        const jwt = res.data.accessToken;
        const decoded = JSON.parse(atob(jwt.split(".")[1]));

        setProfile(decoded);
        setIsLoggedIn(true);

        toast.success("Đăng nhập thành công!");
        router.push("/"); // về trang chủ hoặc redirect URL bạn muốn
      } catch (err) {
        toast.error("Đăng nhập thất bại!");
        console.error(err);
      }
    };

    loginToBackend();
  }, [session, status, provider, router, setIsLoggedIn, setProfile]);

  return <p className="text-center mt-20">Đang xử lý đăng nhập...</p>;
}
