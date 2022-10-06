import { Environment, Network, RecordSource, Store, FetchFunction } from 'relay-runtime';

import { fetchGraphQL, setupSubscription } from './fetchGraphQL';

const fetchRelay: FetchFunction = async (params, variables) =>
  fetchGraphQL(params.text as string, variables);

export const RelayEnvironment = new Environment({
  network: Network.create(fetchRelay, setupSubscription as any),
  store: new Store(new RecordSource()),
});
