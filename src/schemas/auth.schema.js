import {z} from 'zod'

export const registerSchema = z.object({
    username: z.string({
        required_error: 'username obrigatorio'
    }),
    email: z.string({
        required_error: 'Email obrigatorio'
    }).email({
        message: 'email invalido'
    }),
    password: z.string({
        required_error: 'Password obrigatorio'
    }).min(6,{
        message: 'Minimo 6 characteres no password'
    })
});

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email obrigatorio'
    }).email({
        message: 'email invalido'
    }),
    password: z.string({
        required_error: 'Password obrigatorio'
    }).min(6,{
        message: 'Minimo 6 characteres no password'
    })
})