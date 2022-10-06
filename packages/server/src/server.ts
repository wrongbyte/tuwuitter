import Koa from 'koa';
import Router from '@koa/router';
import bodyparser from 'koa-bodyparser';
import { schema } from './graphql/schema';
import { getContext } from './getContext';
import { getUser } from './modules/user/userAuth';
import path from 'path';
import cors from '@koa/cors';
import serve from 'koa-static';
import mount from 'koa-mount';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  shouldRenderGraphiQL,
  sendResult,
} from 'graphql-helix';
const app = new Koa();

const static_pages = new Koa();
const router = new Router();

const REACT_ROUTER_PATHS = ['/login', '/home'];

const server = new WebSocketServer({
  port: 4000,
  path: '/graphql',
});

useServer({ schema }, server);

console.log('Listening to port 4000');

router.all('/graphql', async (ctx, _) => {
  const { user } = await getUser(ctx.header.authorization);
  const request = {
    body: ctx.request.body,
    headers: ctx.request.headers,
    method: ctx.request.method,
    query: ctx.request.query,
  };

  if (shouldRenderGraphiQL(request)) {
    ctx.response.body = renderGraphiQL({});
  } else {
    const { operationName, query, variables } = getGraphQLParameters(request);

    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      schema,
      contextFactory: () => {
        return getContext({ user });
      },
    });

    ctx.respond = false;
    sendResult(result, ctx.res);
  }
});

static_pages.use(serve(path.resolve(__dirname + '../../../../client/dist')));

app
  .use(async (ctx, next) => {
    if (
      REACT_ROUTER_PATHS.includes(ctx.request.path) ||
      ctx.request.path.match('/user/')
    ) {
      ctx.request.path = '/';
    }
    await next();
  })
  .use(mount('/', static_pages));

app.use(cors());
app.use(bodyparser());
app.use(router.routes()).use(router.allowedMethods());

export default app;
