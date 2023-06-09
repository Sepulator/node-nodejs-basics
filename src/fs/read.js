import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '/files', 'fileToRead.txt');

const fileExists = async (path) => !!(await fs.stat(path).catch((e) => false));

const read = async () => {
  const isFilePathExist = await fileExists(filePath);
  if (!isFilePathExist) throw new Error('FS operation failed');

  const contents = await fs.readFile(filePath, { encoding: 'utf8' });
  console.log(contents);
};

await read();
