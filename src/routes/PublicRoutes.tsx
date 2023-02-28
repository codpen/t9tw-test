import { Route, Routes } from 'react-router-dom';
import AuthRoutes from '../views/Auth';
import { NotFoundView } from '../views';
import LoginEmailView from '../views/Auth/Login/LoginEmailView';

/**
 * List of routes available only for anonymous users
 */
const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginEmailView />} />
      <Route path="auth/*" element={<AuthRoutes />} />
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  );
};

export default PublicRoutes;
