import React from 'react';
import clsx from 'clsx';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import MaterialLink from '@material-ui/core/Link';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { updateUser } from '../actions';
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

function RegistrationForm(props) {
  const classes = useStyles();
  const user = props.user || props.select.items['Logged In As'];

  let firstName;
  let lastName;
  let email = '';
  if (user) {
    firstName = user.firstName;
    lastName = user.lastName;
    email = user.email;
  }

  const [values, setValues] = React.useState({
    firstName,
    lastName,
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
    const textError = '';
    const { formError } = values;

    const formValues = ['firstName', 'lastName'];
    const form = user;

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
      setValues({ ...values, formError, error: textError });
      return;
    }

    props.dispatch(updateUser(form));
    setValues({
      ...values,
      formError,
      error: textError,
      requested: true
    });
  };

  let requestStatusMessage = '';
  if (props.authentication.updateLoading === true) {
    requestStatusMessage = 'Loading...';
  } else if (props.authentication.updateError !== null) {
    requestStatusMessage = `Problem updating your account: ${props.users.createError}`;
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
              <Typography variant="h5">Profile</Typography>
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
            <MaterialLink to="/home/" variant="body1" color="inherit" component={Link}>
              Go Back to Home Page
            </MaterialLink>
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
