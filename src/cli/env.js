const parseEnv = () => {
  const keys = Object.keys(process.env).filter((key) => key.includes('RSS'));

  console.table(keys.map((key)=> {
    return {
      key: key,
      value: process.env[key]
    }
  }))
};

parseEnv();
