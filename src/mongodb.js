import dotenv from "dotenv";
import path from "path";
dotenv.config( { path: path.resolve()+"/.env" });

import mongoose from "mongoose";

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.once("open", ()=>{console.log("Connected to DB")});
db.on("error", (err)=>{console.log("DB Error "+err)});