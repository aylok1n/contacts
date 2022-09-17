import { ChangeEventHandler, memo, useCallback, useState, useMemo, useEffect } from 'react';
import { Paper, TextField, Box, Button, Alert, CircularProgress } from '@mui/material';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';
import { authorize } from '../../api/auth.api';
import Background from '../../assets/background.jpg';
import { useAppSelector } from '../../hooks/hooks';

export const AuthPage = memo(() => {
  const { error, loading } = useAppSelector((state) => state.authSlice);
  const [formState, setFormState] = useState({
    email: '',
    password: '',
  });
  const [showError, setShowError] = useState(false);
  const isValid = useMemo(() => isEmail(formState.email) && isLength(formState.password, { min: 8 }), [formState]);

  const handleChangeField = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setShowError(false);
      setFormState((state) => ({ ...state, [e.target.name]: e.target.value }));
    },
    [setFormState],
  );

  const handleSubmit = useCallback(() => {
    if (isValid) {
      authorize(formState);
    }
  }, [formState, isValid]);

  useEffect(() => {
    if (error) {
      setShowError(true);
    }
  }, [error]);

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Paper
        sx={{
          p: 6,
          pb: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          width: { xs: '100%', sm: '60%', md: '480px', lg: '640px', xl: '640px' },
        }}
      >
        <TextField
          value={formState.email}
          onChange={handleChangeField}
          label='Email'
          type='email'
          name='email'
          fullWidth
          sx={{ my: 1 }}
        />
        <TextField
          value={formState.password}
          onChange={handleChangeField}
          label='Пароль'
          type='password'
          name='password'
          fullWidth
          sx={{ my: 1 }}
        />
        {showError ? (
          <Alert sx={{ mt: 3 }} severity='error'>
            {error}
          </Alert>
        ) : null}
        <Button
          disabled={!isValid || loading}
          onClick={handleSubmit}
          variant='contained'
          sx={{ mt: 5, width: '100%', maxWidth: '320px', height: '48px' }}
        >
          {loading ? <CircularProgress /> : 'Вход'}
        </Button>
      </Paper>
    </Box>
  );
});
