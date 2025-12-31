import { z } from "zod";

export const formSchema = z.object({
  username: z.string().min(2, {
    message: "Le nom doit comporter au moins 2 charactères."
  }),
  password: z.string().min(4, {
    message: "Le mot de passe doit comporter au moins 4 charactères."
  }),
  email: z
    .string({
      required_error: "Cet email n'est pas valide."
    })
    .email(),
  avatarUrl: z.string(),
  role: z.string(),
  isAdmin: z.boolean().default(false)
});

export const formUpdateSchema = z.object({
  username: z.string().min(2, {
    message: "Le nom doit comporter au moins 2 charactères."
  }),
  email: z
    .string({
      required_error: "Cet email n'est pas valide."
    })
    .email(),
  avatarUrl: z.string(),
  role: z.string(),
  isAdmin: z.boolean().default(false)
});
