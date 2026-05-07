import { Server, ServerCredentials } from '@grpc/grpc-js';
import logger from '@sdp/config/logger';
import cluster from './func/cluster';
import credentials from './func/credentials';

import { join } from 'path';
import TPM2_TSS_TCTILDR from '../lib/ffi/tpm2-tss/tctildr';
import TPM2_TSS_ESYS from '../lib/ffi/tpm2-tss/esys';

const server = new Server({});
const IMS_HOST = `${import.meta.env.IMS_HOST}:${import.meta.env.IMS_PORT}`;

const tcti = new TPM2_TSS_TCTILDR(
  import.meta.env.IMS_TSS2_TCTI || 'device:/tpm/tpm0'
);

const tpm = new TPM2_TSS_ESYS(tcti);
const random = tpm.Esys_GetRandom(32);

console.log(random.buffer);

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
