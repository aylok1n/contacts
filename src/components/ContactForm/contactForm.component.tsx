import { FC, useState, useCallback, ChangeEventHandler, useMemo, useRef } from 'react';
import { Contact } from '../../interfaces/contact';
import { Modal, Paper, TextField, Alert, Button, CircularProgress, Box, IconButton } from '@mui/material';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import { DeleteOutline } from '@mui/icons-material';
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

  const fileRef = useRef<HTMLInputElement>(null);

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

  const handleOpenFileReader = useCallback(() => fileRef.current?.click(), []);

  const handleChangePicture = useCallback(
    (picture: string) => () => {
      setFormState((state) => ({ ...state, picture }));
    },
    [],
  );

  const handleUploadImage = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => handleChangePicture(reader.result as string)();
      }
    },
    [handleChangePicture],
  );

  return (
    <Modal open={true} onClose={handleClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Paper
        sx={{
          p: 4,
          width: { xs: '100%', sm: '80%', md: '60%', lg: '50%', xl: '40%' },
          maxHeight: '90%',
          overflow: 'auto',
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
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
        <Box
          onClick={formState.picture ? undefined : handleOpenFileReader}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            position: 'relative',
            alignItems: 'center',
            border: '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: '4px',
            marginBottom: '32px',
            cursor: 'pointer',
            width: '96px',
            height: '96px',
            ':hover': {
              opacity: formState.picture ? 1 : 0.4,
            },
          }}
        >
          {formState.picture ? (
            <>
              <img src={formState.picture} width='96px' height='96px' />
              <IconButton style={{ position: 'absolute', right: -5, top: -5 }} onClick={handleChangePicture('')}>
                <DeleteOutline color='primary' />
              </IconButton>
            </>
          ) : (
            <>
              <input
                ref={fileRef}
                data-testid='sectorTypes-editor-modal-icon'
                onChange={handleUploadImage}
                type='file'
                accept='image/*'
                hidden
              />
              <PhotoSizeSelectActualOutlinedIcon
                sx={{
                  color: 'rgba(0, 0, 0, 0.12)',
                  fontSize: '35px',
                }}
              />
            </>
          )}
        </Box>
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
