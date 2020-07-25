import dotenv from "dotenv";
import path from "path";
dotenv.config( { path: path.resolve()+"/.env" });

import { GraphQLServer } from "graphql-yoga";

const PORT = process.env.PORT;

const typeDefs = `
    type Query{
        hello: String!
    }
`;

const resolvers = {
    Query: {
        hello: ()=>"Hi!!"
    }
};

const server = new GraphQLServer({typeDefs, resolvers});
server.start( PORT, ()=>{console.log(`Server Started on ${PORT}`)} )