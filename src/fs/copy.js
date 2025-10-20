import { cp, stat } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const copy = async (folder, folderCopy) => {
  try {
    const folderPath = join(__dirname, folder);
    const folderPathCopy = join(__dirname, folderCopy);

    await stat(folderPath);

    try {
      await stat(folderPathCopy);

      throw new Error(`Destination folder '${folderCopy}' already exists.`);
    } catch (err) {
      if (err.code !== 'ENOENT') {
        throw err;
      }
    }

    await cp(folderPath, folderPathCopy, { recursive: true });

    console.log('✅ Successfully copied');
  } catch (error) {
    console.error(`⚠️  FS operation failed: ${error.message}`);
  }
};

await copy('files', 'files_copy');
