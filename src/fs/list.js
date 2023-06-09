import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dirPath = path.join(__dirname, '/files');

const fileExists = async (path) => !!(await fs.stat(path).catch((e) => false));

const list = async () => {
  const isDirExist = await fileExists(dirPath);
  if (!isDirExist) throw new Error('FS operation failed');
  const files = await fs.readdir(dirPath);
  console.table(
    files.map((file) => {
      const ext = path.extname(file);
      return {
        'File Name': path.basename(file, ext),
        'Extension': ext,
      };
    })
  );
};

await list();
