import { z } from "zod";

export const createTaskSchema = z.object({
    title: z.string({
        required_error:'title obrigatorio'
    }),
    description: z.string({
        required_error:'descricao obrigatoria'
    }),
    date: z.string().datetime().optional()
})