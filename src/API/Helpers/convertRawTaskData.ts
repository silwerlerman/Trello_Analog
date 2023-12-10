import { JsonPlaceholderTask } from '@Core/JsonPlaceholderTask';

export const convertRawTaskData = ({
  id,
  title,
  body
}: JsonPlaceholderTask) => {
  return {
    id,
    name: title,
    created_at: new Date(),
    description: body
  };
};
