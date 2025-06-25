import { z } from "zod";

export const UserSchemaZod = z.object({
  id: z.coerce.number().positive().optional(),
  username: z.string().min(1, "El nombre de usuario es requerido"),
  lastname: z.string().min(1, "El apellido es requerido"),
    password: z.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .regex(/[A-Z]/, "La contraseña debe contener al menos una mayúscula")
    .regex(/[0-9]/, "La contraseña debe contener al menos un número"),
  phone: z.string().min(1, "El teléfono es requerido"),
  identificationNumber: z.coerce.number().positive("El número de identificación debe ser positivo"),
  address: z.string().min(1, "La dirección es requerida"),
  typeDocument: z.enum(["cc", "ti", "ce"], {
    errorMap: () => ({ message: "Tipo de documento debe ser cc, ti o ce" })
  }),
  email: z.string().email("Debe ser un email válido"),
  createDate: z.string().optional(),
  rolId: z.coerce.number().positive().optional()
});

// Tipo inferido desde el schema de Zod
export type UserType = z.infer<typeof UserSchemaZod>;

// Schemas adicionales útiles
export const UserCreateSchemaZod = UserSchemaZod.omit({ 
  id: true, 
  createDate: true 
});

export const UserUpdateSchemaZod = UserSchemaZod.partial().required({ 
  id: true 
});
