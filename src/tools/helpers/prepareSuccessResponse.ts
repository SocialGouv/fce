import { INodeExecutionData } from "n8n-workflow";

export default (message: string = "", moreData = {}) => {
  const returnItems: INodeExecutionData[] = [];

  returnItems.push({
    json: {
      exitCode: 0,
      stderr: "",
      stdout: message,
      ...moreData,
    },
  });

  return returnItems;
};
