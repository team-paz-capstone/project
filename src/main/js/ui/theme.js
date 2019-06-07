import { createMuiTheme } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';

const primary = blue;
const secondary = red;
const typography = { useNextVariants: true };
const paper = {
  padding: 50,
  textAlign: 'center',
  margin: 10
};
const card = {
  padding: 50,
  textAlign: 'center',
  margin: 10
};

export const lightTheme = createMuiTheme({
  palette: {
    primary,
    secondary,
    type: 'light'
  },
  paper,
  card,
  typography
});

export const darkTheme = createMuiTheme({
  palette: {
    primary,
    secondary,
    type: 'dark'
  },
  paper,
  card,
  typography
});
