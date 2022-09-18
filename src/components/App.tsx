import { Box, LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { authorize } from '../api/auth.api';
import { useAppSelector } from '../hooks/hooks';
import { PrivateRoutes, PublicRoutes } from './routes';

const App = () => {
  const { data, loading } = useAppSelector((state) => state.authSlice);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    authorize();
  }, []);

  useEffect(() => {
    if (!loading && isLoading) {
      setIsLoading(false);
    }
  }, [isLoading, loading]);

  if (isLoading) {
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
