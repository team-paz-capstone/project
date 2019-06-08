import React from 'react';
import clsx from 'clsx';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import MaterialLink from '@material-ui/core/Link';
import { logIn } from '../actions';
import BaseError from './BaseError';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 1
  },
  textField: {
    margin: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 'auto'
  },
  card: {
    ...theme.card,
    color: theme.palette.text.secondary
  },
  paper: {
    ...theme.paper,
    color: theme.palette.text.secondary
  }
}));

function LoginForm(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
    formError: {
      email: false,
      password: false
    },
    requested: false,
    error: ''
  });

  const handleChange = name => event => {
    // console.debug(`${name}: ${event.target.value}`);
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleLogin = () => {
    // console.debug('Log in clicked!');
    const formError = { email: false, password: false };
    if (values.email === '') formError.email = true;
    if (values.password === '') formError.password = true;
    if (formError.password || formError.email) {
      setValues({ ...values, formError });
    } else {
      setValues({ ...values, formError });
      props.dispatch(
        logIn({
          email: values.email,
          password: values.password
        })
      );
    }
  };

  const { error } = props.authentication;
  // console.debug(props.authentication);

  return (
    <div>
      <Card className={classes.card}>
        <BaseError error={error} />
        <form onSubmit={logIn}>
          <FormGroup className={classes.root}>
            <Typography variant="h5">Log In</Typography>
            <TextField
              id="standard-name"
              label="Email"
              type="email"
              name="email"
              autoComplete="email"
              className={classes.textField}
              value={values.name}
              onChange={handleChange('email')}
              margin="normal"
              error={values.formError.email}
            />
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="adornment-password" error={values.formError.password}>
                Password
              </InputLabel>
              <Input
                id="adornment-password"
                type={values.showPassword ? 'text' : 'password'}
                label="Password"
                name="password"
                autoComplete="password"
                value={values.password}
                onChange={handleChange('password')}
                error={values.formError.password}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      aria-label="Toggle password visibility"
                    >
                      {values.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <br />
            <Button
              className={clsx(classes.margin, classes.textField)}
              variant="contained"
              color="primary"
              onClick={handleLogin}
            >
              Log In
            </Button>
          </FormGroup>
        </form>
        <CardActions>
          <MaterialLink to="/home/register" color="inherit" variant="body1" component={Link}>
            Register new account
          </MaterialLink>
        </CardActions>
        <CardActions>
          <MaterialLink
            to="/home/account-recovery"
            color="inherit"
            variant="body1"
            component={Link}
          >
            Account Recovery
          </MaterialLink>
        </CardActions>
      </Card>
    </div>
  );
}

const mapStateToProps = state => ({
  authentication: state.authentication,
  awards: state.awards,
  awardTypes: state.awardTypes,
  offices: state.offices,
  select: state.select,
  users: state.users
});

export default connect(mapStateToProps)(LoginForm);
