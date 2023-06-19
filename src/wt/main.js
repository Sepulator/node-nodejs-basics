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
  console.log('Availbale threads: ', threadsNum);
  const workerThreads = [];

  for (let i = 0; i < threadsNum; i++) {
    const num = i + START_NUM;
    const workerThread = await runWorkerThread(num);
    workerThreads.push(workerThread);
  }

  const results = await Promise.all(workerThreads);
  console.table(
    results.map((value) => {
      return {
        'status': value.status,
        'data': value.data,
      };
    })
  );
};

await performCalculations();
