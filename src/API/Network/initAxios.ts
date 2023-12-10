import axios from 'axios';
import { JsonPlaceholderShema } from '@Core/ZodSchemas/JsonPlaceholderSchema';
import { TaskSchema } from '@Core/ZodSchemas/TaskSchema';
import { Task } from '@Core/Task';
import { convertRawTaskData, setCurrentDate } from '@API/Helpers';

export const axiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

axiosInstance.interceptors.response.use(
  function (response) {
    const data = response.data;
    if (Array.isArray(data)) {
      const validatedArray: Task[] = [];
      data.forEach(task => {
        validatedArray.push(
          JsonPlaceholderShema.safeParse(task).success
            ? convertRawTaskData(task)
            : TaskSchema.safeParse(task).success
              ? task
              : convertRawTaskData(task)
        );
      });
      return validatedArray.filter(task => task.stage);
    } else {
      return JsonPlaceholderShema.safeParse(data).success
        ? convertRawTaskData(data)
        : TaskSchema.safeParse(data).success
          ? data
          : setCurrentDate(data);
    }
  },

  function (error) {
    console.error(error);
    return Promise.reject(error);
  }
);
