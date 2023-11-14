import { Stage } from '@components/Stage/Stage';
import { stages } from 'src/metadata';

export const HomePage = () => {
  const stagesToShow = stages.map((stage, i) => (
    <Stage stage={stage} key={i} />
  ));

  return (
    <div className="flex justify-center gap-4 max-task-h">{stagesToShow}</div>
  );
};
