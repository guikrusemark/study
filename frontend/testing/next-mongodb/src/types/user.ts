// types/user.ts
export interface User {
	_id?: string;
	email: string;
	name: string;
	password: string; // hashed
	createdAt?: Date;
}
