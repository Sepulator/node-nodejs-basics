import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { Worker } from 'worker_threads';
import { availableParallelism } from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePathWorker = join(__dirname, 'worker.js');

const spawnChildProcess = async (args) => {
  // Write your code here
};

// Put your arguments in function call to test this functionality
spawnChildProcess(/* [someArgument1, someArgument2, ...] */);
