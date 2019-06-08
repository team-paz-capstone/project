import React from 'react';
import { connect } from 'react-redux';
import Container from '@material-ui/core/Container';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import RegisterForm from '../components/RegisterForm';
import AccountRecovery from '../components/AccountRecoveryForm';
import PasswordResetForm from '../components/PasswordResetForm';
import LoginForm from '../components/LoginForm';

const useStyles = makeStyles(theme => ({
  paper: {
    ...theme.paper,
    color: theme.palette.text.secondary
  }
}));

function UserPortal() {
  const classes = useStyles();
  return (
    <Container maxWidth="sm">
      <Paper
        className={classes.paper}
        bgcolor="primary.main"
        color="primary.contrastText"
        p={2}
        m={1}
      >
        <Typography variant="h4">Welcome to Employee Award Portal</Typography>
      </Paper>
      <BrowserRouter>
        <Route exact path="/" component={LoginForm} />
        <Route exact path="/home/register" component={RegisterForm} />
        <Route path="/home/password-reset" component={PasswordResetForm} />
        <Route exact path="/home/account-recovery" component={AccountRecovery} />
      </BrowserRouter>
    </Container>
  );
}

const mapStateToProps = state => ({
  auth: state.authentication.auth
});

export default connect(mapStateToProps)(UserPortal);
