import path from "path";
import { makeExecutableSchema, mergeType, mergeResolvers } from "graphql-tools";
const { fileLoader } = require("merge-graphql-schemas");

const allTypes = fileLoader( path.resolve(__dirname, "./api/**/*.graphql") );
const allResolvers = fileLoader( path.resolve(__dirname, "./api/**/*.js") );

const schema = makeExecutableSchema({
    typeDefs: mergeType(allTypes),
    resolvers: mergeResolvers(allResolvers)
});

export default schema;