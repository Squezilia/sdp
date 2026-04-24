import { loadPackageDefinition } from '@grpc/grpc-js';
import { load, loadSync } from '@grpc/proto-loader';
import type { ProtoGrpcType as ClusterGrpcType } from '../dist/cluster';

export async function LoadCluster(): Promise<ClusterGrpcType> {
  const packageDefinition = loadSync(
    'packages/proto/src/ims/cluster/cluster.proto'
  );
  return loadPackageDefinition(packageDefinition) as unknown as ClusterGrpcType;
}
