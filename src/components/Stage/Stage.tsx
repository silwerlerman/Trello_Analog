import { getTasks } from '@components/Network/NetworkController';
import { Task } from '@components/Task/Task';
import { Stage as StageType, Task as TaskType } from '@schemas';
import { useQuery } from 'react-query';

export const Stage = ({ stage }: { stage: StageType }) => {
  const { isLoading, error, data } = useQuery(`${stage.name}-tasks`, () =>
    getTasks(2, stage.name)
  );

  if (error) {
    return 'Error';
  }

  const count: string | number =
    isLoading && data ? '' : data?.length ? data.length : '';

  const tasksArray = count ? (
    data?.map((task: TaskType, i: number) => <Task task={task} key={i} />)
  ) : (
    <p className="text-center">Задач в данном статусе нет</p>
  );

  return (
    <div className="flex flex-col w-full h-fit custom-box min-w-[250px]">
      <div className="flex justify-between w-full px-4 py-4">
        <p className="font-bold text-lg">{stage.name}</p>
        <p className="font-bold text-lg">{count}</p>
      </div>
      <div
        className={`${
          isLoading ? 'loader' : 'px-4 py-4'
        } flex flex-col gap-3 h-full overflow-auto`}
      >
        {!isLoading && tasksArray}
      </div>
    </div>
  );
};
