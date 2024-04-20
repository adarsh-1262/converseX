// const express = require('express');
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import userRoute from './routes/userRoute.js';
import messageRoute from './routes/messageRoute.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { app,server } from "./socket/socket.js";
dotenv.config({});


const PORT = process.env.PORT || 3000;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
// const corsOption = {
//     origin: 'https://converse-x.vercel.app',
//     credentials: true,
//     optionSuccessStatus: 200,
// };
// Define your custom CORS middleware function
const customCorsMiddleware = cors({
  origin: 'https://converse-x.vercel.app', // Allow requests from this origin
  credentials: true, // Allow sending cookies
  methods: ['GET', 'POST', 'PUT'], // Specify the allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
});
app.use(cors(customCorsMiddleware));
// CORS configuration
// app.use(cors({
//     origin: 'https://converse-x.vercel.app',
//     credentials: true,
// }));

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/message", messageRoute);


server.listen(PORT, () => {
    connectDB();
    console.log(`server listen at port ${PORT}`);
});
