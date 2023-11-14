import { useParams } from 'react-router-dom';

export const EditTaskPage = () => {
  const { id } = useParams();

  const welcomeText: () => string = () => {
    return id ? 'Форма редактирования задачи' : 'Форма создания новой задачи';
  };

  return <p className="text-white">{welcomeText()}</p>;
};
