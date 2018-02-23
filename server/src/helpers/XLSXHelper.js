class XLSXHelper {

  static getReferences(workSheet) {
    let references = {};

    const split = workSheet["!ref"].split(":");
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

  static getAlphabeticalColumnNames(workSheet) {
    const refs = XLSXHelper.getReferences(workSheet);
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    const startIndex = alphabet.indexOf(refs.start.column);
    const endIndex = alphabet.indexOf(refs.end.column);

    const columnNames = alphabet.slice(startIndex, endIndex + 1);
    return columnNames;
  }

  static getColumnKeys(workSheet) {
    const refs = XLSXHelper.getReferences(workSheet);
    const startRow = refs.start.row;
    const alphaColumnNames = XLSXHelper.getAlphabeticalColumnNames(workSheet);
    
    let columnKeys = [];

    for (let i = 0; i < alphaColumnNames.length; i++) {
      const columnRef = alphaColumnNames[i];
      columnKeys.push(workSheet[columnRef + "" + startRow].v);
    }
    return columnKeys;
  }

  static getObjectArray(workSheet) {
    const refs = XLSXHelper.getReferences(workSheet);
    const columnNames = XLSXHelper.getAlphabeticalColumnNames(workSheet);
    const columnKeys = XLSXHelper.getColumnKeys(workSheet);
    
    let objectArray = [];
    const start = parseInt(refs.start.row);
    const end = parseInt(refs.end.row);
    for (let i = start + 1; i <= end; i++) {
      
      let item = {};
      for (let j = 0; j < columnNames.length; j++) {
        
        const columnRef = columnNames[j];
        const cellRef = columnRef + "" + i;        
        const cell = workSheet[cellRef];
        if (cell) {
          const attributeKey = columnKeys[j];        
          item[attributeKey] = cell.w;
        }
      }
      objectArray.push(item);
    }

    return objectArray
  }
}

module.exports = XLSXHelper;
