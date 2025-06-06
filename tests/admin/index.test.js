import { run as runMessages } from './messages.test.js';
import { run as runTcodes } from './tcodes.test.js';

export async function run() {
  console.log('🔹 /admin/messages...');
  await runMessages();

  console.log('🔹 /admin/tcodes...');
  await runTcodes();

  
}


if (process.env.NODE_ENV === 'test') {
  run().catch(err => {
    console.error('❌ Public API test failed:', err);
    process.exit(1);
  });
}
