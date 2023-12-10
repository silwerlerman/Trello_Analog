import { Task } from '@UI/Layout';
import { SortableContext } from '@dnd-kit/sortable';
import { Stage as StageType } from '@Core/Stage';
import { Task as TaskType } from '@Core/Task';
import { useStage } from './useStage';

export const Stage = ({ stage }: { stage: StageType }) => {
  const { setNodeRef, isLoading, data, attributes, taskIds, count } =
    useStage(stage);

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
