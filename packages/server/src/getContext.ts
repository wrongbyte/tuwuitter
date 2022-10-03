import { Request } from 'koa';
import { User } from './modules/user/userModel';
import { DataLoaders, getAllDataLoaders } from './graphql/loaderRegister';
// import { createPubSub, PubSub } from 'graphql-yoga'
import { PubSub } from 'graphql-subscriptions';
const pubSub = new PubSub();
//TODO: type pubSub correctly

export type GraphQLContext = {
  user?: User;
  dataloaders: DataLoaders;
  pubSub: any;
};

type ContextVars = {
  req?: Request;
  user?: User | null;
};

export const getContext = async (ctx: ContextVars) => {
  const dataloaders = getAllDataLoaders();

  return {
    req: ctx.req,
    dataloaders,
    user: ctx.user,
    pubSub,
  } as GraphQLContext;
};
