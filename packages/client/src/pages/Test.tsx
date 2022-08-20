import { useState } from 'react';
import ErrorModal from '../components/ErrorModal';
import type { TestQuery$data } from './__generated__/TestQuery.graphql';
const { graphql, useLazyLoadQuery } = require('react-relay');

export default function Test() {
  const [errorStatus, setErrorStatus] = useState<boolean | string>(false);
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
    { id: 'VXNlcjo2MmRmM2UyZDE3ODc2YWI0MjdlNmJlMnY=' }
  ) as TestQuery$data;

  return (
    <h1 className="text-white">{data.node?.displayName}</h1>
    // <ErrorModal phrase="Invalid token." setErrorStatus={setErrorStatus}></ErrorModal>
  );
}
