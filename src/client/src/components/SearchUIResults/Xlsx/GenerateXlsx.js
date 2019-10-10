const xlsx = require("xlsx");

class GenerateXlsx {
  constructor(props) {
    this.props = props;
  }

  download() {
    this.formatData({ ...this.props });
  }

  formatData(data) {
    const wb = { SheetNames: [], Sheets: {} };
    let dataJson = Object.values(data).map(tmpData => {
      const cleanTmpData = [];

      delete tmpData._meta;

      Object.entries(tmpData).forEach(([key, value]) => {
        cleanTmpData[key] = value.raw;
      });

      return cleanTmpData;
    });

    const ws = xlsx.utils.json_to_sheet(dataJson);
    const wsName = "FceExport.xlsx";
    xlsx.utils.book_append_sheet(wb, ws, wsName);

    xlsx.writeFile(wb, wsName, { bookType: "xlsx", type: "buffer" });
  }
}

export default GenerateXlsx;
