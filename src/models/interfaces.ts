export interface IStage {
  name: string;
};

export interface ITask {
  id: number,
  name: string,
  stage: string,
  created_at: string,
  description?: string,
  tags?: string[]
}

