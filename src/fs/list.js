import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

import { fileExists } from '../utils/utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dirPath = path.join(__dirname, '/files');

const list = async () => {
  const isDirExist = await fileExists(dirPath);

  if (!isDirExist) throw new Error('FS operation failed');
  
  const files = await fs.readdir(dirPath);
  console.table(
    files.map((file) => {
      const ext = path.extname(file);
      return {
        'File Name': path.basename(file, ext),
        'Extension': ext.slice(1),
      };
    })
  );
};

await list();
