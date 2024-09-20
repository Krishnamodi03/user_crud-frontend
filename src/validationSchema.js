import {z} from 'zod'
export const schema = z.object({
    First_name: z.string().min(1,"firstName is required"),
    Last_name: z.string().min(1,"lastName is required"),
    Email: z.string().email("Invalid email address"),
    Phone : z.string().min(10,"Phone number must be at least 10 digits long"),
    Password: z.string().min(8,"Password must be at least 8 characters long"),
    User_type: z.enum(["USER", "ADMIN"], {
        errorMap: () => ({ message: "User type is required" })
    })
})