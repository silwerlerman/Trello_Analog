import { z } from 'zod';
import { TaskSchema } from './ZodSchemas';

export type Task = z.infer<typeof TaskSchema>;
