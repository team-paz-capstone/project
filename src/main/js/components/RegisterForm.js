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
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UserHomeView from '../pages/UserHomeView';
import PublicHomeView from '../pages/PublicHomeView';
import { createAward, createUser } from '../actions';
import Toolbar from '@material-ui/core/Toolbar';

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

function RegistrationForm(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    showPassword: false,
    formError: {
      firstName: false,
      lastName: false,
      email: false,
      password: false,
      confirmPassword: false
    },
    error: '',
    requested: false
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const register = () => {
    console.debug(values);
    let validationError = false;
    let textError = '';
    let formError = values.formError;

    let formValues = ['firstName', 'lastName', 'email', 'password', 'confirmPassword'];
    let form = {};
    if (values.password !== values.confirmPassword) {
      validationError = true;
      textError = 'Passwords must match!';
    }

    formValues.forEach(value => {
      if (values[value] === '') {
        validationError = true;
        formError[value] = true;
      } else {
        formError[value] = false;
        form[value] = values[value];
      }
    });

    if (validationError) {
      setValues({ ...values, formError: formError, error: textError });
      return;
    }

    props.dispatch(createUser(form));
    setValues({
      ...values,
      formError: formError,
      error: textError,
      requested: true
    });
  };

  let requestStatusMessage = '';
  if (props.users.createLoading === true) {
    requestStatusMessage = 'Loading...';
  } else if (props.users.createError !== null) {
    requestStatusMessage = 'Problem Creating your account: ' + props.users.createError;
  } else {
    requestStatusMessage = 'Successfully created your account!';
  }

  return (
    <div>
      {values.requested ? (
        <Card className={classes.card}>
          <h2>{requestStatusMessage}</h2>
          <CardActions>
            <Button size="small">
              <Link to="/">Log In</Link>
            </Button>
          </CardActions>
        </Card>
      ) : (
        <Card className={classes.card}>
          <BaseError error={values.error} />
          <form>
            <FormGroup className={classes.root}>
              <h2>Register</h2>
              <TextField
                required
                id="first-name"
                label="First Name"
                type="text"
                name="firstName"
                autoComplete="given-name"
                className={classes.textField}
                value={values.firstName}
                onChange={handleChange('firstName')}
                margin="normal"
                error={values.formError.firstName}
              />
              <TextField
                required
                id="last-name"
                label="Last Name"
                type="text"
                name="lastName"
                autoComplete="family-name"
                className={classes.textField}
                value={values.lastName}
                onChange={handleChange('lastName')}
                margin="normal"
                error={values.formError.lastName}
              />
              <TextField
                required
                id="email"
                label="Email"
                type="email"
                name="email"
                autoComplete="email"
                className={classes.textField}
                value={values.email}
                onChange={handleChange('email')}
                margin="normal"
                error={values.formError.email}
              />
              <FormControl className={clsx(classes.margin, classes.textField)}>
                <InputLabel required error={values.formError.password} htmlFor="adornment-password">
                  Password
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
                  Confirm Password
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
                onClick={register}
              >
                Register
              </Button>
            </FormGroup>
          </form>
          <CardActions>
            <Button size="small">
              <Link to="/">Already have an account?</Link>
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
  awards: state.awards,
  awardTypes: state.awardTypes,
  offices: state.offices,
  select: state.select,
  users: state.users
});

export default connect(mapStateToProps)(RegistrationForm);
