import {Readable} from "stream";
import {parseCsv, stringifyCsv} from "./postgre";

describe("postgre", () => {
  describe("mapCsv", () => {
    it("should handle csv properly", async () => {
      const csv = `data1;data2\n1;2\n3;4`;

      const columns = {
        data1: "new1",
        data2: "new2"
      };
      let index = 0;
      const input = new Readable({
        read(size: number) {
          if (index < csv.length) {
            this.push(Buffer.from(csv.substr(index, size)));
            index += size;
            return;
          }
          this.push(null);
        }
      });

      const output = input.pipe(
        parseCsv({ columns })
      ).pipe(
        stringifyCsv({ columns: Object.values(columns) })
      );

      let outputData = "";

      await new Promise<void>((resolve, reject) => {
        output.on("readable", () => {
          let data = output.read();
          while (data) {
            outputData += data.toString();
            data = output.read();
          }
        }).on("finish", () => {
          resolve();
        }).on("error", () => {
          reject();
        });
      });

      expect(outputData).toEqual(`new1;new2\n1;2\n3;4\n`)
    });
  });
});
