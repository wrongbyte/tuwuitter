import Koa, { Request, Response, Context } from 'koa';
import Router from '@koa/router';
import bodyparser from 'koa-bodyparser';
import { graphqlHTTP } from 'koa-graphql';
import { schema } from './graphql/schema';
import { getContext } from './getContext';
import { getUser } from './modules/user/userAuth';
import path from 'path';
import cors from '@koa/cors';
import serve from 'koa-static';
import mount from 'koa-mount';
const app = new Koa();

const static_pages = new Koa();
const router = new Router();

const REACT_ROUTER_PATHS = ['/login', '/home', '/user/'];

const graphqlSettingsPerRequest = async (
  _req: Request,
  _res: Response,
  ctx: Context
) => {
  const { user } = await getUser(_req.header.authorization);

  return {
    schema: schema,
    graphiql: true,
    pretty: true,
    context: await getContext({ user }),
  };
};

const graphqlServer = graphqlHTTP(graphqlSettingsPerRequest);

router.all('/graphql', graphqlServer);

static_pages.use(serve(path.resolve(__dirname + '../../../client/dist')));

app
  .use(async (ctx, next) => {
    if (REACT_ROUTER_PATHS.includes(ctx.request.path)) {
      ctx.request.path = '/';
    }
    await next();
  })
  .use(mount('/', static_pages));

app.use(cors());
app.use(bodyparser());
app.use(router.routes()).use(router.allowedMethods());

export default app;
