#!/usr/bin/env node

const { spawnSync } = require('child_process');
const path = require('path');

const scriptPath = path.join(__dirname, 'DouServer.js');

const args = process.argv.slice(2);

const result = spawnSync('node', [scriptPath, ...args], { stdio: 'inherit' });

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
} else {
  process.exit(result.status);
}
