import { z } from "zod";

export const LoginTypeSchema = z.object({
  email: z.string().email("Debe ser un correo electrónico válido"),
  password: z.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una mayúscula")
    .regex(/[0-9]/, "La contraseña debe contener al menos un número")
});



// Schema para LoginUserConfirm
export const LoginUserConfirmSchema = z.object({
  email: z.string(),
  storageId: z.number()
});


// También puedes generar los tipos a partir de los schemas si lo deseas
export type LoginType = z.infer<typeof LoginTypeSchema>;
export type LoginUserConfirm = z.infer<typeof LoginUserConfirmSchema>;