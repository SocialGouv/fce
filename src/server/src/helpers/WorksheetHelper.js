class WorksheetHelper {
  constructor(workSheet, params) {
    this.workSheet = workSheet;
    this.params = params;
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

  generateAlphabet(indexNumber) {
    const alphabetLength = indexNumber || 100;
    const alphabetBase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let alphabet = [];
    for (let i = 0; i < alphabetLength; i++) {
      let letter = alphabetBase[i];
      if (i > 25) {
        const q = parseInt(i / 26, 10);
        const r = i % 26;
        letter = alphabetBase[q - 1] + alphabetBase[r];
      }
      alphabet.push(letter);
    }
    return alphabet;
  }

  getAlphabeticalColumnNames() {
    const refs = this.getReferences(this.workSheet);
    const alphabet = this.generateAlphabet();

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
      const cell = this.workSheet[columnRef + "" + startRow];
      let columnKey = cell ? cell.v : null;
      if (columnKey && this.params && this.params.keysToLowerCase) {
        columnKey = columnKey.toLowerCase();
      }
      columnKeys.push(columnKey);
    }
    return columnKeys;
  }

  getRowData(rowNumber, columnsToKeep) {
    const columnNames = this.getAlphabeticalColumnNames(this.workSheet);
    const columnKeys = this.getColumnKeys(this.workSheet);
    let item = {};

    for (let i = 0; i < columnNames.length; i++) {
      const cellRef = columnNames[i] + "" + rowNumber;
      const cell = this.workSheet[cellRef];
      if (cell) {
        let attributeKey = null;
        if (!columnsToKeep) {
          attributeKey = columnKeys[i];
        } else {
          if (!columnsToKeep[columnNames[i]]) {
            continue;
          }
          attributeKey = columnsToKeep[columnNames[i]];
        }
        item[attributeKey] = (cell.w || cell.v).trim();
      }
    }

    return item;
  }

  getRowsData(columnsToKeep) {
    const refs = this.getReferences(this.workSheet);

    let getRowsData = [];
    const startRowNumber = parseInt(refs.start.row);
    const endRowNumber = parseInt(refs.end.row);
    for (
      let rowNumber = startRowNumber + 1;
      rowNumber <= endRowNumber;
      rowNumber++
    ) {
      const item = this.getRowData(rowNumber, columnsToKeep);
      getRowsData.push(item);
    }

    return getRowsData;
  }
}

module.exports = WorksheetHelper;
