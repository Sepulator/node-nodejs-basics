import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '/files', 'fileToRemove.txt');

const remove = async () => {
  await fs
    .unlink(filePath)
    .then(() => console.log('File deleted successfully.'))
    .catch((e) => {
      throw new Error('FS operation failed');
    });
};

await remove();
