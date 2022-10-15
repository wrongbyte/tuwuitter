import { Request } from 'koa';
import { User } from './modules/user/userModel';
import { DataLoaders, getAllDataLoaders } from './graphql/loaderRegister';
import { PubSub } from 'graphql-subscriptions';
export const pubSub = new PubSub();

export type GraphQLContext = {
  req?: Request;
  user?: User;
  dataloaders: DataLoaders;
};

type ContextVars = {
  user?: any;
  req?: Request;
};

export const getContext = async (ctx: ContextVars) => {
  const dataloaders = getAllDataLoaders();

  return {
    req: ctx.req,
    dataloaders,
    user: ctx.user,
  } as GraphQLContext;
};
