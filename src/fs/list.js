import { readdir } from 'fs/promises';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const folderPath = join(__dirname, 'files');

const list = async (folderPath) => {
  try {
    const files = await readdir(folderPath, {
      recursive: true,
      withFileTypes: true,
    });

    console.log('✅ List of Files: \n');

    for (const file of files) {
      if (file.isFile) {
        console.log(file.name);
      }
    }
  } catch (error) {
    console.error(`⚠️ FS operation failed: ${error.message}`);
  }
};

await list(folderPath);
