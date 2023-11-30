import {
  Task,
  taskSchema,
  JsonPlaceholderType,
  jsonPlaceholderShema
} from '@schemas';
import axios from 'axios';

axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';

axios.interceptors.response.use(
  function (response) {
    const data = response.data;
    if (Array.isArray(data)) {
      const validatedArray: Task[] = [];
      data.forEach(task => {
        validatedArray.push(
          jsonPlaceholderShema.safeParse(task).success
            ? convertTaskData(task)
            : taskSchema.safeParse(task).success
              ? task
              : convertTaskData(task)
        );
      });
      return validatedArray.filter(task => task.stage);
    } else {
      return jsonPlaceholderShema.safeParse(data).success
        ? convertTaskData(data)
        : taskSchema.safeParse(data).success
          ? data
          : convertTaskData1(data);
    }
  },

  function (error) {
    console.error(error);
    return Promise.reject(error);
  }
);

const convertTaskData = ({ id, title, body }: JsonPlaceholderType) => {
  return {
    id,
    name: title,
    created_at: new Date(),
    description: body
  };
};

const convertTaskData1 = ({
  id,
  name,
  created_at,
  description,
  stage
}: Task) => {
  return {
    id,
    name,
    stage,
    created_at: new Date(created_at),
    description
  };
};

export const getTasks = async (
  stage: string
): Promise<(stage: string) => Task[] | []> => {
  return (await axios.get(`/posts?stage=${stage}`)) || [];
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

export const changeTask = async (task: Task) => {
  return await axios.put(`/posts/${task.id}`, task);
};
