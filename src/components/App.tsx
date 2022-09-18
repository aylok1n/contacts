import { Box, LinearProgress } from '@mui/material';
import { useEffect } from 'react';
import { authorize } from '../api/auth.api';
import { useAppSelector } from '../hooks/hooks';
import { PrivateRoutes, PublicRoutes } from './routes';

const App = () => {
  const { data, loading } = useAppSelector((state) => state.authSlice);

  useEffect(() => {
    authorize();
  }, []);

  if (loading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  if (data?.accessToken) {
    return <PrivateRoutes />;
  }

  return <PublicRoutes />;
};

export default App;
