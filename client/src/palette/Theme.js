import { createMuiTheme } from '@material-ui/core/styles';

const Theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#292F36'
    },
    primary: {
      main: '#008DD5',
      dark: '#008DD5',
      contrastText: '#fff'
    },
    secondary: {
      main: '#F15152',
      dark: '#F15152',
      contrastText: '#fff'
    },
    error: {
      main: '#BD0043',
      contrastText: '#fff'
    },
    divider: '#D7D6D5'
  },
  spacing: factor => [0, 2, 4, 8, 16, 32, 64][factor]
});

export default Theme;
