import styles from './Post.module.css';
import { Comment } from './Comment';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { Author, Comment as CommentInterface, Content } from '../interfaces';

interface PostProps {
	postId: number;
	author: Author;
	content: Content[];
	publishedAt: Date;
	comments: CommentInterface[];
	onAddComment: (postId: number, content: string) => void;
	onRemoveComment: (postId: number, commentId: number) => void;
}

export function Post({
	postId,
	author,
	content,
	publishedAt,
	comments,
	onAddComment,
	onRemoveComment,
}: PostProps) {
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
		onAddComment(postId, newCommentText);
		setNewCommentText('');
	}

	function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
		event.target.setCustomValidity('');
		setNewCommentText(event.target.value);
	}

	function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
		event.target.setCustomValidity('Esse campo é obrigatório!');
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
							publishedAt={comment.publishedAt}
							user={comment.user}
							onRemoveComment={onRemoveComment}
							postId={postId}
						/>
					);
				})}
			</div>
		</div>
	);
}
