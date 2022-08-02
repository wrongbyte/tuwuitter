import Koa from 'koa';
import Router from '@koa/router';
import bodyparser from 'koa-bodyparser';
import { graphqlHTTP } from 'koa-graphql';
import { schema } from './graphql/schema';
import cors from '@koa/cors';
const app = new Koa();
const router = new Router();

router.get('/', (ctx, next) => {
  console.log('test');
});

router.all(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.use(cors());
app.use(bodyparser());
app.use(router.routes()).use(router.allowedMethods());

export default app;
