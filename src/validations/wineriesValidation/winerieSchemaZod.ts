import { z } from 'zod';

export const WinerieSchemaZod = z.object({
  id: z.coerce.number().int().positive().optional(),
  nameStorage: z.string().min(1, "El nombre del almacén es requerido").max(255, "El nombre no puede exceder 255 caracteres"),
  address: z.string().min(1, "La dirección es requerida").max(255, "La dirección no puede exceder 255 caracteres"),
  TypeStorage: z.enum(['principal', 'branch_warehouse'], {
    errorMap: () => ({ message: "Tipo de almacén debe ser principal o branch_warehouse" })
  }),
  managerId: z.coerce.number().int().positive("El ID del manager debe ser un número positivo").nullable().optional()
});



// Tipo inferido desde el schema de Zod
export type WineriesType = z.infer<typeof WinerieSchemaZod>;

// Elimina la interfaz WineriesType anterior y usa solo esta

// Schemas adicionales útiles
export const WinerieCreateSchemaZod = WinerieSchemaZod.omit({ 
  id: true 
});

export const WinerieUpdateSchemaZod = WinerieSchemaZod.partial().required({ 
  id: true 
});