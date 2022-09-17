import { Navigate, Route, Routes } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import ContactsPage from '../pages/ContactsPage';

export const PublicRoutes = () => (
  <Routes>
    <Route path='/login' element={<AuthPage />} />
    <Route path='*' element={<Navigate to='/login' replace />} />
  </Routes>
);

export const PrivateRoutes = () => (
  <Routes>
    <Route path='/conacts' element={<ContactsPage />} />
    <Route path='*' element={<Navigate to='/conacts' replace />} />
  </Routes>
);
