import Koa, { Request, Response, Context } from 'koa';
import Router from '@koa/router';
import bodyparser from 'koa-bodyparser';
import { graphqlHTTP } from 'koa-graphql';
import { schema } from './graphql/schema';
import { getAllDataLoaders } from './graphql/loaderRegister';
import { getContext } from './getContext';
import { getUser } from './modules/user/userAuth';
import cors from '@koa/cors';
const app = new Koa();
const router = new Router();

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
app.use(cors());
app.use(bodyparser());
app.use(router.routes()).use(router.allowedMethods());

export default app;
