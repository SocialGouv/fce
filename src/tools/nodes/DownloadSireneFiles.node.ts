import { IExecuteFunctions } from 'n8n-core';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { exec } from 'child_process';


export interface IExecReturnData {
	exitCode: number;
	error?: Error;
	stderr: string;
	stdout: string;
}

/**
 * Promisifiy exec manually to also get the exit code
 *
 * @param {string} command
 * @returns {Promise<IExecReturnData>}
 */
function execPromise(command: string): Promise<IExecReturnData> {
	const returnData: IExecReturnData = {
		exitCode: 0,
		stderr: '',
		stdout: '',
	};

	return new Promise((resolve, reject) => {
		exec(command, { cwd: process.cwd() }, (error, stdout, stderr) => {
			returnData.stdout = stdout.trim();
			returnData.stderr = stderr.trim();

			if (error) {
				returnData.error = error;
			}

			resolve(returnData);
		}).on('exit', code => { returnData.exitCode = code || 0; });
	});
}

export class DownloadSireneFiles implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Download Sirene Files',
		name: 'downloadSireneFiles',
		group: ['transform'],
		version: 1,
		description: 'Download sirene file for fce import',
		defaults: {
			name: 'Download Sirene Files',
			color: '#772244',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			{
				displayName: 'Host',
				name: 'host',
				type: 'string',
				default: '',
				placeholder: '53.x.x.x',
				description: 'Remote server ip',
			},
			{
				displayName: 'User name',
				name: 'uname',
				type: 'string',
				default: '',
				placeholder: 'factory',
				description: 'Remote server user',
			}
		]
	};


	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const host = this.getNodeParameter('host', 0, '')
		const uname = this.getNodeParameter('uname', 0, '')

		const distBaseCommand = `ssh -T ${uname}@${host}`
		const nodeEnv = `NODE_ENV=production`
		const dcExecServer = `exec server ash -c`

		const returnItems: INodeExecutionData[] = [];

		const {
			exitCode,
			stdout,
			stderr,
		} = await execPromise(`${distBaseCommand} 'bash -s' <<'CMD'
docker ${dcExecServer} "${nodeEnv} node ./shell/run.js DownloadSirene"
CMD`)

		returnItems.push({
			json: {
				exitCode,
				stderr,
				stdout,
			},
		})

		return this.prepareOutputData(returnItems);
	}
}
