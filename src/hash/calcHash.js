import { fileURLToPath } from 'url';
import { createHash } from 'crypto';
import { join, dirname } from 'path';
import { createReadStream } from 'fs';

import { pipeline } from 'stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async (filePath) => {
  const hash = createHash('sha256');
  const input = createReadStream(filePath);

  try {
    await pipeline(input, hash);
    console.log(hash.digest('hex'));
  } catch (error) {
    console.error(`⚠️ Failed to calculate hash: ${error.message}`);
  }
};

await calculateHash(filePath);
