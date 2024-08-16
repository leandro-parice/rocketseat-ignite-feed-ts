import { ChangeEvent, FormEvent, useState, MouseEvent } from 'react';
import styles from './SidebarModal.module.css';
import { X } from '@phosphor-icons/react';
import { User } from '../interfaces';

interface SidebarModalProps {
	showModal: boolean;
	onCloseModal: () => void;
	users: User[];
	currentUser: User;
	onAddUser: (user: User) => void;
	onCurrentUserChange: (user: User) => void;
}

export function SidebarModal({
	showModal,
	onCloseModal,
	users,
	currentUser,
	onAddUser,
	onCurrentUserChange,
}: SidebarModalProps) {
	const [newUserName, setNewUserName] = useState('');
	const [newUserUrl, setNewUserUrl] = useState('');
	const [newUserRole, setNewUserRole] = useState('');

	const isAllFieldsFilled =
		newUserName.length !== 0 &&
		newUserUrl.length !== 0 &&
		newUserRole.length !== 0;

	function handleAddUser(event: FormEvent) {
		event.preventDefault();

		const newUser: User = {
			name: newUserName,
			url: newUserUrl,
			role: newUserRole,
		};

		onAddUser(newUser);

		setNewUserName('');
		setNewUserUrl('');
		setNewUserRole('');
	}

	function handleChangeName(event: ChangeEvent<HTMLInputElement>) {
		setNewUserName(event.target.value);
	}

	function handleChangeUrl(event: ChangeEvent<HTMLInputElement>) {
		setNewUserUrl(event.target.value);
	}

	function handleChangeRole(event: ChangeEvent<HTMLInputElement>) {
		setNewUserRole(event.target.value);
	}

	function handleParentClick(event: MouseEvent) {
		if (event.currentTarget === event.target) {
			onCloseModal();
		}
	}

	return (
		<div
			className={`${styles.sidebarModal} ${showModal ? styles.active : ''}`}
			onClick={handleParentClick}
		>
			<div className={styles.sidebarModalContent}>
				<header>
					<button onClick={onCloseModal}>
						<X />
					</button>
				</header>
				<form onSubmit={handleAddUser}>
					<input
						type="text"
						placeholder="Name"
						value={newUserName}
						onChange={handleChangeName}
					/>
					<input
						type="text"
						placeholder="Url"
						value={newUserUrl}
						onChange={handleChangeUrl}
					/>
					<input
						type="text"
						placeholder="Role"
						value={newUserRole}
						onChange={handleChangeRole}
					/>
					<button type="submit" disabled={!isAllFieldsFilled}>
						Salvar
					</button>
				</form>
				<ul>
					{users.map((user) => (
						<li
							key={user.url}
							className={user.url === currentUser.url ? styles.active : ''}
							onClick={() => onCurrentUserChange(user)}
						>
							{user.name}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
