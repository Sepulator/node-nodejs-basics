import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';

import { fileExists } from '../utils/utils.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '/files', 'script.js');

const spawnChildProcess = async (args) => {
  // Write your code here
  const isFilePathExist = await fileExists(filePath);
  if (!isFilePathExist) throw new Error('FS operation failed');

  const child = spawn('node', [filePath, ...args]);
  process.stdin.pipe(child.stdin);
  child.stdout.pipe(process.stdout);

  child.stderr.on('data', (data) => {
    console.error(`child error: ${data}`);
  });

  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['--someArgument1', '--someArgument2']);
