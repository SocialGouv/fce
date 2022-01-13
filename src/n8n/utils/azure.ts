import { ShareServiceClient } from "@azure/storage-file-share";
import { IExecuteFunctions } from "n8n-core";

export const createClient = (connectionString: string) =>
    ShareServiceClient.fromConnectionString(connectionString);


export const downloadFile = (client: ShareServiceClient, shareName: string) => async (filename: string): Promise<NodeJS.ReadableStream> => {
    const response = await client.getShareClient(shareName).rootDirectoryClient.getFileClient(filename).download();

    if (!response.readableStreamBody) {
        throw new Error("File not found");
    }
    return response.readableStreamBody;
}

type AzureCredentials = {
    connectionString: string;
    shareName: string;
}

export const getCredentialsFromContext = async (context: IExecuteFunctions): Promise<AzureCredentials> => await context.getCredentials("azure") as unknown as AzureCredentials
