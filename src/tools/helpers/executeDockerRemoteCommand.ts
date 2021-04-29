import executeRemoteCommand from "./executeRemoteCommand";
import IExecReturnData from "../interfaces/IExectReturnData";
import IRemoteSSHConfig from "../interfaces/IRemoteSSHConfig";
import IDockerExecConfig from "../interfaces/IDockerExecConfig";

export default (
  command: string,
  dockerExecConfig: IDockerExecConfig,
  sshConfig: IRemoteSSHConfig
): Promise<IExecReturnData> => {
  const dockerExecCmd = `exec ${dockerExecConfig.container} ${dockerExecConfig.bash} -c`;

  const fullcommand = `docker ${dockerExecCmd} "${command}"`;

  return executeRemoteCommand(fullcommand, sshConfig);
};
