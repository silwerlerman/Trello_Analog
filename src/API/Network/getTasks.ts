import { axiosInstance } from '@API/Network/initAxios';
import { Task } from '@Core/Task';

export const getTasks = async (
  stage: string
): Promise<(stage: string) => Task[] | []> => {
  return (await axiosInstance.get(`/posts?stage=${stage}`)) || [];
};
