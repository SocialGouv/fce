const { BlobServiceClient } = require('@azure/storage-blob');

const main = async () => {
  const AZURE_STORAGE_CONNECTION_STRING = "UseDevelopmentStorage=true";

  const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
  const containerName = "strapi-video";

  const containerClient = blobServiceClient.getContainerClient(containerName);

  await containerClient.delete();
  const createContainerResponse = await containerClient.create({
    access: "blob"
  });

  console.log("Container was created successfully. requestId: ", createContainerResponse.requestId);
}

main();
