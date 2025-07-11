"use client";

import FacebookIcon from "@/public/icon/FacebookIcon";
import { SocialLoginButton } from "../components/components/social-login-btn";
import GoogleIcon from "@/public/icon/GoogleIcon";
import { FacebookLoginResponse } from "../components/components/facebook-sdk";
import { getOrCreateDeviceId } from "../lib/utils";
import { httpClient } from "../utils/httpClient";
import { useRouter } from "next/navigation";
import useGlobalStore from "../stores/globalStore";
import { useGoogleLogin } from "@react-oauth/google";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import Image from "next/image";
// import useGlobalStore from "../stores/globalStore";

export default function AuthPage() {
  const router = useRouter();
  const setProfile = useGlobalStore((state) => state.setProfile);
  const setIsLoggedIn = useGlobalStore((state) => state.setIsLoggedIn);
  // const isLoggedIn = useGlobalStore((state) => state.isLoggedIn);
  const setIsLoading = useGlobalStore((state) => state.setIsLoading);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      sendTokenToBackend(accessToken, "GOOGLE");
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
    },
  });

  const handleFacebookLogin = () => {
    if (typeof window.FB !== "undefined") {
      window.FB.login(
        function (response: { authResponse: FacebookLoginResponse }) {
          const { authResponse } = response;
          console.log("response: ", response);
          if (authResponse) {
            const accessToken = authResponse.accessToken;
            sendTokenToBackend(accessToken, "FACEBOOK");
          } else {
            console.log("User cancelled login or did not fully authorize.");
          }
        },
        { scope: "public_profile,email" }
      );
    }
  };

  const sendTokenToBackend = async (
    accessToken: string,
    socialType: "GOOGLE" | "FACEBOOK"
  ) => {
    try {
      setIsLoading(true);
      const deviceId = getOrCreateDeviceId();
      const response = await httpClient.post({
        url: "/public/login-by-social",
        data: {
          socialType: socialType,
          token: accessToken,
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
      setIsLoading(false);
    }
  };
  // const router = useRouter();
  // const { isLoggedIn } = useGlobalStore();

  // // Redirect if already logged in
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     router.push("/");
  //   }
  // }, [isLoggedIn, router]);

  return (
    <div className="flex justify-center h-auto p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>

      <Card className="w-full max-w-md relative z-10 bg-slate-800 backdrop-blur-sm border-0 shadow-2xl">
        <CardHeader className="space-y-4 text-center pb-8">
          <div className="mx-auto rounded-2xl flex items-center justify-center mb-4">
            <Image
              src="/favicon.ico"
              width={100}
              height={100}
              alt="Tang Thu Lau"
            />
          </div>

          <CardTitle className="text-3xl font-bold bg-gradient-to-r text-white">
            Đăng nhập
          </CardTitle>
          <CardDescription className="text-gray-200 text-base">
            Chọn phương thức đăng nhập để tiếp tục
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 pb-8">
          {/* Social login buttons */}
          <SocialLoginButton
            title="Google"
            icon={<GoogleIcon className="w-6 h-6" />}
            className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-gray-300"
            handleLogin={handleGoogleLogin}
          />

          <SocialLoginButton
            title="Facebook"
            icon={<FacebookIcon className="w-6 h-6 text-blue-600" />}
            className="bg-blue-500 border-blue-200 text-white hover:bg-blue-400 hover:border-blue-300"
            handleLogin={handleFacebookLogin}
          />

          <div className="text-center text-sm text-gray-500 pt-4">
            Bằng cách đăng nhập, bạn đồng ý với{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Điều khoản sử dụng
            </a>{" "}
            và{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              Chính sách bảo mật
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
