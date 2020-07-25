import path from "path";
import { makeExecutableSchema } from "graphql-tools";
const { fileLoader } = require("merge-graphql-schemas");

const allTypes = fileLoader( path.resolve(__dirname, "./api/**/*.graphql") );
const allResolvers = fileLoader( path.resolve(__dirname, "./api/**/*.js") );

const schema = makeExecutableSchema({
    typeDefs: allTypes,
    resolvers: allResolvers
});

export default schema;