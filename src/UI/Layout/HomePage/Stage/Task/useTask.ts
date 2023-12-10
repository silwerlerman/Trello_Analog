import { Task } from '@Core/Task';
import { Paths } from '@UI/Paths';
import { useQueryClient } from 'react-query';
import { generatePath, useNavigate } from 'react-router-dom';

export const useTask = (task: Task) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const setActiveTask = () => {
    queryClient.setQueryData(`activeTask-${Number(task.id)}`, task);
  };

  const goToPath = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    path: Paths
  ) => {
    setActiveTask();
    navigate(generatePath(path.toString(), { id: task.id?.toString() }));
  };

  return { goToPath };
};
