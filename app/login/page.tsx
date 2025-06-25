"use client";

// import { useEffect } from "react";
// import { useRouter } from "next/navigation";
import { SocialLoginButton } from "../components/components/social-login-btn";
import GoogleIcon from "@/public/icon/GoogleIcon";
import { ToastContainer } from "react-toastify";
// import useGlobalStore from "../stores/globalStore";

export default function AuthPage() {
  // const router = useRouter();
  // const { isLoggedIn } = useGlobalStore();

  // // Redirect if already logged in
  // useEffect(() => {
  //   if (isLoggedIn) {
  //     router.push("/");
  //   }
  // }, [isLoggedIn, router]);

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4">
        <h1 className="text-3xl text-center">Đăng nhập</h1>
        <SocialLoginButton
          title="Google"
          socialType="GOOGLE"
          icon={<GoogleIcon width={30} height={30} />}
          provider="google"
          className="bg-white text-black"
        />

        <ToastContainer />
        {/* <div className="flex flex-col items-center gap-4 mt-20">
      <button
        onClick={() => signIn("google", undefined, { callbackUrl: "/auth/callback?provider=google" })}
        className="bg-red-500 text-white p-2 rounded"
      >
        Đăng nhập bằng Google
      </button>
      <button
        onClick={() => signIn("facebook", undefined, { callbackUrl: "/auth/callback?provider=facebook" })}
        className="bg-blue-600 text-white p-2 rounded"
      >
        Đăng nhập bằng Facebook
      </button>
    </div> */}
        {/* <Tabs defaultValue="login" className="w-full" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="mt-6">
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="bg-gray-700 text-white border-gray-600"
                  disabled={isLoginLoading}
                />
              </div>
              
              <div>
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="********"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="bg-gray-700 text-white border-gray-600"
                  disabled={isLoginLoading}
                />
              </div>
              
              {loginError && (
                <div className="text-red-500 text-sm">{loginError}</div>
              )}
              
              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  variant="link"
                  className="text-blue-400 p-0 h-auto"
                  onClick={() => setActiveTab("forgot")}
                  disabled={isLoginLoading}
                >
                  Forgot password?
                </Button>
                
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isLoginLoading}
                >
                  {isLoginLoading ? "Signing in..." : "Sign in"}
                </Button>
              </div>
              
              <div className="text-center mt-4">
                <p className="text-gray-400">
                  Don&apos;t have an account?{" "}
                  <Button
                    type="button"
                    variant="link"
                    className="text-blue-400 p-0 h-auto"
                    onClick={() => setActiveTab("register")}
                    disabled={isLoginLoading}
                  >
                    Sign up
                  </Button>
                </p>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="register" className="mt-6">
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <Label htmlFor="register-username">Username</Label>
                <Input
                  id="register-username"
                  type="text"
                  placeholder="YourUsername"
                  value={registerUsername}
                  onChange={(e) => setRegisterUsername(e.target.value)}
                  className="bg-gray-700 text-white border-gray-600"
                  disabled={isRegisterLoading}
                />
              </div>
              
              <div>
                <Label htmlFor="register-email">Email</Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="bg-gray-700 text-white border-gray-600"
                  disabled={isRegisterLoading}
                />
              </div>
              
              <div>
                <Label htmlFor="register-password">Password</Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="********"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="bg-gray-700 text-white border-gray-600"
                  disabled={isRegisterLoading}
                />
              </div>
              
              <div>
                <Label htmlFor="register-confirm-password">Confirm Password</Label>
                <Input
                  id="register-confirm-password"
                  type="password"
                  placeholder="********"
                  value={registerConfirmPassword}
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                  className="bg-gray-700 text-white border-gray-600"
                  disabled={isRegisterLoading}
                />
              </div>
              
              {registerError && (
                <div className="text-red-500 text-sm">{registerError}</div>
              )}
              
              <div className="flex justify-end">
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isRegisterLoading}
                >
                  {isRegisterLoading ? "Signing up..." : "Sign up"}
                </Button>
              </div>
              
              <div className="text-center mt-4">
                <p className="text-gray-400">
                  Already have an account?{" "}
                  <Button
                    type="button"
                    variant="link"
                    className="text-blue-400 p-0 h-auto"
                    onClick={() => setActiveTab("login")}
                    disabled={isRegisterLoading}
                  >
                    Sign in
                  </Button>
                </p>
              </div>
            </form>
          </TabsContent>
          
          <TabsContent value="forgot" className="mt-6">
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div>
                <Label htmlFor="forgot-email">Email</Label>
                <Input
                  id="forgot-email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="bg-gray-700 text-white border-gray-600"
                  disabled={isForgotLoading || forgotSuccess}
                />
              </div>
              
              {forgotError && (
                <div className="text-red-500 text-sm">{forgotError}</div>
              )}
              
              {forgotSuccess && (
                <div className="text-green-500 text-sm">
                  Password reset instructions have been sent to your email.
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <Button
                  type="button"
                  variant="link"
                  className="text-blue-400 p-0 h-auto"
                  onClick={() => setActiveTab("login")}
                  disabled={isForgotLoading}
                >
                  Back to login
                </Button>
                
                <Button 
                  type="submit" 
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isForgotLoading || forgotSuccess}
                >
                  {isForgotLoading ? "Sending..." : "Reset Password"}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs> */}
      </div>
    </div>
  );
}
