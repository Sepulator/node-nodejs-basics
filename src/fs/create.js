import { writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '/files', 'fresh.txt');
const content = 'I am fresh and young';

const create = async () => {
  try {
    await writeFile(filePath, content, { flag: 'wx' });
    console.log('File successfully created');
  } catch (err) {
    if (err.code === 'EEXIST') {
      throw new Error('FS operation failed');
    }
    console.log(err)
  }
};

await create();
