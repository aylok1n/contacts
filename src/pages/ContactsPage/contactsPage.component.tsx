import { memo, useEffect } from 'react';
import { getContacts } from '../../api/contacts.api';
import { useAppSelector } from '../../hooks/hooks';
import { CircularProgress, List, Paper, Stack } from '@mui/material';
import Contact from '../../components/Contact';

export const ContactsPage = memo(() => {
  const { data, loading } = useAppSelector((state) => state.contactsSlice);

  useEffect(() => {
    getContacts();
  }, []);

  return (
    <Paper
      sx={{
        display: 'flex',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {loading ? <CircularProgress /> : null}
      <Stack direction='column' overflow='auto' spacing={2} p={2}></Stack>
      <List sx={{ width: '60%', height: '100%' }}>
        {data?.map((contact) => (
          <Contact key={contact.id} contact={contact} />
        ))}
      </List>
    </Paper>
  );
});
