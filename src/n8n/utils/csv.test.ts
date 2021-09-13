import {fromCSV} from "data-forge";
import {mergeCsvDataFrame} from "./csv";

describe("csv", () => {
  describe("mergeCsvDataFrame", () => {
    it("should merge csv dataframes", () => {
      const data1 = `id;data1
1;data11
2;data12`;
      const data2 = `id;data2
1;data21
2;data22`;
      const df1 = fromCSV(data1);
      const df2 = fromCSV(data2);
      const mergedData = mergeCsvDataFrame(df1, df2, "id");
      expect(mergedData.toArray()).toEqual([
        { id: '1', data1: 'data11', data2: 'data21' },
        { id: '2', data1: 'data12', data2: 'data22' }
      ]);
    });
  });
})
