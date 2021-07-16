import IExecReturnData from "../interfaces/IExectReturnData";
import IRemoteSSHConfig from "../interfaces/IRemoteSSHConfig";
declare const _default: (command: string, sshConfig: IRemoteSSHConfig) => Promise<IExecReturnData>;
export default _default;
