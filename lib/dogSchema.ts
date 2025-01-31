import { z } from 'zod';

const dogSchema = z.object({
  breeds: z.string(),
  zipCodes: z.string(),
  ageMin: z.number().min(1, { message: 'Minimum age must be 1 year or older' }),
  ageMax: z
    .number()
    .max(10, { message: 'Maximum age must be 10 years or younger' }),
  size: z.string(),
  from: z.number(),
});

export default dogSchema;
