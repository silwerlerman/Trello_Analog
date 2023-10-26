import { getTasks } from '@components/Network/NetworkController';
import Stage from '@components/Stage/Stage';
import { IStage, ITask } from '@interfaces';
import { useEffect, useState } from 'react';

const HomePage = () => {
  const [Tasks, setTasks] = useState<ITask[]>([]);

  useEffect(() => {
    (async () => {
      setTasks((await getTasks(5)) || []);
    })();
  }, []);

  const stages: IStage[] = [
    {
      name: 'Назначено',
      tasks: Tasks.filter(task => task.stage == 'Назначено')
    },
    { name: 'На паузе', tasks: Tasks.filter(task => task.stage == 'На паузе') },
    { name: 'В работе', tasks: Tasks.filter(task => task.stage == 'В работе') },
    {
      name: 'На проверке',
      tasks: Tasks.filter(task => task.stage == 'На проверке')
    },
    {
      name: 'Выполнено',
      tasks: Tasks.filter(task => task.stage == 'Выполнено')
    }
  ];

  const stagesToShow = stages.map((stage, i) => (
    <Stage stage={stage} key={i} />
  ));

  return (
    <div className="flex justify-center gap-4 max-task-h">{stagesToShow}</div>
  );
};

export default HomePage;
