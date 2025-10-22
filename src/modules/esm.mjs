import { sep, dirname } from 'path';
import { fileURLToPath } from 'url';
import { release, type, version } from 'node:os';
import { createServer as createServerHttp } from 'node:http';

import './files/c.cjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const random = Math.random();
const options = { with: { type: 'json' } };

const unknownObject =
  random > 0.5
    ? await import('./files/a.json', options)
    : await import('./files/b.json', options);

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${sep}"`);

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
