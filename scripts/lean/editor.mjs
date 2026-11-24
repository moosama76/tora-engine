import {createServer} from 'node:http';
import {readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {pathToFileURL, URL} from 'node:url';
import process from 'node:process';
import {ProjectStore} from './project-store.mjs';
import {EditorState} from './editor-state.mjs';
import {NativeService} from './native/service.mjs';
import {nativeApi} from './native/api.mjs';

const assets = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/entry.js', ['entry.js', 'text/javascript']],
  ['/review-editor.js', ['review-editor.js', 'text/javascript']],
  ['/review-intake.js', ['review-intake.js', 'text/javascript']],
  ['/review-editor.css', ['review-editor.css', 'text/css']],
  ['/brand/manrope.ttf', ['brand/manrope.ttf', 'font/ttf']],
  ['/brand/mark.svg', ['brand/mark.svg', 'image/svg+xml']],
  ['/brand/tora-wordmark.svg', ['brand/tora-wordmark.svg', 'image/svg+xml']],
]);

export async function createEditorServer({store = new ProjectStore(), port = 0, connection, agentFactory} = {}) {
  const native = nativeApi(new NativeService(store, new EditorState(store)), connection, {agentFactory});
  const server = createServer(async (req, res) => {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    try {
      const url = new URL(req.url, 'http://localhost');
      if (await native(req, res, url, server.address().port)) return;
      const asset = assets.get(url.pathname);
      if (!asset || req.method !== 'GET') {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({error: 'E_EDITOR_ROUTE'}));
        return;
      }
      res.setHeader('Content-Type', asset[1]);
      res.end(await readFile(resolve(import.meta.dirname, 'editor', asset[0])));
    } catch (error) {
      res.writeHead(500, {'Content-Type': 'application/json'});
      res.end(JSON.stringify({error: error.message || 'E_EDITOR_SERVER'}));
    }
  });
  await new Promise((done, reject) => {
    server.once('error', reject);
    server.listen(port, '127.0.0.1', done);
  });
  return server;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const store = new ProjectStore(process.argv[2] ? resolve(process.argv[2]) : undefined);
  const server = await createEditorServer({store, port: Number(process.argv[3] ?? 4176)});
  globalThis.console.log('Tora editor: http://127.0.0.1:' + server.address().port);
}
