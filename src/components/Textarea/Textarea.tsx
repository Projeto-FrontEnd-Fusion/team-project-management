import { ComponentProps } from "react";
import { useFormContext, FieldError } from "react-hook-form";

interface textareaProps extends ComponentProps<"textarea"> {
  id: string;
  label: string;
}

const Textarea = ({ id, label, ...props }: textareaProps) => {
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

      <textarea
        id={id}
        {...register(id)}
        {...props}
        className="text-gray-400 font-bold border-1 p-[6px] rounded-lg border-gray-400"
      />

      {fieldError && (
        <p className="text-xs font-bold text-orange-400">{fieldError.message}</p>
      )}
    </div>
  );
};

export default Textarea;
