import { Paths } from '@UI/Paths';
import { Link, generatePath } from 'react-router-dom';
import { usePreviewDialog } from './usePreviewDialog';

export const PreviewDialog = ({ title }: { title: string }) => {
  const { id, dialogRef, isLoading, data, goBack } = usePreviewDialog();

  return (
    <dialog
      className="flex flex-col w-full custom-box backdrop:bg-black backdrop:opacity-75 max-w-3xl"
      ref={dialogRef}
    >
      <header className="flex justify-between px-4 py-4">
        <p className="font-bold text-lg">{title}</p>
        <div className="flex gap-6">
          <Link
            to={generatePath(Paths.Edit, { id: id || null })}
            className="hover:text-purple-800 hover:cursor-pointer font-bold w-fit"
          >
            <button className="pt-[1.40px]">Изменить</button>
          </Link>
          <button
            className="hover:text-purple-800 hover:cursor-pointer font-bold w-fit items"
            onClick={goBack}
          >
            Отмена
          </button>
        </div>
      </header>
      <div
        className={`${
          isLoading ? 'loader' : 'px-4 py-4'
        } flex justify-center w-full`}
      >
        {!isLoading && (
          <div className="flex flex-col gap-2">
            <div className="flex gap-11">
              <p>Название:</p>
              <p>{data?.name}</p>
            </div>
            <div className="flex gap-11">
              <p>Описание:</p>
              <p>{data?.description}</p>
            </div>
            <div className="flex gap-2">
              <p>Дата создания:</p>
              <p>{data?.created_at.toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
};
