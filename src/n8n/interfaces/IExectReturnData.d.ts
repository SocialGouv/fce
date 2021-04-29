export default interface IExecReturnData {
    exitCode: number;
    error?: Error;
    stderr: string;
    stdout: string;
}
