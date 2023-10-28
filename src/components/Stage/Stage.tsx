import Loader from '@components/Loader/Loader';
import { getTasks } from '@components/Network/NetworkController';
import Task from '@components/Task/Task';
import { ITask } from '@interfaces';
import { StageProps } from '@props';
import { useEffect, useState } from 'react';

const Stage = ({ stage }: StageProps) => {
  const [Tasks, setTasks] = useState<ITask[]>([]);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setTasks((await getTasks(2)) || []);
      setLoading(false);
    })();
  }, [Loading]);

  const count: string | number = Loading ? '' : Tasks?.length;

  const tasksArray = count ? (
    Tasks?.map((task: ITask, i: number) => {
      return <Task task={task} key={i} />;
    })
  ) : (
    <p className="text-center">Задач в данном статусе нет</p>
  );

  const stageElements = Loading ? <Loader /> : tasksArray;

  return (
    <div className="flex flex-col w-full h-fit bg-slate-300 rounded shadow-2xl shadow-slate-500/50 divide-y max-task-h border-2 shadow-inner  min-w-[250px]">
      <div className="flex justify-between w-full px-4 py-4">
        <p className="font-bold text-lg">{stage.name}</p>
        <p className="font-bold text-lg">{count}</p>
      </div>
      <div className="flex flex-col gap-3 h-full px-4 py-4 overflow-auto">
        {stageElements}
      </div>
    </div>
  );
};

export default Stage;
