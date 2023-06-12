import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import {createHash} from 'crypto'
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePath = path.join(__dirname, '/files', 'fileToCalculateHashFor.txt');

const fileExists = async (path) => !!(await fs.stat(path).catch((e) => false));

const calculateHash = async () => {
  const isFilePathExist = await fileExists(filePath);
  if (!isFilePathExist) throw new Error('FS operation failed');

  const fileData = await fs.readFile(filePath, { encoding: 'utf8' });
  const hashObject = createHash('sha256');

  hashObject.update(fileData);

  const hasHex = hashObject.digest('hex');
  console.log(hasHex);


};

await calculateHash();