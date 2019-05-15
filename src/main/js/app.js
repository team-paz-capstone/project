/*
 * SOURCE: https://spring.io/guides/tutorials/react-and-spring-data-rest/
 * */
"use strict";

import "babel-polyfill";

const React = require("react");
const ReactDOM = require("react-dom");
import UserList from "./components/UserList";
import { getAllUsers } from "./api/user";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: red
  },
  typography: { useNextVariants: true }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  async componentDidMount() {
    try {
      let users = await getAllUsers();
      this.setState({ users: users });
    } catch (error) {
      console.warn("Failed  to load users!");
    }
  }

  render() {
    return (
      <React.Fragment>

        {/*ensure css consistency across browser*/}
        <CssBaseline />

        {/*allow customize theme color*/}
        <MuiThemeProvider theme={theme}>

          <Grid container direction="row" justify="center" alignItems="center">
              <div>
              <br />

              <Typography variant="h5">Admin Portal: users</Typography>

              <br />

              <Button color="primary" variant="contained" href="/offices/list">
                Office Management
              </Button>

              <br />
              <br />

              <Button color="primary" variant="contained" href="/users/addForm">
                Add User
              </Button>

              <br />
              <br />

              <UserList users={this.state.users} />
              </div>
          </Grid>
        </MuiThemeProvider>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("react"));
