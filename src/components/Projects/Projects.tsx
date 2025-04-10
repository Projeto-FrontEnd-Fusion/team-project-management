import { FormProvider, useForm } from "react-hook-form";
import { formProjectsData, formProjectsSchema } from "../../schema/projectsFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Input/Input";
import Textarea from "../Textarea/Textarea";
import AutocompleteSkills from "../AutocompleteSkills/Autocomplete";
import useSkillsHandler from "../../hooks/useSkillsHandle";

const Projects = () => {
  const skills = useSkillsHandler()?.data ?? [];

  const methods = useForm<formProjectsData>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(formProjectsSchema),
    defaultValues: {
      projectName: "",
      image: new DataTransfer().files,
      deployLink: "",
      githubLink: "",
      skills: [],
      description: "",
    }
  });

  return(
    <main className="min-h-screen flex flex-col items-center p-4 sm:p-10 lg:p-14">
      <section className="bg-neutral-900 rounded-md w-full p-8 shadow-2xl">
        <h1 className="font-semibold text-xl text-white mb-8">Cadastrar Projetos</h1>

        <FormProvider {...methods}>
          <form className="flex flex-col gap-8">
            <Input 
              id="projectName"
              label="Nome do Projeto"
              placeholder="Ex: Portfólio pessoal, Sistema de Vendas..."
            />

            <Input 
              id="image"
              label="Imagem"
              type="file"
              accept="image/"
            />

            <Input 
              id="deployLink"
              label="Link do Deploy"
              placeholder="Ex: https://meuprojeto.vercel.app"
            />

            <Input 
              id="githubLink"
              label="Link do GitHub"
              placeholder="Ex: https://github.com/usuario/nome-do-projeto"
            />

            <AutocompleteSkills 
              name="skills"
              label="Habilidades usadas"
              skills={skills}
            />

            <Textarea 
              id="description"
              label="Descrição do Projeto"
              placeholder="Descreva o objetivo, funcionalidades e tecnologias utilizadas..."
            />

            <div className="flex justify-center">
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
}

export default Projects;