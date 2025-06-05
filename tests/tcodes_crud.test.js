// tests/test_tcodes_crud.js
import { runRestCrudTest } from './restTester.js';

export async function run() {
  await runRestCrudTest({
    route: '/admin/tcodes',
    sample: {
      id: 'test-tcode-001',
      tcode: 'fbise9math',
      chapter: 1,
      exercise: '1.1',
      title: 'Raw Test Title',
      body: 'Test body',
      tags: 'raw,test',
      sortOrder: 999,
      slides: { type: 'text', content: 'hello raw test' }
    },
    headers: { 'x-admin-secret': 'your-secret' }
  });
}