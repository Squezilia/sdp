import { authMacro } from '@sdp/backend/lib/auth';
import Elysia from 'elysia';
import model from './model';
import { handleError } from '@sdp/backend/lib/error';

export default new Elysia()
  .use(handleError)
  .use(model)
  .use(authMacro)
  // get deployments
  .get('/', () => {}, {})
  // get deployment
  .get('/:id', () => {}, {})
  // create deployment
  .post('/', () => {}, {})
  // update deployment
  .patch('/:id', () => {}, {})
  // delete deployment
  .delete('/:id', () => {}, {});
