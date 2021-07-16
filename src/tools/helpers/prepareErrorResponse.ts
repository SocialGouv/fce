import { INodeExecutionData } from "n8n-workflow";

export default (message: string, moreData = {}) => {
  const returnItems: INodeExecutionData[] = [];

  returnItems.push({
    json: {
      exitCode: 1,
      stderr: message,
      stdout: "",
      ...moreData,
    },
  });

  return returnItems;
};
