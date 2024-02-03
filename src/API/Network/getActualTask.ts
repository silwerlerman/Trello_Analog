import { axiosInstance } from './initAxios';
import { Task } from '@Core/Task';

export const getActualTask = async (id: number) => {
  try {
    const task: Task = await axiosInstance.get(`/posts/${id}`);
    return task;
  } catch (error) {
    return {
      id,
      name: '-',
      stage: '-',
      created_at: new Date(),
      description: '-'
    };
  }
};
