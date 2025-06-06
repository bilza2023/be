import { run as runUsers } from './users.test.js';
import { run as runMessages } from './messages.test.js';
import { run as runSubscription } from './subscription.test.js';

export async function run() {
  console.log('🔹 /users (register/login/me)...');
  await runUsers();

  console.log('🔹 /messages...');
  await runMessages();

  console.log('🔹 /me/subscription...');
  await runSubscription();
  

}


if (process.env.NODE_ENV === 'test') {
  run().catch(err => {
    console.error('❌ Public API test failed:', err);
    process.exit(1);
  });
}
