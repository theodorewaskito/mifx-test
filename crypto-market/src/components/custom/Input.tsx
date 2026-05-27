import { InputHTMLAttributes, forwardRef } from "react";
import Text from "@/components/custom/Text";
import { Input as InputUI } from "@/components/ui/input"
import { InputGroup, InputGroupAddon, InputGroupInput } from "../ui/input-group";
import { Eye } from 'lucide-react';

interface InputProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  trailingIcon?: React.ReactNode;
  onTrailingIconClick?: () => void;
  noteButton?: string;
  onClickNote?: () => void ;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, trailingIcon, onTrailingIconClick, noteButton, id, onClickNote, ...props }, ref) => {
    const handleTrailingIconClick = () => {
      if (onTrailingIconClick) {
        onTrailingIconClick();
      }
    };

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
            {noteButton && (
              <button 
                className="cursor-pointer hover:underline"
                onClick={onClickNote}
              >
                <Text
                  type="Body"
                  variant="Medium"
                  className="text-[#613DE4]"
                >
                  {noteButton}
                </Text>
              </button>
            )}
          </div>
        )}

        <div className="relative">
          <InputGroup>
            <InputGroupInput
              ref={ref}
              id={id} 
              {...props}
            />

            {trailingIcon && (
              <InputGroupAddon align="inline-end">
                {trailingIcon}
              </InputGroupAddon>
            )}
          </InputGroup>
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