import { Server } from '@grpc/grpc-js';
import { LoadCluster } from '@sdp/proto';
import type { ClusterServiceHandlers } from '@sdp/proto/generated/ims/cluster/ClusterService';

const server = new Server();

async function init() {
  const cluster = await LoadCluster();
  server.addService(cluster.ims.cluster.ClusterService.service, {
    InitCluster: (call, cb) => {},
  } as ClusterServiceHandlers);

  console.log('IMS Started');
}

init();
