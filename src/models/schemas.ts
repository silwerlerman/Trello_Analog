import { z } from 'zod';

export const stageSchema = z.object({
  name: z.string()
});
export type Stage = z.infer<typeof stageSchema>;

export const taskSchema = z.object({
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

export type Task = z.infer<typeof taskSchema>;

export const jsonPlaceholderShema = z.object({
  id: z.number(),
  userId: z.number(),
  title: z.string(),
  body: z.string()
});

export type JsonPlaceholderType = z.infer<typeof jsonPlaceholderShema>;
