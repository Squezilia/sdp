import { Server, ServerCredentials } from '@grpc/grpc-js';
import logger from '@sdp/config/logger';
import cluster from './func/cluster';
import credentials from './func/credentials';

import TSS2 from '../lib/ffi/tpm2-tss/fapi';
import { join } from 'path';

const server = new Server({});
const IMS_HOST = `${import.meta.env.IMS_HOST}:${import.meta.env.IMS_PORT}`;

process.env.TSS2_FAPICONF = join(process.cwd(), 'fapi-config.json');
process.env.TSS2_LOGLEVEL = 'fapi:debug';

async function init() {
  await cluster(server);
  await credentials(server);

  logger.info('IMS Initialized');

  // const tss2 = new TSS2();
  // const bytes = tss2.Fapi_GetRandom(32);
  // logger.info('Random bytes:');
  // console.log(bytes);

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
