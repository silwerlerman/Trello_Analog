import { Paths } from '@UI/Paths';
import { NavLink, Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div>
      <header className="justify-center px-6 mx-auto flex gap-12 bg-indigo-950 drop-shadow-lg backdrop-blur-sm rounded-b-lg border-2 border-t-0 shadow-inner">
        <NavLink
          to={Paths.Tasks}
          end
          className="text-white px-3 py-6 opacity-50"
        >
          Список
        </NavLink>
        <NavLink to={Paths.Create} className="text-white px-3 py-6 opacity-50">
          Создать
        </NavLink>
      </header>
      <div className="py-6 px-6 max-work-area-h">
        <Outlet />
      </div>
    </div>
  );
};
