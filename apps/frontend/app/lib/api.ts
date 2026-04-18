import type { App } from '@sdp/backend/main';
import { treaty } from '@elysiajs/eden';

export default treaty<App>(
  import.meta.env.apiBaseUrl || 'http://localhost:3000',
  {
    throwHttpError: true,
  }
);
