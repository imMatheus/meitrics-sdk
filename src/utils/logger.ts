import fetch from 'node-fetch';
import chalk from 'chalk';
import type { LogType } from '../types';
import type { Options } from '../index';

const baseURL = 'http://localhost:3000';

interface SendLogBody {
	message?: string;
	type: LogType;
	url?: string;
}

export function generateLogger(options: Pick<Options, 'publicKey' | 'secretKey'>) {
	return async function sendLog(body: SendLogBody) {
		await fetch(baseURL + '/log', {
			headers: {
				'Secret-Key': options.secretKey,
				'Public-Key': options.publicKey,
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify(body)
		});

		switch (body.type) {
			case 'error':
				console.log(chalk.bgRed('Error'), body.message);
				break;
			case 'info':
				console.log(chalk.bgBlue('Info'), body.message);
				break;
			case 'warning':
				console.log(chalk.bgYellow('Warning'), body.message);
				break;
			default:
				console.log(chalk.bgGray('Other'), body.message);
				break;
		}
	};
}
