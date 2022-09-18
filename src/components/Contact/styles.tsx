import { IconButton, IconButtonProps, styled } from '@mui/material';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ExpandMore = styled(({ expand, ...props }: ExpandMoreProps) => {
  return <IconButton {...props} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
