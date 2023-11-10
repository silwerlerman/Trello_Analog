import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from '@pages/HomePage';
import EditTaskPage from '@pages/Task/EditTaskPage';
import Layout from '@components/Layout/Layout';
import { PageModes } from '@enums';
import Dialog from '@components/Dialog/Dialog';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: Infinity } }
});

export const App = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/list" replace />} />
            <Route path="/list" element={<HomePage />}>
              <Route
                path="preview/:id"
                element={<Dialog title="Просмотр задачи" />}
              />
              R
            </Route>
            <Route
              path="create"
              element={<EditTaskPage mode={PageModes.create} />}
            />
            <Route
              path="edit/:id"
              element={<EditTaskPage mode={PageModes.edit} />}
            />
            <Route
              path="*"
              element={<p className="text-white">Такого пути нет!</p>}
            />
          </Route>
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
};
