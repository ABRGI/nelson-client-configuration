import * as child from 'child_process'

const execSync = child.execSync;

const client = process.argv[2] || 'demo';
const port = process.argv[3] || '5000';

console.log(`Starting nelson client configuration for client ${client} on port ${port}`);
execSync(`http-server ./clients/${client} -p ${port}`);