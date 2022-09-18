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
  IconButton,
  Typography,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Modal,
} from '@mui/material';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ExpandMore } from './styles';

interface Props {
  contact: ContactInterface;
}

export const Contact: FC<Props> = ({ contact }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = useCallback(() => {
    setExpanded((state) => !state);
  }, []);

  const handleToggleModal = useCallback(
    (value: boolean) => () => {
      setModalVisible(value);
    },
    [],
  );

  return (
    <>
      <ListItem alignItems='flex-start' onClick={handleToggleModal(true)} sx={{ mb: 2 }}>
        <ListItemAvatar>
          <Avatar alt={contact.name} src={contact.picture} />
        </ListItemAvatar>
        <ListItemText
          primary={contact.name}
          secondary={
            <>
              <Typography sx={{ display: 'inline' }} component='span' variant='body2' color='text.primary'>
                {contact.phone}
              </Typography>
              {contact.email}
            </>
          }
        />
      </ListItem>
      <Modal open={modalVisible} onClose={handleToggleModal(false)}>
        <Card key={contact.id} sx={{ maxWidth: '60%' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                {contact.name.split(' ').map((i) => i[0])}
              </Avatar>
            }
            action={
              <IconButton aria-label='settings'>
                <MoreVertIcon />
              </IconButton>
            }
            title={contact.name}
            subheader={contact.phone}
          />
          <CardMedia component='img' height='194' image={contact.picture} />
          <CardActions disableSpacing>
            <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label='show more'>
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
              <Typography paragraph>
                <b>Email: </b>
                {contact.email}
              </Typography>
              <Typography paragraph>
                <b>Адрес: </b>
                {contact.address}
              </Typography>
              <Typography paragraph>
                <b>Компания: </b>
                {contact.company}
              </Typography>
              <Typography paragraph>
                <b>Пол: </b>
                {contact.gender}
              </Typography>
              <Typography paragraph>{contact.about}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </Modal>
    </>
  );
};
