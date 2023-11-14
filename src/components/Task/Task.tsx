import { Path } from '@enums';
import { Task as task } from '@types';
import { Link, generatePath } from 'react-router-dom';

export const Task = ({ task }: { task: task }) => {
  return (
    <div className="flex flex-col gap-2 py-3 px-3 border-2 rounded-lg drop-shadow">
      <div className="flex justify-between">
        <Link
          to={generatePath(Path.Preview, { id: task.id.toString() })}
          className="hover:text-purple-800 hover:cursor-pointer font-bold w-fit"
        >
          {task.name}
        </Link>
        <Link
          to={generatePath(Path.Edit, { id: task.id.toString() })}
          className="hover:text-purple-800 hover:cursor-pointer font-bold w-fit"
        >
          Редактировать
        </Link>
      </div>
      <p>{task.description}</p>
      <p className="text-right">{task.created_at}</p>
    </div>
  );
};
