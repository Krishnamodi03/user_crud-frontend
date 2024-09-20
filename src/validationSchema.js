import {z} from 'zod'
export const schema = z.object({
    firstName: z.string().min(1,"firstName is required"),
    lastName: z.string().min(1,"lastName is required"),
    email: z.string().email("Invalid email address"),
    phone : z.string().min(10,"Phone number must be at least 10 digits long"),
    password: z.string().min(8,"Password must be at least 8 characters long"),
})