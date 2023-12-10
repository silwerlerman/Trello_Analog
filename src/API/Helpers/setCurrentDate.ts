import { Task } from '@Core/Task';

export const setCurrentDate = ({
  id,
  name,
  created_at,
  description,
  stage
}: Task) => {
  return {
    id,
    name,
    stage,
    created_at: new Date(created_at),
    description
  };
};
