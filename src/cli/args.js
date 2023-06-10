const parseArgs = () => {

  if (process.argv.length === 2) {
    console.error('Expected at least one argument!');
    process.exit(1);
  }

  const pairs = process.argv.slice(2);

  for (let i = 0; i < pairs.length; i = i + 2) {
    const prop = pairs[i].slice(2);
    const value = pairs[i + 1];
    console.log(`${prop} is ${value}`);
  }
};

parseArgs();
