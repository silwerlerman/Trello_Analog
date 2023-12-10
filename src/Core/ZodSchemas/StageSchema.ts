import { z } from 'zod';

export const stageSchema = z.object({
  name: z.string()
});
