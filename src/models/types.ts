export type Stage = {
  name: string;
  tasks: Task[];
};

export type Task = {
  id: number;
  name: string;
  created_at: string;
  description?: string;
  tags?: string[];
};
