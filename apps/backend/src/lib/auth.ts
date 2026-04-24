import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import prisma from '@sdp/app-db';
import { username, organization } from 'better-auth/plugins';
import Elysia, { status } from 'elysia';
import { ac, admin, owner, statement } from './organizations';
import tr from '../i18n/tr';

type InferPermissionsFromStatement<
  T extends Record<Readonly<string>, Readonly<string[]>>,
> = {
  [k in keyof T]: T[k][number][] | undefined;
};

export const auth = betterAuth({
  trustedOrigins: ['http://localhost:8080'],
  emailAndPassword: {
    enabled: true,
  },
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  appName: 'SDP',
  plugins: [
    username(),
    organization({
      ac,
      roles: {
        admin,
        owner,
      },
    }),
  ],
});

export const authMacro = new Elysia({ name: 'better-auth' }).macro({
  auth: {
    async resolve({ status, request: { headers } }) {
      const session = await auth.api.getSession({
        headers,
      });

      if (!session)
        return status(401, {
          error: 'Oturum Hatası',
          reason: 'Oturumunuz açık değil.',
        });

      return {
        user: session.user,
        session: session.session,
      };
    },
  },
  permissions: (
    permissions: Partial<InferPermissionsFromStatement<typeof statement>>
  ) => {
    return {
      beforeHandle: async ({ request: { headers }, set }) => {
        if (
          !(await auth.api.hasPermission({
            headers,
            body: { permissions },
          }))
        )
          throw status(403, tr.error.organization.insufficentPermission);
      },
    };
  },
});
