import { Path } from '@enums';
import { Navigate, createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter([
  {
    path: Path.Home,
    //подобная запись позволяет реализовать параллельную загрузку данных
    //и рендера компонента, если есть такая необходимость
    async lazy() {
      const { Layout } = await import('@components/Layout/Layout');
      return { Component: Layout };
    },
    children: [
      { path: Path.Empty, element: <Navigate to={Path.Tasks} replace /> },
      {
        path: Path.Tasks,
        async lazy() {
          const { HomePage } = await import('@pages/HomePage');
          return { Component: HomePage };
        }
      },
      {
        path: Path.Preview,
        async lazy() {
          const { PreviewTaskPage } = await import(
            '@pages/Task/PreviewTaskPage'
          );
          return { Component: PreviewTaskPage };
        }
      },
      {
        path: Path.Edit,
        async lazy() {
          const { EditTaskPage } = await import('@pages/Task/EditTaskPage');
          return { Component: EditTaskPage };
        }
      },
      {
        path: Path.Create,
        async lazy() {
          const { EditTaskPage } = await import('@pages/Task/EditTaskPage');
          return { Component: EditTaskPage };
        }
      },
      {
        path: Path.Any,
        element: <p className="text-white">Такого пути нет!</p>
      }
    ]
  }
]);
