import Stage from '@components/Stage/Stage';
import { TStage } from '@schemas';
import { Outlet } from 'react-router-dom';
const HomePage = () => {
  const stages: TStage[] = [
    {
      name: 'Назначено'
    },
    { name: 'На паузе' },
    { name: 'В работе' },
    {
      name: 'На проверке'
    },
    {
      name: 'Выполнено'
    }
  ];

  const stagesToShow = stages.map((stage, i) => (
    <Stage stage={stage} key={i} />
  ));

  return (
    <>
      <div className="flex justify-center gap-4 max-task-h">{stagesToShow}</div>
      <Outlet />
    </>
  );
};

export default HomePage;
