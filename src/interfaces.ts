export interface User {
	name: string;
	url: string;
	role: string;
}

export interface Author {
	name: string;
	role: string;
	avatarUrl: string;
}

export interface Content {
	id: number;
	type: 'p' | 'a';
	content: string;
}

export interface Comment {
	id: number;
	user: User;
	content: string;
	publishedAt: Date;
}

export interface Post {
	id: number;
	author: {
		name: string;
		role: string;
		avatarUrl: string;
	};
	publishedAt: Date;
	content: Content[];
	comments: Comment[];
}
