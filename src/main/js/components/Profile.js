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
import { createAward, createUser, fetchUsers, updateUser } from '../actions';
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
  let user = props.user || props.select.items['Logged In As'];

  let firstName,
    lastName,
    email = '';
  if (user) {
    firstName = user.firstName;
    lastName = user.lastName;
    email = user.email;
  }

  const [values, setValues] = React.useState({
    firstName: firstName,
    lastName: lastName,
    formError: {
      firstName: false,
      lastName: false
    },
    error: '',
    requested: false
  });

  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  };

  const resetForm = () => {
    setValues({ ...values, requested: false });
  };

  const register = () => {
    console.debug(values);
    let validationError = false;
    let textError = '';
    let formError = values.formError;

    let formValues = ['firstName', 'lastName'];
    let form = user;

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

    props.dispatch(updateUser(form));
    setValues({
      ...values,
      formError: formError,
      error: textError,
      requested: true
    });
  };

  let requestStatusMessage = '';
  if (props.authentication.updateLoading === true) {
    requestStatusMessage = 'Loading...';
  } else if (props.authentication.updateError !== null) {
    requestStatusMessage = 'Problem updating your account: ' + props.users.createError;
  } else {
    requestStatusMessage = 'Successfully updated your account!';
  }

  return (
    <div>
      {values.requested ? (
        <Card className={classes.card}>
          <h2>{requestStatusMessage}</h2>
          <CardActions>
            <Button size="small">
              <Link onClick={resetForm} to="/home/profile">
                Profile
              </Link>
            </Button>
            <Button size="small">
              <Link to="/home/">Home</Link>
            </Button>
          </CardActions>
        </Card>
      ) : (
        <Card className={classes.card}>
          <BaseError error={values.error} />
          <form>
            <FormGroup className={classes.root}>
              <h2>Profile</h2>
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
              <Button
                className={clsx(classes.margin, classes.textField)}
                variant="contained"
                color="primary"
                onClick={register}
              >
                Update Profile
              </Button>
            </FormGroup>
          </form>
          <CardActions>
            <Button size="small">
              <Link to="/home/">Home</Link>
            </Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  authentication: state.authentication,
  awards: state.awards,
  awardTypes: state.awardTypes,
  offices: state.offices,
  select: state.select,
  users: state.users,
  user: state.authentication.user
});

export default connect(mapStateToProps)(RegistrationForm);
