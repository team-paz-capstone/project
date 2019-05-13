import React, {Component} from 'react';
import User from "./User";

class UserList extends Component {
    render() {
        console.debug(this.props)
        const users = this.props.users.map(user =>
            <User key={user.email} user={user}/>
        );
        return (

            <table className="table table-bordered table-striped">
                <thead className="thead-dark">
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>Office</th>
                    <th>Update</th>
                    <th>Delete</th>
                </tr>
                </thead>

                <tbody>
                {users}
                </tbody>
            </table>
        )
    }
}

export default UserList