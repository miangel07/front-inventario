import { z } from "zod";

export const BusinessSchemaZod = z.object({
  id: z.number().optional(),
  name: z.string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(100, "El nombre es demasiado largo"),
  
  address: z.string()
    .min(5, "La dirección debe tener al menos 5 caracteres")
    .max(200, "La dirección es demasiado larga"),
  
  createdAt: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido. Use YYYY-MM-DD")
    .refine(date => new Date(date).toString() !== 'Invalid Date', {
      message: "Fecha inválida"
    }),
  
  planRenewalDate: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido. Use YYYY-MM-DD")
    .refine(date => new Date(date).toString() !== 'Invalid Date', {
      message: "Fecha inválida"
    })
    .refine(date => new Date(date) > new Date(), {
      message: "La fecha de renovación debe ser futura"
    }),
  
  config: z.object({
    infinty: z.boolean(),
    
    cuantityUsers: z.number()
      .int("Debe ser un número entero")
      .positive("Debe ser mayor que 0")
      .min(1, "Mínimo 1 usuario"),
    
    maxStorage: z.number()
      .int("Debe ser un número entero")
      .positive("Debe ser mayor que 0")
      .min(1, "Mínimo 1 GB de almacenamiento")
  })
}).strict();

// Tipo inferido (opcional, si quieres usarlo)

export type BusinessRegisterRequestZod = z.infer<typeof BusinessSchemaZod>;
