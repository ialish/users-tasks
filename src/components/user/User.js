import React, { Component } from 'react';
import './User.css';
import utils from '../../utils';

class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user,
			showOtherData: false,
			todos: [],
			isAllTodosCompleted: false,
			button: '',
			highlightId: false
		};
	}

	async componentDidMount() {
		const todos = await utils.getTodosById(this.state.user.id);
		this.setState({ todos });

		const isAllTodosCompleted = !todos.find(({completed}) => !completed);
		this.setState({ isAllTodosCompleted });
	}

	handleChange = (event) => {
		const { name, value } = event.target;
		this.setState({ user: { ...this.state.user, [name]: value } });
	}

	handleSubmit = (event) => {
		event.preventDefault();

		let user = {};
		if (this.state.button === 'update') {
			user = { ...this.state.user };
		} else if (this.state.button === 'delete') {
			user = { 
				id: this.state.user.id, 
				name: '', 
				email: '', 
				street: '', 
				city: '', 
				zipcode: ''
			};
			this.setState({ user });
		}
		this.props.onUserChange(user);
  }

	render() {
		const { id, name, email, street, city, zipcode } = this.state.user;
		const { showOtherData, isAllTodosCompleted, highlightId } = this.state;

		const styles = {
			userMain: {
				borderColor: `${isAllTodosCompleted ? 'green' : 'red'}`,
				backgroundColor: `${highlightId ? 'orange' : 'initial'}`
			},
			userDetails: {
				display: `${highlightId ? 'block' : 'none'}`
			},
			otherData: {
				display: `${showOtherData ? 'block' : 'none'}`
			}
		}

		return (
			<div className="User">
				<div className="user-main" style={styles.userMain}>
					<label onClick={() => this.setState({ highlightId: !this.state.highlightId })}>
						ID: {id}
					</label><br/>
					<form onSubmit={this.handleSubmit}>
						<label htmlFor={`name-${id}`}>Name:</label>
						<input id={`name-${id}`} name="name" value={name}
							onChange={this.handleChange} /><br/>
						<label htmlFor={`email-${id}`}>Email:</label>
						<input id={`email-${id}`} name="email" value={email}
							onChange={this.handleChange} /><br/>
		
						<button
							className="other-data-button"
							type="button"
							onMouseOver={() => this.setState({ showOtherData: true })}
							onClick={() => this.setState({ showOtherData: false })}
						>
							Other Data
						</button><br/>
		
						<div className="other-data" style={styles.otherData}>
							<label htmlFor={`street-${id}`}>Street:</label>
							<input id={`street-${id}`} name="street" value={street}
								onChange={this.handleChange} /><br/>
							<label htmlFor={`city-${id}`}>City:</label>
							<input id={`city-${id}`} name="city" value={city}
								onChange={this.handleChange} /><br/>
							<label htmlFor={`zipcode-${id}`}>Zip Code:</label>
							<input id={`zipcode-${id}`} name="zipcode" value={zipcode}
								onChange={this.handleChange} /><br/>
						</div>
		
						<div className="update-delete-buttons">
							<input className="update-button" type="submit" value="Update"
								onClick={() => this.setState({ button: 'update' })} />
							<input className="delete-button" type="submit" value="Delete"
								onClick={() => this.setState({ button: 'delete' })} />
						</div>
					</form>
				</div>

				<div className="user-details" style={styles.userDetails}>
					<div className="todos">
						<div className="head">
							Todos - User {id}
							<button className="add-button">Add</button><br/><br/>
						</div>
						<div className="block">

						</div>
					</div>

					<div className="posts">
						<div className="head">
							Posts - User {id}
							<button className="add-button">Add</button><br/><br/>
						</div>
						<div className="block">

						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default User;
