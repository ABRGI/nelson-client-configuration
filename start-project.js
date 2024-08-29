import * as child from 'child_process'

const execSync = child.execSync;

const client = process.argv[2] || 'demo';
const port = process.argv[3] || (client === 'icon' ? '5001' : '5000');

if(client === "icon") {
  execSync(`http-server ./serve/icon -p ${port}`);
  console.log(`Started icon client on port ${port}`);
} else {
  execSync(`http-server ./serve/clients/${client} -p ${port}`);
  console.log(`Started nelson client configuration for client ${client} on port ${port}`);
}