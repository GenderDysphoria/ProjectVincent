import log from 'fancy-log';
import assert from 'node:assert';
import childProcess from 'node:child_process';
import util from 'node:util';

export const exec = util.promisify(childProcess.exec);

export default async function execute (cmd, { canReturnOnStdErr = false, ...options } = {}) {
  try {
    const { stdout, stderr } = await exec(cmd, options);

    // Handle stderr output
    if (stderr) {
      if (canReturnOnStdErr) {
        return stderr;
      } else {
        log.error(`Command '${cmd}' returned data on stderr: ${stderr}`);
        assert(!stderr, 'Command returned data on stderr');
      }
    }

    return stdout;
  } catch (err) {
    throw new Error(`An unexpected error occurred while running \`${cmd}\`. Exit code: ${err.code}`, { cause: err });
  }
}
