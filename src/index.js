import dotenv from "dotenv";
import path from "path";
dotenv.config( { path: path.resolve()+"/.env" });

import { GraphQLServer } from "graphql-yoga";
import schema from "./schema";
import helmet from "helmet";
import morgan from "morgan";

import "./mongodb";
import { authenticationJwt } from "./passport";
import { isAuthenticated } from "./middleware";

const PORT = process.env.PORT;

const server = new GraphQLServer( {schema, context: ({request})=>{
    return ({request, isAuthenticated})} 
});

server.express.use(helmet());
server.express.use(morgan("dev"));
server.express.use(authenticationJwt);

server.start( PORT, ()=>{console.log(`Server Started on ${PORT}`)} )
