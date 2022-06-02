import {promises as fs} from "fs";
import {DOWNLOAD_STORAGE_PATH} from "./constants";

export const initDownloadFolder = () => createIfNotExist(DOWNLOAD_STORAGE_PATH);

const exists = async (path: string): Promise<boolean> => {
  try {
    await fs.access(path);
    return true;
  } catch(err) {
    return false;
  }
};

export const createIfNotExist = async (path: string): Promise<void> => {
  if (!await exists(path)) {
    await fs.mkdir(path, { recursive: true });
  }
};
