import { z } from 'zod';

const loginSchema = z.object({
  firstName: z.coerce
    .string()
    .min(2, { message: 'Must be at least 2 characters' })
    .max(20, { message: 'Max 20 characters' }),
  email: z.coerce
    .string()
    .email({ message: 'Invalid email address' })
    .min(5, { message: 'Must be at least 5 characters' }),
});

export default loginSchema;
