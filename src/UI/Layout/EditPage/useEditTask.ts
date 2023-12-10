import { changeTask, getActualTask } from '@API/Network';
import { zodResolver } from '@hookform/resolvers/zod';
import { Task } from '@Core/Task';
import { TaskSchema } from '@Core/ZodSchemas';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

export const useEditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isLoading, data, dataUpdatedAt } = useQuery({
    queryKey: [`activeTask-${Number(id) ? Number(id) : 0}`],
    queryFn: () => getActualTask(Number(id)),
    enabled: !!id
  });

  const currentStage = data?.stage || null;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<Task>({
    resolver: zodResolver(TaskSchema),
    defaultValues: useMemo(() => {
      return {
        id: id ? Number(id) : 0,
        name: data?.name ? data.name : '',
        stage: data?.stage ? data.stage : 'Назначено',
        created_at: data?.created_at ? data.created_at : new Date(),
        description: data?.description ? data.description : ''
      };
    }, [id, data])
  });

  const submitHandler = async (data: Task) => {
    const fetchedData = await changeTask(data);
    const currentStageData: Task[] | undefined = queryClient.getQueryData(
      `${data.stage}-tasks`
    );
    if (!id) {
      queryClient.setQueryData(
        `${data.stage}-tasks`,
        currentStageData ? [...currentStageData, fetchedData] : [fetchedData]
      );
    } else {
      const filteredTasks: Task[] | undefined = currentStageData?.filter(
        task => task.id != data.id
      );
      if (filteredTasks?.length) {
        queryClient.setQueryData(`${data.stage}-tasks`, [
          ...filteredTasks,
          fetchedData
        ]);
      }
      //если кеш очиститься к моменту окончания редактирования задачи
      else {
        queryClient.setQueryData(`${data.stage}-tasks`, [fetchedData]);
      }
      //если текущий этап задачи изменился, удаляем задачу из старого списка
      if (currentStage != data.stage) {
        const currentFilteredTasks: Task[] | undefined =
          currentStageData?.filter(task => task.stage != currentStage);
        queryClient.setQueryData(`${currentStage}-tasks`, currentFilteredTasks);
      }
    }
    navigate(-1);
  };

  return {
    id,
    isLoading,
    dataUpdatedAt,
    isSubmitting,
    handleSubmit,
    submitHandler,
    register,
    errors
  };
};
