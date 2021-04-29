import IExecReturnData from "../interfaces/IExectReturnData";
import IRemoteSSHConfig from "../interfaces/IRemoteSSHConfig";
import IDockerExecConfig from "../interfaces/IDockerExecConfig";
declare const _default: (command: string, dockerExecConfig: IDockerExecConfig, sshConfig: IRemoteSSHConfig) => Promise<IExecReturnData>;
export default _default;
