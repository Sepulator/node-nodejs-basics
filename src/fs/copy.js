import { cp, access, constants, stat } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sourcePath = path.join(__dirname, '/files');
const destPath = path.join(__dirname, '/files_copy');

const copy = async () => {
  try {
    await access(sourcePath, constants.R_OK | constants.W_OK);
  } catch (err) {
    if (err.code === 'ENOENT') {
      throw new Error('FS operation failed');
    }
    console.log(err);
  }

  try {
    const dir = await stat(destPath);
    if (dir.isDirectory()) {
      throw new Error('FS operation failed');
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      cp(sourcePath, destPath, { recursive: true });
      console.log('Files successfully copied');
    } else {
      console.log(err);
    }
  }
};

await copy();
