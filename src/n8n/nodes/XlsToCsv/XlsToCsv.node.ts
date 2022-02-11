import { IExecuteFunctions } from 'n8n-core';
import {
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import fs from 'fs';
import path from 'path';
import xlsx from 'xlsx';

import { DOWNLOAD_STORAGE_PATH } from '../../utils/constants';
import {trimRows} from "../../utils/text";

export class XlsToCsv implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'XLSX to CSV',
    name: 'xlsxToCsv',
    group: ['transform'],
    version: 1,
    description: 'Transform a xlsx or xls sheet to a csv',
    defaults: {
      name: 'XLSX to CSV',
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
        displayName: 'Output file name',
        name: 'outputName',
        type: 'string',
        default: '',
        placeholder: 'Output name',
        description: 'The name of the folder to unzip files to',
      },
      {
        displayName: 'Sheet name',
        name: 'sheetName',
        type: 'string',
        default: '',
        placeholder: 'Sheet name',
        description: 'The name of the sheet to extract',
      },
      {

        displayName: 'Trim rows',
        name: 'trimRows',
        type: 'number',
        default: 0,
        description: 'The number of starting rows to trim in the sheet',
      }
    ]
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const fileName = this.getNodeParameter('fileName', 0) as string;
    const outputName = this.getNodeParameter('outputName', 0) as string;
    const sheetName = this.getNodeParameter('sheetName', 0) as string;
    const trimRowsCount = this.getNodeParameter('trimRows', 0) as number;

    const inputPath = path.join(DOWNLOAD_STORAGE_PATH, fileName);
    const outputPath = path.join(DOWNLOAD_STORAGE_PATH, outputName);

    try {
      const workBook = xlsx.readFile(inputPath);

      const csvSheet = xlsx.utils.sheet_to_csv(workBook.Sheets[sheetName]);

      const trimmedCsv = trimRows(csvSheet, trimRowsCount);

      await fs.promises.writeFile(outputPath, trimmedCsv, 'utf8');
    } catch (err) {
      console.error(err)
      // handle any errors
    }

    return [
      this.helpers.returnJsonArray({ outputName })
    ];
  }
}
