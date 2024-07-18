import z from 'zod';

export const signupSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
    name: z.string().optional()
});

export type SignupInput = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

export type SigninInput = z.infer<typeof signinSchema>;

export const createBlogSchema = z.object({
    title: z.string(),
    content: z.string()
});

export type CreateBlogInput = z.infer<typeof createBlogSchema>;

export const updateBlogSchema = z.object({
    title: z.string(),
    content: z.string()
});

export type UpdateBlogInput =  z.infer<typeof updateBlogSchema>;