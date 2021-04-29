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


export class ImportSirene implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Import Sirene',
		name: 'importSirene',
		group: ['transform'],
		version: 1,
		description: 'Process sirene import on production database to update enterprises data',
		defaults: {
			name: 'Import Sirene',
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
		const enterprisesFileName = `StockUniteLegale_utf8.zip`
		const establishmentsFileName = `StockEtablissement_utf8.zip`
		const successionFileName = `StockEtablissementLiensSuccession_utf8.zip`

		const returnItems: INodeExecutionData[] = [];

		const {
			exitCode,
			stdout,
			stderr,
		} = await execPromise(`${distBaseCommand} 'bash -s' <<'CMD'
docker ${dcExecServer} "${nodeEnv} node ./shell/run.js ImportSirene --enterprises_filename ${enterprisesFileName} --establishments_filename ${establishmentsFileName} --establishments_successions_filename ${successionFileName}"
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
