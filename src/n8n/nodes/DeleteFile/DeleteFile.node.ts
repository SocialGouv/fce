import { IExecuteFunctions } from 'n8n-core';
import {
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from 'n8n-workflow';
import * as fs from "fs";
import * as path from "path";
import {DOWNLOAD_STORAGE_PATH} from "../../utils/constants";

export class DeleteFile implements INodeType {
  description: INodeTypeDescription = {
    displayName: 'Delete file',
    name: 'deleteFile',
    group: ['transform'],
    version: 1,
    description: 'Delete a local file',
    defaults: {
      name: 'Delete file',
      color: '#772244',
    },
    credentials: [],
    inputs: ['main'],
    outputs: ['main'],
    properties: [
      // Node properties which the user gets displayed and
      // can change on the node.
      {
        displayName: 'File Name',
        name: 'filename',
        type: 'string',
        default: '',
        placeholder: 'name',
        description: 'The name of the file to delete',
      },
      {
        displayName: 'File Path',
        name: 'filepath',
        type: 'string',
        default: '',
        placeholder: 'name',
        description: 'The path of the file to delete',
      }
    ]
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const filename = this.getNodeParameter('filename', 0) as string;
    const filepath = this.getNodeParameter('filepath', 0) as string;
    console.log(DOWNLOAD_STORAGE_PATH, filename);
    const resolvedPath = filepath || path.join(DOWNLOAD_STORAGE_PATH, filename);
    console.log(resolvedPath);

    await fs.promises.unlink(resolvedPath);

    return [this.helpers.returnJsonArray({
      filename,
    })];
  }
}
