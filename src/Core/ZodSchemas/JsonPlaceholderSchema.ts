import { z } from 'zod';

export const JsonPlaceholderShema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  body: z.string()
});
