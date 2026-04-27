import { loadPackageDefinition } from '@grpc/grpc-js';
import { load, loadSync } from '@grpc/proto-loader';
import type { ProtoGrpcType as ClusterGrpcType } from '../dist/cluster';
import type { ProtoGrpcType as CredentialsGrpcType } from '../dist/credentials';

export async function LoadCluster(): Promise<ClusterGrpcType> {
  const packageDefinition = loadSync('packages/proto/src/ims/cluster.proto');
  return loadPackageDefinition(packageDefinition) as unknown as ClusterGrpcType;
}

export async function LoadCredentials(): Promise<CredentialsGrpcType> {
  const packageDefinition = loadSync(
    'packages/proto/src/ims/credentials.proto'
  );
  return loadPackageDefinition(
    packageDefinition
  ) as unknown as CredentialsGrpcType;
}
