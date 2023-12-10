import { axiosInstance } from './initAxios';
import { Task } from '@Core/Task';

export const changeTask = async (task: Task) => {
  return await axiosInstance.put(`/posts/${task.id}`, task);
};
