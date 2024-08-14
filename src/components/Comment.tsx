import styles from './Comment.module.css';
import avatar from '../assets/avatar.jpg';
import { ThumbsUp, TrashSimple } from '@phosphor-icons/react';
import { useState } from 'react';

interface CommentProps {
	commentId: number;
	content: string;
	onDeleteComment: (comment: number) => void;
}

export function Comment({ commentId, content, onDeleteComment }: CommentProps) {
	const [likeCount, setLikeCount] = useState(0);

	function handleDeleteComment() {
		onDeleteComment(commentId);
	}

	function handleLikeComment() {
		setLikeCount((state) => {
			return state + 1;
		});
	}

	return (
		<div className={styles.comment}>
			<img src={avatar} />
			<div className={styles.commentBody}>
				<div className={styles.commentBodyMessage}>
					<header>
						<div>
							<strong>Devon Lane (você)</strong>
							<time dateTime="2024-08-07 00:00:00" title="2024-08-07 00:00:00">
								Cerca de 2h
							</time>
						</div>
						<button onClick={handleDeleteComment}>
							<TrashSimple />
						</button>
					</header>
					<div>
						<p>{content}</p>
					</div>
				</div>
				<footer>
					<button onClick={handleLikeComment}>
						<ThumbsUp />
					</button>
					<p>
						Aplaudir<span>{likeCount}</span>
					</p>
				</footer>
			</div>
		</div>
	);
}
