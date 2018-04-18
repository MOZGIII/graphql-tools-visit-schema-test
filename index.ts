import { SchemaDirectiveVisitor, makeExecutableSchema } from "graphql-tools";
import gql from "graphql-tag";
import { GraphQLSchema } from "graphql";

const typeDefs = gql`
  type Query {
    dummy: String
  }
`;

const resolvers = {
  Query: {
    dummy: () => "dummy"
  }
};

const schema = makeExecutableSchema({ typeDefs, resolvers });

let worked = false;

SchemaDirectiveVisitor.visitSchemaDirectives(schema, {
  schemaDirective: class extends SchemaDirectiveVisitor {
    public visitSchema(s: GraphQLSchema) {
      worked = true;
    }
  }
});

if (!worked) {
  throw new Error("It didn't work!");
}
