import {Readable} from "stream";

export const promisifyStream = (stream: Readable) => {
  return new Promise<void>((resolve, reject) => {
    stream.on("error", (error) => {
      reject(error);
    }).on("finish", () => {
      resolve();
    })
  })
}
