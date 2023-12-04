import shell from 'shelljs';

import { runCommand } from './runCommand.mjs';

(async function run() {
  await stopLocalMongoDB();

  async function stopLocalMongoDB() {
    const cmd = `docker ps --filter "name=mongodb"`;
    const result = shell.exec(cmd, { silent: true });

    if (result.stdout.indexOf('mongodb') > 0) {
      const cmd = `docker kill mongodb`;
      await runCommand(cmd, 'Stopping local MongoDb instance...');
    }
  }
})();
