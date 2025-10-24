import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { createReadStream, createWriteStream } from 'fs';
import { createUnzip } from 'zlib';
import { pipeline } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePathSource = join(__dirname, 'files', 'archive.gz');
const filePathDestination = join(__dirname, 'files', 'fileToCompress.txt');

const decompress = async (filePathSource, filePathDestination) => {
  try {
    const unzip = createUnzip();
    const source = createReadStream(filePathSource);
    const destination = createWriteStream(filePathDestination, { flags: 'w' });
    await pipeline(source, unzip, destination);
    console.log('✅ File successfully decompressed');
  } catch (error) {
    console.error(`⚠️ Error decompressing: ${error.message}`);
  }
};

await decompress(filePathSource, filePathDestination);
