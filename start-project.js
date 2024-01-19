const execSync = require('child_process').execSync;

const client = process.argv[2] || 'demo';

execSync(`http-server ./clients/${client} -p 5000`);