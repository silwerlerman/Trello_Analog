import type { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Stage } from './Stage';
import { Task } from '@Core/Task';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: Infinity, cacheTime: 1000 * 60 }
  }
});

const generateTaskMetadata = (count: number): Task[] => {
  if (!count) return [];

  if (count == 1) {
    return [
      {
        id: 0,
        name: 'Название',
        stage: 'Назначено',
        created_at: new Date(),
        description: 'Описание'
      }
    ];
  }

  const tasks: Task[] = [];
  for (let i = 0; i < count; i++) {
    tasks.push({
      id: i,
      name: `Название${i + 1}`,
      stage: 'Назначено',
      created_at: new Date(),
      description: `Описание${i + 1}`
    });
  }

  return tasks;
};

const TaskLoaderDecorator = (Story: React.ComponentType): JSX.Element => {
  queryClient.setQueryData(`Назначено-tasks`, generateTaskMetadata(1));

  return (
    <QueryClientProvider client={queryClient}>{<Story />}</QueryClientProvider>
  );
};

const TasksLoaderDecorator = (Story: React.ComponentType): JSX.Element => {
  queryClient.setQueryData(`Назначено-tasks`, generateTaskMetadata(10));

  return (
    <QueryClientProvider client={queryClient}>{<Story />}</QueryClientProvider>
  );
};

const TaskExample: Meta<typeof Stage> = {
  title: 'Elements/Stage',
  component: Stage,
  tags: ['autodocs'],
  argTypes: {
    name: {
      description: 'Название этапа',
      defaultValue: 'Название'
    }
  }
};

export default TaskExample;
type Story = StoryObj<typeof TaskExample>;

export const Primary: Story = {
  args: {
    name: 'Название'
  }
};

export const LongName: Story = {
  args: {
    name: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit.Architecto dolorem sint repudiandae, quaerat nam accusantium aspernatur expedita unde voluptates, vel, quibusdam qui? Corporis magnam aliquid ex blanditiis quam, iusto perferendis.'
  }
};

export const HasTask: Story = {
  args: {
    name: 'Назначено'
  },
  decorators: [TaskLoaderDecorator]
};

export const HasManyTasks: Story = {
  args: {
    name: 'Назначено'
  },
  decorators: [TasksLoaderDecorator]
};
