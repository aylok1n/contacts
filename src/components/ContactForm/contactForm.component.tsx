import { FC, useState, useCallback, ChangeEventHandler, useMemo } from 'react';
import { Contact } from '../../interfaces/contact';
import { Modal, Paper, TextField, Alert, Button, CircularProgress } from '@mui/material';
import isLength from 'validator/lib/isLength';
import isEmail from 'validator/lib/isEmail';
import isMobilePhone from 'validator/lib/isMobilePhone';
import { useAppSelector } from '../../hooks/hooks';
import { createContact, editContact } from '../../api/contacts.api';

interface Props {
  editableContact?: Contact;
  handleClose: () => void;
}

export const ContactForm: FC<Props> = ({ editableContact, handleClose }) => {
  const { loadingForm, errorForm } = useAppSelector((state) => state.contactsSlice);
  const [showError, setShowError] = useState(false);
  const [formState, setFormState] = useState({
    name: editableContact?.name || '',
    phone: editableContact?.phone || '',
    email: editableContact?.email || '',
    company: editableContact?.company || '',
    address: editableContact?.address || '',
    about: editableContact?.about || '',
    picture: editableContact?.picture || '',
  });

  const handleChangeField = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      setShowError(false);
      setFormState((state) => ({ ...state, [e.target.name]: e.target.value }));
    },
    [setFormState],
  );

  const isValid = useMemo(
    () =>
      (formState.email ? isEmail(formState.email) : true) &&
      isLength(formState.name, { min: 3 }) &&
      isMobilePhone(formState.phone),
    [formState],
  );
  const handleSubmit = useCallback(async () => {
    if (isValid) {
      try {
        if (editableContact) {
          await editContact({
            ...formState,
            id: editableContact.id,
          });
        } else {
          await createContact(formState);
        }
        handleClose();
      } catch (error) {
        setShowError(true);
      }
    }
  }, [editableContact, formState, handleClose, isValid]);

  return (
    <Modal open={true} onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper
        sx={{
          p: 4,
          width: { xs: '100%', sm: '80%', md: '60%', lg: '50%', xl: '40%' },
          maxHeight: '90%',
          overflow: 'auto',
          border: 'none',
          boxShadow: 'none',
        }}
      >
        <TextField
          value={formState.name}
          onChange={handleChangeField}
          label='Имя'
          type='name'
          required
          name='name'
          fullWidth
          sx={{ my: 1 }}
        />
        <TextField
          value={formState.phone}
          onChange={handleChangeField}
          label='Телефон'
          type='tel'
          name='phone'
          required
          fullWidth
          sx={{ my: 1 }}
        />
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
          value={formState.company}
          onChange={handleChangeField}
          label='Компания'
          name='company'
          fullWidth
          sx={{ my: 1 }}
        />
        <TextField
          value={formState.address}
          onChange={handleChangeField}
          label='Адрес'
          name='address'
          fullWidth
          sx={{ my: 1 }}
        />
        <TextField
          value={formState.about}
          onChange={handleChangeField}
          multiline
          maxRows={4}
          label='Подробнее'
          name='about'
          fullWidth
          sx={{ my: 1 }}
        />
        {showError ? (
          <Alert sx={{ mt: 3 }} severity='error'>
            {errorForm}
          </Alert>
        ) : null}
        <Button
          disabled={!isValid || loadingForm}
          onClick={handleSubmit}
          variant='contained'
          sx={{ mt: 5, width: '100%', maxWidth: '320px', height: '48px' }}
        >
          {loadingForm ? <CircularProgress /> : 'Сохранить'}
        </Button>
      </Paper>
    </Modal>
  );
};
