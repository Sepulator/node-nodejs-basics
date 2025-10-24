import { stdin, stdout } from 'process';
import { Transform } from 'stream';
import { pipeline } from 'stream/promises';

const transform = async () => {
  const reverse = new Transform({
    transform(data, enc, cb) {
      const reversedData =
        data.toString().split('').reverse('').join('') + '\n';
      cb(null, reversedData);
    },
  });

  try {
    pipeline(stdin, reverse, stdout);
  } catch (error) {
    console.error(`⚠️ Error transforming stream: ${error.message}`);
  }
};

await transform();
