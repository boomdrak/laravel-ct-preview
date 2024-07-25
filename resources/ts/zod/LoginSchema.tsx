import { z } from 'zod';

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Email is required' })
    .email('Invalid email address'),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 8 characters' }),
  serverError: z.void(),
});

export default LoginSchema;
export type ZLoginSchema = z.infer<typeof LoginSchema>;
