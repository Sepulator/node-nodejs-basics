import { rename as renameFS } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import { fileExists } from '../utils/utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourceFilePath = path.join(__dirname, '/files', 'wrongFilename.txt');
const destFilePath = path.join(__dirname, '/files', 'properFilename.md');

const rename = async () => {
  const isDestFileExist = await fileExists(destFilePath);
  const isSourceFileExist = await fileExists(sourceFilePath);

  if (isDestFileExist) throw new Error('FS operation failed');

  if (isSourceFileExist && !isDestFileExist) {
    await renameFS(sourceFilePath, destFilePath).then(() =>
      console.log('File successfully renamed')
    );
  } else {
    throw new Error('FS operation failed');
  }
};

await rename();
