import { ComponentProps } from "react";
import { useFormContext, FieldError } from "react-hook-form";
import { get } from "lodash";

interface SelectProps extends ComponentProps<"select"> {
  id: string;
  defaultOption: string;
  label: string;
  options: readonly string[];
}

const Select = ({
  id,
  defaultOption,
  label,
  options,
  ...props
}: SelectProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = get(errors, id) as FieldError | undefined;

  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={id} className="text-gray-400">
        {label}
      </label>

      <select
        id={id}
        defaultValue=""
        {...props}
        {...register(id)}
        className="text-gray-400 font-bold border-1 p-2 rounded-lg"
      >
        <option value="" disabled>
          {defaultOption}
        </option>

        {options.map((option, index) => (
          <option value={option} key={index}>
            {option}
          </option>
        ))}
      </select>

      {fieldError?.message && (
        <p className="text-xs font-bold text-orange-400">
          {String(fieldError.message)}
        </p>
      )}
    </div>
  );
};

export default Select;
