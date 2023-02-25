import * as os from 'os';

import logger from './logger';
import bootstrap from './bootstrap';
 
const cluster = require('node:cluster');
const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  logger.info(`Master server started on ${process.pid}`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    logger.info(`Worker ${worker.process.pid} died. Restarting`);
    cluster.fork();
  });
} else {
  logger.info(`Cluster server started on ${process.pid}`);
  bootstrap();
}
