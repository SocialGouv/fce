import { IExecuteFunctions } from "n8n-core";
import { Client, ClientOptions } from "minio";

export const createMinioClient = (context: IExecuteFunctions) => {
  const minioCredentials = context.getCredentials("minio") as unknown as ClientOptions;

  console.log(minioCredentials);

  const sanitizedCredentials = {
    ...minioCredentials,
    port: Number(minioCredentials.port),
    useSSL: Boolean(minioCredentials.useSSL)
  };

  return new Client(sanitizedCredentials);
}
