import { GraphQLObjectType, GraphQLTypeResolver } from 'graphql';
import { fromGlobalId, nodeDefinitions } from 'graphql-relay';
type GraphQLContext = any; // TODO fix it

type Load = (contex: GraphQLContext, id: string) => any;
type TypeLoaders = {
  [key: string]: {
    type: GraphQLObjectType;
    load: Load;
  };
};

function getTypeRegister() {
  const typesLoaders: TypeLoaders = {};

  const getTypesLoaders = () => typesLoaders;

  const registerTypeLoader = (type: GraphQLObjectType, load: Load) => {
    typesLoaders[type.name] = {
      type,
      load,
    };

    return type;
  };

  // gets the id from the globalid returned from node interface
  const idFetcher = (globalId, context: GraphQLContext) => {
    const { type, id } = fromGlobalId(globalId);
    const { load } = typesLoaders[type] || { load: null };
    return (load && load(context, id)) || null;
  };

  // gets the type of graphql object
  const typeResolver = (obj) => {
    // TODO: REVIEW THIS LATER
    const objName = obj.constructor.name === 'users' ? 'User' : 'Tweet';
    return objName;
  };

  const { nodeField, nodesField, nodeInterface } = nodeDefinitions(
    idFetcher,
    typeResolver as any
  );

  return {
    registerTypeLoader,
    getTypesLoaders,
    nodeField,
    nodesField,
    nodeInterface,
  };
}

export const { registerTypeLoader, nodeInterface, nodeField, nodesField } =
  getTypeRegister();
