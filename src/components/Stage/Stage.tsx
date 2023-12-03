import { getTasks } from '@components/Network/NetworkController';
import { Task } from '@components/Task/Task';
import { SortableContext, useSortable } from '@dnd-kit/sortable';
import { Stage as StageType, Task as TaskType } from '@schemas';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

export const Stage = ({ stage }: { stage: StageType }) => {
  const { isLoading, data } = useQuery({
    queryKey: [`${stage.name}-tasks`],
    queryFn: () => getTasks(stage.name)
  });

  const { setNodeRef, attributes } = useSortable({
    id: stage.name,
    data: { type: 'Stage', stage }
  });

  const taskIds = useMemo(() => {
    return Array.isArray(data) ? data.map(task => task.id) : [];
  }, [data]);

  const count: string | number =
    isLoading && data ? '' : data?.length ? data.length : '';

  return (
    <div className="flex flex-col w-full h-fit custom-box min-w-[250px]">
      <div className="flex justify-between w-full px-4 py-4">
        <p className="font-bold text-lg">{stage.name}</p>
        <p className="font-bold text-lg">{count}</p>
      </div>
      <div
        ref={setNodeRef}
        {...attributes}
        className={`${
          isLoading ? 'loader' : 'px-4 py-4'
        } flex flex-col gap-3 h-full overflow-auto min-h-[149px]`}
      >
        {!isLoading &&
          (count && Array.isArray(data) ? (
            <SortableContext items={taskIds}>
              {data?.map((task: TaskType, i: number) => (
                <Task task={task} key={i} handle={true} />
              ))}
            </SortableContext>
          ) : (
            <p className="text-center leading-[116px]">
              Задач в данном статусе нет
            </p>
          ))}
      </div>
    </div>
  );
};
