import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePathSource = join(__dirname, 'files', 'fileToCompress.txt');
const filePathDestination = join(__dirname, 'files', 'archive.gz');

const compress = async (filePathSource, filePathDestination) => {
  try {
    const gzip = createGzip();
    const source = createReadStream(filePathSource);
    const destination = createWriteStream(filePathDestination, { flags: 'w' });
    await pipeline(source, gzip, destination);
    console.log('✅ File successfully compressed');
  } catch (error) {
    console.error(`⚠️Error transforming stream: ${error.message}`);
  }
};

await compress(filePathSource, filePathDestination);
