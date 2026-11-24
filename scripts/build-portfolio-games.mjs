/** Publishable browser companions around Tora-authored standalone Unity HTML builds. */
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import process from 'node:process';
import {buildToraShowcase} from './build-tora-website.mjs';

export async function buildPortfolioGames(out = 'dist/portfolio-games') {
  return buildToraShowcase(resolve(out));
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  globalThis.console.log(await buildPortfolioGames());
}
