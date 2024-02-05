import { changeTask, getActualTask } from '@API/Network';
import { zodResolver } from '@hookform/resolvers/zod';
import { Task } from '@Core/Task';
import { TaskSchema } from '@Core/ZodSchemas';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { stages } from '@Core/Metadata';

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
    control,
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
    const stageToSave: Task = { ...data };

    stageToSave.stage = !stageToSave.stage
      ? 'Назначено'
      : Number.parseInt(stageToSave.stage)
        ? stages.map(stage => stage.name)[Number(stageToSave.stage)]
        : stageToSave.stage;

    const fetchedData = await changeTask(stageToSave);
    const currentStageData: Task[] | undefined = queryClient.getQueryData(
      `${stageToSave.stage}-tasks`
    );
    if (!id) {
      queryClient.setQueryData(
        `${stageToSave.stage}-tasks`,
        currentStageData ? [...currentStageData, fetchedData] : [fetchedData]
      );
    } else {
      const filteredTasks: Task[] | undefined = currentStageData?.filter(
        task => task.id != stageToSave.id
      );
      if (filteredTasks?.length) {
        queryClient.setQueryData(`${stageToSave.stage}-tasks`, [
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

  const getDefaultValue = () => {
    const index = stages
      .map(stage => stage.name)
      .indexOf(data?.stage ? data.stage : '');
    return index == -1 ? 0 : index;
  };

  return {
    id,
    data,
    isLoading,
    dataUpdatedAt,
    isSubmitting,
    handleSubmit,
    submitHandler,
    getDefaultValue,
    control,
    errors
  };
};
