import { Task } from '@types';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

axios.interceptors.response.use(
  function (response) {
    if (Object.keys(response.data).includes('userId')) {
      return convertTaskData(response.data);
    }
    return response.data;
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
    stage: 'Назначено',
    created_at: new Date().toLocaleDateString(),
    description: rawTask?.body
  };
};

export const getTasks = async (count: number) => {
  const taskList: Task[] = [];
  try {
    for (let i = 1; i <= count; i++) {
      taskList.push(await axios.get(`/posts/${i}`));
    }
    return taskList;
  } catch (error) {
    return [];
  }
};
