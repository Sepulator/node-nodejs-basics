import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { spawn } from 'child_process';
import { stdin, stdout } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePathScript = join(__dirname, 'files', 'script.js');

const spawnChildProcess = async (args) => {
  const childProcess = spawn('node', [filePathScript, ...(args || [])], {
    stdio: ['pipe', 'pipe', 'pipe'],
  });

  stdin.pipe(childProcess.stdin);

  childProcess.stdout.pipe(stdout);

  childProcess.on('error', (error) => {
    console.error(`Child process error: ${error.message}`);
  });

  return childProcess;
};

spawnChildProcess(['arg1', 'arg2', 'arg3']);
