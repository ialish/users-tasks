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

	handleSearchChange = (e) => {
		this.setState({ searchField: e.target.value });
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
					<button onClick={this.getUsers}>Add</button><br/><br/>
				</div>
				<UsersList users={filteredUsers} />
			</>
		);
	}
}

export default App;
