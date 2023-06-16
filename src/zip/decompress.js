import { stat } from 'fs/promises';
import { createUnzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import { fileExists } from '../utils/utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.join(__dirname, '/files', 'archive.gz');
const destPath = path.join(__dirname, '/files', 'fileToCompress.txt');

const decompress = async () => {
  const isSourceFilePathExist = await fileExists(sourcePath);
  if (!isSourceFilePathExist) throw new Error('FS operation failed');

 /*  const isDestFilePathExist = await fileExists(destPath);
  if (isDestFilePathExist) throw new Error('FS operation failed'); */

  const unzip = createUnzip();
  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(destPath);

  readStream
    .pipe(unzip)
    .pipe(writeStream)
    .on('finish', () => {
      console.log(`File has been uncompressed successfully.`);
    });
};

await decompress();
