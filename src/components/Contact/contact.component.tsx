import { FC, useState, useCallback } from 'react';
import { Contact as ContactInterface } from '../../interfaces/contact';
import {
  CardActions,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Collapse,
  Avatar,
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
  CircularProgress,
  IconButton,
} from '@mui/material';
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ExpandMore } from './styles';
import { deleteContact } from '../../api/contacts.api';
import ContactForm from '../ContactForm';
import { useAppSelector } from '../../hooks/hooks';

enum ModalType {
  EDIT,
  READ,
}

interface Props {
  contact: ContactInterface;
}

export const Contact: FC<Props> = ({ contact }) => {
  const { loadingDelete } = useAppSelector((state) => state.contactsSlice);
  const [modalVisible, setModalVisible] = useState<ModalType | null>(null);
  const [expanded, setExpanded] = useState(!contact.picture);

  const handleExpandClick = useCallback(() => {
    setExpanded((state) => !state);
  }, []);

  const handleToggleModal = useCallback(
    (value: ModalType | null) => () => {
      setModalVisible(value);
    },
    [],
  );

  const handleDelete = useCallback(() => {
    deleteContact(contact.id);
  }, [contact]);

  return (
    <>
      <ListItem
        alignItems='flex-start'
        onClick={handleToggleModal(ModalType.READ)}
        sx={{
          pt: 2,
          borderRadius: 1,
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.12)' },
        }}
      >
        <ListItemAvatar sx={{ mr: 2 }}>
          <Avatar alt={contact.name} src={contact.picture || undefined} sx={{ width: 56, height: 56 }}>
            {contact.picture ? null : contact.name.split(' ').map((i) => i[0])}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={contact.name}
          secondary={
            <>
              <Typography component='span' variant='body2' color='text.primary'>
                {contact.phone}
              </Typography>
              {contact.email}
            </>
          }
        />
      </ListItem>
      {modalVisible === ModalType.READ ? (
        <Modal
          open={true}
          onClose={handleToggleModal(null)}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Card
            key={contact.id}
            sx={{
              width: { xs: '100%', sm: '80%', md: '60%', lg: '50%', xl: '40%' },
              maxHeight: '90%',
              overflow: 'auto',
              border: 'none',
              boxShadow: 'none',
            }}
          >
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                  {contact.name.split(' ').map((i) => i[0])}
                </Avatar>
              }
              title={contact.name}
              subheader={contact.phone}
            />
            {contact.picture ? <CardMedia component='img' height='400px' image={contact.picture} /> : null}
            <CardActions disableSpacing>
              {loadingDelete ? (
                <CircularProgress />
              ) : (
                <IconButton onClick={handleDelete}>
                  <DeleteIcon color='primary' />
                </IconButton>
              )}
              <IconButton onClick={handleToggleModal(ModalType.EDIT)}>
                <EditIcon />
              </IconButton>
              <ExpandMore expand={expanded} onClick={handleExpandClick}>
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
              <CardContent>
                <Typography paragraph>
                  <b>Имя: </b>
                  {contact.name}
                </Typography>
                <Typography paragraph>
                  <b>Номер: </b>
                  {contact.phone}
                </Typography>
                {contact.email ? (
                  <Typography paragraph>
                    <b>Email: </b>
                    {contact.email}
                  </Typography>
                ) : null}
                {contact.address ? (
                  <Typography paragraph>
                    <b>Адрес: </b>
                    {contact.address}
                  </Typography>
                ) : null}
                {contact.company ? (
                  <Typography paragraph>
                    <b>Компания: </b>
                    {contact.company}
                  </Typography>
                ) : null}
                <Typography paragraph>{contact.about}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        </Modal>
      ) : null}
      {modalVisible === ModalType.EDIT ? (
        <ContactForm editableContact={contact} handleClose={handleToggleModal(null)} />
      ) : null}
    </>
  );
};
