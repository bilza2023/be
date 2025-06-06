import { runRestCrudTest } from '../restTester.js';

export async function run() {
  const uniqueId = `test-tcode-${Date.now()}`;
  await runRestCrudTest({
    route: '/admin/tcodes',
    sample: {
      id: uniqueId,
      tcode: 'fbise9math',
      chapter: 1,
      exercise: '1.1',
      title: 'Raw Test Title',
      body: 'Test body',
      tags: 'raw,test',
      sortOrder: 999,
      slides: { type: 'text', content: 'hello raw test' }
    },
    headers: { 'x-admin-secret': process.env.ADMIN_SECRET || 'your-secret' }
  });
}
