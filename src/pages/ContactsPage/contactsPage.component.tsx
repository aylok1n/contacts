import { memo, useEffect, useState, useCallback, ChangeEventHandler, useMemo } from 'react';
import { getContacts } from '../../api/contacts.api';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { LinearProgress, List, Paper, Box, Alert, Fab, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import Contact from '../../components/Contact';
import Background from '../../assets/background.jpg';
import Search from '../../components/Search';
import { Contact as ContactInterface } from '../../interfaces/contact';
import { logout } from '../../slices/auth.slice';
import { ContactForm } from '../../components/ContactForm/contactForm.component';

export const ContactsPage = memo(() => {
  const { data, loadingList, error } = useAppSelector((state) => state.contactsSlice);
  const dispatch = useAppDispatch();
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const filteredContacts = useMemo<ContactInterface[]>(() => {
    if (data) {
      return data.filter(
        (contact) =>
          contact.name.indexOf(search) === 0 ||
          contact.email?.indexOf(search) === 0 ||
          contact.phone.replace(/\D/g, '').replace(/^7/, '8').indexOf(search) === 0,
      );
    }
    return [];
  }, [data, search]);

  useEffect(() => {
    getContacts();
  }, []);

  const handleSearch = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setSearch(e.target.value);
  }, []);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const handleToggleModal = useCallback(
    (value: boolean) => () => {
      setModalVisible(value);
    },
    [],
  );

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Paper
        sx={{
          position: 'relative',
          display: 'flex',
          height: { xs: '100%', sm: '100%', md: '80%', lg: '80%', xl: '80%' },
          width: { xs: '100%', sm: '100%', md: '80%', lg: '80%', xl: '80%' },
          pt: 3,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',

          background: 'rgba(255, 255, 255, 0.5)',
          backdropFilter: 'blur(5px)',
        }}
      >
        {loadingList ? (
          <LinearProgress />
        ) : (
          <>
            <IconButton onClick={handleLogout} sx={{ position: 'absolute', top: 10, right: 16 }}>
              <LogoutIcon />
            </IconButton>
            <Search value={search} onChange={handleSearch} />
            <List
              sx={{
                width: { xs: '100%', sm: '100%', md: '80%', lg: '80%', xl: '80%' },
                height: '90%',
                overflow: 'auto',
              }}
            >
              {filteredContacts.length ? (
                filteredContacts.map((contact) => <Contact key={contact.id} contact={contact} />)
              ) : (
                <Alert sx={{ mt: 3 }} severity={error ? 'error' : 'info'}>
                  {error ? error : 'Список пуст'}
                </Alert>
              )}
            </List>
            <Fab color='primary' sx={{ position: 'absolute', bottom: 16, right: 16 }} onClick={handleToggleModal(true)}>
              <AddIcon />
            </Fab>
          </>
        )}
      </Paper>
      {modalVisible ? <ContactForm handleClose={handleToggleModal(false)} /> : null}
    </Box>
  );
});
