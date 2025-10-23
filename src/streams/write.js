import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { createWriteStream } from 'fs';
import { stdin } from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filePath = join(__dirname, 'files', 'fileToWrite.txt');

const write = async (filePath) => {
  try {
    const input = createWriteStream(filePath, { encoding: 'utf8' });
    stdin.pipe(input);

    console.log(
      'Inputs will be written to fileToWrite.txt. Press CTRL+C to exit.'
    );

    process.on('SIGINT', () => {
      console.log('\n✅ Write Stream closed');
      input.end();
      process.exit();
    });
  } catch (error) {
    console.error(`⚠️ Error writing file: ${error.message}`);
  }
};

await write(filePath);
