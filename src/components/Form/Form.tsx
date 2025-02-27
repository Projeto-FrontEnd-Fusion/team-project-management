import { useForm, FormProvider, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formMemberSchema, formMemberData } from "../../schema/schemaFormValidation";
import { validStack, validLevel } from "../../types/formOptions";
import Input from "../Input/Input";
import Select from "../Select/Select";
import ProfessionalProfileField from "../ProfessionalProfileField/ProfessionalProfileField";
import { CiCirclePlus } from "react-icons/ci";
import useSkillsHandler from "../../hooks/useSkillsHandle";
import AutocompleteSkills from "../AutocompleteSkills/Autocomplete";

const Form = () => {
  const { hardSkills, softSkills } = useSkillsHandler();

  const methods = useForm<formMemberData>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(formMemberSchema),
    defaultValues: {
      professionalProfiles: [{
        url: "",
        platform: "",
      }],
      hardSkills: [],
      softSkills: [],    
    }
  });

  const { formState: { errors }, control } = methods;

  const { fields, append, remove } = useFieldArray({
    name: "professionalProfiles",
    control,
  });

  const handleSubmitForm = (data: formMemberData) => {
    console.log(data);
  };
  
  return(
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmitForm)} className="flex flex-col gap-8">
        <div className="flex items-start justify-between">
          <div className="w-[40%]">
            <Input 
              id="name" 
              placeholder="Digite seu nome" 
              label="Nome"
            />
          </div>
        
          <div className="flex justify-end gap-8">
            <Select 
              id="stack"
              defaultOption="Selecione uma stack..."
              label="Stack"
              options={validStack}  
            />

            <Select 
              id="level"
              defaultOption="Selecione um Level..."
              label="Level"
              options={validLevel}  
            />
          </div>
        </div>

        {fields.map((field, index) => (
          <ProfessionalProfileField
            key={field.id}
            fieldId={field.id}
            index={index}
            errors={errors}
            remove={remove}
          />
        ))}

        <div className="flex justify-center">
          <button 
            type="button"
            className="flex items-center gap-3 rounded-lg bg-black pl-4 py-0.5 w-64 text-gray-400 text-center border border-gray-400"
            onClick={() => append({
              url: "",
              platform: "",
            })}
          >
            <CiCirclePlus /> Adicionar perfil social
          </button>
        </div>

        <AutocompleteSkills 
          name="hardSkills"
          label="Hardskills"
          skills={hardSkills}
        />

        <AutocompleteSkills 
          name="softSkills"
          label="Softskills"
          skills={softSkills}
        />
        
        <div className="flex justify-center">
          <button 
            type="submit"
            className="bg-green-600 rounded-lg p-2 text-black"
          >
            Finalizar Cadastro
          </button>
        </div>
      </form>
    </FormProvider>
  )
};

export default Form;