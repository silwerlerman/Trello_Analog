import { Paths } from '@UI/Paths';
import { Icon28AddOutline, Icon28NewsfeedOutline } from '@vkontakte/icons';
import { Tabbar, TabbarItem } from '@vkontakte/vkui';
import { Outlet } from 'react-router-dom';
import { useLayout } from './useLayout';

export const Layout = () => {
  const { location, navigate } = useLayout();

  return (
    <div>
      <div className="py-6 px-6 max-work-area-h">
        <Outlet />
      </div>
      <Tabbar mode="horizontal">
        <TabbarItem
          selected={location.pathname === `/${Paths.Tasks}`}
          text="Cписок"
          onClick={() => navigate(Paths.Tasks)}
        >
          <Icon28NewsfeedOutline />
        </TabbarItem>
        <TabbarItem
          text="Создать"
          selected={location.pathname === `/${Paths.Create}`}
          onClick={() => navigate(Paths.Create)}
        >
          <Icon28AddOutline />
        </TabbarItem>
      </Tabbar>
    </div>
  );
};
