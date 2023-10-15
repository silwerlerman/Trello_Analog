import Task from '@components/Task/Task';
import { IStage, ITask } from '@models';

interface StageProps {
  stage: IStage;
}

const Stage = ({ stage }: StageProps) => {
  const count: number = stage.tasks.length;

  const tasks: ITask[] = stage.tasks;

  const tasksArray = count ? (
    tasks.map((task, i) => {
      return <Task task={task} key={i} />;
    })
  ) : (
    <p className="text-center">Задач в данном статусе нет</p>
  );

  console.warn(tasks, tasksArray);
  return (
    <div className="flex flex-col w-full h-fit bg-slate-300 rounded shadow-2xl shadow-slate-500/50 divide-y max-task-h border-2 shadow-inner  min-w-[250px]">
      <div className="flex justify-between w-full px-4 py-4">
        <p className="font-bold text-lg">{stage.name}</p>
        <p className="font-bold text-lg">{count}</p>
      </div>
      <div className="flex flex-col gap-3 h-full px-4 py-4 overflow-auto">
        {tasksArray}
      </div>
    </div>
  );
};

export default Stage;
