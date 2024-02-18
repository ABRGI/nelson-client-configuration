import * as child from 'child_process'

const execSync = child.execSync;

const client = process.argv[2] || 'demo';

execSync(`http-server ./clients/${client} -p 6000`);