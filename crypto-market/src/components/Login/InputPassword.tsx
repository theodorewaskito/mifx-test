"use client";

import { useState } from "react";
import Input from "../custom/Input";
import { Eye, EyeClosed } from 'lucide-react';

export default function InputPassword() {
  const [type, setType] = useState<"password" | "text">("password");

  return (
    <div className="relative w-full h-full">
      <Input
        id="password"
        label="Password"
        type={type}
        placeholder="Enter your password"
        // error="Password is required"
        trailingIcon={
          <button
            type="button"
            onClick={() => setType(type === "password" ? "text" : "password")}
            className="flex items-center justify-center"
          >
            {type === "password" ? <EyeClosed /> : <Eye />}
          </button>
        }
      />
    </div>
  );
}
