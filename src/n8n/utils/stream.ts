import {Readable, Transform} from "stream";

export const promisifyStream = (stream: Readable) => {
  return new Promise<void>((resolve, reject) => {
    stream.on("error", (error) => {
      reject(error);
    }).on("finish", () => {
      resolve();
    })
  })
}

export const identityTransform = () => new Transform({
  objectMode: true,
  transform(chunk, encoding, callback) {
    this.push(chunk);
    callback();
  }
})
