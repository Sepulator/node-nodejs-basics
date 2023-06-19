import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import { fileExists } from '../utils/utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '/files', 'fileToRead.txt');

const read = async () => {
  const isFilePathExist = await fileExists(filePath);
  if (!isFilePathExist) throw new Error('FS operation failed');

  const contents = await fs.readFile(filePath, { encoding: 'utf8' });
  console.log(contents);
};

await read();
