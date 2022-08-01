import { Variables } from 'relay-runtime';

export const { REACT_APP_API_URL } = process.env;

export const fetchGraphQL = async (query: string, variables: Variables) => {
  const response = await fetch(REACT_APP_API_URL as string, {
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
