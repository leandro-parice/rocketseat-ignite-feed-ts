import styles from './Comment.module.css';
import { ThumbsUp, TrashSimple } from '@phosphor-icons/react';
import { User } from '../interfaces';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface CommentProps {
	commentId: number;
	content: string;
	user: User;
	publishedAt: Date;
	onRemoveComment: (postId: number, commentId: number) => void;
	postId: number;
}

export function Comment({
	commentId,
	content,
	user,
	publishedAt,
	onRemoveComment,
	postId,
}: CommentProps) {
	const publishedDateFormatted = format(
		publishedAt,
		"d 'de' LLLL 'às' HH:mm'h'",
		{
			locale: ptBR,
		}
	);

	const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
		locale: ptBR,
		addSuffix: true,
	});

	return (
		<div className={styles.comment}>
			<img src={`https://github.com/${user.url}.png`} />
			<div className={styles.commentBody}>
				<div className={styles.commentBodyMessage}>
					<header>
						<div>
							<strong>{user.name}</strong>
							<time
								dateTime={publishedAt.toString()}
								title={publishedDateFormatted}
							>
								{publishedDateRelativeToNow}
							</time>
						</div>
						<button onClick={() => onRemoveComment(postId, commentId)}>
							<TrashSimple />
						</button>
					</header>
					<div>
						<p>{content}</p>
					</div>
				</div>
				<footer>
					<button>
						<ThumbsUp />
					</button>
					<p>
						Aplaudir<span>0</span>
					</p>
				</footer>
			</div>
		</div>
	);
}
