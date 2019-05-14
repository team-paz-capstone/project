import React, { Component } from 'react';

class User extends React.Component {
    handleClick(e) {
        if (!(confirm('Are you sure you want to delete this user?'))) return false
    }

    render() {
        return (
            <tr>
                <td>{this.props.user.id}</td>
                <td>{this.props.user.firstName}</td>
                <td>{this.props.user.lastName}</td>
                <td>{this.props.user.email}</td>
                <td>{this.props.user.admin.toString()}</td>
                <td>{this.props.user.office == (null || undefined) ? "" : this.props.user.office.name}</td>
                <td >
                    <a href={"/users/viewSignature?userId=" + this.props.user.id}
                       class="btn btn-info btn-sm">
                        View
                    </a>
                </td>
                <td>
                    <a href={"/users/updateForm?userId=" + this.props.user.id}
                       className="btn btn-info btn-sm">
                        Update
                    </a>
                </td>

                <td>
                    <a href={"/users/delete?userId=" + this.props.user.id}
                       className="btn btn-danger btn-sm"
                       onClick={this.handleClick}
                    >
                        Delete
                    </a>
                </td>
            </tr>
        )
    }
}

export default User