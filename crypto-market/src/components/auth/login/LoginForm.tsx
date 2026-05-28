"use client"

import Button from "@/components/common/Button";
import Input from "@/components/form/Input";
import Text from "@/components/common/Text";
import { useState } from "react";
import InputPassword from "@/components/form/InputPassword";

export default function LoginForm({ loginMode, setLoginMode }: { loginMode: "email" | "phone"; setLoginMode: (mode: "email" | "phone") => void }) {

  return (
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
          <div>
            <a href="" className="inline-block hover:underline">
              <Text
                type="Body"
                variant="Medium"
                className="text-[#613DE4]"
              >Forgot Password?</Text>
            </a>
          </div>
        </div>
      </div>
      <div>
        <Button>Sign In</Button>
      </div>
    </div>
  );
}
