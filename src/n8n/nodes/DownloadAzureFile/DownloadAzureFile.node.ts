import { INodeExecutionData, INodeType, INodeTypeDescription } from "n8n-workflow";
import { IExecuteFunctions } from "n8n-core";
import { createWriteStream } from "fs";
import path from "path";
import { DOWNLOAD_STORAGE_PATH } from "../../utils/constants";
import { createClient, downloadFile, getCredentialsFromContext } from "../../utils/azure";
import { promisifyStream } from "../../utils/stream";


export class DownloadAzureFile implements INodeType {
    description: INodeTypeDescription = {
        displayName: "Download Azure File",
        name: "downloadAzureFile",
        group: ['transform'],
        version: 1,
        description: "Download a file from an azure storage",
        defaults: {
            name: 'Download Azure File',
            color: '#772244',
        },
        credentials: [
          {
            name: "azure",
            required: true
          }
        ],
        properties: [
            // Node properties which the user gets displayed and
            // can change on the node.
            {
                displayName: 'Azure file name',
                name: 'fileName',
                type: 'string',
                default: '',
                placeholder: 'file name',
                description: 'The target name of the downloaded file',
                required: true
            },
        ],
        inputs: ['main'],
        outputs: ['main'],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const fileName = this.getNodeParameter("fileName", 0) as string;

        const { connectionString, shareName } = await getCredentialsFromContext(this);

        const client = createClient(connectionString);

        const downloader = downloadFile(client, shareName);

        const fileStream = await downloader(fileName);

        await promisifyStream(fileStream.pipe(createWriteStream(path.join(DOWNLOAD_STORAGE_PATH, fileName))));

        return [
            this.helpers.returnJsonArray({})
        ];
    }
}
