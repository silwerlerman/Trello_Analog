import { Path } from '@enums';
import { Task as TaskType } from '@schemas';
import { useTask } from 'src/hooks/useTask';

export const Task = ({ task }: { task: TaskType }) => {
  const { goToPath } = useTask(task);

  return (
    <div className="flex flex-col gap-2 py-3 px-3 border-2 rounded-lg drop-shadow">
      <button
        onClick={e => goToPath(e, Path.Preview)}
        className="hover:text-purple-800 hover:cursor-pointer font-bold w-fit"
      >
        {task.name}
      </button>
      <p>{task.description}</p>
      <div className="flex justify-between">
        <button
          onClick={e => goToPath(e, Path.Edit)}
          className="hover:text-purple-800 hover:cursor-pointer font-bold w-fit"
        >
          Изменить
        </button>

        <p className="text-right">{task.created_at.toLocaleDateString()}</p>
      </div>
    </div>
  );
};
