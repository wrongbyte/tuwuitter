import { Observable, RequestParameters, Variables } from 'relay-runtime';
import { createClient } from 'graphql-ws';

export const setupSubscription = (request: RequestParameters, variables: Variables) => {
  const query = request.text;
  const authorization = localStorage.getItem('ACCESS_TOKEN');

  const HOSTWS = window.location.origin.replace(/^http/, 'ws');

  const subscriptionURL =
    process.env.NODE_ENV === 'development' ? 'http://localhost:3001/graphql' : `${HOSTWS}/graphql`;

  const connectionParams = { authorization: '' };
  if (authorization) {
    connectionParams['authorization'] = authorization;
  }

  const subscriptionClient = createClient({
    url: subscriptionURL,
    connectionParams: () => {
      if (!authorization) {
        return {};
      }
      return { authorization };
    },
  });

  return Observable.create((sink) => {
    if (!request.text) {
      return sink.error(new Error('Operation text cannot be empty'));
    }
    return subscriptionClient.subscribe(
      {
        operationName: request.name,
        query: query!,
        variables,
      },
      sink
    );
  });
};

export const fetchGraphQL = async (query: string, variables: Variables) => {
  const token = localStorage.getItem('ACCESS_TOKEN');

  const graphqlPath =
    process.env.NODE_ENV === 'development' ? 'http://localhost:3001/graphql' : '/graphql';

  const response = await fetch(graphqlPath, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      authorization: token || '',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();

  // TODO: improve error handling
  if (result != null && Array.isArray(result.errors)) {
    if (result.errors[0].message === 'User not logged in') {
      localStorage.removeItem('ACCESS_TOKEN');
    }
  }
  return result;
};
