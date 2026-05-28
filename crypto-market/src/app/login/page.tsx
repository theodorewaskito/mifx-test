"use client"

import BannerImage from "@/components/auth/login/LoginBanner";
import { useState } from "react";
import LoginForm from "@/components/auth/login/LoginForm";

export default function Login() {
  const [loginMode, setLoginMode] = useState<"email" | "phone">("email");

  return (
    <div className="grid grid-cols-2 gap-2 h-screen">
      <div className="relative">
        <BannerImage loginMode={loginMode} />
      </div>
      <div className="flex flex-col items-center justify-center">
        <LoginForm loginMode={loginMode} setLoginMode={setLoginMode} />
      </div>
    </div>
  );
}
