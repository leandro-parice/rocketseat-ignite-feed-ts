import { Post } from './Post';

import styles from './Feed.module.css';

interface Post {
	id: number;
	author: {
		name: string;
		role: string;
		avatarUrl: string;
	};
	publishedAt: Date;
	content: Array<{
		id: number;
		type: 'p' | 'a';
		content: string;
	}>;
}

const posts: Post[] = [
	{
		id: 2,
		author: {
			name: 'Zeno Rocha',
			role: 'Developer',
			avatarUrl: 'https://github.com/zenorocha.png',
		},
		publishedAt: new Date('2024-08-09 01:23:45'),
		content: [
			{
				id: 4,
				type: 'p',
				content:
					'Fala galeraa 👋 Acabei de subir mais um projeto no meu portifa.',
			},
			{
				id: 5,
				type: 'p',
				content: 'É um projeto que fiz no NLW Return, evento da Rocketseat.',
			},
			{ id: 6, type: 'p', content: 'O nome do projeto é DoctorCare 🚀 ' },
		],
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
				content:
					'Fala galeraa 👋 Acabei de subir mais um projeto no meu portifa.',
			},
			{
				id: 2,
				type: 'p',
				content: 'É um projeto que fiz no NLW Return, evento da Rocketseat.',
			},
			{ id: 3, type: 'a', content: 'O nome do projeto é DoctorCare 🚀 ' },
		],
	},
];

export function Feed() {
	return (
		<div className={styles.feed}>
			{posts.map((post) => {
				return (
					<Post
						key={post.id}
						author={post.author}
						content={post.content}
						publishedAt={post.publishedAt}
					/>
				);
			})}
		</div>
	);
}
