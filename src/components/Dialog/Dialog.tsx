import { getActualTask } from '@components/Network/NetworkController';
import { Path } from '@enums';
import { useCallback, useEffect, useRef } from 'react';
import { Link, generatePath, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

export const Dialog = ({ title }: { title: string }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const params = useParams();
  const navigate = useNavigate();

  const goBack: (
    e: KeyboardEvent | React.MouseEvent<HTMLButtonElement>
  ) => void = useCallback(
    e => {
      if (
        (e.type == 'keydown' && (e as KeyboardEvent).code == 'Escape') ||
        e.type == 'click'
      ) {
        navigate(-1);
      }
    },
    [navigate]
  );

  useEffect(() => {
    const dialogNode = dialogRef.current;
    dialogNode?.addEventListener('keydown', goBack);
    dialogNode?.showModal();

    return () => dialogNode?.removeEventListener('keydown', goBack);
  }, [goBack]);

  const { isLoading, error, data } = useQuery(
    [`activeTask`, Number(params.id)],
    () => getActualTask(Number(params.id))
  );

  if (error) {
    return 'Error';
  }

  return (
    <dialog
      className="flex flex-col w-full custom-box backdrop:bg-black backdrop:opacity-75 max-w-3xl"
      ref={dialogRef}
    >
      <header className="flex justify-between px-4 py-4">
        <p className="font-bold text-lg">{title}</p>
        <div className="flex gap-6">
          <Link
            to={generatePath(Path.Edit, { id: params.id || null })}
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
