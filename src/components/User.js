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
			showOtherData: false,
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
		const { street, city, zipcode } = this.state.otherData;

		const styles = {
			user: {
				borderColor: `${isAllTodosCompleted ? 'green' : 'red'}`
			},
			otherData: {
				display: `${showOtherData ? 'block' : 'none'}`
			}
		}

		return (
			<div className="user" style={styles.user}>
				ID: {id}<br/>
				<label htmlFor={`name-${this.state.id}`}>Name:</label>
				<input type="text" id={`name-${this.state.id}`} name="name" defaultValue={`${name}`}></input><br/>
				<label htmlFor={`email-${this.state.id}`}>Email:</label>
				<input type="text" id={`email-${this.state.id}`} name="email" defaultValue={`${email}`}></input><br/>

				<button
					onMouseOver={() => this.setState({ showOtherData: true })}
					onClick={() => this.setState({ showOtherData: false })}
				>
					Other Data
				</button><br/>

				<div className="otherData" style={styles.otherData}>
					<label htmlFor={`street-${this.state.id}`}>Street:</label>
					<input type="text" id={`street-${this.state.id}`} name="street" defaultValue={`${street}`}></input><br/>
					<label htmlFor={`city-${this.state.id}`}>City:</label>
					<input type="text" id={`city-${this.state.id}`} name="city" defaultValue={`${city}`}></input><br/>
					<label htmlFor={`zipcode-${this.state.id}`}>Zip Code:</label>
					<input type="text" id={`zipcode-${this.state.id}`} name="zipcode" defaultValue={`${zipcode}`}></input><br/>
				</div>
			</div>
		);
	}
}

export default User;
