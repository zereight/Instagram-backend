import dotenv from "dotenv";
import path from "path";
dotenv.config( { path: path.resolve()+"/.env" });

import { GraphQLServer } from "graphql-yoga";
import schema from "./schema";
import helmet from "helmet";
import morgan from "morgan";

import "./mongodb";

const PORT = process.env.PORT;


const server = new GraphQLServer( {schema} );

server.express.use(helmet());
server.express.use(morgan("dev"));

server.start( PORT, ()=>{console.log(`Server Started on ${PORT}`)} )
