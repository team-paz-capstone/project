import { createMuiTheme } from '@material-ui/core/styles';
import { blue, red } from '@material-ui/core/colors';

const primary = blue;
const secondary = red;

export const theme = createMuiTheme({
  palette: {
    primary: primary,
    secondary: secondary
  },
  paper: {
    padding: 50,
    textAlign: 'center',
    margin: 10
  },
  card: {
    padding: 50,
    textAlign: 'center',
    margin: 10
  },
  typography: { useNextVariants: true }
});
