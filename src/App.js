import React, { Component } from 'react';
import './App.css';
import utils from './utils';
import User from './components/User';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: []
		};
	}

	async componentDidMount() {
		const users = await utils.getUsers();
		this.setState({ users });
	}

	render() {
		const users = this.state.users.map(user => 
			<User key={user.id} user={user} />);
		return (
			<>
				<div className="search">
					Search
					<input type="text"/>
					<button onClick={this.getUsers}>Add</button><br/><br/>
				</div>
				{users}
			</>
		);
	}
}

export default App;
