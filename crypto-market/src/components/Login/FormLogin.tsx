"use client"

import Button from "@/components/custom/Button";
import Input from "@/components/custom/Input";
import Text from "@/components/custom/Text";
import BannerImage from "@/components/Login/BannerImage";
import { useState } from "react";
import InputPassword from "./InputPassword";

export default function FormLogin() {
  const [loginMode, setLoginMode] = useState<"email" | "phone">("email");

  return (
    <div className="grid grid-cols-2 gap-2 h-screen">
      <div className="relative">
        <BannerImage loginMode={loginMode} />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-4 w-129">
          <div>
              <Text
                type="Header"
                variant="Large"
              >Welcome Back</Text>
              <Text
                type="Body"
                variant="Medium"
              >Enter your Credentials to access your account</Text>
          </div>
          <div className="w-full flex flex-col gap-4">
            <div>
              {
                loginMode === "phone" ?
                <Input
                  id="phone"
                  label="Mobile Number"
                  type="text"
                  placeholder="Enter your number"
                  noteButton="Sign In with Email"
                  onClickNote={() => setLoginMode("email")}
                  required
                /> :
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  placeholder="username@gmail.com"
                  noteButton="Sign In with Phone Number"
                  onClickNote={() => setLoginMode("phone")}
                  required
                />
              }
            </div>
            <div className="flex flex-col gap-1">
              <InputPassword/>
              <a href="">
                <Text
                  type="Body"
                  variant="Medium"
                  className="text-[#613DE4]"
                >Forgot Password?</Text>
              </a>
            </div>
          </div>
          <div>
            <Button>Sign In</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
