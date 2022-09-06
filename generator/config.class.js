import fs from 'fs/promises';
import { constants as FS_CONSTANTS } from 'fs';
import path from 'path';
import { createRequire } from 'module';
import resolve from 'enhanced-resolve';

export default class BuildConfig {
  constructor (props) {
    Object.assign(this, props);
    this.require = createRequire(this.cwd);
    this.resolve = this.resolve.bind(this);
    this.resolveDep = this.resolveDep.bind(this);
  }

  /**
   * Resolve the absolute path to a file relative to the root of the project.
   *
   * @param   {...string} pathToFile Path to the desired file.
   *
   * @memberof ZenConfig
   * @returns {string}
   */
  resolve (...pathToFile) {
    return path.resolve(this.cwd, ...pathToFile);
  }

  /**
   * Resolves the absolute path to a file relative to the root and returns its contents.
   *
   * @param   {...string} pathToFile Path to the desired file.
   *
   * @returns {string}
   */
  async read (...pathToFile) {
    const file = this.resolve(...pathToFile);
    return fs.readFile(file, 'utf-8');
  }

  /**
   * Resolves the absolute path to a file relative to the root and confirms
   * if the file is present and available for reading.
   *
   * @param   {...string} pathToFile Path to the desired file.
   *
   * @memberof ZenConfig
   * @returns {boolean}
   */
  async exists (...pathToFile) {
    const file = this.resolve(...pathToFile);
    try {
      await fs.access(file, FS_CONSTANTS.R_OK);
      return true;
    } catch (e) {
      // file doesn't exist yet
      return false;
    }
  }

  /**
   * Resolve the absolute path to a dependency relative to the root of the project.
   *
   * @param   {...string} dependency Name/path of the desired dependency
   *
   * @memberof ZenConfig
   * @returns {string}
   */
  resolveDep (...dependency) {
    return resolve.sync(this.cwd, ...dependency);
  }
}
