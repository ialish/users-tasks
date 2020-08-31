import React from 'react';
import User from './User';

const UsersList = ({ users }) => (
	<>
		{users.map(user => <User key={user.id} user={user} />)}
	</>
);

export default UsersList;
