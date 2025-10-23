import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { Worker } from 'worker_threads';
import { availableParallelism } from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePathWorker = join(__dirname, 'worker.js');

const START_NUMBER = 10;
const THREADS_NUMBER = availableParallelism();

const startWorker = async (n) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(filePathWorker, {
      workerData: { n },
    });

    worker.on('message', (message) => {
      resolve({ status: 'resolved', data: message.result });
    });

    worker.on('error', () => {
      reject({ status: 'error', data: null });
    });
  });
};

const performCalculations = async () => {
  const workerPromises = [];

  for (let i = 0; i < THREADS_NUMBER; i++) {
    workerPromises.push(startWorker(START_NUMBER + i));
  }

  try {
    const results = await Promise.allSettled(workerPromises);

    console.table(
      results.map((result) => ({
        status: result.value.status,
        data: result.value.data,
      }))
    );
  } catch (error) {
    console.error(`Error performing calculations: ${error.message}`);
  }
};

await performCalculations();
