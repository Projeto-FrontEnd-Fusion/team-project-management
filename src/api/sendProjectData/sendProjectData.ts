import { formProjectsData } from "../../schema/projectsFormSchema";
import { api } from "../axiosInstance";

export interface propsProjectData {
  id: string;
  projectData: formProjectsData;
}

export const sendProjectData = async ({ id, projectData }: propsProjectData) => {
  const { data: member } = await api.get(`/members/${id}`);
  const projetosAtuais = member.projetos || [];

  const todosProjetos = [...projetosAtuais, ...projectData.projects];

  const dataToSend = new FormData();

  todosProjetos.forEach((project, index) => {
    dataToSend.append(`projects[${index}][projectName]`, project.projectName);
    dataToSend.append(`projects[${index}][deployLink]`, project.deployLink);
    dataToSend.append(`projects[${index}][githubLink]`, project.githubLink);
    dataToSend.append(`projects[${index}][description]`, project.description);

    project.skills.forEach((skill: string, skillIndex: number) => {
      dataToSend.append(`projects[${index}][skills][${skillIndex}]`, skill);
    });    

    if (project.image && project.image.length > 0) {
      dataToSend.append(`projects[${index}][image]`, project.image[0]);
    }
  });

  const { data } = await api.patch(`/members/${id}`, dataToSend, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

