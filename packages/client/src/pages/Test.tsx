const { graphql, useLazyLoadQuery } = require('react-relay');

export default function Test() {
  const data = useLazyLoadQuery(
    graphql`
      query TestQuery($id: ID!) {
        node(id: $id) {
          id
          ... on User {
            username
            displayName
          }
        }
      }
    `,
    { id: 'VXNlcjo2MmRmM2UyZDE3ODc2YWI0MjdlNmJlMmY=' }
  );

  return <h1>{data.node?.username}</h1>;
}
