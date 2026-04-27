import { Server, ServerCredentials } from '@grpc/grpc-js';
import logger from '@sdp/config/logger';
import cluster from './func/cluster';
import credentials from './func/credentials';

const server = new Server({});
const IMS_HOST = `${import.meta.env.IMS_HOST}:${import.meta.env.IMS_PORT}`;

async function init() {
  await cluster(server);
  await credentials(server);

  logger.info('IMS Initialized');

  server.bindAsync(IMS_HOST, ServerCredentials.createInsecure(), (err) => {
    if (err) {
      logger.error("IMS couldn't started!");
      console.error(err);
      return;
    }
    logger.info(`Running on port ${IMS_HOST}`);
  });
}

init();
