import React from 'react';
import clsx from 'clsx';
import FormGroup from '@material-ui/core/FormGroup';
import Button from "@material-ui/core/Button";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core";
import BaseError from "./BaseError";
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

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
  paper: theme.paper
}));

function LoginForm(props) {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    email: '',
    password: '',
    showPassword: false,
  });

  const handleChange = name => event => {
    console.debug(name + ": " +  event.target.value);
    setValues({...values, [name]: event.target.value});
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const logIn = () => {
    console.debug("Log in clicked!");
  };


  let error = '';

  return (
      <Paper className={classes.paper}>
        <BaseError error={error}/>
        <form onSubmit={logIn}>
          <FormGroup className={classes.root}>
            <h2>Log In</h2>
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
            />
            <FormControl className={clsx(classes.margin, classes.textField)}>
              <InputLabel htmlFor="adornment-password">Password</InputLabel>
              <Input
                  id="adornment-password"
                  type={values.showPassword ? 'text' : 'password'}
                  label="Password"
                  name="password"
                  autoComplete="password"
                  value={values.password}
                  onChange={handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}
                          aria-label="Toggle password visibility"
                          >
                        {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                      </IconButton>
                    </InputAdornment>
                  }
              />
            </FormControl>
            <Button className={clsx(classes.margin, classes.textField)}
                    variant="contained"
                    color="primary"
                    onClick={logIn}>
              Log In
            </Button>
          </FormGroup>
        </form>
      </Paper>
  );
}

const mapStateToProps = (state) => ({
  awards: state.awards,
  awardTypes: state.awardTypes,
  offices: state.offices,
  select: state.select,
  users: state.users,
});

export default connect(mapStateToProps)(LoginForm);