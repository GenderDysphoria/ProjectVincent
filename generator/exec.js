import log from 'fancy-log';
import assert from 'node:assert';
import childProcess from 'node:child_process';
import util from 'node:util';

const exec = util.promisify(childProcess.exec);

const cmdOutputsOnStderr = [ 'gcloud' ];

export default async function execute (cmd, options = {}) {
  try {
    const { canReturnOnStdErr = false } = options;
    const { stdout, stderr } = await exec(cmd);

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
