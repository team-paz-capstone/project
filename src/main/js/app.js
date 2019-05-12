/*
* SOURCE: https://spring.io/guides/tutorials/react-and-spring-data-rest/
* */
'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
import UserList from "./components/UserList";

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {users: []};
    }

    componentDidMount() {
        client({method: 'GET', path: '/api/user/all'}).done(response => {
            console.debug(response);
            this.setState({users: response.entity});
        });
    }

    render() {
        return (
            <UserList users={this.state.users}/>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('react')
)
