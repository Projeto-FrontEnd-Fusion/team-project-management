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
import { useSubmitMemberForm } from "../../hooks/useSubmitMemberForm";
import useSoftskillsHandler from "../../hooks/useSoftskillsHandle";

const Form = () => {
  const skills = useSkillsHandler()?.data ?? [];
  const softskills = useSoftskillsHandler()?.data ?? [];
  const { mutate } = useSubmitMemberForm();

  const methods = useForm<formMemberData>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(formMemberSchema),
    defaultValues: {
      profileImage: new DataTransfer().files,
      professionalProfiles: [{
        url: "",
        platform: "",
      }],
      skills: [],
      softSkills: [],
    }
  });

  const { formState: { errors }, control } = methods;

  const { fields, append, remove } = useFieldArray({
    name: "professionalProfiles",
    control,
  });

  const handleSubmitForm = (data: formMemberData) => {
    mutate(data);
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-4 sm:p-10 lg:p-14">
      <section className="bg-neutral-900 rounded-md w-full p-8 shadow-2xl">
        <h3 className="font-semibold text-xl text-white mb-8">Cadastrar novo membro</h3>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSubmitForm)} className="flex flex-col gap-8">
            <div className="w-full flex justify-between gap-4 flex-wrap xl:flex-nowrap">
              <div className="w-full">
                <Input
                  id="name"
                  label="Nome"
                  placeholder="Digite seu nome"
                  type="text"
                />
              </div>

              <div className="flex flex-col gap-4 w-full md:flex-row xl:mt-0">
                <Select
                  id="stack"
                  defaultOption="Selecione uma stack"
                  label="Stack"
                  options={validStack}
                />

                <Select
                  id="level"
                  defaultOption="Selecione um Level"
                  label="Level"
                  options={validLevel}
                />
              </div>
            </div>

            <div>
              <Input
                id="profileImage"
                label="Imagem de usuário"
                type="file"
                accept="image/"
              />
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
                className="flex font-bold items-center gap-3 px-2 py-2 rounded-lg bg-[#0f0f0f] w-64 text-gray-400 text-center border border-gray-400 hover:cursor-pointer hover:bg-[#1a1a1a] transition-all duration-100 ease-in-out"
                onClick={() => append({
                  url: "",
                  platform: "",
                })}
              >
                <CiCirclePlus className="scale-105" /> Adicionar perfil social
              </button>
            </div>

            <AutocompleteSkills
              name="skills"
              label="skills"
              skills={skills}
            />

            <AutocompleteSkills
              name="softSkills"
              label="Softskills"
              skills={softskills}
            />

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-600 rounded-lg p-2 text-black hover:bg-green-500 hover:cursor-pointer focus:scale-105 transition-all duration-100 ease-in-out"
              >
                Finalizar Cadastro
              </button>
            </div>
          </form>
        </FormProvider>
      </section>
    </main>
  )
};

export default Form;
