import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';

const app = new Elysia().use(swagger()).get('/', () => 'Hello Lena!!');

app.listen(3000);

console.log(`🦊 Lena backend is running on http://localhost:3000`);

export type App = typeof app;
