import { Task, taskSchema } from '@schemas';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

axios.interceptors.response.use(
  function (response) {
    const validatedTask = taskSchema.safeParse(response.data);

    return !validatedTask.success
      ? convertTaskData(response.data)
      : response.data;
  },

  function (error) {
    console.error(error);
    return Promise.reject(error);
  }
);

const convertTaskData = (rawTask: {
  id: number;
  title: string;
  body: string;
}) => {
  return {
    id: rawTask?.id,
    name: rawTask?.title,
    created_at: new Date(),
    description: rawTask?.body
  };
};

export const getTasks = async (count: number, stage: string) => {
  const taskList: Task[] = [];
  try {
    for (let i = 1; i <= count; i++) {
      taskList.push({ ...(await axios.get(`/posts/${i}`)), stage });
    }
    return taskList;
  } catch (error) {
    return [];
  }
};

export const getActualTask = async (id: number) => {
  try {
    const task: Task = await axios.get(`/posts/${id}`);
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
