import { Routes, Route } from 'react-router-dom';
import HomePage from '@pages/HomePage';
import EditTaskPage from '@pages/Task/EditTaskPage';
import Layout from '@components/Layout/Layout';
import { PageModes } from '@enums';
import PreviewTaskPage from '@pages/Task/PreviewTaskPage ';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="create"
            element={<EditTaskPage mode={PageModes.create} />}
          />
          <Route
            path="edit/:id"
            element={<EditTaskPage mode={PageModes.edit} />}
          />
          <Route path="preview/:id" element={<PreviewTaskPage />} />
          <Route
            path="*"
            element={<p className="text-white">Такого пути нет!</p>}
          />
        </Route>
      </Routes>
    </>
  );
};
