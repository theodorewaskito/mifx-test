"use client"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import Button from "../../common/Button";
import Text from "@/components/common/Text";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { STORAGE_KEYS } from "@/constants/storage-key";
import { Spinner } from "@/components/ui/spinner";

const otpSchema = z.object({
  otp: z.string()
    .length(6, "OTP must be 6 digits")
});

type OtpFormValues = z.infer<typeof otpSchema>;

export default function FormOtp() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  useEffect(() => {
    const phone = localStorage.getItem(STORAGE_KEYS.PHONE_NUMBER);
    if (phone) {
      setPhoneNumber(phone);
    }
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (data: OtpFormValues) => {
    try {
      const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);

      const response = await axios.post("/api/auth/otp", {
        otp: data.otp,
        phone: phoneNumber,
      }, {
        headers: {
          Authorization: `${token}`,
        },
      });

      if (response.data?.success) {
        // ✅ Token sudah ada dari login, tidak perlu di-set ulang
        // Langsung redirect
        router.push("/");
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;
        if (message) {
          setError("otp", { type: "server", message });
        }
      }
    }
  };

  return (
    <form 
      className="flex flex-col gap-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Text type="Header" variant="Large">
          Verify Your Account
        </Text>
        <Text type="Body" variant="Medium">
          Enter the 6-digit code sent to {phoneNumber}
        </Text>
      </div>

      <Controller
        name="otp"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-2">
            <InputOTP 
              maxLength={6}
              value={field.value}
              onChange={field.onChange}
            >
              <InputOTPGroup className="flex gap-2">
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            {errors.otp && (
              <Text type="Body" variant="Small" className="text-center text-red-500">
                {errors.otp.message}
              </Text>
            )}
          </div>
        )}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Spinner /> : "Confirm"}
      </Button>
    </form>
  );
}
