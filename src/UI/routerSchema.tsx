import { Paths } from '@UI/Paths';
import { Navigate, createBrowserRouter } from 'react-router-dom';
import { PreviewDialog } from '@UI/Layout';
import { Suspense, lazy } from 'react';

const Layout = lazy(() => import('@UI/Layout'));
const HomePage = lazy(() => import('@UI/Layout/HomePage'));
const EditTaskPage = lazy(() => import('@UI/Layout/EditPage'));

const router = createBrowserRouter([
  {
    path: Paths.Home,
    //подобная запись позволяет реализовать параллельную загрузку данных
    //и рендера компонента, если есть такая необходимость
    element: (
      <Suspense>
        <Layout />
      </Suspense>
    ),
    children: [
      { path: Paths.Empty, element: <Navigate to={Paths.Tasks} replace /> },
      {
        path: Paths.Tasks,
        element: (
          <Suspense>
            <HomePage />
          </Suspense>
        ),
        children: [
          {
            path: Paths.Preview,
            element: <PreviewDialog title="Просмотр задачи" />
          }
        ]
      },
      {
        path: Paths.Edit,
        element: (
          <Suspense>
            <EditTaskPage />
          </Suspense>
        )
      },
      {
        path: Paths.Create,
        element: (
          <Suspense>
            <EditTaskPage />
          </Suspense>
        )
      },
      {
        path: Paths.Any,
        element: <p className="text-white">Такого пути нет!</p>
      }
    ]
  }
]);

export default router;
