"use client"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import Button from "../../common/Button";


export default function FormOtp() {

  return (
      <div className="flex flex-col gap-8">
        <InputOTP maxLength={6}>
          <InputOTPGroup className="flex gap-2">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        <Button>Confirm</Button>
      </div>
  );
}
