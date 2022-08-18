import ModalLayout from '../components/ModalLayout';

import ErrorModal from '../components/ErrorModal';
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

  return <ErrorModal phrase="Invalid token."></ErrorModal>;
}
