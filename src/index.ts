import type { LogType } from './types';
import { generateLogger } from './utils';

export interface Options {
	publicKey: string;
	secretKey: string;
}

console.log('hej');

type LogFunction = (args: { url?: string; message?: string }) => void;

export default function Meitrics(options: Options): Record<LogType, LogFunction> {
	const logger = generateLogger(options);

	const res: Record<LogType, LogFunction> = {
		warning: (args) => {
			logger({ ...args, type: 'warning' });
		},
		error: (args) => {
			logger({ ...args, type: 'error' });
		},
		info: (args) => {
			logger({ ...args, type: 'info' });
		},
		other: (args) => {
			logger({ ...args, type: 'other' });
		}
	};

	return res;
}

// const log = Meitrics({
// 	publicKey: '63d6f8c03f9f23eafe682e5e',
// 	secretKey: '45b616725242532cd7f9f0b1499296'
// });
