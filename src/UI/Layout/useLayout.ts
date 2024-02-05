import { useLocation, useNavigate } from 'react-router-dom';

export const useLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return { location, navigate };
};
