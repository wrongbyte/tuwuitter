import { GraphQLSchema } from 'graphql';
import { MutationType } from './mutationType';
import { QueryType } from './queryType';

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
});
