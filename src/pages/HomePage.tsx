import { Stage } from '@components/Stage/Stage';
import { Task } from '@components/Task/Task';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { Task as TaskSchema } from '@schemas';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useQueryClient } from 'react-query';
import { Outlet } from 'react-router-dom';
import { stages } from 'src/metadata';

export const HomePage = () => {
  const [activeTask, setActiveTask] = useState<TaskSchema | null>(null);
  const queryClient = useQueryClient();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8
      }
    })
  );
  const changeTaskStage = ({
    task,
    stage
  }: {
    task: TaskSchema;
    stage: string;
  }) => {
    if (task.stage == stage) return;

    //удаляем задачу их списка задач старого этапа
    const currentStageData: TaskSchema[] | undefined = queryClient.getQueryData(
      `${task.stage}-tasks`
    );
    if (Array.isArray(currentStageData) && currentStageData?.length) {
      const filteredTasks: TaskSchema[] = currentStageData.filter(
        taskToFilter => taskToFilter.id != task.id
      );
      queryClient.setQueryData(`${task.stage}-tasks`, [...filteredTasks]);
    }
    //создаём задачу в списке задач нового этапа
    const changedTask = { ...task, stage };
    const newStageData: TaskSchema[] | undefined = queryClient.getQueryData(
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
        const currentStageData: TaskSchema[] | undefined =
          queryClient.getQueryData(`${activeTask.stage}-tasks`);

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

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      sensors={sensors}
    >
      <div className="flex justify-center gap-4 max-task-h">
        {stages.map((stage, i) => (
          <Stage stage={stage} key={i} />
        ))}
      </div>
      <Outlet />
      {createPortal(
        <DragOverlay>
          {activeTask && (
            <div className="w-full">
              <Task task={activeTask} />
            </div>
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};
