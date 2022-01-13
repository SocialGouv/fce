import {Stream, Transform, Writable} from "stream";

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

export const streamSwitcher = (streamGenerator: () => Writable, callsNumber: number) => {
  let calls = 0;
  let stream = streamGenerator();
  return new Writable({
    objectMode: true,
    write(...args) {
      if (calls > callsNumber) {
        calls = 0;
        stream.end();
        stream = streamGenerator()
      }
      stream.write(...args)
    }
  });
};

