import { writeFile } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const create = async (fileName, folderName, text) => {
  try {
    const folderPath = join(__dirname, folderName);
    const filePath = join(folderPath, fileName);

    await writeFile(filePath, text, 'utf-8');

    console.log(`✅ Successfully wrote to ${fileName}`);
  } catch (error) {
    console.error(`⚠️  FS operation failed: ${error.message}`);
  }
};

await create('fresh.txt', 'files', 'I am fresh and young');
