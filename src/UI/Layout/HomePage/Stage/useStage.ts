import { getTasks } from '@API/Network';
import { useSortable } from '@dnd-kit/sortable';
import { Stage } from '@Core/Stage';
import { useMemo } from 'react';
import { useQuery } from 'react-query';

export const useStage = (stage: Stage) => {
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

  return { setNodeRef, isLoading, data, attributes, taskIds, count };
};
