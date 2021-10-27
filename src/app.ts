// import module
import cors from 'cors';
import express, { Application, Router } from 'express';

import "reflect-metadata";
import { createConnection } from "typeorm";

// import file
import routes from './routers/route.router';

const app: Application = express();
const port = process.env.PORT || 3000;

const dotenv = require('dotenv');
dotenv.config();

// using middleware
app.use('*', cors());
app.use(express.json());
app.use(routes);

// server
createConnection().then(async connection => {
  app.listen(port, () => {
    console.log(`server is starting at port ${port}.`);
  });  
}).catch(error => console.log(`error typeorm connection: ${error}`));
