"use client";

import { useAuth } from "../lib/auth-context";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
// import Link from "next/link";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export default function AuthPage() {
  const router = useRouter();
  const { login, register, isLoggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState("login");
  console.log("ACTIVE TAB: ", activeTab)
  
  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  
  // Register form state
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  
  // Forgot password form state
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);
  const [forgotError, setForgotError] = useState("");
  const [isForgotLoading, setIsForgotLoading] = useState(false);
  
  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    
    // Basic validation
    if (!loginEmail || !loginPassword) {
      setLoginError("Please fill in all fields");
      return;
    }
    
    setIsLoginLoading(true);
    
    try {
      const success = await login(loginEmail, loginPassword);
      
      if (success) {
        router.push("/");
      } else {
        setLoginError("Invalid email or password");
      }
    } catch (error) {
      setLoginError("An error occurred during login");
      console.error(error);
    } finally {
      setIsLoginLoading(false);
    }
  };
  
  // Handle register form submission
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError("");
    
    // Basic validation
    if (!registerUsername || !registerEmail || !registerPassword || !registerConfirmPassword) {
      setRegisterError("Please fill in all fields");
      return;
    }
    
    if (registerPassword !== registerConfirmPassword) {
      setRegisterError("Passwords do not match");
      return;
    }
    
    if (registerPassword.length < 8) {
      setRegisterError("Password must be at least 8 characters long");
      return;
    }
    
    setIsRegisterLoading(true);
    
    try {
      const success = await register(registerUsername, registerEmail, registerPassword);
      
      if (success) {
        router.push("/");
      } else {
        setRegisterError("Registration failed. Please try again.");
      }
    } catch (error) {
      setRegisterError("An error occurred during registration");
      console.error(error);
    } finally {
      setIsRegisterLoading(false);
    }
  };
  
  // Handle forgot password form submission
  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setForgotError("");
    setForgotSuccess(false);
    
    // Basic validation
    if (!forgotEmail) {
      setForgotError("Please enter your email address");
      return;
    }
    
    setIsForgotLoading(true);
    
    // In a real app, you would make an API call here
    // For now, we'll simulate a successful request
    setTimeout(() => {
      setForgotSuccess(true);
      setIsForgotLoading(false);
    }, 1000);
  };
  
  return (
    <div className="max-w-md mx-auto">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <Tabs defaultValue="login" className="w-full" onValueChange={setActiveTab}>
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
        </Tabs>
      </div>
    </div>
  );
}
