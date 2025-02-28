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
}: ProfessionalProfileFieldProps) => {

  const { register } = useFormContext();

  return (
    <div key={fieldId} className="flex flex-col justify-items-center justify-between gap-2 lg:flex-row">
      <div className="flex flex-col gap-2 w-full">
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

      <div className="flex flex-col w-full gap-2">
        <label htmlFor={`professionalProfiles.${index}.platform`} className="text-gray-400">
          Plataforma
        </label>

        <div className="flex flex-row w-full gap-1">

          <select
            id={`professionalProfiles.${index}.platform`}
            {...register(`professionalProfiles.${index}.platform`)}
            className="w-full text-gray-400 font-bold border p-2 rounded-lg"
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

          <div className="items-center">
            {index > 0 && (
              <button type="button" className="hover:cursor-pointer self-center" onClick={() => remove(index)}>
                <IoIosCloseCircle className="text-red-600 text-2xl" />
              </button>
            )}
          </div>
        </div>
        {errors?.professionalProfiles?.[index]?.platform && (
          <p className="text-xs text-red-600">{errors.professionalProfiles[index]?.platform?.message}</p>
        )}
      </div>

    </div>
  );
};

export default ProfessionalProfileField;
