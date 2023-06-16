import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '/files', 'fileToRemove.txt');

const remove = async () => {
  await fs
    .unlink(filePath)
    .then(() => console.log('File successfully deleted.'))
    .catch((e) => {
      throw new Error('FS operation failed');
    });
};

await remove();
