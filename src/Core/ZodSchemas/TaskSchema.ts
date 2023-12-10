import { z } from 'zod';

export const TaskSchema = z.object({
  id: z.coerce
    .number({ required_error: 'ID не может быть пустым' })
    .positive({ message: 'ID должен быть положительным числом больше 0' }),
  name: z
    .string({ required_error: 'Название не должно быть пустым' })
    .min(1, { message: 'Название не должно быть пустым' }),
  stage: z.string(),
  created_at: z.date().transform(val => new Date(val)),
  description: z
    .string({ required_error: 'Описание не должно быть пустым' })
    .min(1, { message: 'Описание не должно быть пустым' })
});
