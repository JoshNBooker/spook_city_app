export interface Ghost {
	name: string;
	fileName: string;
	description: string;
	dateOfDeath: Date;
	dialogue: string;
	users: User[];
	id: number;
	discovered: boolean;
	hiddenDescription: string;
	location: Location;
}

export interface User {
	userName: string;
	fileName: string;
	rank: string;
	points: number;
	id: number;
}

export interface Location {
	name: string;
	fileName: string;
	description: string;
	coordinateX: number;
	coordinateY: number;
	id: number;
	ghost: Ghost;
}

export interface Ghosts {
	ghosts: Ghost[];
}

export interface Users {
	users: User[];
}

export interface Locations {
	locations: Location[];
}
