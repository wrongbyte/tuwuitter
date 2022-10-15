import { GraphQLSchema } from 'graphql';
import { MutationType } from './mutationType';
import { QueryType } from './queryType';
import { SubscriptionType } from './subscriptionType';

export const schema = new GraphQLSchema({
  query: QueryType,
  mutation: MutationType,
  subscription: SubscriptionType,
});
