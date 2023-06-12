import { stat } from 'fs/promises';
import { createGzip } from 'zlib';
import { createReadStream, createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sourcePath = path.join(__dirname, '/files', 'fileToCompress.txt');
const destPath = path.join(__dirname, '/files', 'archive.gz');

const fileExists = async (path) => !!(await stat(path).catch((e) => false));

const compress = async () => {
  const isSourceFilePathExist = await fileExists(sourcePath);
  if (!isSourceFilePathExist) throw new Error('FS operation failed');

  const isDestFilePathExist = await fileExists(destPath);
  if (isDestFilePathExist) throw new Error('FS operation failed');

  const gzip = createGzip();
  const readStream = createReadStream(sourcePath);
  const writeStream = createWriteStream(destPath);

  readStream
    .pipe(gzip)
    .pipe(writeStream)
    .on('finish', () => {
      console.log(`File has been compressed successfully.`);
    });
};

await compress();
