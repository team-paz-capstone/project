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

const main = {
  display: 'flex',
  minHeight: 'calc(100vh - 15em)',
  flexDirection: 'column'
};

const root = {
  padding: 20
};

export const lightTheme = createMuiTheme({
  root,
  main,
  paper,
  card,
  typography,
  palette: {
    primary,
    secondary,
    type: 'light'
  }
});

export const darkTheme = createMuiTheme({
  root,
  main,
  paper,
  card,
  typography,
  palette: {
    primary,
    secondary,
    type: 'dark'
  }
});
