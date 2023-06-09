import { cp, stat } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sourcePath = path.join(__dirname, '/files');
const destPath = path.join(__dirname, '/files_copy');

const fileExists = async (path) => !!(await stat(path).catch((e) => false));

const copy = async () => {
  const existsDestPath = await fileExists(destPath);
  const existsSourcePath = await fileExists(sourcePath);

  if (existsDestPath) throw new Error('FS operation failed');

  if (existsSourcePath && !existsDestPath) {
    cp(sourcePath, destPath, { recursive: true }).then(() =>
      console.log('Files successfully copied')
    );
  } else {
    throw new Error('FS operation failed');
  }
};

await copy();
