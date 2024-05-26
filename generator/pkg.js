import path from 'path';
import { fileURLToPath } from 'url';
import { readPackageUpSync } from 'read-package-up';

const FILENAME = fileURLToPath(import.meta.url);
const DIRNAME = path.dirname(FILENAME);

const ROOT_DIR = path.resolve(DIRNAME, '..');

const { packageJson: PACKAGE_JSON, path: PACKAGE_PATH } = readPackageUpSync({ cwd: ROOT_DIR });

export default PACKAGE_JSON;
export {
  PACKAGE_PATH,
  ROOT_DIR,
};
