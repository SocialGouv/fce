export const trimRows = (text: string, count = 0) =>
  text.split("\n").slice(count).join("\n");
