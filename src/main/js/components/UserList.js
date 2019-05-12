import React, {Component} from 'react';
import User from "./User";

class UserList extends Component {
    render() {
        console.debug(this.props)
        const users = this.props.users.map(user =>
            <User key={user.email} user={user}/>
        );
        return (
            <table>
                <tbody>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>email</th>
                </tr>
                {users}
                </tbody>
            </table>
        )
    }
}

export default UserList