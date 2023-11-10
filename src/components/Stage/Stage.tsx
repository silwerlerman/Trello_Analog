import Loader from '@components/Loader/Loader';
import { getTasks } from '@components/Network/NetworkController';
import Task from '@components/Task/Task';
import { TTask } from '@schemas';
import { StageProps } from '@props';
import { useQuery } from 'react-query';

const Stage = ({ stage }: StageProps) => {
  const { isLoading, error, data } = useQuery(`${stage.name}-tasks`, () =>
    getTasks(2, stage.name)
  );

  if (error) {
    return 'Error';
  }

  const count: string | number =
    isLoading && data ? '' : data?.length ? data.length : '';

  const tasksArray = count ? (
    data?.map((task: TTask, i: number) => {
      return <Task task={task} key={i} />;
    })
  ) : (
    <p className="text-center">Задач в данном статусе нет</p>
  );

  const stageElements = isLoading ? <Loader /> : tasksArray;

  return (
    <div className="flex flex-col w-full h-fit custom-box min-w-[250px]">
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
