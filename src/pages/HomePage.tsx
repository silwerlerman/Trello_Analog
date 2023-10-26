import { Stage } from '@components/Stage/Stage';
import { getTasks } from '@components/Network/NetworkController';
import { Stage as StageTypes, Task as TaskTypes } from '@types';
import { useEffect, useState } from 'react';

export const HomePage = () => {
  const [Tasks, setTasks] = useState<TaskTypes[]>([]);

  useEffect(() => {
    (async () => {
      setTasks((await getTasks(5)) || []);
    })();
  }, []);

  const stages: StageTypes[] = [
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
