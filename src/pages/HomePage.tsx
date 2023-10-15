import Stage from '@components/Stage/Stage';
import { IStage } from '@interfaces';

const HomePage = () => {
  const stages: IStage[] = [
    {
      name: 'Назначено',
      tasks: [
        {
          id: 1,
          name: 'Задача 1',
          created_at: new Date().toLocaleDateString(),
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquid corrupti, impedit ad laudantium sit, mollitia perferendis blanditiis possimus dignissimos quis explicabo numquam unde? Quae numquam iusto expedita ad autem!'
        },
        {
          id: 2,
          name: 'Задача 2',
          created_at: new Date().toLocaleDateString(),
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquid corrupti, impedit ad laudantium sit, mollitia perferendis blanditiis possimus dignissimos quis explicabo numquam unde? Quae numquam iusto expedita ad autem!'
        },
        {
          id: 3,
          name: 'Задача 3',
          created_at: new Date().toLocaleDateString(),
          description:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deserunt aliquid corrupti, impedit ad laudantium sit, mollitia perferendis blanditiis possimus dignissimos quis explicabo numquam unde? Quae numquam iusto expedita ad autem!'
        }
      ]
    },
    { name: 'На паузе', tasks: [] },
    { name: 'В работе', tasks: [] },
    { name: 'На проверке', tasks: [] },
    { name: 'Выполнено', tasks: [] }
  ];

  const stagesToShow = stages.map((stage, i) => (
    <Stage stage={stage} key={i} />
  ));

  return (
    <div className="flex justify-center gap-4 max-task-h">{stagesToShow}</div>
  );
};

export default HomePage;
