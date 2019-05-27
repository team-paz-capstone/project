import React, {Component} from 'react';
import {connect} from 'react-redux'
import AppBarImplemented from "./TheAppBar";
import {BrowserRouter, Redirect, Route} from "react-router-dom";
import PublicHomePage from "./PublicHomePage";
import UserDashboard from "./TheUserDashboard";
import AdminPortal from "./AdminPortal";
import QueryPage from "./QueryPage";

class Main extends Component {

  render() {
    return (
        <div>
          <AppBarImplemented/>
          <BrowserRouter>
            {/*If we are not logged in, redirect to home*/}
            <Route exact path="/" render={() => (
                this.props.auth ? (<UserDashboard/>) : (<PublicHomePage/>)
            )}/>

            {/* If the user isn't logged in, they will be redirected*/}
            <Route exact path="/admin" render={() => (
                this.props.auth ? (
                    <AdminPortal/>
                ) : (
                    <Redirect to="/"/>
                )
            )}/>

            {/* If the user isn't logged in, they will be redirected*/}
            <Route exact path="/query" render={() => (
                this.props.auth ? (
                    <QueryPage/>
                ) : (
                    <Redirect to="/"/>
                )
            )}/>
          </BrowserRouter>
        </div>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.authentication.auth
});

export default connect(mapStateToProps)(Main)
