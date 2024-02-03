import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const useNavigationBack = () => {
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

  return { goBack };
};
