import Loader from '@components/Loader/Loader';
import { getActualTask } from '@components/Network/NetworkController';
import { closeDialigFunc } from '@functions';
import { DialogProps } from '@props';
import { useCallback, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';

function Dialog({ title }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const params = useParams();
  const navigate = useNavigate();

  const goBack: closeDialigFunc = useCallback(
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

  const { isLoading, error, data } = useQuery(`activeTask`, () =>
    getActualTask(Number(params.id))
  );

  if (error) {
    return 'Error';
  }

  const fields = isLoading ? (
    <Loader />
  ) : (
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
  );

  return (
    <>
      <dialog
        className="flex flex-col w-full custom-box backdrop:bg-black backdrop:opacity-75 max-w-3xl"
        ref={dialogRef}
      >
        <header className="flex justify-between px-4 py-4">
          <p className="font-bold text-lg">{title}</p>
          <div className="flex gap-6">
            <Link
              to={`/edit/${params.id}`}
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
        <div className="flex justify-center w-full px-4 py-4">{fields}</div>
      </dialog>
    </>
  );
}

export default Dialog;
