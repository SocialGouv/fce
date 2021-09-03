import { IExecuteFunctions } from "n8n-core";
import { Client, ClientOptions } from "minio";

export const createMinioClient = async (context: IExecuteFunctions) => {
  const minioCredentials = await context.getCredentials("minio") as unknown as ClientOptions;

  const sanitizedCredentials = {
    ...minioCredentials,
    port: Number(minioCredentials.port),
    useSSL: Boolean(minioCredentials.useSSL)
  };

  return new Client(sanitizedCredentials);
}
