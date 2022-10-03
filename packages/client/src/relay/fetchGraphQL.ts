import { Variables } from 'relay-runtime';
import { createClient } from 'graphql-ws';
import { Network, Observable } from 'relay-runtime';

const wsClient = createClient({
  url: 'ws://localhost:4000/graphql',
});

const subscribe = (operation: any, variables: any) => {
  return Observable.create((sink) => {
    return wsClient.subscribe(
      {
        operationName: operation.name,
        query: operation.text,
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
