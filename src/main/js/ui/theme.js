// setup the color for primary and secondary using theming
import {createMuiTheme} from '@material-ui/core/styles';
import {blue, red} from '@material-ui/core/colors';

export const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red
  },
  overrides: {
    paper: {
      background: red
    }
  },
  typography: {useNextVariants: true}
});

export const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: "#1A174C"
    },
  },
  typography: {useNextVariants: true}
});