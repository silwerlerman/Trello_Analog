import { z } from 'zod';
import { JsonPlaceholderShema } from '@Core/ZodSchemas';

export type JsonPlaceholderTask = z.infer<typeof JsonPlaceholderShema>;
