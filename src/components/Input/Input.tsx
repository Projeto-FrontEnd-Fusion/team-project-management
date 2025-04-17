import { ComponentProps } from "react";
import { FieldError, useFormContext } from "react-hook-form";
import { get } from "lodash";

interface InputProps extends ComponentProps<"input"> {
  id: string;
  label: string;
}

const Input = ({ id, label, type = "text", ...props }: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = get(errors, id) as FieldError | undefined;

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
        className="text-gray-400 font-bold border-1 p-[6px] rounded-lg border-gray-400"
        {...(type === "file" && { value: undefined })}
      />

      {fieldError?.message && (
        <p className="text-xs font-bold text-orange-400">{String(fieldError.message)}</p>
      )}
    </div>
  );
};

export default Input;
