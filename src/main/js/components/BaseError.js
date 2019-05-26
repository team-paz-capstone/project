import React, {Component} from 'react';
import Snackbar from '@material-ui/core/Snackbar';

class BaseError extends Component {
  render() {
    if (!this.props.error) {
      return <div>{null}</div>
    }
    return (

        <div>
          <Snackbar
              anchorOrigin={{ vertical:'top',horizontal: 'center' }}
              message={this.props.error}
           open={true}/>
        </div>
    );
  }
}


export default BaseError;