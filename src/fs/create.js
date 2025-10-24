import { writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, 'files', 'fresh.txt');

const create = async (filePath, text) => {
  try {
    await writeFile(filePath, text, { encoding: 'utf-8', flag: 'wx' });

    console.log('✅ Successfully wrote');
  } catch (error) {
    console.error(`⚠️ FS operation failed: ${error.message}`);
  }
};

await create(filePath, 'I am fresh and young');
