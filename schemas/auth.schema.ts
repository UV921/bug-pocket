import * as z from 'zod';
export const registerSchema = z.object({
    username:z.string().min(6,"user name atlest contain 6 charachters").max(20,"user name can contain max 20 character"),
    password:z.string().min(8,"password atlest contain 8 charachters").max(100,"password can contain max 100 character"),
    email:z.string().email("invalid email")
})

export const loginSchema = z.object({
    email:z.string().email("invalid email"),
    password:z.string().min(8,"password atlest contain 8 charachters").max(100,"password can contain max 100 character")})
