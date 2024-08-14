import styles from './Post.module.css';
import { Comment } from './Comment';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';

interface Author {
	name: string;
	role: string;
	avatarUrl: string;
}

interface Content {
	id: number;
	type: 'p' | 'a';
	content: string;
}

interface Comment {
	id: number;
	content: string;
	author: Author;
}

interface PostProps {
	author: Author;
	content: Content[];
	publishedAt: Date;
}

export function Post({ author, content, publishedAt }: PostProps) {
	const [comments, setComments] = useState<Comment[]>([]);

	const [newCommentText, setNewCommentText] = useState('');

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

	const isNewCommentEmpty = newCommentText.length === 0;

	function handleCreateNewComment(event: FormEvent) {
		event.preventDefault();
		const newComment = { id: Date.now(), content: newCommentText };
		setComments([...comments, newComment]);
		setNewCommentText('');
	}

	function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
		event.target.setCustomValidity('');
		setNewCommentText(event.target.value);
	}

	function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
		event.target.setCustomValidity('Esse campo é obrigatório!');
	}

	function deleteComment(commentIdToDelete: number) {
		const commentsWithoutDeletedOne = comments.filter((comment) => {
			return comment.id !== commentIdToDelete;
		});

		setComments(commentsWithoutDeletedOne);
	}

	return (
		<div className={styles.post}>
			<header>
				<div className={styles.profile}>
					<img src={author.avatarUrl} />
					<div className={styles.name}>
						<strong>{author.name}</strong>
						<span>{author.role}</span>
					</div>
				</div>
				<time
					dateTime={publishedAt.toISOString()}
					title={publishedDateFormatted}
				>
					{publishedDateRelativeToNow}
				</time>
			</header>
			<div className={styles.content}>
				{content.map((value) => {
					if (value.type === 'p') {
						return <p key={value.id}>{value.content}</p>;
					} else if (value.type === 'a') {
						return (
							<p key={value.id}>
								<a href="#">{value.content}</a>
							</p>
						);
					}
				})}
			</div>
			<footer>
				<form onSubmit={handleCreateNewComment}>
					<label>Deixe seu feedback</label>
					<textarea
						placeholder="Escreva um comentário..."
						value={newCommentText}
						onChange={handleNewCommentChange}
						onInvalid={handleNewCommentInvalid}
						required
					/>
					<div className={styles.footer}>
						<button type="submit" disabled={isNewCommentEmpty}>
							Publicar
						</button>
					</div>
				</form>
			</footer>
			<div className="comments">
				{comments.map((comment) => {
					return (
						<Comment
							key={comment.id}
							commentId={comment.id}
							content={comment.content}
							onDeleteComment={deleteComment}
						/>
					);
				})}
			</div>
		</div>
	);
}
