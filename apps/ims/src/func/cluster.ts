import type { Server } from '@grpc/grpc-js';
import { LoadCluster } from '@sdp/proto';
import type { ClusterServiceHandlers } from '@sdp/proto/generated/ims/cluster/ClusterService';

export default async (server: Server) =>
  server.addService((await LoadCluster()).ims.cluster.ClusterService.service, {
    InitCluster: (call, cb) => {},
    GetCluster: (call, cb) => {},
    GetClusters: (call, cb) => {},
    UpdateCluster: (call, cb) => {},
    DeleteCluster: (call, cb) => {},
  } satisfies ClusterServiceHandlers);
