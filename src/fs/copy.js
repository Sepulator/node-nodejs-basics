import { cp, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const folderPath = join(__dirname, 'files');
const folderPathCopy = join(__dirname, 'files_copy');

const copy = async (folderPath, folderPathCopy) => {
  try {
    await stat(folderPath);

    try {
      await stat(folderPathCopy);

      throw new Error(`Destination folder '${folderPathCopy}' already exists.`);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }

    await cp(folderPath, folderPathCopy, { recursive: true });

    console.log('✅ Successfully copied');
  } catch (error) {
    console.error(`⚠️ FS operation failed: ${error.message}`);
  }
};

await copy(folderPath, folderPathCopy);
