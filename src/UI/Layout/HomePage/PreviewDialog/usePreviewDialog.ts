import { getActualTask } from '@API/Network';
import { useEffect, useRef } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { useNavigationBack } from '@API/LocalHooks';

export const usePreviewDialog = () => {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const params = useParams();
  const { id } = params;
  const { goBack } = useNavigationBack();

  useEffect(() => {
    dialogRef?.current?.showModal();
  }, []);

  const { isLoading, data } = useQuery([`activeTask-${id}`], () =>
    getActualTask(Number(id))
  );

  return { id, isLoading, data, dialogRef, goBack };
};
