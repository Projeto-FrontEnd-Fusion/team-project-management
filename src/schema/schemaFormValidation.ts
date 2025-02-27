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
  professionalProfiles: z.array(
      z.object({
        url: z.string().url("URL inválida"),
        platform: z.string().nonempty("Por favor, selecione uma plataforma válida"),
      })
  ),
  hardSkills: z.array(z.string()),
  softSkills: z.array(z.string()),
});

export type formMemberData = z.infer<typeof formMemberSchema>;
