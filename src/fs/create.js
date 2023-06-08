import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '/files', 'fresh.txt');
const content = 'I am fresh and young';

const create = async () => {
  try {
    await writeFile(filePath, content, { flag: 'wx' });
  } catch (err) {
    if (err.code === 'EEXIST') {
      throw new Error('FS operation failed');
    }
    console.log(err)
  }
};

await create();
