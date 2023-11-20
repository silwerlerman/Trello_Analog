import { Task } from '@schemas';
import { Path } from '@enums';
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
    path: Path
  ) => {
    setActiveTask();
    navigate(generatePath(path.toString(), { id: task.id?.toString() }));
  };

  return { goToPath };
};
