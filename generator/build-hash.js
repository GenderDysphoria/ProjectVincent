import execute from './exec.js';

const BUILD_HASH = (await execute('git archive main | md5')).slice(0, 8);

export default BUILD_HASH;
