import { writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const fileName = 'fresh.txt';
const text = 'I am fresh and young';
const folder = 'files';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async (fileName, folderName, text) => {
  try {
    const folderPath = join(__dirname, folderName);
    const filePath = join(folderPath, fileName);

    await writeFile(filePath, text, 'utf-8');

    console.log(`✅ Successfully wrote to ${filePath}`);
  } catch (error) {
    console.error(`FS operation failed`);
  }
};

await create(fileName, folder, text);
