import { createAccessControl } from 'better-auth/plugins/access';
import {
  defaultStatements,
  adminAc,
} from 'better-auth/plugins/organization/access';

export const statement = {
  ...defaultStatements,
  organization: ['update', 'delete', 'manage'],
  deployment: ['create', 'update', 'delete', 'view'],
  service: ['create', 'update', 'delete', 'view'],
  runner: ['run', 'stop', 'delete', 'create'],
} as const;

export const ac = createAccessControl(statement);

export const admin = ac.newRole({
  ...adminAc.statements,
  organization: ['update', 'delete', 'manage'],
  deployment: ['create', 'update', 'delete', 'view'],
  service: ['create', 'update', 'delete', 'view'],
  runner: ['run', 'stop', 'delete', 'create'],
});

export const owner = ac.newRole({
  organization: ['update', 'delete', 'manage'],
  deployment: ['create', 'update', 'delete', 'view'],
  service: ['create', 'update', 'delete', 'view'],
  runner: ['run', 'stop', 'delete', 'create'],
});
