"use client"

import Button from "@/components/common/Button";
import Input from "@/components/form/Input";
import Text from "@/components/common/Text";
import InputPassword from "@/components/form/InputPassword";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";
import { STORAGE_KEYS } from "@/constants/storage-key";
import { Spinner } from "@/components/ui/spinner";

// --- Schema validasi ---
const emailSchema = z.object({
  identifier: z.string().min(1, "Email is required").email("Email format not valid"),
  password: z.string().min(1, "Password is required"),
});

const phoneSchema = z.object({
  identifier: z.string().regex(/^[0-9]{9,15}$/, "Nomor telepon tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});

type LoginFormValues = z.infer<typeof emailSchema>;

export default function LoginForm({
  loginMode,
  setLoginMode,
}: {
  loginMode: "email" | "phone";
  setLoginMode: (mode: "email" | "phone") => void;
}) {
  const router = useRouter();

  const schema = loginMode === "email" ? emailSchema : phoneSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const payload =
        loginMode === "email"
          ? { email: data.identifier, password: data.password }
          : { phone: data.identifier, password: data.password }

      const response = await authService.login(payload);

      const token = response.data?.token;

      if (token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
      }

      router.push("/otp"); 
    } catch (error) {
      if (axios.isAxiosError(error)) {
        let message = error.response?.data?.message 
        if ((message).includes("email") || (message).includes("phone")) {
          setError("identifier", {
            type: "server",
            message: message,
          });
        } 
        if ((message).includes("password")) {
          setError("password", {
            type: "server",
            message: message,
          });
        }
      }
    };
  }
  
  return (
    <form
      className="flex flex-col gap-4 w-129"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Text type="Header" variant="Large">
          Welcome Back
        </Text>
        <Text type="Body" variant="Medium">
          Enter your Credentials to access your account
        </Text>
      </div>

      <div className="w-full flex flex-col gap-4">
        <div>
          {loginMode === "phone" ? (
            <Input
              id="identifier"
              label="Mobile Number"
              type="text"
              placeholder="Enter your number"
              noteButton="Sign In with Email"
              onClickNote={() => {
                setLoginMode("email");
                reset();
              }}
              required
              {...register("identifier")}
              error={errors.identifier?.message}
            />
          ) : (
            <Input
              id="identifier"
              label="Email"
              type="email"
              placeholder="username@gmail.com"
              noteButton="Sign In with Phone Number"
              onClickNote={() => {
                setLoginMode("phone");
                reset();
              }}
              required
              {...register("identifier")}
              error={errors.identifier?.message}
            />
          )}
        </div>

        <div className="flex flex-col gap-1">
          <InputPassword
            {...register("password")}
            error={errors.password?.message}
          />
          <div>
              <Text
                type="Body"
                variant="Medium"
                className="text-[#613DE4] mt-1"
              >
                Forgot Password?
              </Text>
          </div>
        </div>
      </div>

      <div>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : "Sign In"}
        </Button>
      </div>
    </form>
  );
}