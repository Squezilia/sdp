import { createAuthClient } from 'better-auth/vue';
import { organizationClient, usernameClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: 'http://localhost:3000',
  plugins: [usernameClient(), organizationClient()],
});
