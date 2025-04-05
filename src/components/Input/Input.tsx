import { ComponentProps } from "react";
import { useFormContext, FieldError } from "react-hook-form";

interface InputProps extends ComponentProps<"input"> {
  id: string;
  label: string;
}

const Input = ({ id, label, type = "text", ...props }: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = errors[id] as FieldError | undefined;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-gray-400">
        {label}
      </label>

      <input
        id={id}
        type={type}
        {...register(id)}
        {...props}
        className="text-gray-400 font-bold border-1 p-[6px] rounded-lg"
        {...(type === "file" && { value: undefined })}
      />

      {fieldError && (
        <p className="text-xs text-red-500">{fieldError.message}</p>
      )}
    </div>
  );
};

export default Input;
