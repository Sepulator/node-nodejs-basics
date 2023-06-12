import { stat } from 'fs/promises';
import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '/files', 'fileToWrite.txt');

const fileExists = async (path) => !!(await stat(path).catch((e) => false));

const write = async () => {
  const isFilePathExist = await fileExists(filePath);
  if (!isFilePathExist) throw new Error('FS operation failed');

  const writeStream = createWriteStream(filePath, { encoding: 'utf8' });
  process.stdin.pipe(writeStream);
  console.log('Inputs will be written to fileToWrite.txt. Press CTRL+C to exit.');

  process.stdin.on('error', (err) => {
    console.error(`Handle reading errors: ${err}`);
  });

  writeStream.on('error', (err) => {
    console.error(`Handle writing errors: ${err}`);
  });

  process.on('SIGINT', () => {
    console.log('Write Stream closed');
    writeStream.end();
    process.exit();
  });

};

await write();
