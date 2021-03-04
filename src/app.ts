import express from 'express';
import 'reflect-metadata';
import './database';
import { router } from './routes';
import createConnection from './database'

createConnection();
const app = express();

app.use(express.json());
app.use(router);

export { app };
