import { rename as renameFS, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fileName = join(__dirname, 'files', 'wrongFilename.txt');
const fileNameNew = join(__dirname, 'files', 'properFilename.md');

const rename = async (fileName, fileNameNew) => {
  try {
    await stat(fileName);

    try {
      await stat(fileNameNew);
      throw new Error(`File '${fileNameNew}' already exists.`);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }

    await renameFS(fileName, fileNameNew);
    console.log('✅ Successfully renamed');
  } catch (error) {
    console.error(`⚠️ FS operation failed: ${error.message}`);
  }
};

await rename(fileName, fileNameNew);
