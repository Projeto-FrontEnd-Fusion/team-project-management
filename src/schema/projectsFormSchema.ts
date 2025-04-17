import { z } from "zod";

export const formProjectsSchema = z.object({
  projects: z.array(
    z.object({
      projectName: z.string().min(1, "O nome do projeto é obrigatório."),
      image: z
        .instanceof(FileList)
        .refine(
          (files) => files?.length === 1,
          "A imagem do projeto é obrigatória"
        )
        .refine(
          (files) => files[0]?.size <= 5 * 1024 * 1024,
          "O tamanho máximo é 5MB"
        )
        .refine(
          (files) =>
            ["image/jpeg", "image/png", "image/webp"].includes(files[0]?.type),
          "Apenas formatos .jpeg, .png e .webp são suportados"
        ),
      deployLink: z.string().url("Insira uma URL válida para o deploy."),
      githubLink: z.string().url("Insira uma URL válida do GitHub."),
      skills: z
        .array(z.string())
        .nonempty("Selecione pelo menos uma habilidade."),
      description: z
        .string()
        .min(10, "A descrição precisa ter no mínimo 10 caracteres."),
    })
  ).min(1),
});

export type formProjectsData = z.infer<typeof formProjectsSchema>;
