import { z } from "zod";

export const UnitOfMeasurementSchemaZod = z.object({
      id: z.coerce.number().positive().optional(),
      nameUnit: z.string().min(1, "El nombre es requerido"),
      code: z.string().min(1, "El codigo es requerido"),
})

