import { FieldErrors, useFormContext } from "react-hook-form";
import { validPlataform } from "../../types/formOptions";
import { formMemberData } from "../../schema/schemaFormValidation";
import { IoIosCloseCircle } from "react-icons/io";

interface ProfessionalProfileFieldProps {
  fieldId: string;
  index: number;
  errors: FieldErrors<formMemberData>;
  remove: (index: number) => void;
}

const ProfessionalProfileField = ({ 
  fieldId, 
  index, 
  errors, 
  remove 
} : ProfessionalProfileFieldProps) => {

  const { register } = useFormContext();

  return (
    <div key={fieldId} className="flex items-start justify-between gap-2">
      <div className="flex flex-col gap-2 w-[60%]">
        <label htmlFor={`professionalProfiles.${index}.url`} className="text-gray-400">
          Perfil Profissional (links)
        </label>

        <input
          id={`professionalProfiles.${index}.url`}
          placeholder="https://redeprofisional/seunome"
          {...register(`professionalProfiles.${index}.url`)}
          className="text-gray-400 font-bold border p-1.5 rounded-lg"
        />

        {errors?.professionalProfiles?.[index]?.url && (
          <p className="text-xs text-red-600">{errors.professionalProfiles[index]?.url?.message}</p>
        )}
      </div>
      
      <div className="flex flex-col gap-2">
        <label htmlFor={`professionalProfiles.${index}.platform`} className="text-gray-400">
          Plataforma
        </label>

        <select
          id={`professionalProfiles.${index}.platform`}
          {...register(`professionalProfiles.${index}.platform`)}
          className="text-gray-400 font-bold border p-1.5 rounded-lg"
        >
          <option value="" disabled>
            Selecione uma plataforma...
          </option>
          {validPlataform.map((platform, idx) => (
            <option value={platform} key={idx}>
              {platform}
            </option>
          ))}
        </select>

        {errors?.professionalProfiles?.[index]?.platform && (
          <p className="text-xs text-red-600">{errors.professionalProfiles[index]?.platform?.message}</p>
        )}
      </div>

      {index > 0 && (
        <button type="button" className="hover:cursor-pointer" onClick={() => remove(index)}>
          <IoIosCloseCircle  className="text-red-600 text-2xl"/>
        </button>
      )}
    </div>
  );
};

export default ProfessionalProfileField;
