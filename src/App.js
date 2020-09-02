import React, { Component } from 'react';
import './App.css';
import utils from './utils';
import Search from './components/Search';
import UsersList from './components/UsersList';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			searchField: ''
		};
	}

	async componentDidMount() {
		const users = await utils.getUsers();
		this.setState({ users });
	}

	handleSearchChange = (event) => {
		this.setState({ searchField: event.target.value });
	}

	handleUserChange = (userObj) => {
		let users = [ ...this.state.users ];
		const userIndex = users.findIndex(user => user.id === userObj.id);
		
		users[userIndex] = userObj;
		this.setState({ users });
	}

	render() {
		const filteredUsers = this.state.users.filter(({ name, email }) => 
			name.toLowerCase().includes(this.state.searchField.toLowerCase()) || 
			email.toLowerCase().includes(this.state.searchField.toLowerCase())
		);

		return (
			<>
				<div className="head">
					<Search handleSearchChange={this.handleSearchChange} />
					<button className="add-button">Add</button><br/><br/>
				</div>
				<UsersList users={filteredUsers} onUserChange={this.handleUserChange} />
			</>
		);
	}
}

export default App;
