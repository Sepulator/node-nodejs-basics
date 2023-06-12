import { stat } from 'fs/promises';
import { Transform } from 'stream';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '/files', 'fileToWrite.txt');

const fileExists = async (path) => !!(await stat(path).catch((e) => false));

const transform = async () => {
  const isFilePathExist = await fileExists(filePath);
  if (!isFilePathExist) throw new Error('FS operation failed');
  console.log('Type text and press Enter:');
  const reverseStream = new Transform({
    transform(chunk, _encoding, callback) {
      const reversedChunk =
        chunk.toString().split('').reverse().join('') + '\n';
      callback(null, reversedChunk);
    },
  });

  process.stdin.pipe(reverseStream).pipe(process.stdout);
};

await transform();
