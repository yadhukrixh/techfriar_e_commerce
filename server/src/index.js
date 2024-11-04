import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
import connectToDatabase from "./config/database.js";
import authRouter from "./routes/user/auth-route.js";
import productRouter from './routes/product/product-route.js'
import { productSeeder } from "./modules/products/migrations/product-seeder.js";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from frontend
    methods: "GET, PUT, POST, DELETE",
    credentials: true, // Allow credentials (cookies, headers)
  })
);

app.use(express.json());

//productSeeder()

app.use("/auth",authRouter);

app.use("/products",productRouter)


app.listen(4000, () => {
    console.log(`Server connected to the port ${4000}`);
    connectToDatabase()
});