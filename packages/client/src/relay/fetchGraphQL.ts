import { Variables } from 'relay-runtime';

export const fetchGraphQL = async (query: string, variables: Variables) => {
  const token = localStorage.getItem('ACCESS_TOKEN');
  const response = await fetch('/graphql', {
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
