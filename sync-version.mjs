import { readFileSync, writeFileSync } from 'node:fs';

const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));
const jsrJsonPath = './jsr.json';

const jsrJson = JSON.parse(readFileSync(jsrJsonPath, 'utf8'));

if (jsrJson.version === packageJson.version) {
  console.log('jsr.json version is already up-to-date.');
} else {
  jsrJson.version = packageJson.version;
  writeFileSync(jsrJsonPath, JSON.stringify(jsrJson, null, 2), 'utf8');
  console.log(`Updated jsr.json version to ${packageJson.version}`);
}
