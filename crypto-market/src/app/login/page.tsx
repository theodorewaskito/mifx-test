import Button from "@/components/Button";
import Input from "@/components/Input";
import Text from "@/components/Text";
import Image from "next/image";

export default function Login() {
  return (
    <div className="grid grid-cols-2 gap-2 h-screen">
      <div className="relative">
        <Image
          src="/left-content-login.jpg"
          alt="Banner Login"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col gap-4 w-[516px]">
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
              <Input
                id="email"
                label="Email"
                type="email"
                placeholder="username@gmail.com"
                noteButton="Sign In with Phone Number"
                required
              />
            </div>
            <div className="flex flex-col gap-1">
              <Input
                id="password"
                label="Password"
                type="password"
                placeholder="Enter your password"
                // error="Password is required"
              />
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
