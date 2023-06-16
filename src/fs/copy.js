import { cp } from 'fs/promises';
import { fileURLToPath } from 'url';
import { fileExists } from '../utils/utils.js';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.join(__dirname, '/files');
const destPath = path.join(__dirname, '/files_copy');

const copy = async () => {
  const existsDestPath = await fileExists(destPath);
  const existsSourcePath = await fileExists(sourcePath);

  if (existsDestPath) throw new Error('FS operation failed');

  if (existsSourcePath && !existsDestPath) {
    await cp(sourcePath, destPath, { recursive: true }).then(() =>
      console.log('Files successfully copied')
    );
  } else {
    throw new Error('FS operation failed');
  }
};

await copy();
