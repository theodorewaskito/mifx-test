"use client";

import { useState, forwardRef } from "react";
import Input from "../form/Input";
import { Eye, EyeClosed } from "lucide-react";
import { InputHTMLAttributes } from "react";

interface InputPasswordProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const InputPassword = forwardRef<HTMLInputElement, InputPasswordProps>(
  ({ error, ...props }, ref) => {
    const [type, setType] = useState<"password" | "text">("password");

    return (
      <div className="relative w-full h-full">
        <Input
          ref={ref}
          id="password"
          label="Password"
          type={type}
          placeholder="Enter your password"
          error={error}
          trailingIcon={
            <button
              type="button"
              onClick={() => setType(type === "password" ? "text" : "password")}
              className="flex items-center justify-center"
            >
              {type === "password" ? <EyeClosed /> : <Eye />}
            </button>
          }
          {...props}
        />
      </div>
    );
  }
);

InputPassword.displayName = "InputPassword";

export default InputPassword;