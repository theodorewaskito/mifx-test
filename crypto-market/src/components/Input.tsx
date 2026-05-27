import { InputHTMLAttributes, forwardRef } from "react";
import Text from "@/components/Text";

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  trailingIcon?: boolean | React.ReactNode;
  noteButton?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, trailingIcon, noteButton, id, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-2">
        {label && (
          <div className="flex justify-between">
            <label
              htmlFor={id}
            >
              <Text
                type="Body"
                variant="Medium"
              >{label}</Text>
            </label>
            <button 
              className="cursor-pointer hover:underline"
              // onClick={() => { }}
            >
              <Text
                type="Body"
                variant="Medium"
                className="text-[#613DE4]"
              >
                {noteButton}
              </Text>
            </button>
          </div>
        )}

        <div className="relative">
          <input
            ref={ref}
            id={id}
            className={`
              w-full rounded-lg border px-4 py-2 outline-none transition
              ${
                error
                  ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:border-blue-500 focus:ring-blue-200"
              }
              ${className || ""}
            `}
            {...props}
          />

          {trailingIcon && (
            <button
              type="button"
              // onClick={() => setShowPassword((s) => !s)}
              className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 inline-flex items-center justify-center p-1 text-gray-600 hover:text-gray-900"
              // aria-label={showPassword ? "Hide password" : "Show password"}
            ></button>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;