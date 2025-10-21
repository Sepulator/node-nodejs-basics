import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, 'files', 'fileToRead.txt');

const read = async (filePath) => {
  try {
    const content = await readFile(filePath, { encoding: 'utf-8', flag: 'r' });
    console.log(content);
  } catch (error) {
    console.error(`⚠️ FS operation failed: ${error.message}`);
  }
};

await read(filePath);
