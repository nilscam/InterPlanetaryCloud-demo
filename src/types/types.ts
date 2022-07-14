import { Encrypted } from 'eth-crypto';

export type IPCFile = {
	hash: string;
	key: Encrypted;
	name: string;
	created_at: number;
	path: string;
};

export type IPCFolder = {
	name: string;
	created_at: number;
	path: string;
};

export type IPCProgram = {
	hash: string;
	name: string;
	created_at: number;
};

export type IPCContact = {
	name: string;
	address: string;
	publicKey: string;
	files: IPCFile[];
	folders: IPCFolder[];
};

export type ResponseType = {
	success: boolean;
	message: string;
};

export type UploadResponse = ResponseType & {
	file?: IPCFile;
};

export type AggregateContentType = {
	programs: IPCProgram[];
	contacts: IPCContact[];
};

export type AggregateType = {
	InterPlanetaryCloud: AggregateContentType;
};
