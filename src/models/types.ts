export type Stage = {
  name: string;
};

export type Task = {
  id: number;
  name: string;
  stage: string;
  created_at: string;
  description?: string;
  tags?: string[];
};
