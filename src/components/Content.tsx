import { useState, useEffect } from 'react';
import styles from './Content.module.css';
import { Feed } from './Feed';
import { Sidebar } from './Sidebar';
import { User, Post } from '../interfaces';

const defaultUsers: User[] = [
	{ name: 'Leandro Parice', url: 'leandro-parice', role: 'Developer' },
	{ name: 'Heloisa Fernanda', url: 'helolah', role: 'Developer' },
	{ name: 'Rafael Vieira', url: '1stvieira', role: 'Developer' },
];

const defaultPosts: Post[] = [
	{
		id: 2,
		author: {
			name: 'Leandro Parice',
			role: 'Front-End Developer',
			avatarUrl: 'https://github.com/leandro-parice.png',
		},
		publishedAt: new Date('2024-08-09 01:23:45'),
		content: [
			{
				id: 4,
				type: 'p',
				content: 'Fala galeraa 👋, tudo bem?',
			},
			{
				id: 5,
				type: 'p',
				content:
					'Aproveitei o projeto que desenvolvemos no curso de React da Rocketseat e adicionei algumas funcionalidades.',
			},
			{
				id: 6,
				type: 'p',
				content:
					'Nesse projeto, utilizei o localStorage para salvar os dados, e o botão "Editar perfil" para trocar de usuário ao fazer comentários.',
			},
		],
		comments: [],
	},
	{
		id: 1,
		author: {
			name: 'Leandro Parice',
			role: 'Developer',
			avatarUrl: 'https://github.com/leandro-parice.png',
		},
		publishedAt: new Date('2024-08-09 00:00:00'),
		content: [
			{
				id: 1,
				type: 'p',
				content: 'E ai pessoal, tudo bem?',
			},
			{
				id: 2,
				type: 'p',
				content:
					'Sou desenvolvedor Fullstack e atualmente estou estudando ReactJS.',
			},
			{ id: 3, type: 'a', content: 'O nome do projeto é DoctorCare 🚀 ' },
		],
		comments: [],
	},
];

export function Content() {
	const [users, setUsers] = useState<User[]>([]);
	const [currentUser, setCurrentUser] = useState<User>(defaultUsers[0]);
	const [posts, setPosts] = useState<Post[]>([]);

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
			return defaultUsers[0];
		};

		const getStoredPosts = () => {
			const storedPosts = localStorage.getItem('posts');
			if (storedPosts) {
				try {
					const parsedPosts = JSON.parse(storedPosts);
					if (
						Array.isArray(parsedPosts) &&
						parsedPosts.every(
							(post) =>
								typeof post.id === 'number' &&
								typeof post.publishedAt === 'string' &&
								typeof post.author === 'object' &&
								Array.isArray(post.content) &&
								Array.isArray(post.comments)
						)
					) {
						return parsedPosts.map((post) => ({
							...post,
							publishedAt: new Date(post.publishedAt),
						}));
					}
				} catch (error) {
					console.error('Erro ao parsear posts do localStorage:', error);
				}
			}
			return defaultPosts;
		};

		const storedUsers = getStoredUsers();
		setUsers(storedUsers);

		const storedCurrentUser = getStoredCurrentUser();
		setCurrentUser(storedCurrentUser);

		const storedPosts = getStoredPosts();
		setPosts(storedPosts);
	}, []);

	useEffect(() => {
		localStorage.setItem('users', JSON.stringify(users));
	}, [users]);

	useEffect(() => {
		localStorage.setItem('currentUser', JSON.stringify(currentUser));
	}, [currentUser]);

	useEffect(() => {
		localStorage.setItem('posts', JSON.stringify(posts));
	}, [posts]);

	function handleCurrentUserChange(user: User) {
		setCurrentUser(user);
	}

	function addUser(newUser: User) {
		setUsers([...users, newUser]);
	}

	return (
		<div className={styles.content}>
			<Sidebar
				users={users}
				currentUser={currentUser}
				onChangeCurrentUser={handleCurrentUserChange}
				onAddUser={addUser}
			/>
			<Feed posts={posts} currentUser={currentUser} />
		</div>
	);
}
