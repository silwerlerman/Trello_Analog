import { Stage } from '@components/Stage/Stage';
import { Outlet } from 'react-router-dom';
import { stages } from 'src/metadata';

export const HomePage = () => {
  return (
    <>
      <div className="flex justify-center gap-4 max-task-h">
        {stages.map((stage, i) => (
          <Stage stage={stage} key={i} />
        ))}
      </div>
      <Outlet />
    </>
  );
};
