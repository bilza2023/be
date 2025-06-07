// tests/utils/testSetup.js

const { connectToTestMongo } = require('./testMongo');
const { User, Message } = require('../../mongo/models');

beforeAll(async () => {
  await connectToTestMongo();
  await User.deleteMany({});
  await Message.deleteMany({});
});

afterAll(() => {
  // No disconnect here — teardown.js handles full drop and shutdown
});
