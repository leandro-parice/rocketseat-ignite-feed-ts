import styles from './Sidebar.module.css';

import { PencilSimpleLine } from '@phosphor-icons/react';

import profileBackground from '../assets/profile-background.jpg';
import { SidebarModal } from './SidebarModal';
import { useEffect, useState } from 'react';

interface User {
	name: string;
	url: string;
	role: string;
}
const defaultUsers: User[] = [
	{ name: 'Leandro Parice', url: 'leandro-parice', role: 'Developer' },
	{ name: 'Heloisa Fernanda', url: 'helolah', role: 'Developer' },
	{ name: 'Rafael Vieira', url: '1stvieira', role: 'Developer' },
];

export function Sidebar() {
	const [showModal, setShowModal] = useState(false);

	const [users, setUsers] = useState<User[]>([]);

	const [currentUser, setCurrentUser] = useState<User>(defaultUsers[0]);

	useEffect(() => {
		const getStoredUsers = () => {
			const storedUsers = localStorage.getItem('users');
			if (storedUsers) {
				try {
					const parsedUsers = JSON.parse(storedUsers);
					if (
						Array.isArray(parsedUsers) &&
						parsedUsers.every(
							(user) =>
								typeof user.name === 'string' &&
								typeof user.url === 'string' &&
								typeof user.role === 'string'
						)
					) {
						return parsedUsers;
					}
				} catch (error) {
					console.error('Erro ao parsear dados do localStorage:', error);
				}
			}
			return defaultUsers;
		};

		const getStoredCurrentUser = () => {
			const storedCurrentUser = localStorage.getItem('currentUser');
			if (storedCurrentUser) {
				try {
					const parsedUser = JSON.parse(storedCurrentUser);
					if (
						typeof parsedUser.name === 'string' &&
						typeof parsedUser.url === 'string' &&
						typeof parsedUser.role === 'string'
					) {
						return parsedUser;
					}
				} catch (error) {
					console.error('Erro ao parsear currentUser do localStorage:', error);
				}
			}
			return defaultUsers[0]; // Default user se não encontrar ou houver erro
		};

		const storedUsers = getStoredUsers();
		setUsers(storedUsers);

		const storedCurrentUser = getStoredCurrentUser();
		setCurrentUser(storedCurrentUser);
	}, []);

	useEffect(() => {
		localStorage.setItem('users', JSON.stringify(users));
	}, [users]);

	useEffect(() => {
		localStorage.setItem('currentUser', JSON.stringify(currentUser));
	}, [currentUser]);

	function handleCurrentUserChange(user: User) {
		setCurrentUser(user);
	}

	function addUser(newUser: User) {
		setUsers([...users, newUser]);
	}

	function toggleModal() {
		setShowModal((prevShowModal) => !prevShowModal);
	}

	return (
		<aside className={styles.sidebar}>
			<img src={profileBackground} />

			<div className={styles.profile}>
				<img src={`https://github.com/${currentUser.url}.png`} />
				<strong>{currentUser.name}</strong>
				<span>{currentUser.role}</span>
			</div>
			<footer>
				<a href="#" onClick={toggleModal}>
					<PencilSimpleLine size={20} />
					Editar seu perfil
				</a>
			</footer>
			<SidebarModal
				showModal={showModal}
				onCloseModal={toggleModal}
				users={users}
				currentUser={currentUser}
				onCurrentUserChange={handleCurrentUserChange}
				onAddUser={addUser}
			/>
		</aside>
	);
}
