export const buildAddress = address => {
  let finalAddress = "";
  let lineValue;

  if (typeof address !== "object") {
    return null;
  }

  for (let i = 1; i <= 7; i++) {
    lineValue = address[`l${i}`];

    if (!lineValue) {
      continue;
    }

    finalAddress += `${lineValue} `;
  }

  return finalAddress.trim();
};
