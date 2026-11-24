/** Native recognition shares the server's complete structural and semantic validator. */
import {parseAuthoringJson} from './strict-json.js';
import {validateDocument} from '../../../scripts/lean/native/document.mjs';
import type {ProjectV21} from './generated-v21.js';
export {validateDocument as validateProjectV21};
export function parseCreativeProject(text: string): ProjectV21 {
  const value = parseAuthoringJson(text, {bytes: 4_194_304, nodes: 100_000, depth: 64});
  if (!value || typeof value !== 'object' || !('schemaVersion' in value) || value.schemaVersion !== '2.1.0') {
    throw Error('E_V2_VERSION');
  }
  return validateDocument(value) as ProjectV21;
}
