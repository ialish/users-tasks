import axios from 'axios';

const getUsers = async () => {
	let users = await axios.get(`https://jsonplaceholder.typicode.com/users`);
	return users.data.map(({ id, name, email, address }) => (
		{ id, name, email,
			address: {
				street: address.street,
				city: address.city,
				zipcode: address.zipcode
			}
		}
	));
};

const getTodosById = async (userId) => {
	const todos = await axios.get(`https://jsonplaceholder.typicode.com/todos`);
	return todos.data.filter(todo => todo.userId === userId);
};

export default { getUsers, getTodosById };
