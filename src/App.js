import React, { Component } from 'react';
import './App.css';
import utils from './utils';
import User from './components/User';

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
		const users = this.state.users
			.filter(({ name, email }) => (
				name.toLowerCase().includes(this.state.searchField.toLowerCase()) ||
				email.toLowerCase().includes(this.state.searchField.toLowerCase())
			))
			.map(user => <User key={user.id} user={user} />);
		
		return (
			<>
				<div className="head">
					<div className="search">
						<p>Search:</p>
						<input type="search" onChange={this.handleSearchChange}/>
					</div>
					<button onClick={this.getUsers}>Add</button><br/><br/>
				</div>
				{users}
			</>
		);
	}
}

export default App;
