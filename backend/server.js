import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connect } from 'mongoose';
import connectDB from './db/connect.js';
import cookieParser from 'cookie-parser';
import fs from 'fs';
dotenv.config();
const port = process.env.PORT || 8000;

const routesPath = fs.readdirSync('./src/routes');
routesPath.forEach((file) => {
  import(`./src/routes/${file}`).then((route) => {
    app.use("/api/1", route.default);
  }).catch((error) => {
    console.error(`Error loading route ${file}:`, error);
  });
});



const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());




const server = async () => {
try {
  await connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
};

server();
