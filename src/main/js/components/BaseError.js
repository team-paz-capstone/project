import React, { Component } from 'react';
import Snackbar from '@material-ui/core/Snackbar';

class BaseError extends Component {
  render() {
    if (!this.props.error) {
      return <div>{null}</div>;
    }
    return (
      <div>
        <Snackbar
          variant="error"
          autoHideDuration={3000}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          message={`Failed to login : ${this.props.error}`}
          open
        />
      </div>
    );
  }
}

export default BaseError;
