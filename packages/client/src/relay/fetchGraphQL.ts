import { Variables } from 'relay-runtime';

const token = localStorage.getItem('ACCESS_TOKEN');

export const fetchGraphQL = async (query: string, variables: Variables) => {
  const response = await fetch(process.env.REACT_APP_API_URL as string, {
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
    localStorage.removeItem('ACCESS_TOKEN');
    return { data: result.errors[0] };
  }
  return result;
};
