import * as child from 'child_process'

const execSync = child.execSync;

const client = process.argv[2] || 'demo';
const port = process.argv[3] || (client === 'icon' ? '5001' : '5000');

console.log(client)
if(client === "icon") {
  console.log(`Starting icon client on port ${port}`);
  execSync(`http-server ./serve -p ${port}`);
} else {
  console.log(`Starting nelson client configuration for client ${client} on port ${port}`);
  execSync(`http-server ./serve/clients/${client} -p ${port}`);
}