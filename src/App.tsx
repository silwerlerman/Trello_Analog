import { Routes, Route, Link } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { EditTaskPage } from './pages/EditTaskPage';

export const App = () => {
  return (
    <>
      <header className="justify-center py-6 px-6 mx-auto flex gap-12 bg-gray-600 drop-shadow-lg rounded-b-lg max-w-fit">
        <Link to="/">Home</Link>
        <Link to="/edit">Edit</Link>
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit" element={<EditTaskPage />} />
      </Routes>
    </>
  );
};
