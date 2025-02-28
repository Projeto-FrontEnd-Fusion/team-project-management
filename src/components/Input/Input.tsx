import { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";

interface InputProps extends ComponentProps<"input"> {
  id: string;
  placeholder: string;
  label: string;
}

const Input = ({
  id,
  placeholder,
  label,
  ...props
}: InputProps) => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className="text-gray-400">
        {label}
      </label>

      <input
        id={id}
        placeholder={placeholder}
        {...register(id)}
        {...props}
        className="text-gray-400 font-bold border-1 p-[6px] rounded-lg"
      />

      {errors[id] && <p className="text-xs text-red-500">{errors[id].message?.toString()}</p>}
    </div>
  );
};

export default Input;
