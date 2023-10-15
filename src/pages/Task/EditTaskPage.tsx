import { PageModes } from '@enums';
import { switchEditPgWelcTxtdFunc } from '@functions';
import { EditTaskProps } from '@props';

const EditTaskPage = (props: EditTaskProps) => {
  const mode: PageModes = props.mode;

  const welcomeText: switchEditPgWelcTxtdFunc = mode => {
    switch (mode) {
      case PageModes.create:
        return 'Форма создания новой задачи';
      case PageModes.edit:
        return 'Форма редактирования задачи';
      default:
        return '';
    }
  };

  return (
    <>
      <p className="text-white">{welcomeText(mode)}</p>
    </>
  );
};

export default EditTaskPage;
