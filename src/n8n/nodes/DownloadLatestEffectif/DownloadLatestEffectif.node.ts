import { IExecuteFunctions } from 'n8n-core';
import {
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import {downloadOldestFile, getFiles} from "../../utils/minio";
import { createMinioClient } from "../../clients/minio";
import {compareAsc, parse} from "date-fns";

export class DownloadLatestEffectif implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Download latest effectif',
		name: 'minioDownloadLatestEffectif',
		group: ['transform'],
		version: 1,
		description: 'Download latest effectif from minio',
		defaults: {
			name: 'Download latest effectif',
			color: '#772244',
		},
    credentials: [{
		  name: "minio",
      required: true
    }],
		inputs: ['main'],
		outputs: ['main'],
		properties: []
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const client = await createMinioClient(this);

		const bucket = "dares";
		const outputName = "ts_effectifs.csv";
		const regex = /^TRANS-SISSMO-effectifs_([0-9]*).csv$/i

		const bucketFiles = await getFiles(client, bucket, regex);

		const getTextDate = (name: string) => {
      const dateMatch = regex.exec(name);
      return  dateMatch && dateMatch.length >= 1 ? dateMatch[1] : "011970";
    }

		const getDate = (name: string) =>
		  parse(getTextDate(name), "MMyyyy", new Date())

		const oldestFile = bucketFiles.map(item => item.name)
      .reduce((biggest, name) => compareAsc(getDate(name), getDate(biggest)) !== -1 ? name : biggest);

		const downloadRegex = new RegExp(`^TRANS-SISSMO-effectifs_${getTextDate(oldestFile)}.csv$`, "i");

		const { outputFile, remoteFile } = await downloadOldestFile(client, bucket, new RegExp(downloadRegex), outputName);

		return [
		  this.helpers.returnJsonArray({
        fileName: outputFile,
        remoteFile
      })
    ];
	}
}
