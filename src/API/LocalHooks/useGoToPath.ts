import { Task } from '@Core/Task';
import { useQueryClient } from 'react-query';
import { generatePath, useNavigate } from 'react-router-dom';

export const useGoToPath = (task: Task) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const setActiveTask = () => {
    queryClient.setQueryData(`activeTask-${Number(task.id)}`, task);
  };

  const goToPath = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    path: string
  ) => {
    setActiveTask();
    navigate(generatePath(path.toString(), { id: task.id?.toString() }));
  };

  return { goToPath };
};
