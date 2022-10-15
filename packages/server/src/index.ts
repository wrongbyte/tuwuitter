import app from './server';
import { connectDatabase } from './config/database';
import { PORT } from './config/environment';
import validateEnv from './utils/validateEnv';
import { schema } from './graphql/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { getContext } from './getContext';

validateEnv();

const init = async () => {
  try {
    connectDatabase();
  } catch (error) {
    console.log('Error in database connection:', error);
    process.exit(1);
  }
  const server = app.listen(PORT, () => {
    const wsServer = new WebSocketServer({
      server,
      path: '/graphql',
    });

    useServer(
      {
        schema,
        context: (ctx) =>
          getContext({
            req: ctx.extra.request as any,
            user: ctx.connectionParams.authorization,
          }),
      },
      wsServer
    );

    console.log(`Listening on port ${PORT}`);
  });
};

init();
