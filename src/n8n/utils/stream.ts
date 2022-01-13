import { Stream, Transform } from "stream";

export const promisifyStream = (stream: Stream) => {
  return new Promise<void>((resolve, reject) => {
    stream.on("error", (error) => {
      reject(error);
    }).on("finish", () => {
      resolve();
    }).on("end", () => {
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
