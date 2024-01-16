#!/usr/bin/env node

const { spawnSync } = require('child_process');
const path = require('path');

const sp = path.join(__dirname, 'server.js');

const result = spawnSync('node', [sp], { stdio: 'inherit' });

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
} else {
  process.exit(result.status);
}
