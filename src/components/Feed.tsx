import styles from './Feed.module.css';

import { Post } from './Post';
import { Post as PostInteface, User } from '../interfaces';

interface PropsFeed {
	posts: PostInteface[];
	onAddComment: (postId: number, content: string) => void;
	onRemoveComment: (postId: number, commentId: number) => void;
	currentUser: User;
}

export function Feed({
	posts,
	onAddComment,
	onRemoveComment,
	currentUser,
}: PropsFeed) {
	return (
		<div className={styles.feed}>
			{posts.map((post) => {
				return (
					<Post
						key={post.id}
						postId={post.id}
						author={post.author}
						content={post.content}
						publishedAt={post.publishedAt}
						comments={post.comments}
						onAddComment={onAddComment}
						onRemoveComment={onRemoveComment}
						currentUser={currentUser}
					/>
				);
			})}
		</div>
	);
}
