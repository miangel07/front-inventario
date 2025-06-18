import { z } from "zod";

export const CategoriesSchemaZod = z.object({
      id: z.coerce.number().positive().optional(),
      NameCategory: z.string().min(1, "El nombre de usuario es requerido"),
})

