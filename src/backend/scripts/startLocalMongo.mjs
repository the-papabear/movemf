import { runCommand } from './runCommand.mjs';

(async function run() {
  startMongoDBInstance();

  async function startMongoDBInstance() {
    const cmd = `
      docker run -dit --rm --name mongodb \
        -p 27017:27017 \
        mongo --replSet rs0 --bind_ip 0.0.0.0 && \
      sleep 2 && \
      docker exec mongodb mongosh --eval "rs.initiate({ _id: \\"rs0\\", members: [{ _id: 0, host: \\"localhost:27017\\" }] });"
    `;

    await runCommand(cmd, 'Starting local MongoDB instance...');
  }
})();
