import { z } from 'zod';
import { stageSchema } from './ZodSchemas';

export type Stage = z.infer<typeof stageSchema>;
