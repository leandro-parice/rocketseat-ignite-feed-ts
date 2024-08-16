import styles from './Feed.module.css';

import { Post } from './Post';
import { User, Post as PostInteface } from '../interfaces';

interface PropsFeed {
	currentUser: User;
	posts: PostInteface[];
}

export function Feed({ currentUser, posts }: PropsFeed) {
	return (
		<div className={styles.feed}>
			{posts.map((post) => {
				return (
					<Post
						key={post.id}
						author={post.author}
						content={post.content}
						publishedAt={post.publishedAt}
						currentUser={currentUser}
					/>
				);
			})}
		</div>
	);
}
