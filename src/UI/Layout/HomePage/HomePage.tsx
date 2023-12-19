import { Stage, Task } from '@UI/Layout';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { createPortal } from 'react-dom';
import { Outlet } from 'react-router-dom';
import { stages } from '@Core/Metadata';
import { useHomePage } from './useHomePage';

export const HomePage = () => {
  const { activeTask, onDragStart, onDragEnd, sensors } = useHomePage();

  return (
    <DndContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      sensors={sensors}
    >
      <div className="flex justify-center gap-4 max-task-h">
        {stages.map((stage, i) => (
          <Stage {...stage} key={i} />
        ))}
      </div>
      <Outlet />
      {createPortal(
        <DragOverlay>
          {activeTask && (
            <div className="w-full">
              <Task {...activeTask} />
            </div>
          )}
        </DragOverlay>,
        document.body
      )}
    </DndContext>
  );
};
