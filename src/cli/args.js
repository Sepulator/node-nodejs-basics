import { argv } from 'node:process';

const parseArgs = () => {
  const args = argv.slice(2);
  const formatted = [];

  for (let index = 0; index < args.length; index += 2) {
    if (args[index].startsWith('--')) {
      formatted.push(`${args[index].slice(2)} is ${args[index + 1]}`);
    }
  }

  console.log(formatted.join(', '));
};

parseArgs();
