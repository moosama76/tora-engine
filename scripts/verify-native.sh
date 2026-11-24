#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
node scripts/check-toolchain.mjs
npm run schema:check
npm run packer:check
npm run typecheck
npm run lint
npm run build:editor
cargo test --workspace --locked
npm run test:host
npm run test:editor
node --test tests/native/pixel-text.test.mjs tests/native/audio-analysis.test.mjs tests/native/creative-qa.test.mjs
npm run test:native
printf '%s\n' 'Tora verification passed. Creative approval, device testing, and official network acceptance remain separate gates.'
