import { spawnSync } from 'node:child_process';
import { mkdirSync, readdirSync, existsSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const url = process.argv[2];
const label = process.argv[3];
if (!url) {
  console.error('Usage: node screenshot.mjs <url> [label]');
  process.exit(1);
}

// Locate a Chrome binary: prefer puppeteer's cached "Chrome for Testing", fall back to system Chrome.
function findChrome() {
  const cacheRoot = join(homedir(), '.cache/puppeteer/chrome');
  if (existsSync(cacheRoot)) {
    const versions = readdirSync(cacheRoot).sort(); // e.g. mac_arm-131.0.6778.69
    for (const v of versions.reverse()) {
      const archDir = join(cacheRoot, v);
      const arch = readdirSync(archDir).find(d => d.startsWith('chrome-mac'));
      if (!arch) continue;
      const bin = join(archDir, arch, 'Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing');
      if (existsSync(bin)) return bin;
    }
  }
  const system = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  if (existsSync(system)) return system;
  throw new Error('No Chrome found. Install Google Chrome or run: npx puppeteer browsers install chrome');
}

const dir = 'temporary screenshots';
mkdirSync(dir, { recursive: true });

// Auto-increment screenshot-N[-label].png, never overwriting.
const used = readdirSync(dir)
  .map(f => f.match(/^screenshot-(\d+)/))
  .filter(Boolean)
  .map(m => parseInt(m[1], 10));
const n = (used.length ? Math.max(...used) : 0) + 1;
const out = join(dir, `screenshot-${n}${label ? '-' + label : ''}.png`);

const chrome = findChrome();
const r = spawnSync(chrome, [
  '--headless=new',
  '--hide-scrollbars',
  '--force-device-scale-factor=1',
  '--window-size=1440,900',
  '--virtual-time-budget=2500',
  `--screenshot=${out}`,
  url,
], { stdio: 'inherit' });

if (r.status !== 0) process.exit(r.status ?? 1);
console.log(`Saved ${out}`);
