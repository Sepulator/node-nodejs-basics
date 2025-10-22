const parseEnv = () => {
  const vars = [];

  for (const key in process.env) {
    if (key.startsWith('RSS_')) {
      vars.push(`${key}=${process.env[key]}`);
    }
  }

  if (vars.length > 0) {
    const output = vars.join('; ');
    console.log(`✅ ${output}`);
  } else {
    console.log('⚠️ No environment variables with prefix RSS_.');
  }
};

parseEnv();
