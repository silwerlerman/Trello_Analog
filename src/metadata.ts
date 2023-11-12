import { Stage as stage } from '@types';

export const stages: stage[] = [
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
