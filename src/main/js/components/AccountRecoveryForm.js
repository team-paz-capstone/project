import React from 'react';
import clsx from 'clsx';
import FormGroup from '@material-ui/core/FormGroup';
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core";
import BaseError from "./BaseError";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import {Link} from "react-router-dom";
import {accountRecovery, createUser} from "../actions";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: 1,
  },
  textField: {
    margin: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 'auto',
  },
  card: {
    ...theme.card,
    color: theme.palette.text.secondary,
  },
  paper: {
    ...theme.paper,
    color: theme.palette.text.secondary,
  }
}));

function AccountRecoveryForm(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: '',
    showPassword: false,
    error: null,
    requested: false
  });

  const handleChange = name => event => {
    console.debug(name + ": " + event.target.value);
    setValues({...values, [name]: event.target.value});
  };

  const recover = () => {
    console.debug(values);
    if (values.email === '') {
      setValues({...values, error: true});
      return;
    }

    setValues({...values, error: false, requested: true});
    props.dispatch(accountRecovery(values.email));
  };

  let requestStatusMessage = '';
  if (props.users.createLoading === true) {
    requestStatusMessage = "Loading..."
  } else if (props.users.createError !== null) {
    requestStatusMessage = "Problem Creating your account: " + props.users.createError
  } else {
    requestStatusMessage = "Recovery email sent to " + values.email
  }

  let error = "";
  if (props.accountRecovery.accountRecoveryError) {
    error = "Failed to recover account! " + props.accountRecovery.accountRecoveryError;
  }

  return (
      <div>
        <BaseError error={error}/>
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
              <form>
                <FormGroup className={classes.root}>
                  <h2>Account Recovery</h2>
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
                      error={values.error}
                  />
                  <Button className={clsx(classes.margin, classes.textField)}
                          variant="contained"
                          color="primary"
                          onClick={recover}>
                    Send Recovery Email
                  </Button>
                </FormGroup>
              </form>
              <CardActions>
                <Button
                    size="small"
                ><Link to="/register">Register new account</Link></Button>
              </CardActions>
              <CardActions>
                <Button
                    size="small"
                ><Link to="/">Back to Log In</Link></Button>
              </CardActions>
            </Card>
        )}
      </div>
  );
}

const mapStateToProps = (state) => ({
  accountRecovery: state.accountRecovery,
  awards: state.awards,
  awardTypes: state.awardTypes,
  offices: state.offices,
  select: state.select,
  users: state.users,
});

export default connect(mapStateToProps)(AccountRecoveryForm);