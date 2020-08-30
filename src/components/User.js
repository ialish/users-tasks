import React, { Component } from 'react';
import './User.css';
import utils from '../utils';

class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: this.props.user.id,
			name: this.props.user.name,
			email: this.props.user.email,
			otherData: this.props.user.address,
			todos: [],
			isAllTodosCompleted: false
		};
	}

	async componentDidMount() {
		const todos = await utils.getTodosById(this.state.id);
		this.setState({ todos });

		const isAllTodosCompleted = !todos.find(({completed}) => !completed);
		this.setState({ isAllTodosCompleted });
	}

	render() {
		const { id, name, email, showOtherData, isAllTodosCompleted } = this.state;

		const styles = {
			user: {
				borderColor: `${isAllTodosCompleted ? 'green' : 'red'}`
			}
		}

		return (
			<div className="user" style={styles.user}>
				ID: {id}<br/>
				<label htmlFor={`name-${this.state.id}`}>Name:</label>
				<input type="text" id={`name-${this.state.id}`} name="name" defaultValue={`${name}`}></input><br/>
				<label htmlFor={`email-${this.state.id}`}>Email:</label>
				<input type="text" id={`email-${this.state.id}`} name="email" defaultValue={`${email}`}></input><br/>
			</div>
		);
	}
}

export default User;
