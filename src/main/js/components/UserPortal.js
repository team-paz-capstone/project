import React, {Component} from 'react';
import {connect} from 'react-redux'
import {authenticated} from '../reducers'
import {bool} from "prop-types";

const UserPortal = ({auth}) => (
  <div>
    <h1>Welcome! Authenticated={auth}</h1>
    <p>State: </p>
  </div>
);

UserPortal.propTypes = {
  auth: bool
};

const mapStateToProps = (state) => ({
  auth: authenticated(state),
});

export default connect(
  mapStateToProps,
  {authenticated}
)(UserPortal)
