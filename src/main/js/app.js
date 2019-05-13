/*
* SOURCE: https://spring.io/guides/tutorials/react-and-spring-data-rest/
* */
'use strict';

import 'babel-polyfill';

const React = require('react');
const ReactDOM = require('react-dom');
import UserList from "./components/UserList";
import {getAllUsers} from './api/user'

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    async componentDidMount() {
        try {
            let users = await getAllUsers();
            this.setState({users: users});
        } catch (error) {
            console.warn("Failed  to load users!")
        }
    }

    render() {
        return (
            <div className="container">
                <h3>Admin Portal: users</h3>
                <hr/>

                <a href="/offices/list"
                   className="btn btn-primary btn-sm mb-3"
                >
                    Office Management
                </a>

                <br/>

                <a href="/users/addForm"
                   className="btn btn-primary btn-sm mb-3"
                >
                    Add User
                </a>
                <UserList users={this.state.users}/>
            </div>

        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
)
