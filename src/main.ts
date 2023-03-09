import * as os from 'os';

import bootstrap from './bootstrap';
import logger from './logger';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cluster = require('node:cluster');

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  logger.info(`Master server started on ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, _code, _signal) => {
    logger.info(`Worker ${worker.process.pid} died. Restarting`);
    cluster.fork();
  });
} else {
  logger.info(`Cluster server started on ${process.pid}`);
  bootstrap();
}
