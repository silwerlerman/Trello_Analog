import { useEditTask } from './useEditTask';
import { useNavigationBack } from '@API/LocalHooks';
import { stages } from '@Core/Metadata';

export const EditTaskPage = () => {
  const { goBack } = useNavigationBack();
  const {
    id,
    isLoading,
    dataUpdatedAt,
    isSubmitting,
    handleSubmit,
    submitHandler,
    register,
    errors
  } = useEditTask();

  return (
    <div className="flex flex-col  custom-box backdrop:bg-black backdrop:opacity-75 max-w-3xl mx-auto h-full">
      <header className="flex justify-between px-4 py-4">
        <p className="font-bold text-lg">
          {id ? 'Форма редактирования задачи' : 'Форма создания новой задачи'}
        </p>
      </header>
      {!isLoading && (
        <form
          id="form"
          key={dataUpdatedAt}
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-6 px-4 py-4 overflow-auto"
        >
          <div>
            <p>ID</p>
            <input
              {...register('id')}
              type="number"
              min={0}
              max={100}
              readOnly={!!id}
              className="w-full"
              placeholder="Введите ID..."
            ></input>
            {errors.id && (
              <p className="text-red-500">{`${errors.id.message}`}</p>
            )}
          </div>
          <div>
            <p>Название</p>
            <input
              {...register('name')}
              className="w-full"
              placeholder="Введите название..."
            ></input>
            {errors.name && (
              <p className="text-red-500">{`${errors.name.message}`}</p>
            )}
          </div>
          <div>
            <p>Этап</p>
            <select
              {...register('stage')}
              className="h-6 w-full"
              placeholder="Выберите этап..."
            >
              {stages.map((stage, i) => (
                <option value={stage.name} key={i}>
                  {stage.name}
                </option>
              ))}
            </select>
            {errors.stage && (
              <p className="text-red-500">{`${errors.stage.message}`}</p>
            )}
          </div>
          <div>
            <p>Описание</p>
            <textarea
              {...register('description')}
              className="w-full h-24"
              placeholder="Введите описание..."
            ></textarea>
            {errors.description && (
              <p className="text-red-500">{`${errors.description.message}`}</p>
            )}
          </div>
        </form>
      )}
      <footer
        className={`${
          isSubmitting || isLoading ? 'loader' : 'px-4 py-4'
        } flex justify-center gap-6`}
      >
        {!isSubmitting && !isLoading && (
          <button
            className="hover:text-purple-800 hover:cursor-pointer font-bold w-fit"
            type="submit"
            form="form"
          >
            {id ? 'Сохранить' : 'Создать'}
          </button>
        )}
        {id && !isSubmitting && !isLoading && (
          <button
            className="hover:text-purple-800 hover:cursor-pointer font-bold w-fit"
            onClick={goBack}
          >
            Отмена
          </button>
        )}
      </footer>
    </div>
  );
};
