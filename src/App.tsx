import { Routes, Route } from 'react-router-dom';
import HomePage from '@pages/HomePage';
import EditTaskPage from '@pages/EditTaskPage';
import Layout from '@components/Layout/Layout';

export const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="edit" element={<EditTaskPage />} />
          <Route path="edit/:id" element={<EditTaskPage />} />
          <Route
            path="*"
            element={<p className="text-white">Такого пути нет!</p>}
          />
        </Route>
      </Routes>
    </>
  );
};
