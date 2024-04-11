const fs = require('fs');
const path = require('path');

const sourceFilePath = path.resolve(__dirname, 'render.yaml')
const destFilePath = path.resolve(__dirname, 'dist/render.yaml')

try {
  copyFileSync(sourceFilePath, destFilePath)
  console.log('File render.yaml successfully copied to dist folder')
} catch (err) {
  console.error(err)
}