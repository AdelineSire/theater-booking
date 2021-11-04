import { useState, useEffect } from 'react';

import LaunchIcon from '@material-ui/icons/Launch';

import UserForm from '../shows/UserForm';

import { getUsers } from '../../services/api';

import './Users.scss';

const Users = () => {
	const [users, setUsers] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getUsers().then((response) => {
			setUsers(response);
			setIsLoading(false);
		});
	}, [isLoading]);

	const translateRole = (expr) => {
		switch (expr) {
			case 'spectator':
				return 'Spectateur';
			case 'seller ':
				return 'Vendeur';
			case 'host':
				return 'Hôte';
			case 'admin':
				return 'Admin';
			default:
				return null;
		}
	};

	return (
		<div className='users'>
			<div className='section section1'>
				<h3>Ajouter un utilisateur</h3>
				<UserForm />
				<div>
					{users.length === 0 ? (
						<p>Aucun utilisateur</p>
					) : (
						<>
							<div className='users-list'>
								<table>
									<thead>
										<tr>
											<th>Nom</th>
											<th>Prémon</th>
											<th>Email</th>
											<th>Téléphone</th>
											<th>Addresse</th>
											<th>Rôle</th>
										</tr>
									</thead>
									<tbody>
										{users.map((user) => (
											<tr key={user._id}>
												<td>{user.lastname}</td>
												<td>{user.firstname}</td>
												<td>{user.email}</td>
												<td>{user.tel}</td>
												<td>{user.address}</td>
												<td>{translateRole(user.role.name)}</td>
												<td>
													<LaunchIcon />
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default Users;
