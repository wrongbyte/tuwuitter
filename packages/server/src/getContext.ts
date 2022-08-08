import { Request } from 'koa';
import { User } from './modules/user/userModel';
import { DataLoaders, getAllDataLoaders } from './graphql/loaderRegister';

export type GraphQLContext = {
  user?: User;
  dataloaders: DataLoaders;
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
  } as GraphQLContext;
};
