// src/index.js
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { connectToMongoDB } from "./services/db";
import cors from "cors";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cors({
    origin:process.env.ALLOWED_ORIGINS?.split(' '),
}))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use((req,res,next)=>{
    console.log("url=>",req.url)
    console.log("method=>",req.method)
    next();
})

//routes

import userRoutes from "./routes/employee.routes"
app.use("/api/employee",userRoutes);

// app.get("/", (req: Request, res: Response) => {
//   res.send("Express + TypeScript Server");
// });


connectToMongoDB()
.then(()=>{  
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
})
.catch(err=>console.log(err))

