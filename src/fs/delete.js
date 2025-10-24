import { unlink } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const fileName = join(__dirname, 'files', 'fileToRemove.txt');

const remove = async (fileName) => {
  try {
    await unlink(fileName);
    console.log('✅ Successfully removed');
  } catch (error) {
    console.error(`⚠️ FS operation failed: ${error.message}`);
  }
};

await remove(fileName);
