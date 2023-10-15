import { TaskProps } from '@props';
import { Link } from 'react-router-dom';

const Task = ({ task }: TaskProps) => {
  return (
    <div className="flex flex-col gap-2 py-3 px-3 border-2 rounded-lg drop-shadow">
      <div className="flex justify-between">
        <Link
          to={`/preview/${task.id}`}
          className="hover:text-purple-800 hover:cursor-pointer font-bold w-fit"
        >
          {task.name}
        </Link>
        <Link
          to={`/edit/${task.id}`}
          className="hover:text-purple-800 hover:cursor-pointer font-bold w-fit"
        >
          <button>Редактировать</button>
        </Link>
      </div>
      <p>{task.description}</p>
      <p className="text-right">{task.created_at}</p>
    </div>
  );
};

export default Task;
