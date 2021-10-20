import { IExecuteFunctions } from 'n8n-core';
import {
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';
import extract from 'extract-zip';
import path from 'path';
import { DOWNLOAD_STORAGE_PATH } from '../../utils/constants';

export class UnzipFile implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Unzip File',
        name: 'unzipFile',
        group: ['transform'],
        version: 1,
        description: 'Unzip a file from disk',
        defaults: {
            name: 'Unzip File',
            color: '#772244',
        },
        inputs: ['main'],
        outputs: ['main'],
        properties: [
            // Node properties which the user gets displayed and
            // can change on the node.
            {
                displayName: 'File name',
                name: 'fileName',
                type: 'string',
                default: '',
                placeholder: 'File name',
                description: 'The name of the file to unzip on the disk',
                required: true
            },
            {
                displayName: 'Output folder name',
                name: 'outputName',
                type: 'string',
                default: '',
                placeholder: 'Output name',
                description: 'The name of the folder to unzip files to',
            }
        ]
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const fileName = this.getNodeParameter('fileName', 0) as string;
        const outputName = this.getNodeParameter('outputName', 0) as string;

        const inputPath = path.join(DOWNLOAD_STORAGE_PATH, fileName);
        const outputPath = path.join(DOWNLOAD_STORAGE_PATH, outputName);

        try {
            await extract(inputPath, { dir: outputPath })
            console.log('Extraction complete')
        } catch (err) {
            console.error(err)
            // handle any errors
        }

        return [
            this.helpers.returnJsonArray({})
        ];
    }
}
