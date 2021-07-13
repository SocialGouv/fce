import { IExecuteFunctions } from 'n8n-core';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import {Client, ClientOptions} from "minio";
import {downloadOldestFile} from "../../utils/minio";

export class MinioDownload implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Minio Download',
		name: 'minioDownload',
		group: ['transform'],
		version: 1,
		description: 'Download a file from minio',
		defaults: {
			name: 'Download',
			color: '#772244',
		},
    credentials: [{
		  name: "minio",
      required: true
    }],
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			// Node properties which the user gets displayed and
			// can change on the node.
			{
				displayName: 'Download Regex',
				name: 'downloadRegex',
				type: 'string',
				default: '',
				placeholder: 'Download Regex',
				description: 'A regex that will match the file name',
        required: true
			},
      {
        displayName: 'Bucket Name',
        name: 'bucket',
        type: 'string',
        default: '',
        placeholder: 'Bucket',
        description: 'The fetched bucket',
        required: true
      },
      {
        displayName: 'Output file name',
        name: 'outputName',
        type: 'string',
        default: '',
        placeholder: 'Output name',
        description: 'The name of the output file',
        required: true
      }
		]
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
	  const minioCredentials = this.getCredentials("minio") as unknown as ClientOptions;

	  const sanitizedCredentials = {
	    ...minioCredentials,
      port: Number(minioCredentials.port),
      useSSL: Boolean(minioCredentials.useSSL)
    };

		const downloadRegex = this.getNodeParameter('downloadRegex', 0) as string;
		const bucket = this.getNodeParameter('bucket', 0) as string;
		const outputName = this.getNodeParameter('outputName', 0) as string;

		const client = new Client(sanitizedCredentials);

		const fileOutput = await downloadOldestFile(client, bucket, new RegExp(downloadRegex), outputName);

		return [
		  this.helpers.returnJsonArray({
        fileName: fileOutput
      })
    ];
	}
}
