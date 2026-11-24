# Contributing to Tora

Thanks for helping improve Tora! Before opening a pull request, please review
our contributor license terms and verification workflow below.

## Contributor License Agreement (CLA)

Tora is distributed under a source-available open-core model (`LICENSE`) so the
core local framework remains free for internal game studios while funding
ongoing development through agency/enterprise licenses, Pro ad-network packs,
and future hosted offerings.

By submitting any pull request, patch, issue snippet, or other contribution to
this repository, you confirm that:

1. Your contribution is your original work (or you have the necessary rights to
   submit it), and it includes no AI-generated artwork/audio or unlicensed
   third-party media.
2. You grant Tora Playables and its successors a perpetual, worldwide,
   non-exclusive, irrevocable, royalty-free copyright and patent license to
   use, reproduce, modify, distribute, and relicense your contribution under
   the current repository license as well as any future commercial or cloud
   licenses offered by Tora Playables.

If you are contributing on behalf of an employer, please ensure you have
authorization to agree to these terms before submitting.

## Local Development & Verification

1. Install dependencies and build the local Rust tools:
   ```bash
   npm install
   npm run setup
   ```
2. Make focused changes and add regression tests under `tests/` or `crates/`.
3. Run the full verification suite before opening a PR:
   ```bash
   npm run verify
   ```

## Media & Provenance Rules

- All sample sprites, 3D meshes, and audio must be real creator uploads or
  verified commercial-use libraries (such as CC0-1.0) with recorded author,
  source URL, license evidence, and file hashes.
- Do not commit API keys, secrets, local `.tora/` stores, or generated
  `reports/` directories.
