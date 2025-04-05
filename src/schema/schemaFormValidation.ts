import { z } from "zod";
import { validStack, validLevel } from "../types/formOptions";

export const formMemberSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório."),
  stack: z.enum(validStack, {
    message: "Por favor, selecione uma stack válida.",
  }),
  level: z.enum(validLevel, {
    message: "Por favor, selecione um level válido.",
  }),
  profileImage: z.instanceof(FileList)
    .refine((files) => files?.length === 1, 'A imagem de perfil é obrigatória')
    .refine((files) => files[0]?.size <= 5 * 1024 * 1024, 'O tamanho máximo é 5MB')
    .refine((files) => ['image/jpeg', 'image/png', 'image/webp'].includes(files[0]?.type), 
      'Apenas formatos .jpeg, .png e .webp são suportados'),
  professionalProfiles: z.array(
      z.object({
        url: z.string().url("URL inválida"),
        platform: z.string().nonempty("Por favor, selecione uma plataforma válida"),
      })
  ),
  skills: z.array(z.string()),
  softSkills: z.array(z.string()),
});

export type formMemberData = z.infer<typeof formMemberSchema>;
