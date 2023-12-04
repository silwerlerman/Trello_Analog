import { Path } from '@enums';
import { Task as TaskType } from '@schemas';
import { useTask } from 'src/hooks/useTask';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const Task = ({ task }: { task: TaskType; handle?: boolean }) => {
  const { goToPath } = useTask(task);

  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: task.id, data: { type: 'Task', task } });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform)
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex flex-col gap-2 py-3 px-3 border-2 rounded-lg drop-shadow bg-slate-300"
    >
      <div className="flex justify-between">
        <button
          onClick={e => goToPath(e, Path.Preview)}
          className="hover:text-purple-800 hover:cursor-pointer font-bold w-fit break-all"
        >
          {task.name}
        </button>
        <div className="draggable"></div>
      </div>

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
