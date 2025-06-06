import { run as runAdmin } from './admin/index.test.js';
import { run as runPublic } from './public/index.test.js';

console.log("🧪 Running All Tests\n");

const runAll = async () => {
  try {
    console.log("🛠 Admin API Tests:");
    await runAdmin();
    console.log("✅ Admin API passed\n");

    console.log("🎓 Public API Tests:");
    await runPublic();
    console.log("✅ Public API passed\n");
  } catch (err) {
    console.error("❌ Test failed:", err);
    process.exit(1);
  }
};

runAll();
