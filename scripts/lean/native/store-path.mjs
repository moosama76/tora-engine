import {lstat} from 'node:fs/promises';
import {resolve,dirname} from 'node:path';
/** Validate existing ancestors even before a target directory is created. */
export async function assertStorePath(path){let current=resolve(path);while(current!==dirname(current)){try{if((await lstat(current)).isSymbolicLink())throw Error('E_NATIVE_STORE_SYMLINK');}catch(e){if(e.code!=='ENOENT')throw e;}current=dirname(current);}}
