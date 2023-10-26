import { ITask } from '@interfaces';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

const convertTaskData = (rawTask: { id: number; title: string; body: string; }) => {
  return {
    id: rawTask?.id,
    name: rawTask?.title,
    stage: "Назначено",
    created_at: new Date().toLocaleDateString(),
    description: rawTask?.body,
  }
}

export const getTasks = async (count: number) => {
  const taskList:ITask[] = [];
  try {
    for (let i = 1; i <= count; i++) {
      const {data} = await axios.get(
      `/posts/${i}`
      );
      taskList.push(Object.keys(data).includes('userId') ? convertTaskData(data) : data);
    }
    return taskList;
  } catch (error) {
    return [];
  }
};
