export interface IStage {
  name: string;
  tasks: ITask[]
};

export interface ITask{
  id: number,
  name: string,
  created_at: string,
  description?: string,
  tags?: string[]
}