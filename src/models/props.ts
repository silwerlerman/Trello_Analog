import { IStage, ITask } from '@interfaces';
import { PageModes } from './enums';

export type EditTaskProps = {
  mode: PageModes;
};

export type TaskProps = {
  task: ITask;
};

export interface StageProps {
  stage: IStage;
}