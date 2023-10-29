import { Loader } from '@components/Loader/Loader';
import { getActualTask } from '@components/Network/NetworkController';
import { Task } from '@types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export const Dialog = ({ title }: { title: string }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const params = useParams();
  const [task, setTask] = useState<Task>({
    id: Number(params.id),
    name: '',
    stage: '',
    created_at: ''
  });
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    (async () => {
      setTask(await getActualTask(Number(params.id)));
      setLoading(false);
    })();
  }, [params.id, task.stage]);

  const fields = loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col gap-2">
      <div className="flex gap-11">
        <p>Название:</p>
        <p>{task.name}</p>
      </div>
      <div className="flex gap-11">
        <p>Описание:</p>
        <p>{task.description}</p>
      </div>
      <div className="flex gap-2">
        <p>Дата создания:</p>
        <p>{task.created_at}</p>
      </div>
    </div>
  );

  return (
    <dialog
      className="flex flex-col w-full custom-box backdrop:bg-black backdrop:opacity-75 max-w-3xl"
      ref={dialogRef}
    >
      <header className="flex justify-between px-4 py-4">
        <p className="font-bold text-lg">{title}</p>
        <div className="flex gap-6">
          <Link
            to={`/edit/${task.id}`}
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
  );
};
