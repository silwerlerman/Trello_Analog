import { z } from 'zod';

export const stageSchema = z.object({
  name: z.string()
});
export type TStage = z.infer<typeof stageSchema>;

export const taskSchema = z.object({
  id: z.number(),
  name: z.string(),
  stage: z.string(),
  created_at: z.date(),
  description: z.string().optional(),
  tags: z.string().array().optional()
});

export type TTask = z.infer<typeof taskSchema>;
