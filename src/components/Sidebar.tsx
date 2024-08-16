import styles from './Sidebar.module.css';
import profileBackground from '../assets/profile-background.jpg';

import { PencilSimpleLine } from '@phosphor-icons/react';
import { SidebarModal } from './SidebarModal';
import { useState } from 'react';
import { User } from '../interfaces';

interface SidebarProps {
	users: User[];
	currentUser: User;
	onChangeCurrentUser: (user: User) => void;
	onAddUser: (user: User) => void;
}

export function Sidebar({
	users,
	currentUser,
	onChangeCurrentUser,
	onAddUser,
}: SidebarProps) {
	const [showModal, setShowModal] = useState(false);

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
				onCurrentUserChange={onChangeCurrentUser}
				onAddUser={onAddUser}
			/>
		</aside>
	);
}
