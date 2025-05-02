import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import {
  formProjectsData,
  formProjectsSchema,
} from "../../schema/projectsFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import AutocompleteSkills from "../AutocompleteSkills/Autocomplete";
import useSkillsHandler from "../../hooks/useSkillsHandle";
import { useProjectUpdate } from "../../hooks/useProjectUpdate";
import { IoIosClose } from "react-icons/io";

const Projects = () => {
  const skills = useSkillsHandler()?.data ?? [];

  const methods = useForm<formProjectsData>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(formProjectsSchema),
    defaultValues: {
      projects: [
        {
          projectName: "",
          image: new DataTransfer().files,
          deployLink: "",
          githubLink: "",
          skills: [],
          description: "",
        },
      ],
    },
  });

  const { control, handleSubmit, reset } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  const { mutate } = useProjectUpdate("640a");

  const onSubmit = (data: formProjectsData) => {
    mutate(data);
    reset();
  };

  return (
    <main className="min-h-screen flex flex-col items-center p-4 sm:p-10 lg:p-14">
      <section className="bg-neutral-900 rounded-md w-full p-8 shadow-2xl">
        <h1 className="font-semibold text-xl text-white mb-8">
          Cadastrar Projetos
        </h1>

        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            {fields.map((field, index) => (
              <div
                className="border-t border-gray-400 flex flex-col gap-8 pt-8"
                key={field.id}
              >
                <div className="flex justify-between">
                  <h2 className="font-bold text-gray-400">
                    Projeto {index + 1}
                  </h2>

                  {index > 0 && (
                    <button
                      type="button"
                      className="hover:cursor-pointer self-center"
                      onClick={() => remove(index)}
                    >
                      <IoIosClose className="scale-200 text-gray-400 hover:scale-250 transition-all duration-200 ease-in-out" />
                    </button>
                  )}
                </div>

                <Input
                  id={`projects.${index}.projectName`}
                  label="Nome do Projeto"
                  placeholder="Ex: Portfólio pessoal, Sistema de Vendas..."
                />

                <Input
                  id={`projects.${index}.image`}
                  label="Imagem"
                  type="file"
                  accept="image/"
                />

                <Input
                  id={`projects.${index}.deployLink`}
                  label="Link do Deploy"
                  placeholder="Ex: https://meuprojeto.vercel.app"
                />

                <Input
                  id={`projects.${index}.githubLink`}
                  label="Link do GitHub"
                  placeholder="Ex: https://github.com/usuario/nome-do-projeto"
                />

                <AutocompleteSkills
                  name={`projects.${index}.skills`}
                  label="Habilidades usadas"
                  skills={skills}
                />

                <Textarea
                  id={`projects.${index}.description`}
                  label="Descrição do Projeto"
                  placeholder="Descreva o objetivo, funcionalidades e tecnologias utilizadas..."
                />
              </div>
            ))}

            <div className="flex gap-4 justify-end">
              <button
                className="border border-gray-400 py-2 px-6 rounded-lg text-gray-400 hover:opacity-70 hover:cursor-pointer focus:scale-105 transition-all duration-100 ease-in-out"
                type="button"
                onClick={() =>
                  append({
                    projectName: "",
                    image: new DataTransfer().files,
                    deployLink: "",
                    githubLink: "",
                    skills: [""],
                    description: "",
                  })
                }
              >
                Adicionar mais
              </button>

              <button
                type="submit"
                className="bg-green-600 rounded-lg p-2 text-black hover:bg-green-500 hover:cursor-pointer focus:scale-105 transition-all duration-100 ease-in-out"
              >
                Cadastrar Projeto
              </button>
            </div>
          </form>
        </FormProvider>
      </section>
    </main>
  );
};

export default Projects;
