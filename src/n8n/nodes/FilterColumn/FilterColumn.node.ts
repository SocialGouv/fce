import { createReadStream, createWriteStream } from "fs";
import * as path from "path";

import { IExecuteFunctions } from "n8n-core";
import {
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';
import { Pool } from "pg";
import parse from "csv-parse";
import stringify from "csv-stringify";

import { DOWNLOAD_STORAGE_PATH } from "../../utils/constants";
import { identityTransform, promisifyStream } from "../../utils/stream";
import { filterRows, sanitizeHtmlChars } from "../../utils/postgre";

export type FilterColumnConfig = {
    filename: string;
    separator?: string;
    sanitizeHtmlChars?: boolean;
    filteredColumn: string;
    test: string;
}

export class FilterColumn implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Filter Column',
        name: 'filterColumn',
        group: ['transform'],
        version: 1,
        description: 'Filter a csv file by applying a reg exp to a column',
        defaults: {
            name: 'Filter Column',
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
                displayName: 'Sanitize HTML',
                name: 'sanitizeHtmlChars',
                type: 'boolean',
                default: false,
                placeholder: '',
                description: 'Sanitize HTML characters',
            },
            {
                displayName: 'Separator',
                name: 'separator',
                type: 'string',
                default: ';',
                placeholder: ';',
                description: 'Columns separator',
            },
            {
                displayName: 'Filtered Column',
                name: 'filteredColumn',
                type: 'string',
                default: '',
                placeholder: 'siren',
                description: 'Column to be filtered',
            },
            {
                displayName: 'Test',
                name: 'test',
                type: 'string',
                default: '',
                placeholder: '^[0-9]+40,',
                description: 'Test to filter the column withb',
            }
        ]
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const fileName = this.getNodeParameter('fileName', 0) as string;
        const shouldSanitizeHtmlChars = this.getNodeParameter('sanitizeHtmlChars', 0) as boolean;
        const separator = this.getNodeParameter('separator', 0) as string;
        const filteredColumn = this.getNodeParameter('filteredColumn', 0) as string;
        const test = this.getNodeParameter('test', 0) as string;

        const regExp = new RegExp(test);

        const filePath = path.join(path.dirname(fileName), `${Date.now()}-${path.basename(fileName)}`);
        const outputPath = path.join(DOWNLOAD_STORAGE_PATH, filePath)

        const writeStream = createWriteStream(outputPath);

        createReadStream(path.join(DOWNLOAD_STORAGE_PATH, fileName))
            .pipe(shouldSanitizeHtmlChars !== false
                ? sanitizeHtmlChars()
                : identityTransform())
            .pipe(parse({ delimiter: separator, columns: true }))
            .pipe(filterRows((row: any) => regExp.test(row[filteredColumn])))
            .pipe(stringify({ header: true, delimiter: separator }))
            .pipe(writeStream);

        await new Promise((resolve, reject) =>
            writeStream.on('finish', resolve)
                .on('error', reject)
        );

        return [this.helpers.returnJsonArray({ filePath })];
    }
}
