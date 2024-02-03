import {
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Task } from '@Core/Task';
import { useState } from 'react';
import { useQueryClient } from 'react-query';

export const useHomePage = () => {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const queryClient = useQueryClient();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    })
  );
  const changeTaskStage = ({ task, stage }: { task: Task; stage: string }) => {
    if (task.stage == stage) return;

    //удаляем задачу их списка задач старого этапа
    const currentStageData: Task[] | undefined = queryClient.getQueryData(
      `${task.stage}-tasks`
    );
    if (Array.isArray(currentStageData) && currentStageData?.length) {
      const filteredTasks: Task[] = currentStageData.filter(
        taskToFilter => taskToFilter.id != task.id
      );
      queryClient.setQueryData(`${task.stage}-tasks`, [...filteredTasks]);
    }
    //создаём задачу в списке задач нового этапа
    const changedTask = { ...task, stage };
    const newStageData: Task[] | undefined = queryClient.getQueryData(
      `${stage}-tasks`
    );

    queryClient.setQueryData(
      `${stage}-tasks`,
      Array.isArray(newStageData) && currentStageData?.length
        ? [...newStageData, changedTask]
        : [changedTask]
    );
  };

  const onDragStart = (event: DragStartEvent) => {
    setActiveTask(event.active.data.current?.task);
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveTask(null);

    const { active, over } = event;
    const activeTask = active.data.current?.task;

    if (over?.data.current?.type == 'Task') {
      const overTask = over.data.current?.task;

      if (activeTask.stage == overTask.stage) {
        const currentStageData: Task[] | undefined = queryClient.getQueryData(
          `${activeTask.stage}-tasks`
        );

        if (Array.isArray(currentStageData)) {
          queryClient.setQueryData(
            `${activeTask.stage}-tasks`,
            arrayMove(
              currentStageData,
              active.data.current?.sortable.index,
              over.data.current?.sortable.index
            )
          );
        }
      } else {
        changeTaskStage({ task: activeTask, stage: overTask.stage });
      }
    }
    if (over?.data.current?.type == 'Stage') {
      changeTaskStage({ task: activeTask, stage: over.id.toString() });
    }
  };

  return { activeTask, onDragStart, onDragEnd, sensors };
};
