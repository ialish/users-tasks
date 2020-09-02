import React from 'react';
import User from './User';

const UsersList = ({ users, ...otherProps }) => (
	<>
		{users.map(user => 
			<User key={user.id} user={user} {...otherProps} />
		)}
	</>
);

export default UsersList;
