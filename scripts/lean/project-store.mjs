/** Local native-scene project store. Rejects symlink traversal and external paths. */
import {mkdir, writeFile, readFile, readdir, rm, lstat} from 'node:fs/promises';
import {resolve, dirname, sep} from 'node:path';
import {emptyProject, validateDocument} from './native/document.mjs';

const ROOT = resolve(import.meta.dirname, '../..');
const check = (value, code) => { if (!value) throw Error(code); };

async function noLinks(path) {
  let p = resolve(path);
  while (p !== dirname(p)) {
    try { check(!(await lstat(p)).isSymbolicLink(), 'E_WORKSPACE_SYMLINK'); }
    catch (e) { if (e.code !== 'ENOENT') throw e; }
    p = dirname(p);
  }
  return resolve(path);
}

export class ProjectStore {
  constructor(root = resolve(ROOT, '.tora/native-projects')) {
    this.root = resolve(root);
    check(this.root.startsWith(resolve(ROOT, '.tora') + sep) || this.root.startsWith(resolve(ROOT, 'reports') + sep), 'E_WORKSPACE_OUTSIDE_PROJECT');
  }

  async createNative(input) {
    const document = emptyProject(input);
    await noLinks(this.root);
    await mkdir(this.root, {recursive: true});
    const target = resolve(this.root, input.id);
    check(target.startsWith(this.root + sep), 'E_PROJECT_ID');
    await mkdir(target);
    try {
      await mkdir(resolve(target, 'revisions'));
      await writeFile(resolve(target, 'project.json'), JSON.stringify(document), {flag: 'wx'});
      await writeFile(resolve(target, 'workspace.json'), JSON.stringify({
        format: 'tora-local-workspace-1',
        id: input.id,
        kind: 'native-scene',
        status: 'DRAFT',
        activeRevision: 'initial',
      }), {flag: 'wx'});
      return document;
    } catch (error) {
      await rm(target, {recursive: true, force: true});
      throw error;
    }
  }

  async open(id) {
    check(typeof id === 'string' && /^[a-z][a-z0-9-]{1,47}$/.test(id), 'E_PROJECT_ID');
    const root = await noLinks(resolve(this.root, id));
    const meta = JSON.parse(await readFile(resolve(root, 'workspace.json'), 'utf8'));
    check(meta.kind === 'native-scene', 'E_NATIVE_KIND');
    const project = validateDocument(JSON.parse(await readFile(await noLinks(resolve(root, 'project.json')), 'utf8')));
    check(project.projectId === id, 'E_PROJECT_ID');
    return {workspace: meta, project};
  }

  async list() {
    await noLinks(this.root);
    let names;
    try { names = await readdir(this.root); }
    catch (e) { if (e.code === 'ENOENT') return []; throw e; }
    const projects = [];
    for (const id of names) {
      if (!/^[a-z][a-z0-9-]{1,47}$/.test(id)) continue;
      try {
        const p = await this.open(id);
        projects.push({id, name: p.project.creativeBrief.goal, status: p.workspace.status, kind: p.project.base.kind});
      } catch {
        /* Incomplete or invalid workspaces are skipped. */
      }
    }
    return projects;
  }
}
