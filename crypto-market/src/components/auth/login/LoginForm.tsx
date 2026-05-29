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
import { useState, useEffect } from "react";
import { authService } from "@/services/auth.service";
import { STORAGE_KEYS } from "@/constants/storage-key";
import { Spinner } from "@/components/ui/spinner";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const emailSchema = z.object({
  identifier: z.string().min(1, "Email is required").email("Email format not valid"),
  password: z.string().min(1, "Password is required"),
});

const phoneSchema = z.object({
  identifier: z.string().min(1, "Mobile number is required"),
  password: z.string().min(1, "Password is required"),
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
  const [countryList, setCountryList] = useState<any[]>([]);
  const [loadingCountry, setLoadingCountry] = useState(false);
  const [selectedCountryCode, setSelectedCountryCode] = useState("+62");

  const getCountryList = async () => {
    setLoadingCountry(true);
    try {
      const response = await fetch("/api/public/country");
      const data = await response.json();
      
      if (data.data) {
        setCountryList(data.data);
        console.log("Country list loaded:", data.data);
      }
    } catch (error) {
      console.error("Failed to fetch countries:", error);
    } finally {
      setLoadingCountry(false);
    }
  };

  useEffect(() => {
    getCountryList();
  }, []);

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
          : { phone: selectedCountryCode.replace("+", "") + data.identifier, password: data.password }

      const response = await authService.login(payload);

      const token = response.data?.token;

      if (token) {
        localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
        localStorage.setItem(STORAGE_KEYS.PHONE_NUMBER, response.data?.phone);
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
            <div>
              <div className="flex justify-between">
                <label
                  htmlFor={"identifier"}
                >
                  <Text
                    type="Body"
                    variant="Medium"
                    className="mb-2"
                  >Mobile Number</Text>
                </label>
                <button
                  type="button"
                  className="cursor-pointer hover:underline"
                  onClick={() => {
                    setLoginMode("email");
                    reset();
                  }}
                >
                  <Text
                    type="Body"
                    variant="Medium"
                    className="text-[#613DE4] mb-1"
                  >
                    Sign In with Email
                  </Text>
                </button>
              </div>
              <div className="flex w-full">
                <Select 
                  value={selectedCountryCode}
                  onValueChange={(value) => {
                    setSelectedCountryCode(value);
                  }}
                >
                  <SelectTrigger className="w-full max-w-22 rounded-r-none border-[#dbdbdb] border-r-0 shadow-none">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Country</SelectLabel>
                      {
                        countryList.map((item) => (
                          <SelectItem key={item.code} value={item.dial_code}>
                            {item.code} {item.dial_code}
                          </SelectItem>
                        ))
                      }        
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Input
                  wrapperClassName="w-107 rounded-l-none border-l-0"
                  id="identifier"
                  // label="Mobile Number"
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
              </div>
            </div>
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