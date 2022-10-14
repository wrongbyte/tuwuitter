import { Observable, RequestParameters, Variables } from 'relay-runtime';
import { createClient } from 'graphql-ws';

export const setupSubscription = (request: RequestParameters, variables: Variables) => {
  const query = request.text;
  const authorization = localStorage.getItem('ACCESS_TOKEN');

  const connectionParams = { authorization: '' };
  if (authorization) {
    connectionParams['authorization'] = authorization;
  }

  const subscriptionClient = createClient({
    url: 'ws://localhost:4000/graphql',
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

  const response = await fetch('http://localhost:3001/graphql', {
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
