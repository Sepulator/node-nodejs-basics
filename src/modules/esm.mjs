import path from 'path';
import { release, version } from 'os';
import { createServer as createServerHttp } from 'http';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import './files/c.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const random = Math.random();
const unknownObject =
  random > 0.5
    ? JSON.parse(await fs.readFile(path.join(__dirname, '/files', 'a.json')))
    : JSON.parse(await fs.readFile(path.join(__dirname, '/files', 'b.json')));

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${path.sep}"`);

console.log(`Path to current file is ${__filename}`);
console.log(`Path to current directory is ${__dirname}`);

const myServer = createServerHttp((_, res) => {
  res.end('Request accepted');
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  console.log('To terminate it, use Ctrl+C combination');
});

export { unknownObject, myServer };
