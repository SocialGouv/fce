import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import {elasticIngest} from "../../utils/elastic";
import * as path from "path";
import {DOWNLOAD_STORAGE_PATH} from "../../utils/constants";
import * as fs from "fs";
import {pathFromDownloadFolder} from "../../utils/filesystem";

export class ElasticSearch implements INodeType {
  description: INodeTypeDescription = {
    displayName: "Elastic search ingest",
    name: "elasticSearchIngest",
    group: ['transform'],
    version: 1,
    description: "Elastic search Ingestor",
    defaults: {
      name: 'Elastic search Ingest',
      color: '#772244',
    },
    inputs: ['main'],
    outputs: ['main'],
    properties: [{
      displayName: 'Folder',
      name: 'folder',
      type: 'string',
      default: '',
      placeholder: 'folderPath',
      description: 'The folder containing the imported file',
      required: true
    },{
      displayName: 'Index Name',
      name: 'indexName',
      type: 'string',
      default: '',
      placeholder: 'indexName',
      description: 'The name of the elastic search index',
      required: true
    }]
  };

  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const folder = this.getNodeParameter('folder', 0) as string;
    const indexName = this.getNodeParameter('indexName', 0) as string;

    const absoluteFolderPath = pathFromDownloadFolder(folder);
    const files = await fs.promises.readdir(absoluteFolderPath);


    if (files.length === 0) {
      throw new Error(`No files where downloaded in the folder ${folder}`);
    }

    const sourceFile = path.join(absoluteFolderPath, files[0]);

    await elasticIngest({
      indexName,
      sourceFile,
    });

    return [this.helpers.returnJsonArray({})];
  }
}
