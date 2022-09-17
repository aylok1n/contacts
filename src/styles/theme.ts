import { createTheme } from '@mui/material';

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 960,
      xl: 1440,
    },
  },
  palette: {
    primary: {
      main: '#7E2939',
      light: '#EACED4',
      dark: '#621927',
      contrastText: '#001833',
    },
    secondary: {
      main: '#535F6D',
      light: 'rgba(0, 0, 0, 0.12)',
    },
    background: {
      default: '#F1F3F5',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#001833',
      secondary: 'rgba(0, 0, 0, 0.6)',
      disabled: 'rgba(0,24,51,0.38)',
    },
    error: {
      main: '#D32F2F',
      light: '#EF5350',
      dark: '#C62828',
    },
  },
  typography: {
    allVariants: {
      fontFamily: "'Montserrat', sans-serif",
    },
  }
})

export default theme
