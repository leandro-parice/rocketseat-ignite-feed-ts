import styles from './Content.module.css';
import { Feed } from './Feed';
import { Sidebar } from './Sidebar';

export function Content() {
	return (
		<div className={styles.content}>
			<Sidebar />
			<Feed />
		</div>
	);
}
