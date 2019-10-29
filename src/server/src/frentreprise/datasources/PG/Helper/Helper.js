export const getFormatedDate = date => {
  if (!date) {
    return null;
  }

  const trimedDate = date.trim();
  const defaultFormatedDate = extractDefaultFormatedDate(trimedDate);

  if (defaultFormatedDate) {
    return defaultFormatedDate;
  }

  return extractSecondaryFormatedDate(trimedDate);
};

const extractDefaultFormatedDate = date => {
  const [day, month, year] = date.split("/");

  if (!day || !month || !year) {
    return null;
  }

  return `${year}-${month}-${day}`;
};

const extractSecondaryFormatedDate = date => {
  const getMonthByName = monthName =>
    ({
      JAN: "01",
      FEB: "02",
      MAR: "03",
      APR: "04",
      MAY: "05",
      JUN: "06",
      JUL: "07",
      AUG: "08",
      SEP: "09",
      OCT: "10",
      NOV: "11",
      DEC: "12"
    }[monthName]);

  const day = date.substring(0, 2);
  const monthName = date.substring(2, 5);
  const month = getMonthByName(monthName);
  const year = date.substring(5);

  if (!day || !month || !year) {
    return null;
  }

  return `${year}-${month}-${day}`;
};
