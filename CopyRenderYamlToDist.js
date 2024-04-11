import { copyFileSync } from 'fs';
import path from 'path';

const sourceFilePath = 'render.yaml';
const destFilePath = 'dist/render.yaml';

try {
  copyFileSync(sourceFilePath, destFilePath);
  console.log('File render.yaml successfully copied to dist folder');
} catch (err) {
  console.error(err);
}