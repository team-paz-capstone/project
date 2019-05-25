import React, {Component} from 'react';
import {connect} from 'react-redux'

class UserPortal extends Component {
    render() {
        return (
            <div>
                <h1>Welcome!</h1>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.authentication.auth,
    token: state.authentication.token
});

export default connect(mapStateToProps)(UserPortal)
