// import { z } from 'zod';

// export const WinerieSchemaZod = z.object({
//   id: z.number().int().positive(),
//   nameStorage: z.string().min(1).max(255),
//   address: z.string().min(1).max(255),
//   TypeStorage: z.enum(['principal', 'branch_warehouse']),
// //   Status: z.enum(['active', 'inactive']).default('active')
  
// });

// // Tipo TypeScript inferido del schema
// export type WinerieType = z.infer<typeof WinerieSchemaZod>;

// // Versión para creación (donde el id es opcional)
// export const WinerieCreateSchemaZod = WinerieSchemaZod.omit({ id: true }).partial({
// //   Status: true,
//   managerId: true
// });

// // Versión para actualización (todos los campos opcionales excepto id)
// export const WinerieUpdateSchemaZod = WinerieSchemaZod.pick({ id: true }).extend({
//   nameStorage: z.string().min(1).max(255).optional(),
//   address: z.string().min(1).max(255).optional(),
//   TypeStorage: z.enum(['principal', 'branch_warehouse']).optional(),
//   Status: z.enum(['active', 'inactive']).optional(),
//   managerId: z.number().int().positive().nullable().optional()
// });



// interface PropsAutoComplete {
//     data?: { key: string | number, label: string, decripcion?: string }[]
//     // ... otras props
//     valueType?: 'string' | 'number' // Nueva prop
// }



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

// export type WineriesFormType = Omit<WineriesType, 'Status'>;

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