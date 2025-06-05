
// tests/main.test.js
import { run as runMessagesTest } from './admin_messages.test.js';
import { run as runTcodesTest } from './tcodes_crud.test.js';

console.log("🧪 Running All Tests\n");

const runAll = async () => {
  try {
    console.log("🔹 Testing /admin/messages...");
    await runMessagesTest();
    console.log("✅ Messages test passed\n");

    console.log("🔹 Testing /admin/tcodes...");
    await runTcodesTest();
    console.log("✅ Tcodes CRUD test passed\n");
  } catch (err) {
    console.error("❌ Test failed:", err);
    process.exit(1);
  }
};

runAll();
