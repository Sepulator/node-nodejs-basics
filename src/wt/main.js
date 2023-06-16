import { availableParallelism } from 'os';
import { Worker } from 'worker_threads';

const filePath = new URL('worker.js', import.meta.url);
const START_NUM = 10;

const runWorkerThread = async (num) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker(filePath, {
      workerData: num,
    });

    worker.on('message', (value) => {
      resolve({
        status: 'resolved',
        data: value,
      });
    });

    worker.on('error', () => {
      reject({
        status: 'error',
        data: null,
      });
    });
  });
};

const performCalculations = async () => {
  const threadsNum = availableParallelism();
  const workerThreads = [];

  for (let i = 0; i < threadsNum; i++) {
    const data = i + START_NUM;
    const workerThread = await runWorkerThread(data);
    workerThreads.push(workerThread);
  }

  const results = await Promise.all(workerThreads);
  console.log(results);
};

await performCalculations();
