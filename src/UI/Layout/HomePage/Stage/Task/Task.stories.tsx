import type { Meta, StoryObj } from '@storybook/react';
import { Task } from './Task';

const TaskExample: Meta<typeof Task> = {
  title: 'Elements/Task',
  component: Task,
  parameters: {
    controls: { include: ['name', 'created_at', 'description'] }
  },
  render: args => <Task {...args} created_at={new Date(args.created_at)} />,
  tags: ['autodocs'],
  argTypes: {
    id: {
      description: 'ID задачи',
      defaultValue: 0,
      control: { type: 'number' }
    },
    name: {
      description: 'Название задачи'
    },
    created_at: {
      description: 'Дата создания задачи',
      defaultValue: 'Описание задачи',
      control: { type: 'date' }
    },
    description: {
      description: 'Описание задачи'
    }
  }
};

export default TaskExample;
type Story = StoryObj<typeof TaskExample>;

export const Primary: Story = {
  args: {
    id: 0,
    name: 'Название',
    stage: 'Назначено',
    created_at: new Date(),
    description: 'Описание задачи'
  }
};

export const LongName: Story = {
  args: {
    id: 0,
    name: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet ad, aspernatur facilis pariatur nam quia nulla eveniet consequuntur sit placeat, expedita in earum? Doloribus, facilis maiores! Impedit autem fugiat iusto.',
    stage: 'Назначено',
    created_at: new Date(),
    description: 'Описание задачи'
  }
};

export const LongDescription: Story = {
  args: {
    id: 0,
    name: 'Название',
    stage: 'Назначено',
    created_at: new Date(),
    description:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet ad, aspernatur facilis pariatur nam quia nulla eveniet consequuntur sit placeat, expedita in earum? Doloribus, facilis maiores! Impedit autem fugiat iusto.'
  }
};
