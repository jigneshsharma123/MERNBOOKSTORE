import express, { json } from 'express';
import {PORT, URI} from './config.js';
import mongoose from 'mongoose';
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
const app = express();
// middleware for handling CORS policy
//option 1 : allow all origin with default of cors(*);
app.use(cors());
//Option 2:L allow custom origins
// app.use(cors({
//  origin : 'http://localhost:5173/',
//  methods : ['GET', 'POST', 'PUT','DELETE'],
//  allowedHeaders : ['Content-Type'],
// }));
app.use(express.json());

app.get("/", (req,res)=> {
    return res.status(200).send("Welcome to the MERN stack project");
});
app.use('/books',booksRoute);

mongoose.connect(URI)
.then(()=> {
    console.log("app connected to the db");
    app.listen(PORT, (err) => {
        if(err) {
            console.log("error in starting the server:", err);
    
        }
        console.log("seerver is running on port:",PORT);
    
    });
    
}).catch((error) => {
    console.log(error);
});

