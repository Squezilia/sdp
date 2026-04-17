// index.ts
import cluster from 'node:cluster';
import os from 'node:os';
import process from 'node:process';
import logger from './lib/logger';

if (import.meta.env.NODE_ENV == 'development')
  logger.warn('Running in development mode!');

if (cluster.isPrimary && import.meta.env.NODE_ENV == 'production') {
  const workers = os.availableParallelism();
  logger.info(`Spawning ${workers} workers…`);

  for (let i = 0; i < workers; i++) {
    const worker = cluster.fork();
    worker.on('online', () =>
      logger.info(`✅ Worker ${worker.process.pid} online`)
    );
    worker.on('exit', (code, signal) => {
      logger.warn(
        `⚠️ Worker ${worker.process.pid} died (code=${code}, signal=${signal}) - restarting`
      );
      cluster.fork();
    });
  }

  // Keep the master alive
  process.stdin.resume();
} else {
  // Workers load the real server
  await import('./main');
  logger.info(`🚀 Worker ${process.pid} started`);
}
