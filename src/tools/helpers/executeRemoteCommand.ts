import executeCommand from "./executeCommand";
import IExecReturnData from "../interfaces/IExectReturnData";
import IRemoteSSHConfig from "../interfaces/IRemoteSSHConfig";

export default (
  command: string,
  sshConfig: IRemoteSSHConfig
): Promise<IExecReturnData> => {
  const distBaseCommand = `ssh -T ${sshConfig.username}@${sshConfig.host}`;
  const fullcommand = `${distBaseCommand} '${command}'`;

  return executeCommand(fullcommand);
};
