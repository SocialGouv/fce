import chalk from "chalk";
export const logStr = (value, color = "blue") => {
  console.log(chalk[color](value));
};
export const logMem = () => {
  console.log({
    mem: Object.entries(process.memoryUsage()).map(
      ([key, val]) => `${key} : ${(val / 1024 / 1024).toFixed(4)} MB`
    ),
  });
};
