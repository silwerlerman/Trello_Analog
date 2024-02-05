import { Task } from '@UI/Layout';
import { SortableContext } from '@dnd-kit/sortable';
import { Stage as StageType } from '@Core/Stage';
import { Task as TaskType } from '@Core/Task';
import { useStage } from './useStage';
import { Card, Group, PanelSpinner, Text, Title } from '@vkontakte/vkui';

export const Stage = ({ name }: StageType) => {
  const stage = { name };
  const { setNodeRef, isLoading, data, attributes, taskIds, count } =
    useStage(stage);

  return (
    <Card className="flex flex-col w-full custom-box min-w-[250px] max-w-[400px]">
      <Group mode="plain" className="flex justify-between w-full px-4 py-4">
        <Title level="2">{stage.name}</Title>
        <Title level="2">{count}</Title>
      </Group>
      {isLoading ? (
        <PanelSpinner size="medium" />
      ) : (
        <div
          ref={setNodeRef}
          {...attributes}
          className={`${
            isLoading ? 'loader' : 'px-4 py-4'
          } flex flex-col justify-center gap-3 h-full overflow-auto min-h-[149px]`}
        >
          {!isLoading &&
            (count && Array.isArray(data) ? (
              <SortableContext items={taskIds}>
                {data?.map((task: TaskType, i: number) => (
                  <Task
                    id={task.id}
                    name={task.name}
                    stage={task.stage}
                    created_at={task.created_at}
                    description={task.description}
                    key={i}
                  />
                ))}
              </SortableContext>
            ) : (
              <Text className="text-center">Задач в данном статусе нет</Text>
            ))}
        </div>
      )}
    </Card>
  );
};
