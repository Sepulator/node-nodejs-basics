import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { createReadStream } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, 'files', 'fileToRead.txt');

const read = async (filePath) => {
  try {
    const input = createReadStream(filePath, { encoding: 'utf8' });
    for await (const chunk of input) {
      console.log(chunk);
    }
  } catch (error) {
    console.error(`⚠️ Error reading file: ${error.message}`);
  }
};

await read(filePath);
