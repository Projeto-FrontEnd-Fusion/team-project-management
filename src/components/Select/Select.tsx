import { ComponentProps } from "react";
import { useFormContext } from "react-hook-form";

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
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="flex flex-col gap-2">
      <label 
        htmlFor={id}
        className="text-gray-400"
      >
        {label}
      </label>

      <select 
        id={id}
        defaultValue="" 
        {...props}
        {...register(id)}
        className="text-gray-400 font-bold border-1 p-1.5 rounded-lg"
      >
        <option value="" disabled>{defaultOption}</option>
        
        {options.map((option, index) => (
          <option value={option} key={index}>{option}</option>
        ))}

      </select>

      {errors[id] && (
        <p className="text-xs text-red-600">{errors[id].message?.toString()}</p>
      )}
    </div>
  );
};

export default Select;