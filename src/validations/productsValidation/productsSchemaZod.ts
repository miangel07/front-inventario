// import { z } from 'zod';


// const imageValidation = z
//   .any()
//   .refine(
//     (file) => {
//       if (!file || typeof file === "string") return true;
//       return file instanceof File && ["image/jpeg", "image/jpg", "image/png"].includes(file.type);
//     },
//     { message: "La imagen debe ser JPG, JPEG o PNG" }
//   )
//   .refine(
//     (file) => {
//       if (!file || typeof file === "string") return true;
//       return file instanceof File && file.size <= 2 * 1024 * 1024;
//     },
//     { message: "La imagen no debe superar los 2MB" }
//   ).optional();;



// const BaseProductSchema = z.object({
//   nameProduct: z.string().min(1, "El nombre del producto es requerido"),
//   description: z.string().min(1, "La descripción es requerida"),
//   internalCode: z.string().min(1, "El código interno es requerido"),
//   brand: z.string().min(1, "La marca es requerida"),
//   quantity: z.number().int().nonnegative("La cantidad debe ser un número entero positivo"),
//   stockMax: z.number().int().positive("El stock máximo debe ser un número entero positivo"),
//   stockMin: z.number().int().nonnegative("El stock mínimo debe ser un número entero no negativo"),
//   img: imageValidation,
//   observations: z.string().optional(),
//   location: z.string().min(1, "La ubicación es requerida"),
//   expirationDate: z.coerce.date()
//     .min(new Date(), "La fecha de expiración debe ser futura"),
//   measureUnitId: z.number().int().positive("El ID de unidad de medida debe ser un número positivo"),
//   categoryId: z.number().int().positive("El ID de categoría debe ser un número positivo"),
//   storage: z.number().int().positive("El ID de almacenamiento debe ser un número positivo").nullable().optional(),
// });

// // Schema con todas las validaciones de stock
// export const ProductSchemaZod = BaseProductSchema
//   .refine(data => data.stockMax > data.stockMin, {
//     message: "El stock máximo debe ser mayor que el stock mínimo",
//     path: ["stockMax"]
//   })
//   .refine(data => data.quantity >= data.stockMin, {
//     message: "La cantidad no puede ser menor que el stock mínimo",
//     path: ["quantity"]
//   })
//   .refine(data => data.quantity <= data.stockMax, {
//     message: "La cantidad no puede ser mayor que el stock máximo",
//     path: ["quantity"]
//   });

// // Versión para creación que muestra todos los errores de stock a la vez
// const CreateProductSchema = BaseProductSchema.superRefine((data, ctx) => {
//   // Validar relación stockMin < stockMax
//   if (data.stockMin >= data.stockMax) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: "El stock mínimo debe ser menor que el stock máximo",
//       path: ["stockMin"]
//     });
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: "El stock máximo debe ser mayor que el stock mínimo",
//       path: ["stockMax"]
//     });
//   }

//   // Validar que quantity esté entre stockMin y stockMax
//   if (data.quantity < data.stockMin) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: `La cantidad no puede ser menor que el stock mínimo (${data.stockMin})`,
//       path: ["quantity"]
//     });
//   }

//   if (data.quantity > data.stockMax) {
//     ctx.addIssue({
//       code: z.ZodIssueCode.custom,
//       message: `La cantidad no puede ser mayor que el stock máximo (${data.stockMax})`,
//       path: ["quantity"]
//     });
//   }
// });

// // Tipo TypeScript derivado del schema
// export type Product = z.infer<typeof ProductSchemaZod>;

// import { z } from 'zod';

// const imageValidation = z
//   .union([z.instanceof(File), z.string()])
//   .refine(
//     (file) => {
//       if (!file) return true; // Permite valores nulos/undefined
//       if (typeof file === 'string') return true; // Permite strings (paths de imágenes existentes)
//       return ["image/jpeg", "image/jpg", "image/png"].includes(file.type);
//     },
//     { message: "La imagen debe ser JPG, JPEG o PNG" }
//   )
//   .refine(
//     (file) => {
//       if (!file || typeof file === 'string') return true;
//       return file.size <= 2 * 1024 * 1024;
//     },
//     { message: "La imagen no debe superar los 2MB" }
//   )
//   .optional()
//   .nullable();

// const BaseProductSchema = z.object({
//   nameProduct: z.string().min(1, "El nombre del producto es requerido"),
//   description: z.string().optional().nullable(),
//   internalCode: z.string().min(1, "El código interno es requerido"),
//   brand: z.string().optional().nullable(),
//   quantity: z.number().int().nonnegative("La cantidad debe ser un número entero positivo"),
//   stockMax: z.number().int().positive("El stock máximo debe ser un número entero positivo").optional().nullable(),
//   stockMin: z.number().int().nonnegative("El stock mínimo debe ser un número entero no negativo").optional().nullable(),
//   img: imageValidation,
//   observations: z.string().optional().nullable(),
//   location: z.string().optional().nullable(),
//   expirationDate: z.coerce.date()
//     .min(new Date(), "La fecha de expiración debe ser futura")
//     .optional()
//     .nullable(),
//   measureUnitId: z.number().int().positive("El ID de unidad de medida debe ser un número positivo"),
//   categoryId: z.number().int().positive("El ID de categoría debe ser un número positivo"),
//   storage: z.number().int().positive("El ID de almacenamiento debe ser un número positivo").nullable().optional(),
// });

// // Versión para creación que muestra todos los errores de stock a la vez
// export const ProductSchemaZod = BaseProductSchema.superRefine((data, ctx) => {
//   // Solo validar relaciones de stock si ambos valores están presentes
//   if (data.stockMin !== null && data.stockMin !== undefined && 
//       data.stockMax !== null && data.stockMax !== undefined) {
    
//     if (data.stockMin >= data.stockMax) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "El stock mínimo debe ser menor que el stock máximo",
//         path: ["stockMin"]
//       });
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: "El stock máximo debe ser mayor que el stock mínimo",
//         path: ["stockMax"]
//       });
//     }

//     // Validar que quantity esté entre stockMin y stockMax
//     if (data.quantity < data.stockMin) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: `La cantidad no puede ser menor que el stock mínimo (${data.stockMin})`,
//         path: ["quantity"]
//       });
//     }

//     if (data.quantity > data.stockMax) {
//       ctx.addIssue({
//         code: z.ZodIssueCode.custom,
//         message: `La cantidad no puede ser mayor que el stock máximo (${data.stockMax})`,
//         path: ["quantity"]
//       });
//     }
//   }
// });

// // Tipo TypeScript derivado del schema
// export type Product = z.infer<typeof ProductSchemaZod>;

// export type FormProductsType = z.input<typeof ProductSchemaZod> & {
//   id?: number;
//   Status?: 'active' | 'inactive';
// };



import { z } from 'zod';

// Schema de Zod para validación
export const ProductSchema = z.object({
  nameProduct: z
    .string()
    .min(1, "El nombre del producto es requerido")
    .max(255, "El nombre no puede exceder 255 caracteres"),
  
  description: z
    .string()
    .max(255, "La descripción no puede exceder 255 caracteres")
    .optional()
    .nullable(),
  
  internalCode: z
    .string()
    .min(1, "El código interno es requerido")
    .max(255, "El código interno no puede exceder 255 caracteres"),
  
  brand: z
    .string()
    .max(255, "La marca no puede exceder 255 caracteres")
    .optional()
    .nullable(),
  
  Status: z
    .enum(['active', 'inactive'])
    .default('active'),
  
  img: z
    .string()
    .url("Debe ser una URL válida")
    .max(255, "La URL de la imagen no puede exceder 255 caracteres")
    .optional()
    .nullable()
    .or(z.literal("")), // Permite string vacío
  
  observations: z
    .string()
    .max(255, "Las observaciones no pueden exceder 255 caracteres")
    .optional()
    .nullable(),
  
  location: z
    .string()
    .max(255, "La ubicación no puede exceder 255 caracteres")
    .optional()
    .nullable(),
  
  measureUnitId: z
    .number()
    .int("Debe ser un número entero")
    .positive("Debe ser un número positivo"),
  
  categoryId: z
    .number()
    .int("Debe ser un número entero")
    .positive("Debe ser un número positivo"),
  
  expirationDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)")
    .refine((date) => {
      const parsedDate = new Date(date);
      return parsedDate > new Date();
    }, "La fecha de expiración debe ser futura")
    .optional()
    .nullable(),
  
  stockMax: z
    .number()
    .int("Debe ser un número entero")
    .min(0, "El stock máximo no puede ser negativo")
    .optional()
    .nullable(),
  
  stockMin: z
    .number()
    .int("Debe ser un número entero")
    .min(0, "El stock mínimo no puede ser negativo")
    .optional()
    .nullable(),
  
  quantity: z
    .number()
    .int("Debe ser un número entero")
    .min(0, "La cantidad no puede ser negativa"),
})
.refine((data) => {
  // Validación: stockMax debe ser mayor que stockMin si ambos están definidos
  if (data.stockMax !== null && data.stockMax !== undefined && 
      data.stockMin !== null && data.stockMin !== undefined) {
    return data.stockMax >= data.stockMin;
  }
  return true;
}, {
  message: "El stock máximo debe ser mayor o igual al stock mínimo",
  path: ["stockMax"]
})
.refine((data) => {
  // Validación: quantity no debe exceder stockMax si está definido
  if (data.stockMax !== null && data.stockMax !== undefined) {
    return data.quantity <= data.stockMax;
  }
  return true;
}, {
  message: "La cantidad no puede exceder el stock máximo",
  path: ["quantity"]
})
.refine((data) => {
  // Validación: quantity no debe ser menor que stockMin si está definido
  if (data.stockMin !== null && data.stockMin !== undefined) {
    return data.quantity >= data.stockMin;
  }
  return true;
}, {
  message: "La cantidad no puede ser menor al stock mínimo",
  path: ["quantity"]
});

// Schema para creación (sin id)
export const CreateProductSchema = ProductSchema;

// Schema para actualización (todos los campos opcionales excepto validaciones cruzadas)
export const UpdateProductSchema = ProductSchema.partial().refine((data) => {
  if (data.stockMax !== undefined && data.stockMin !== undefined && 
      data.stockMax !== null && data.stockMin !== null) {
    return data.stockMax >= data.stockMin;
  }
  return true;
}, {
  message: "El stock máximo debe ser mayor o igual al stock mínimo",
  path: ["stockMax"]
});