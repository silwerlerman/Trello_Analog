import { TStage, TTask } from '@schemas';
import { PageModes } from './enums';

export type EditTaskProps = {
  mode: PageModes;
};

export type TaskProps = {
  task: TTask;
};

export type StageProps = {
  stage: TStage;
};

export type DialogProps = {
  title: string;
};
