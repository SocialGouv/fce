import IExecReturnData from "./IExectReturnData";

export default interface IExecReturnDataSources extends IExecReturnData {
  source_id?: string;
  env?: string;
}
