import { createTheme } from '@mui/material/styles';

export const getTheme = (mode = 'light') => createTheme({
  palette: {
    mode,
    primary: {
      main: '#d90429', // Red
      contrastText: '#fff',
    },
    secondary: {
      main: '#2b2d42', // Dark for contrast
      contrastText: '#fff',
    },
    background: {
      default: mode === 'light' ? '#fff' : '#1a1a1a',
      paper: mode === 'light' ? '#fff' : '#232323',
    },
    text: {
      primary: mode === 'light' ? '#2b2d42' : '#fff',
      secondary: '#d90429',
    },
  },
  typography: {
    fontFamily: [
      'Montserrat',
      'Playfair Display',
      'sans-serif',
    ].join(','),
    h1: {
      fontFamily: 'Playfair Display, serif',
      fontWeight: 700,
      letterSpacing: '-1px',
    },
    h2: {
      fontFamily: 'Playfair Display, serif',
      fontWeight: 600,
    },
    h3: {
      fontFamily: 'Playfair Display, serif',
      fontWeight: 500,
    },
    h4: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 600,
    },
    h6: {
      fontFamily: 'Montserrat, sans-serif',
      fontWeight: 500,
    },
    body1: {
      fontFamily: 'Montserrat, sans-serif',
    },
    body2: {
      fontFamily: 'Montserrat, sans-serif',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          boxShadow: '0 4px 24px 0 rgba(217,4,41,0.08)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: '0 2px 8px 0 rgba(217,4,41,0.08)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
      },
    },
  },
});
