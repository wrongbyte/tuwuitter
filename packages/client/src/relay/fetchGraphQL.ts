import { Variables } from 'relay-runtime';

// TODO: put the url into an env var

export const fetchGraphQL = async (query: string, variables: Variables) => {
  const response = await fetch('http://localhost:3001/graphql' as string, {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const data = await response.json();

  return data;
};
