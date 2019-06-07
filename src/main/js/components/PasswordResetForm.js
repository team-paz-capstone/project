import React from 'react';
import clsx from 'clsx';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import BaseError from './BaseError';
import Paper from '@material-ui/core/Paper';
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
import 'url-search-params-polyfill';
import { updatePassword } from '../actions';

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

function PasswordResetForm(props) {
  const classes = useStyles();
  const queryParams = new URLSearchParams(props.location.search);
  const email = queryParams.get('email');
  const token = queryParams.get('token');

  console.debug(email);
  const [values, setValues] = React.useState({
    password: '',
    confirmPassword: '',
    showPassword: false,
    formError: {
      password: false,
      confirmPassword: false
    },
    error: '',
    requested: false
  });

  const handleChange = name => event => {
    console.debug(name + ': ' + event.target.value);
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const logIn = () => {
    let formError = {
      password: false,
      confirmPassword: false
    };
    if (values.password === '') formError.password = true;
    if (values.confirmPassword === '') formError.confirmPassword = true;
    if (formError.password || formError.confirmPassword) {
      setValues({ ...values, formError: formError });
    } else if (values.password !== values.confirmPassword) {
      setValues({ ...values, error: 'Passwords must match!', formError: formError });
    } else if (queryParams !== '' && email !== null && token !== null) {
      console.debug('Sending password!');
      setValues({ ...values, error: '', formError: formError, requested: true });
      props.dispatch(
        updatePassword({
          email: email,
          token: token,
          password: values.password
        })
      );
    } else {
      setValues({ ...values, error: '', formError: formError });
    }
  };

  let error = '';
  console.debug(props.location);
  if (queryParams === '' || email === null || token === null) {
    error = 'Error with reset form. Please try your email link again!';
  } else if (values.error) {
    error = values.error;
  } else if (props.accountRecovery.updatePasswordError) {
    error = 'Failed to recover account! ' + props.accountRecovery.updatePasswordError;
  }

  let requestStatusMessage = '';
  if (props.accountRecovery.updatePasswordLoading === true) {
    requestStatusMessage = 'Loading...';
  } else if (props.accountRecovery.updatePasswordError !== null) {
    requestStatusMessage = 'Problem resetting your password';
  } else {
    requestStatusMessage = 'Password Reset!';
  }

  return (
    <div>
      {values.requested ? (
        <Card className={classes.card}>
          <h2>{requestStatusMessage}</h2>
          <CardActions>
            <Button size="small">
              <Link to="/">Back to Log In</Link>
            </Button>
          </CardActions>
        </Card>
      ) : (
        <Card className={classes.card}>
          <BaseError error={error} />
          <form onSubmit={logIn}>
            <FormGroup className={classes.root}>
              <h2>Reset Password</h2>
              <h3>{email}</h3>
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel required error={values.formError.password} htmlFor="adornment-password">
                  New Password
                </InputLabel>
                <Input
                  required
                  id="adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  label="Password"
                  name="password"
                  autoComplete="new-password"
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
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel
                  required
                  error={values.formError.confirmPassword}
                  htmlFor="adornment-password"
                >
                  Confirm New Password
                </InputLabel>
                <Input
                  id="confirm-password"
                  type={values.showPassword ? 'text' : 'password'}
                  label="Confirm Password"
                  name="confirm-password"
                  autoComplete="new-password"
                  value={values.confirmPassword}
                  onChange={handleChange('confirmPassword')}
                  error={values.formError.confirmPassword}
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
              <Button
                className={clsx(classes.margin, classes.textField)}
                variant="contained"
                color="primary"
                onClick={logIn}
              >
                Reset Password
              </Button>
            </FormGroup>
          </form>
          <CardActions>
            <Button size="small">
              <Link to="/home/register">Register new account</Link>
            </Button>
          </CardActions>
          <CardActions>
            <Button size="small">
              <Link to="/home/account-recovery">Account Recovery</Link>
            </Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  accountRecovery: state.accountRecovery
});

export default connect(mapStateToProps)(PasswordResetForm);
