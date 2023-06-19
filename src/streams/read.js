import { createReadStream } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import { fileExists } from '../utils/utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '/files', 'fileToRead.txt');

const read = async () => {
  const isFilePathExist = await fileExists(filePath);
  if (!isFilePathExist) throw new Error('FS operation failed');

  const readStream = createReadStream(filePath, { encoding: 'utf8' });
  readStream.pipe(process.stdout);
};

await read();
