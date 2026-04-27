import type { Server } from '@grpc/grpc-js';
import { LoadCredentials } from '@sdp/proto';
import type { CredentialsServiceHandlers } from '@sdp/proto/generated/ims/credentials/CredentialsService';
import prisma from '@sdp/ims-db';

import { generateKey, randomBytes, createCipheriv } from 'node:crypto';

export default async (server: Server) =>
  server.addService(
    (await LoadCredentials()).ims.credentials.CredentialsService.service,
    {
      CreateCredential: async (call, cb) => {
        const iv = randomBytes(12);
        const key = randomBytes(32);
        const cipher = createCipheriv('aes-256-gcm', key, iv);

        let encrypted = '';

        cipher.setEncoding('hex');

        cipher.on('data', (chunk) => (encrypted += chunk));

        cipher.write(call.request.secret);
        cipher.final();
        const authTag = cipher.getAuthTag();

        await prisma.credential.create({
          data: {
            key: call.request.name,
            secret: `${key.toString('hex')}:${iv.toString('hex')}:${encrypted.toString()}:${authTag.toString('hex')}`,
          },
        });

        cb(null, {
          name: call.request.name,
          result: 'SUCCESS',
        });
      },
      DeleteCredential: async (call, cb) => {},
    } satisfies CredentialsServiceHandlers
  );
