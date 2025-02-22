import { useForm, FormProvider, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formMemberSchema, formMemberData } from "../../schema/schemaFormValidation";
import { validStack, validLevel } from "../../types/formOptions";
import Input from "../Input/Input";
import Select from "../Select/Select";
import ProfessionalProfileField from "../ProfessionalProfileField/ProfessionalProfileField";
import { CiCirclePlus } from "react-icons/ci";
import { Autocomplete, Chip, TextField } from "@mui/material";
import useSkillsHandler from "../../hooks/useSkillsHandle";

const Form = () => {
  const { skills } = useSkillsHandler();

  const methods = useForm<formMemberData>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(formMemberSchema),
    defaultValues: {
      professionalProfiles: [{
        url: "",
        platform: "",
      }],
      skills: []    
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
        <div className="flex items-center justify-between">
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

        <Controller
          name="skills"
          control={control}
          render={({ field }) => (
            <Autocomplete
              multiple 
              options={skills}
              getOptionLabel={(option) => option.name}
              value={skills.filter(skill => (field.value || []).includes(skill.id))}
              onChange={(_, value) => field.onChange(value.map((v) => v.id))}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  label="Escolha suas skills"
                  error={!!errors.skills}
                  helperText={errors.skills ? "Escolha uma opção válida!" : ""}
                  sx={{
                    "& .MuiInputBase-input, & .MuiInputLabel-root, & .MuiSvgIcon-root, & .MuiOutlinedInput-root fieldset": {
                      color: "gray",
                      borderColor: "gray",
                    },
                    "& .MuiOutlinedInput-root:hover fieldset, & .MuiOutlinedInput-root.Mui-focused fieldset": {
                      borderColor: "gray",
                    }
                  }}
                />
              )}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip 
                    label={option.name}
                    {...getTagProps({index})}
                  />
                ))
              }
            />
          )} 
        />

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