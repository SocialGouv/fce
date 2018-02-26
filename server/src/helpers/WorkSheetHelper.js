class WorkSheetHelper {

  constructor(workSheet) {
    this.workSheet = workSheet;
  }

  getReferences() {
    let references = {};

    const split = this.workSheet["!ref"].split(":");
    const start = split[0];
    const end = split[1];

    const columnRegex = /^[A-Z]+/g;
    const rowRegex = /[0-9]+$/g;

    const startColumn = start.match(columnRegex)[0];
    const startRow = start.match(rowRegex)[0];

    const endColumn = end.match(columnRegex)[0];
    const endRow = end.match(rowRegex)[0];

    references = {
      start: {
        column: startColumn,
        row: startRow
      },
      end: {
        column: endColumn,
        row: endRow
      }
    };
    return references;
  }

  getAlphabeticalColumnNames() {
    const refs = this.getReferences(this.workSheet);
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const startIndex = alphabet.indexOf(refs.start.column);
    const endIndex = alphabet.indexOf(refs.end.column);

    const columnNames = alphabet.slice(startIndex, endIndex + 1);
    return columnNames;
  }

  getColumnKeys() {
    const refs = this.getReferences(this.workSheet);
    const startRow = refs.start.row;
    const alphaColumnNames = this.getAlphabeticalColumnNames(this.workSheet);

    let columnKeys = [];

    for (let i = 0; i < alphaColumnNames.length; i++) {
      const columnRef = alphaColumnNames[i];
      columnKeys.push(this.workSheet[columnRef + "" + startRow].v);
    }
    return columnKeys;
  }

  getRowData(rowNumber) {
    const columnNames = this.getAlphabeticalColumnNames(this.workSheet);
    const columnKeys = this.getColumnKeys(this.workSheet);
    let item = {};

    for (let i = 0; i < columnNames.length; i++) {
      const cellRef = columnNames[i] + "" + rowNumber;
      const cell = this.workSheet[cellRef];
      if (cell) {
        const attributeKey = columnKeys[i];
        item[attributeKey] = cell.w;
      }
    }

    return item;
  }

  getRowsData() {
    const refs = this.getReferences(this.workSheet);

    let getRowsData = [];
    const startRowNumber = parseInt(refs.start.row);
    const endRowNumber = parseInt(refs.end.row);
    for (let rowNumber = startRowNumber + 1; rowNumber <= endRowNumber; rowNumber++) {

      const item = this.getRowData(rowNumber);
      getRowsData.push(item);
    }

    return getRowsData
  }
}

module.exports = WorkSheetHelper;
